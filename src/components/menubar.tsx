import { InlineIcon } from "@iconify/react";

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
      <a class="X-MenuBarButton has-tooltip p-2 text-opacity-30 hover:text-opacity-70 text-onscheme-3 hover:bg-scheme-4 inline-block rounded-full transition-colors outline-scheme-5 outline-1 outline"
        href="/" id="homeButton">
        <span class="tooltip rounded-md shadow-lg p-1 bg-gray-300 mt-8 ml-2 -translate-x-[50%] text-gray-700">Home</span>
        <InlineIcon icon={{ body: require("bundle-text:../images/the_squares.svg"), width: 24, height: 24 }} color="currentColor" />
      </a>
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