/// <reference types="megalodon" />

import { html } from "htm/preact";
import { dompurifyBody } from "../sanitize";
import getTailwindConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config.js';

const fullConfig = getTailwindConfig(tailwindConfig);

export default function ({ accountResult }: ({accountResult: Partial<Entity.Account>})) {
  return html`<div class="X-Card bg-scheme-2 rounded-md flex flex-col text-onscheme-2" id="about-card">
  ${accountResult.header_static && !accountResult.header_static.endsWith("missing.png") ? html`<div style=${`background-image: url('${accountResult.header_static}')`} class="h-[170px] bg-center bg-cover rounded-t-md" id="banner" />` : ``}
  <div class="-mt-[48px] m-4 mb-0 X-Profile-Avatar is-primary">
    ${accountResult?.avatar_static ? html`<img src=${accountResult.avatar_static} class="rounded-full w-[96px] h-[96px] border-2 border-scheme-3" id="avatar" aria-hidden />` : html`<div class="rounded-full w-[96px] h-[96px] bg-scheme-2" id="avatar" aria-hidden />`}
    ${/*a href="https://codeberg.org/bleonard252" class="float-right -mt-[36px] mb-0 p-2 bg-primary-3 inline-block hover:bg-primary-5 text-white rounded-md transition-colors">
      <InlineIcon icon="simple-icons:github" className="lg:inline" /><span class="hidden lg:inline"> Follow</span>
    </a>*/``}
    <blakes-button primary filled href="https://infosec.town/@blake" class="float-right -mt-[36px] mb-0">
      <iconify-icon icon="simple-icons:mastodon" class="inline-block align-[-.2em]" aria-hidden /><span class="hidden lg:inline"> Follow</span>
    </blakes-button>
  </div>
  <h1>${accountResult?.display_name ?? `Blake Leonard`}</h1>
  ${/* (accountResult?.note) ? /*html`<div class="p-4"><${SanitizedHTML} html=${accountResult.note} allowedTags=${tags} allowedClasses=${classes} /></div>`* /
  html`<div class="p-4" dangerouslySetInnerHTML=${{__html: dompurifyBody(accountResult.note)}}><//>` : */ ``}
  <div class="p-4" name="About Me">
    <p>A software developer with a passion for the powers, rights, and freedoms of users. Developer of dahliaOS, LucidLog, Bodacious, and more. Sometimes tries to design and write. 19 M (he/him) from Raleigh, NC. Cool tech enthusiast.</p>
  </div>
  ${/* (accountResult?.fields) ? html`<div class="X-KVTable last:rounded-b-md overflow-clip">
    ${(accountResult?.fields || []).map(field => html`<div class="row X-Uneven -last:border-b-2 -first:border-t-2 border-b-scheme-3" key=${field.name}>
      <span class="bg-scheme-3 font-semibold">${field.name}</span>
      <span class=${(field.verified_at ? "is-verified text-green-500" : "is-not-verified")+" X-Arb"}>
        ${field.verified_at ? html`<iconify-icon icon="feather:check" class="inline-block text-green-500 align-[-.2em]" />\xa0` : ``}
        <span class="contents" dangerouslySetInnerHTML=${{__html: dompurifyBody(field.value)}}><//>
      </span>
    </div>`)}
  </div>` :*/ ``}
</div>`;
}
