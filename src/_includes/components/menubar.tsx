import { InlineIcon, addCollection as iconAddColl } from "@iconify/react";
import { h, Fragment } from "preact";
import theSquares from "../icons/the_squares.svg.js";
//import { X_Apply_Theme, X_Current_Theme } from "../../scripts/applytheme";

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
            <InlineIcon icon={{ body: theSquares, width: 24, height: 24 }} color="currentColor" />
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
    <is-land on:visible on:idle id="theme-switcher-button"><template data-island="replace"><script src="/scripts/hydrate_themebutton.js"></script></template></is-land>
  </>
}

export const ThemeSwitcherButton = () => (<div class="hidden md:block float-right mx-4 w-min m-auto -mt-12 mb-0 p-2 rounded-md bg-scheme-3 overflow-x-auto overflow-y-visible max-w-[90%] shadow-lg">
  <div class="flex flex-row gap-2">
    <button class="X-MenuBarButton p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-md transition-colors has-tooltip"
      onClick={() => (document.getElementById("themeSwitcher") as any).showModal() } aria-label="Theme Switcher">
      <div class="tooltip fixed rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[100%] text-onscheme-3" aria-hidden>Theme&nbsp;Switcher</div>
      {/* <InlineIcon icon="feather:moon" color="currentColor" className="X-Hide-Light" />
      <InlineIcon icon="feather:sun" color="currentColor" className="X-Hide-Dark" /> */}
      <InlineIcon icon="bi:palette" />
    </button>
  </div>
</div>)

declare module 'preact/src/jsx' {
  namespace JSXInternal {
    interface IntrinsicElements {
      "is-land": any,
      "template": any
    }
  }
}

const menubarIconBundles = [
  // https://api.iconify.design/lucide.json?icons=calendar,sun,moon,palette
  // prettier-ignore @ts-ignore
  {"prefix":"lucide","width":24,"height":24,"icons":{"calendar":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" ry=\"2\"/><path d=\"M16 2v4M8 2v4m-5 4h18\"/></g>"},"sun":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41\"/></g>"},"moon":{"body":"<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 3a6.364 6.364 0 0 0 9 9a9 9 0 1 1-9-9Z\"/>"},"palette":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"13.5\" cy=\"6.5\" r=\".5\"/><circle cx=\"17.5\" cy=\"10.5\" r=\".5\"/><circle cx=\"8.5\" cy=\"7.5\" r=\".5\"/><circle cx=\"6.5\" cy=\"12.5\" r=\".5\"/><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688c0-.437-.18-.835-.437-1.125c-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z\"/></g>"}}},
  // https://api.iconify.design/simple-icons.json?icons=github,codeberg,mastodon
  // prettier-ignore @ts-ignore
  {"prefix":"simple-icons","width":24,"height":24,"icons":{"github":{"body":"<path fill=\"currentColor\" d=\"M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\"/>"},"codeberg":{"body":"<path fill=\"currentColor\" d=\"M11.955.49A12 12 0 0 0 0 12.49a12 12 0 0 0 1.832 6.373L11.838 5.928a.187.14 0 0 1 .324 0l10.006 12.935A12 12 0 0 0 24 12.49a12 12 0 0 0-12-12a12 12 0 0 0-.045 0zm.375 6.467l4.416 16.553a12 12 0 0 0 5.137-4.213z\"/>"},"mastodon":{"body":"<path fill=\"currentColor\" d=\"M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127C.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611c.118 1.24.325 2.47.62 3.68c.55 2.237 2.777 4.098 4.96 4.857c2.336.792 4.849.923 7.256.38c.265-.061.527-.132.786-.213c.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041a.053.053 0 0 0-.046-.01a20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433a.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546c.376 0 .75 0 1.125-.01c1.57-.044 3.224-.124 4.768-.422c.038-.008.077-.015.11-.024c2.435-.464 4.753-1.92 4.989-5.604c.008-.145.03-1.52.03-1.67c.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976c-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35c-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12c.696-.77 1.608-1.164 2.74-1.164c1.311 0 2.302.5 2.962 1.498l.638 1.06l.638-1.06c.66-.999 1.65-1.498 2.96-1.498c1.13 0 2.043.395 2.74 1.164c.675.77 1.012 1.81 1.012 3.12z\"/>"}}},
  // https://api.iconify.design/mdi.json?icons=brightness-5,triangle-outline
  // prettier-ignore @ts-ignore
  {"prefix":"mdi","width":24,"height":24,"icons":{"brightness-5":{"body":"<path fill=\"currentColor\" d=\"M12 18a6 6 0 0 1-6-6a6 6 0 0 1 6-6a6 6 0 0 1 6 6a6 6 0 0 1-6 6m8-2.69L23.31 12L20 8.69V4h-4.69L12 .69L8.69 4H4v4.69L.69 12L4 15.31V20h4.69L12 23.31L15.31 20H20v-4.69Z\"/>"},"triangle-outline":{"body":"<path fill=\"currentColor\" d=\"M12 2L1 21h22M12 6l7.53 13H4.47\"/>"}}}
];
for (const pack of menubarIconBundles) {
  iconAddColl(pack);
}