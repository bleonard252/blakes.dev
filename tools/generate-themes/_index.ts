import { parseDocument } from "yaml";
import ajv from "ajv";
import themeSchema from "./theme-schema.json";
import Color from "color";
import path from "node:path";
import fs from "node:fs/promises";
import postcss from "postcss";

const Validator = new ajv({ allowUnionTypes: true }).compile(themeSchema);
const DEFAULT_THEME = "nimbus-auto";

interface _ColorScheme {
  1: string | number | number[];
  2: string | number | number[];
  3: string | number | number[];
  4: string | number | number[];
  5: string | number | number[];
}

interface ThemeFile {
  name?: string;
  scheme_dark: _ColorScheme;
  scheme_light: _ColorScheme;
  primary: _ColorScheme;
  onprimary: _ColorScheme;
  onscheme_dark: _ColorScheme;
  onscheme_light: _ColorScheme;
  extra_postcss?: string;
  extra_postcss_dark?: string;
  extra_postcss_light?: string;
}

interface Asset {
  filePath: string;
}

/// Returns a CSS file with all the themes.
async function transform(asset: Asset): Promise<string> {
  // logger.warn({
  //   message: `Type: ${asset.type}; Path: ${asset.filePath}`,
  // });
  // if (!asset.filePath.endsWith("styles/themes.txt")) return [asset];
  //let code = await asset.getCode();
  let themes: {
    [themeId: string]: { auto: string; light: string; dark: string };
  } = {};
  let code = ``;
  //logger.warn({ message: `Not implemented yet` });
  //throw new Error("Not implemented");

  let files = await fs.readdir(path.join(asset.filePath, "../theme/"));

  for (let file of files) {
    if (!file || !file.endsWith(".yaml")) continue;
    let _code = await (
      await fs.readFile(path.join(asset.filePath, "../theme/", file))
    ).toString("utf8");
    let _theme = parseDocument(_code).toJSON();
    if (!Validator(_theme)) {
      throw Validator.errors[0];
    }
    let theme = _theme as ThemeFile;

    const rgb = (color) => Color(color).rgb().array();

    let light = `& {
      --scheme-1: ${rgb(theme.scheme_light["1"]).join(" ")};
      --scheme-2: ${rgb(theme.scheme_light["2"]).join(" ")};
      --scheme-3: ${rgb(theme.scheme_light["3"]).join(" ")};
      --scheme-4: ${rgb(theme.scheme_light["4"]).join(" ")};
      --scheme-5: ${rgb(theme.scheme_light["5"]).join(" ")};
      --primary-1: ${rgb(theme.primary["1"]).join(" ")};
      --primary-2: ${rgb(theme.primary["2"]).join(" ")};
      --primary-3: ${rgb(theme.primary["3"]).join(" ")};
      --primary-4: ${rgb(theme.primary["4"]).join(" ")};
      --primary-5: ${rgb(theme.primary["5"]).join(" ")};
      --onprimary-1: ${rgb(theme.onprimary["1"]).join(" ")};
      --onprimary-2: ${rgb(theme.onprimary["2"]).join(" ")};
      --onprimary-3: ${rgb(theme.onprimary["3"]).join(" ")};
      --onprimary-4: ${rgb(theme.onprimary["4"]).join(" ")};
      --onprimary-5: ${rgb(theme.onprimary["5"]).join(" ")};
      --onscheme-1: ${rgb(theme.onscheme_light["1"]).join(" ")};
      --onscheme-2: ${rgb(theme.onscheme_light["2"]).join(" ")};
      --onscheme-3: ${rgb(theme.onscheme_light["3"]).join(" ")};
      --onscheme-4: ${rgb(theme.onscheme_light["4"]).join(" ")};
      --onscheme-5: ${rgb(theme.onscheme_light["5"]).join(" ")};
    }

    ${theme.extra_postcss || ""}
    ${theme.extra_postcss_light || ""}
    .X-Hide-Dark {
      @apply inline h-4 w-4;
    }`;

    let dark = theme.onscheme_dark
      ? `& {
      --scheme-1: ${rgb(theme.scheme_dark["1"]).join(" ")};
      --scheme-2: ${rgb(theme.scheme_dark["2"]).join(" ")};
      --scheme-3: ${rgb(theme.scheme_dark["3"]).join(" ")};
      --scheme-4: ${rgb(theme.scheme_dark["4"]).join(" ")};
      --scheme-5: ${rgb(theme.scheme_dark["5"]).join(" ")};
      --primary-1: ${rgb(theme.primary["1"]).join(" ")};
      --primary-2: ${rgb(theme.primary["2"]).join(" ")};
      --primary-3: ${rgb(theme.primary["3"]).join(" ")};
      --primary-4: ${rgb(theme.primary["4"]).join(" ")};
      --primary-5: ${rgb(theme.primary["5"]).join(" ")};
      --onprimary-1: ${rgb(theme.onprimary["1"]).join(" ")};
      --onprimary-2: ${rgb(theme.onprimary["2"]).join(" ")};
      --onprimary-3: ${rgb(theme.onprimary["3"]).join(" ")};
      --onprimary-4: ${rgb(theme.onprimary["4"]).join(" ")};
      --onprimary-5: ${rgb(theme.onprimary["5"]).join(" ")};
      --onscheme-1: ${rgb(theme.onscheme_dark["1"]).join(" ")};
      --onscheme-2: ${rgb(theme.onscheme_dark["2"]).join(" ")};
      --onscheme-3: ${rgb(theme.onscheme_dark["3"]).join(" ")};
      --onscheme-4: ${rgb(theme.onscheme_dark["4"]).join(" ")};
      --onscheme-5: ${rgb(theme.onscheme_dark["5"]).join(" ")};
    }

    ${theme.extra_postcss || ""}
    ${theme.extra_postcss_dark || ""}
    .X-Hide-Light {
      @apply inline h-4 w-4;
    }`
      : light;

    let auto = theme.onscheme_dark
      ? `@media (prefers-color-scheme: dark) {
      ${dark}
    }
    @media not (prefers-color-scheme: dark) {
      ${light}
    }`
      : light;

    themes[/^(.+)[.].+?$/.exec(file)![1]] = {
      auto,
      light,
      dark,
    };
  }
  code += "\n";
  for (let themeId in themes) {
    code += `
    [data-theme="${themeId}-light"] {
      ${themes[themeId].light}
    }
    [data-theme="${themeId}-dark"] {
      ${themes[themeId].dark}
    }
    [data-theme="${themeId}-auto"] {
      ${themes[themeId].auto}
    }`;
  }
  // asset.setCode(code);
  // asset.type = "pcss";
  // return [asset];
  return code;
}

export default async function (inputString: string, inputPath: string) {
  console.log("Hit ${inputPath}");
  if (!(inputPath.endsWith("themes.x-theme") || inputString.endsWith("themes.x-theme"))) return;
  const output = await transform({
    filePath: path.join(process.cwd(), "./src/styles/themes.x-theme"),
  } as Asset)
  return postcss.parse(output).toString();
}