import { X_Apply_Theme, X_Current_Theme } from "../scripts/applytheme";

export default function (props) {
  return <dialog id="themeSwitcher" class="p-10 m-1 rounded-lg shadow-xl max-w-sm lg:max-w-md xl:max-w-lg max-h-[75vh] flex flex-wrap bg-scheme-2">
    <ThemeTile 
      bgClass="bg-slate-50 text-black"
      primaryClass="bg-blue-700 text-white hover:bg-blue-500"
      cardClass="bg-slate-100"
      theme="arc-light"
      name="Arc Light"
    />
    <ThemeTile 
      bgClass="bg-slate-900 text-white"
      primaryClass="bg-blue-700 text-white hover:bg-blue-500"
      cardClass="bg-slate-800"
      theme="arc-dark"
      name="Arc Dark"
    />
    <ThemeTile 
      bgClass="bg-mint-50 text-black"
      primaryClass="bg-green-600 text-white hover:bg-green-400"
      cardClass="bg-mint-100"
      theme="mint-light"
      name="Mint Light"
    />
    <ThemeTile 
      bgClass="bg-mint-900 text-white"
      primaryClass="bg-green-600 text-white hover:bg-green-400"
      cardClass="bg-mint-800"
      theme="mint-dark"
      name="Mint Dark"
    />
    <ThemeTile 
      bgClass="bg-zinc-50 text-black"
      primaryClass="bg-orange-600 text-white hover:bg-orange-400"
      cardClass="bg-zinc-100"
      theme="unity-light"
      name="Unity Light"
    />
    <ThemeTile 
      bgClass="bg-zinc-900 text-white"
      primaryClass="bg-orange-600 text-white hover:bg-orange-400"
      cardClass="bg-zinc-800"
      theme="unity-dark"
      name="Unity Dark"
    />
    <div class="w-full">
      <form method="dialog">
        <button type="submit" class="p-2 m-2 text-primary-3 inline-block bg-opacity-0 hover:bg-opacity-25 bg-primary-1 rounded-md transition-colors">
          Exit
        </button>
      </form>
    </div>
  </dialog>;
}

function ThemeTile({ bgClass = "bg-white", primaryClass="bg-red-500", theme="none", name="Theme", cardClass="bg-gray-500" }) {
  return <div class={bgClass+" rounded-md "+(X_Current_Theme() === theme ? "border-primary-3" : "border-scheme-3")+" border-2 m-2 w-48 h-36 relative hover:shadow-lg active:shadow-2xl transition-shadow"}
    onClick={() => {localStorage.theme = theme; X_Apply_Theme();}}>
    <div class={cardClass+" rounded-md absolute top-4 left-4 p-2 select-none"}>{name}</div>
    <button class={primaryClass+" rounded-md absolute right-4 bottom-4 p-4 select-none"}>Primary</button>
  </div>
}