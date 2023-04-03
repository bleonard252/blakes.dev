import { parseDocument } from "yaml";
import ajv from "ajv";
import Color from "color";
import path from "node:path";
import fs from "node:fs/promises";
import postcss from "postcss";

const themeSchema = JSON.parse(`{
  "$schema": "http://json-schema.org/draft-07/schema",
  "$ref": "#/definitions/ThemeYaml",
  "$id": "https://blakes.dev/theme-schema.json",
  "definitions": {
    "ThemeYaml": {
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "name": {
          "type": "string"
        },
        "scheme_dark": {
          "type": "object",
          "description": "The background colors used in dark mode. If not specified, dark mode is not supported.",
          "$ref": "#/definitions/scheme"
        },
        "onscheme_dark": {
          "type": "object",
          "description": "The foreground colors used in dark mode. If not specified, all are assumed to be white (#FFFFFF).",
          "$ref": "#/definitions/scheme"
        },
        "scheme_light": {
          "type": "object",
          "description": "The background colors used in light mode.",
          "$ref": "#/definitions/scheme"
        },
        "onscheme_light": {
          "type": "object",
          "description": "The foreground colors used in light mode. Generally, these are all \`#000000\`.",
          "$ref": "#/definitions/scheme"
        },
        "primary": {
          "type": "object",
          "description": "The most prominent *color* in the theme. Buttons often display this color, and it can be used for branding.",
          "$ref": "#/definitions/scheme"
        },
        "onprimary": {
          "type": "object",
          "description": "The foreground colors used when the primary color is a background, such as on buttons.\\nThis is typically \`#000000\` and \`#FFFFFF\` but picked for the most contrast against each shade.",
          "$ref": "#/definitions/scheme"
        },
        "extra_postcss": {
          "type": "string",
          "description": "PostCSS/Tailwind compatible CSS to apply when this theme is active.",
          "title": "Extra PostCSS"
        },
        "extra_postcss_light": {
          "type": "string",
          "description": "PostCSS/Tailwind compatible CSS to apply when this theme is active and in light mode.\\nThis is applied after \`extra_postcss\`.",
          "title": "Extra PostCSS (Light)"
        },
        "extra_postcss_dark": {
          "type": "string",
          "description": "PostCSS/Tailwind compatible CSS to apply when this theme is active and in dark mode.\\nThis is applied after \`extra_postcss\`.",
          "title": "Extra PostCSS (Dark)"
        },
        "extra_css": {
          "type": "string",
          "description": "CSS to apply when this theme is active.\\nThis is used instead of PostCSS when it isn't supported.",
          "title": "Extra CSS"
        }
      },
      "required": [
        "onscheme_light",
        "primary",
        "onprimary",
        "scheme_light"
      ],
      "dependencies": {
        "onscheme_dark": ["scheme_dark"],
        "onscheme_light": ["scheme_light"]
      },
      "title": "blakes.dev-Compatible Theme Definition"
    },
    "scheme": {
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "1": {
          "$ref": "#/definitions/colorValue"
        },
        "2": {
          "$ref": "#/definitions/colorValue"
        },
        "3": {
          "$ref": "#/definitions/colorValue"
        },
        "4": {
          "$ref": "#/definitions/colorValue"
        },
        "5": {
          "$ref": "#/definitions/colorValue"
        }
      },
      "required": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ]
    },
    "colorValue": {
      "type": ["integer", "string", "array"],
      "maxItems": 4,
      "minItems": 3,
      "items": {
        "type": "integer"
      }
    }
  }
}`);

const Validator = new ajv({ allowUnionTypes: true }).compile(themeSchema);
const DEFAULT_THEME = "nimbus-auto";

/// Returns a CSS file with all the themes.
async function transform(asset) {
  // logger.warn({
  //   message: `Type: ${asset.type}; Path: ${asset.filePath}`,
  // });
  // if (!asset.filePath.endsWith("styles/themes.txt")) return [asset];
  //let code = await asset.getCode();
  let themes = {};
  let code = ``;
  //logger.warn({ message: `Not implemented yet` });
  //throw new Error("Not implemented");

  let files = await fs.readdir(path.join(asset.filePath, "../theme/"));

  for (let file of files) {
    if (!file || !file.endsWith(".yaml")) continue;
    let _code = (
      await fs.readFile(path.join(asset.filePath, "../theme/", file))
    ).toString("utf8");
    let _theme = parseDocument(_code).toJSON();
    if (!Validator(_theme)) {
      throw Validator.errors[0];
    }
    let theme = _theme;

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

    themes[/^(.+)[.].+?$/.exec(file)[1]] = {
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

async function generateThemes(inputString, inputPath) {
  if (!(inputPath.endsWith("themes.pl.txt") || inputString.endsWith("themes.pl.txt"))) return;
  const output = await transform({
    filePath: path.join(process.cwd(), "./src/styles/themes.pl.txt"),
  })
  return postcss.parse(output).toString();
}

const output = await transform({
  filePath: path.join(process.cwd(), "./src/styles/themes.pl.txt"),
})
const pcss = postcss([
  (await import("postcss-import")).default,
  (await import("tailwindcss/nesting/index.js")).default,
  (await import("tailwindcss")).default,
  (await import("autoprefixer")).default,
  (await import("cssnano")).default
]);
const final = (await pcss.process(output, {from: path.join(process.cwd(), "./src/styles")})).toString();
await fs.writeFile(path.join(process.cwd(), "./dist/styles/themes.css"), final);