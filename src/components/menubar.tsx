import { InlineIcon } from "@iconify/react";
import { h, Fragment } from "preact";
import { X_Apply_Theme, X_Current_Theme } from "../scripts/applytheme";

export default function (props) {
  return <>
    <div class="w-min m-auto mt-4 mb-0 p-2 rounded-md bg-scheme-3 overflow-x-auto overflow-y-visible max-w-[90%] shadow-lg" id="menubar">
      <div class="flex flex-row gap-2">
        <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
          href="https://github.com/bleonard252" aria-label="GitHub">
          <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>GitHub</div>
          <InlineIcon icon="simple-icons:github" color="currentColor" />
        </a>
        <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
          href="https://codeberg.org/bleonard252" aria-label="Codeberg">
          <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Codeberg</div>
          <InlineIcon icon="simple-icons:codeberg" color="currentColor" />
        </a>
        <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
          href="/now" aria-label="Now page">
          <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Now Page</div>
          <InlineIcon icon="feather:calendar" color="currentColor" />
        </a>
        <div class="has-tooltip h-6">
          <div class="tooltip rounded-md shadow-lg bg-scheme-4 mt-7 ml-4 -translate-x-[50%] text-onscheme-4 flex flex-col text-center">
            <a class="rounded-md X-ListedButton m-0 p-2 px-4 bg-opacity-0 hover:bg-opacity-25 bg-scheme-5 hover:text-onscheme-4h" href="https://gitlab.com/bleonard252">GitLab</a>
            <a class="rounded-md X-ListedButton m-0 p-2 px-4 bg-opacity-0 hover:bg-opacity-25 bg-scheme-5 hover:text-onscheme-4h" href="https://nimbus.blakes.dev">Try Nimbus!</a>
            <button class="block md:hidden rounded-md X-ListedButton m-0 p-2 px-4 bg-opacity-0 hover:bg-opacity-25 bg-scheme-5 hover:text-onscheme-4h" 
              onClick={() => (document.getElementById("themeSwitcher") as any).showModal() }>
              Theme Switcher
            </button>
          </div>
          <a class="X-MenuBarButton p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-full transition-colors outline-scheme-5 outline-1 focus:outline-2 focus:outline-offset-2    outline"
            href="/" id="homeButton" onContextMenu={(e) => e.preventDefault()} aria-label="Home">
            <InlineIcon icon={{ body: require("bundle-text:../images/the_squares.svg"), width: 24, height: 24 }} color="currentColor" />
          </a>
        </div>
        <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
          href="https://fosstodon.org/@blake" rel="me" aria-label="Mastodon">
          <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Mastodon</div>
          <InlineIcon icon="simple-icons:mastodon" color="currentColor" />
        </a>
        <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
          href="https://misintelligence.xyz" aria-label="Misintelligence">
          <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Misintelligence</div>
          <InlineIcon icon="mdi:triangle-outline" color="currentColor" />
        </a>
        <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors"
          href="https://dahliaos.io" aria-label="dahliaOS">
          <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>dahliaOS</div>
          <InlineIcon icon="mdi:brightness-5" color="currentColor" />
        </a>
      </div>
    </div>
    <div class="hidden md:block float-right mx-4 w-min m-auto -mt-12 mb-0 p-2 rounded-md bg-scheme-3 overflow-x-auto overflow-y-visible max-w-[90%] shadow-lg">
        <div class="flex flex-row gap-2">
          <button class="X-MenuBarButton p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors has-tooltip"
            onClick={() => (document.getElementById("themeSwitcher") as any).showModal() } aria-label="Theme Switcher">
            <div class="tooltip fixed rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[100%] text-onscheme-3" aria-hidden>Theme&nbsp;Switcher</div>
            {/* <InlineIcon icon="feather:moon" color="currentColor" className="X-Hide-Light" />
            <InlineIcon icon="feather:sun" color="currentColor" className="X-Hide-Dark" /> */}
            <InlineIcon icon="bi:palette" />
          </button>
        </div>
      </div>
  </>
}