import { X_Apply_Theme, X_Current_Theme } from "../scripts/applytheme";
import { useState } from 'preact/hooks';
import { h, Fragment } from "preact";

export default function (props) {
  const [themeValue, updateThemeValue] = useState(localStorage.theme);
  return <dialog id="themeSwitcher" class="p-10 m-1 rounded-lg shadow-xl max-w-xs lg:max-w-md xl:max-w-lg w-full max-h-[75vh] flex flex-wrap lg:grid lg:grid-cols-2 lg:gap-4 bg-scheme-2">
    <div class="w-full mb-0 pb-0 col-span-full">
      <h1 class="text-2xl text-onscheme-2">Theme Switcher</h1>
    </div>
    <ThemeTile 
      bgClass="bg-slate-50 text-black"
      primaryClass="bg-blue-700 text-white hover:bg-blue-500"
      cardClass="bg-slate-100"
      theme="arc-light"
      active={themeValue == "arc-light"}
      updateThemeValue={updateThemeValue}
      name="Arc Light"
    />
    <ThemeTile 
      bgClass="bg-slate-900 text-white"
      primaryClass="bg-blue-700 text-white hover:bg-blue-500"
      cardClass="bg-slate-800"
      theme="arc-dark"
      active={themeValue == "arc-dark"}
      updateThemeValue={updateThemeValue}
      name="Arc Dark"
    />
    <ThemeTile 
      bgClass="bg-mint-50 text-black"
      primaryClass="bg-green-600 text-white hover:bg-green-400"
      cardClass="bg-mint-100"
      theme="mint-light"
      active={themeValue == "mint-light"}
      updateThemeValue={updateThemeValue}
      name="Mint Light"
    />
    <ThemeTile 
      bgClass="bg-mint-900 text-white"
      primaryClass="bg-green-600 text-white hover:bg-green-400"
      cardClass="bg-mint-800"
      theme="mint-dark"
      active={themeValue == "mint-dark"}
      updateThemeValue={updateThemeValue}
      name="Mint Dark"
    />
    <ThemeTile 
      bgClass="bg-zinc-50 text-black"
      primaryClass="bg-orange-600 text-white hover:bg-orange-400"
      cardClass="bg-zinc-100"
      theme="unity-light"
      active={themeValue == "unity-light"}
      updateThemeValue={updateThemeValue}
      name="Unity Light"
    />
    <ThemeTile 
      bgClass="bg-zinc-900 text-white"
      primaryClass="bg-orange-600 text-white hover:bg-orange-400"
      cardClass="bg-zinc-800"
      theme="unity-dark"
      active={themeValue == "unity-dark"}
      updateThemeValue={updateThemeValue}
      name="Unity Dark"
    />
    <ThemeTile 
      bgClass="bg-[#ffffff] text-[#2e3338]"
      primaryClass="bg-[rgb(88,101,242)] text-white hover:bg-[rgb(91,101,242)]"
      cardClass="bg-[#f2f3f5]"
      theme="chaos-light"
      active={themeValue == "chaos-light"}
      updateThemeValue={updateThemeValue}
      name="Chaos Light"
    />
    <ThemeTile 
      bgClass="bg-[rgb(24,25,28)] text-[rgb(220,221,222)]"
      primaryClass="bg-[rgb(88,101,242)] text-white hover:bg-[rgb(91,101,242)]"
      cardClass="bg-[rgb(32,34,37)]"
      theme="chaos-dark"
      active={themeValue == "chaos-dark"}
      updateThemeValue={updateThemeValue}
      name="Chaos Dark"
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