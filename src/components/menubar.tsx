import { InlineIcon } from "@iconify/react";
import { X_Apply_Theme, X_Current_Theme } from "../scripts/applytheme";

export default function (props) {
  return <div class="w-min m-auto mt-4 mb-0 p-2 rounded-md bg-scheme-3 overflow-x-auto overflow-y-visible max-w-[90%] shadow-lg" id="menubar">
    <div class="flex flex-row gap-2">
      <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
        href="https://github.com/bleonard252">
        <span class="tooltip rounded-md shadow-lg p-1 bg-gray-300 mt-8 ml-2 -translate-x-[50%] text-gray-700">GitHub</span>
        <InlineIcon icon="simple-icons:github" color="currentColor" />
      </a>
      <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
        href="https://codeberg.com/bleonard252">
        <span class="tooltip rounded-md shadow-lg p-1 bg-gray-300 mt-8 ml-2 -translate-x-[50%] text-gray-700">Codeberg</span>
        <InlineIcon icon="simple-icons:codeberg" color="currentColor" />
      </a>
      <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
        href="/now">
        <span class="tooltip rounded-md shadow-lg p-1 bg-gray-300 mt-8 ml-2 -translate-x-[50%] text-gray-700">Now Page</span>
        <InlineIcon icon="feather:calendar" color="currentColor" />
      </a>
      <div class="has-tooltip h-6">
        <div class="tooltip rounded-md shadow-lg bg-scheme-4 mt-7 ml-4 -translate-x-[50%] text-onscheme-4 flex flex-col text-center">
          <a class="rounded-md X-ListedButton m-0 p-2 px-4 bg-opacity-0 hover:bg-opacity-25 bg-scheme-5 hover:text-onscheme-4h" href="https://gitlab.com/bleonard252">GitLab</a>
          <a class="rounded-md X-ListedButton m-0 p-2 px-4 bg-opacity-0 hover:bg-opacity-25 bg-scheme-5 hover:text-onscheme-4h" href="#">Test Link</a>
          <button class="block md:hidden rounded-md X-ListedButton m-0 p-2 px-4 bg-opacity-0 hover:bg-opacity-25 bg-scheme-5 hover:text-onscheme-4h" 
            onClick={() => {X_Current_Theme() == "arc-dark" ? localStorage.theme = "arc-light" : localStorage.theme = "arc-dark"; X_Apply_Theme();}}>
            Change Theme
          </button>
        </div>
        <a class="X-MenuBarButton p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-full transition-colors outline-scheme-5 outline-1 outline"
          href="/" id="homeButton" onContextMenu={(e) => e.preventDefault()}>
          <InlineIcon icon={{ body: require("bundle-text:../images/the_squares.svg"), width: 24, height: 24 }} color="currentColor" />
        </a>
      </div>
      <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
        href="https://indieweb.social/@blake" rel="me">
        <span class="tooltip rounded-md shadow-lg p-1 bg-gray-300 mt-8 ml-2 -translate-x-[50%] text-gray-700">Mastodon</span>
        <InlineIcon icon="simple-icons:mastodon" color="currentColor" />
      </a>
      <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
        href="https://misintelligence.xyz">
        <span class="tooltip rounded-md shadow-lg p-1 bg-gray-300 mt-8 ml-2 -translate-x-[50%] text-gray-700">Misintelligence</span>
        <InlineIcon icon="mdi:triangle-outline" color="currentColor" />
      </a>
      <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
        href="https://dahliaos.io">
        <span class="tooltip rounded-md shadow-lg p-1 bg-gray-300 mt-8 ml-2 -translate-x-[50%] text-gray-700">dahliaOS</span>
        <InlineIcon icon="mdi:brightness-5" color="currentColor" />
      </a>
    </div>
  </div>
}