# [blakes.dev](https://blakes.dev) public source code
I'd like to show other people how I made my website, just in case they find it useful.

Old version, based primarily on Preact and Parcel is [here](https://github.com/bleonard252/blakes.dev/tree/16ef3a0709236f9a99f44b840ac386c2a28921fd).

## How to build
This is primarily for my own reference but just in case:
1. `pnpm i`: this updates dependencies so feel free to skip if you're sure everything's up to date
2. `pnpm build:pcss; pnpm build:themes`: just so that you can be certain the themes have been built
3. `pnpm build`: guess what this one does!
4. your profit is in `vite-dist` probably

## Tech stack
For this version I'm using the following fundamental technologies:
* [Eleventy](https://11ty.dev?from=blakes.dev) and its [Vite plugin](https://www.npmjs.com/package/@11ty/eleventy-plugin-vite?from=blakes.dev)
* [WebC](https://www.11ty.dev/docs/languages/webc/?from=blakes.dev) for the static layouts
* [HTM](https://npmjs.com/packages/htm?from=blakes.dev) and [Preact](https://preactjs.org?from=blakes.dev) for the dynamic layouts
* [Tailwind](https://tailwindcss.com) for a lot of the styling
* [Iconify](https://iconify.design?from=blakes.dev) for the icon framework; I'm using a lot of icons but my preference is Lucide/Feather.

## Legal/license disclaimer
Considering everything on this site represents *me personally*, you **aren't allowed** to fork it to create another website, except for the purposes of contributing back. Copying out individual parts for reuse, such as the button component, theme system, or [a WebC wrapper over a Preact component](https://github.com/bleonard252/blakes.dev/blob/main/src/_includes/components/wrapped/blakes-button.webc), go for it. The somewhat more technical custom license is [here](https://github.com/bleonard252/blakes.dev/blob/main/LICENSE)