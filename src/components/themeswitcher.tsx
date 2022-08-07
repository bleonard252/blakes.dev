import { X_Apply_Theme, X_Current_Theme } from "../scripts/applytheme";
import { useState } from 'preact/hooks';
import { h, Fragment } from "preact";
import { Icon } from "@iconify/react";

export default function (props) {
  const [themeValue, updateThemeValue] = useState(localStorage.theme);
  return <dialog id="themeSwitcher" class="p-10 m-1 rounded-lg shadow-xl max-w-xs lg:max-w-md xl:max-w-lg w-full max-h-[75vh] flex flex-wrap lg:grid lg:grid-cols-2 lg:gap-4 bg-scheme-2">
    <div class="w-full mb-0 pb-0 col-span-full">
      <h1 class="text-2xl text-onscheme-2">Theme Switcher</h1>
    </div>
    <LDAThemeTile
      bgClassLight="bg-slate-50 text-black"
      cardClassLight="bg-slate-100"
      bgClassDark="bg-slate-900 text-white"
      cardClassDark="bg-slate-800"
      primaryClass="bg-blue-700 text-white hover:bg-blue-500"
      themeBasename="arc"
      active={basenameOf(themeValue) == "arc"}
      updateThemeValue={updateThemeValue}
      name="Arc"
      mode={colorModeOf(themeValue)}
    />
    <LDAThemeTile
      bgClassLight="bg-mint-50 text-black"
      cardClassLight="bg-mint-100"
      bgClassDark="bg-mint-900 text-white"
      cardClassDark="bg-mint-800"
      primaryClass="bg-green-600 text-white hover:bg-green-400"
      themeBasename="mint"
      active={basenameOf(themeValue) == "mint"}
      updateThemeValue={updateThemeValue}
      name="Mint"
      mode={colorModeOf(themeValue)}
    />
    <LDAThemeTile
      bgClassLight="bg-zinc-50 text-black"
      cardClassLight="bg-zinc-100"
      bgClassDark="bg-zinc-900 text-white"
      cardClassDark="bg-zinc-800"
      primaryClass="bg-orange-600 text-white hover:bg-orange-400"
      themeBasename="unity"
      active={basenameOf(themeValue) == "unity"}
      updateThemeValue={updateThemeValue}
      name="Unity"
      mode={colorModeOf(themeValue)}
    />
    <LDAThemeTile
      bgClassLight="bg-[#ffffff] text-[#2e3338]"
      cardClassLight="bg-[#f2f3f5]"
      bgClassDark="bg-[rgb(24,25,28)] text-[rgb(220,221,222)]"
      cardClassDark="bg-[rgb(32,34,37)]"
      primaryClass="bg-[rgb(88,101,242)] text-white hover:bg-[rgb(91,101,242)]"
      themeBasename="chaos"
      active={basenameOf(themeValue) == "chaos"}
      updateThemeValue={updateThemeValue}
      name="Chaos"
      mode={colorModeOf(themeValue)}
    />
    <div class="col-span-full mb-0 pb-0">
      <form method="dialog">
        <button type="submit" class="p-2 m-2 text-primary-3 inline-block bg-opacity-0 hover:bg-opacity-25 bg-primary-1 rounded-md transition-colors">
          Exit
        </button>
      </form>
    </div>
  </dialog>;
}

function ThemeTile({ active = false, updateThemeValue = (value: string) => {}, bgClass = "bg-white", primaryClass="bg-red-500", theme="none", name="Theme", cardClass="bg-gray-500" }) {
  return <div class={"flex-grow lg:col-span-1 "+bgClass+" rounded-md "+(active ? "border-primary-3" : "border-scheme-3")+" border-2 m-2 min-w-48 w-full h-36 relative hover:shadow-lg active:shadow-2xl transition-shadow"}
    onClick={() => {localStorage.theme = theme; X_Apply_Theme(); updateThemeValue(theme);}}>
    <div class={cardClass+" rounded-md absolute top-4 left-4 p-2 select-none"}>{name}</div>
    <button class={primaryClass+" rounded-md absolute right-4 bottom-4 p-4 select-none"}>Primary</button>
  </div>
}

function basenameOf(theme: string) {
  if (!theme) {
    return "none";
  }
  if (theme.endsWith("-light")) {
    return theme.substring(0, theme.length - 6);
  } else if (theme.endsWith("-dark")) {
    return theme.substring(0, theme.length - 5);
  } else if (theme.endsWith("-auto")) {
    return theme.substring(0, theme.length - 5);
  }
}
function colorModeOf(theme: string): "light" | "dark" {
  if (!theme) {
    return "light";
  }
  if (theme.endsWith("-light")) {
    return "light";
  } else if (theme.endsWith("-dark")) {
    return "dark";
  } else {
    return "light";
  }
}

/// Light-Dark-Auto theme tile
function LDAThemeTile({ active = false, updateThemeValue = (value: string) => {}, mode = "light", bgClassLight = "bg-white", bgClassDark = "bg-black", primaryClass="bg-red-500", themeBasename="none", name="Theme", cardClassLight="bg-gray-500", cardClassDark="bg-gray-500" }) {
  var bgClass = mode == "dark" ? bgClassDark : bgClassLight;
  var cardClass = mode == "dark" ? cardClassDark : cardClassLight;
  var theme = themeBasename + "-" + mode;
  return <div class={"flex-grow lg:col-span-1 "+bgClass+" rounded-md "+(active ? "border-primary-3" : "border-scheme-3")+" border-2 m-2 min-w-48 w-full h-36 relative hover:shadow-lg active:shadow-2xl transition-shadow"}>
    <div class={cardClass+" rounded-md absolute top-4 left-4 p-2 select-none"}>{name}</div>
    <div class="rounded-md absolute right-4 bottom-4 select-none">
      <button class={primaryClass+" rounded-md rounded-r-none p-4 has-tooltip"} aria-label="Automatic theme, from system preference"
      onClick={(e) => {localStorage.theme = themeBasename+"-auto"; X_Apply_Theme(); updateThemeValue(themeBasename+"-auto");}}>
        <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Automatic theme, from system preference</div>
        <Icon icon="ph:circle-half-fill" color="currentColor" />
      </button>
      <button class={primaryClass+" p-4 has-tooltip"} aria-label="Light theme"
      onClick={(e) => {localStorage.theme = themeBasename+"-light"; X_Apply_Theme(); updateThemeValue(themeBasename+"-light");}}>
        <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Light theme</div>
        <Icon icon="feather:sun" color="currentColor" />
      </button>
      <button class={primaryClass+" rounded-md rounded-l-none p-4 has-tooltip"} aria-label="Dark theme"
      onClick={(e) => {localStorage.theme = themeBasename+"-dark"; X_Apply_Theme(); updateThemeValue(themeBasename+"-dark");}}>
        <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Dark theme</div>
        <Icon icon="feather:moon" color="currentColor" />
      </button>
    </div>
  </div>
}