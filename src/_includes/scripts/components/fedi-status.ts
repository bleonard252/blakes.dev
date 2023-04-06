/// <reference types="megalodon" />
import { Component, html, h, Ref } from "htm/preact";
import applyShortcodes from "../applyshortcodes";
import TimeAgo from 'javascript-time-ago';
import ta_en from 'javascript-time-ago/locale/en.json';
import { tags, attributes, classes, dompurifyBody } from "../sanitize";
import dangerouslyWriteHTML from "../dangerously_set_html";

function host(uri) {
  return new URL(uri).hostname;
}

TimeAgo.addDefaultLocale(ta_en);
const tago = new TimeAgo('en');

export default function fediStatus(status: Entity.Status): h.JSX.Element {
  return html`<div class="bg-scheme-2 rounded-md flex flex-col mb-4"
  role="article">
  ${status.reblog ? html`<div class="flex flex-row items-center p-4 pb-0" id=${"s"+status.id}>
    <img src=${status.account.avatar_static} class="h-4 rounded-full mr-2" aria-hidden />
    <span>
      <strong>${status.account.display_name ?? status.account.username}</strong> boosted <span aria-hidden>\u2022 </span><span
      title=${tago.format(new Date(status.created_at), 'round-minute')+': '+(new Date(status.created_at)).toLocaleString()}
      aria-label=${tago.format(new Date(status.created_at), 'twitter-minute-now')}>
        ${tago.format(new Date(status.created_at), 'twitter-minute-now')}
      </span>
    </span>
  </div>` : ``}
  <${Status} status=${status.reblog ?? status} />
  <div class="X-Action-Row mt-auto flex flex-row">
    <a href=${"https://"+host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=reply"} aria-label="Reply" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-blue-500 hover:text-blue-500 rounded-full transition-colors has-tooltip">
      <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Reply</div>
      <iconify-icon icon="carbon:reply" width="16px" class="block" />
    </a>
    <a href=${"https://"+host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=boost"} aria-label="Boost" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-green-500 hover:text-green-500 rounded-full transition-colors has-tooltip">
      <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Boost</div>
      <iconify-icon icon="feather:repeat" width="16px" class="block" />
    </a>
    <a href=${"https://"+host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=favourite"} aria-label="Favorite" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-red-500 hover:text-red-500 rounded-full transition-colors has-tooltip">
      <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Favorite</div>
      <iconify-icon icon="feather:heart" width="16px" class="block" />
    </a>
    <span class="flex-grow" />
    <a href=${status.url} aria-label="Read More" class="p-2 m-2 text-gray-500 inline-block hover:bg-scheme-3 hover:text-onscheme-3 rounded-full transition-colors has-tooltip">
      <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[100%] text-onscheme-3" aria-hidden>Read\xa0More</div>
      <iconify-icon icon="carbon:launch" width="16px" class="block" />
    </a>
  </div>
  <dialog id=${"sd"+status.id} class="p-4 m-1 rounded-lg shadow-xl max-w-[90vw] lg:max-w-md xl:max-w-lg w-full max-h-[75vh] flex flex-col bg-scheme-2 text-onscheme-2">
    ${status.reblog ? html`<div class="flex flex-row items-center p-4 pb-0">
      <img src=${status.account.avatar_static} class="h-4 rounded-full mr-2" />
      <span>
        <strong>${status.account.display_name ?? status.account.username}</strong> boosted \u2022 <span
        title=${tago.format(new Date(status.created_at), 'round-minute')+': '+(new Date(status.created_at)).toLocaleString()}>
          ${tago.format(new Date(status.created_at), 'twitter-minute-now')}
        </span>
      </span>
    </div>` : ``}
    <${Status} status=${status.reblog || status} showFull=${true} />
    <div class="X-Action-Row mt-auto flex flex-row">
      <a href=${"https://"+host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=reply"} aria-label="Reply" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-blue-500 hover:text-blue-500 rounded-full transition-colors has-tooltip">
        <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Reply</div>
        <iconify-icon icon="lucide:reply" width="16px" class="block" />
      </a>
      <a href=${"https://"+host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=boost"} aria-label="Boost" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-green-500 hover:text-green-500 rounded-full transition-colors has-tooltip">
        <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Boost</div>
        <iconify-icon icon="lucide:repeat" width="16px" class="block" />
      </a>
      <a href=${"https://"+host(status.uri)+"/interact/"+(status.reblog ?? status).id+"?type=favourite"} aria-label="Favorite" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-red-500 hover:text-red-500 rounded-full transition-colors has-tooltip">
        <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Favorite</div>
        <iconify-icon icon="lucide:heart" width="16px" class="block" />
      </a>
      <span class="flex-grow" />
      <a href=${status.url} aria-label="Read More" class="p-2 m-2 text-gray-500 inline-block hover:bg-scheme-3 hover:text-onscheme-3 rounded-full transition-colors has-tooltip">
        <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[100%] text-onscheme-3" aria-hidden>Read&nbsp;More</div>
        <iconify-icon icon="carbon:launch" width="16px" class="block" />
      </a>
    </div>
  </dialog>
</div>`;
}

class Status extends Component {
  render(props?: Readonly<h.JSX.HTMLAttributes & { children?: any; status: Entity.Status; showFull?: boolean }>, state?: Readonly<{}>, context?: any) {
    const status = props.status;
    const showFull = props.showFull ?? false;
    return html`<a class="group" href=${status.account.url}>
    <div class="flex flex-row items-center p-4">
      <img src=${status.account.avatar_static} class="h-12 rounded-full mr-2" aria-hidden />
      <span>
        <span class="text-primary-3 group-hover:underline">${status.account.display_name ?? status.account.username}<span class="hidden"> says</span></span><br />
        <span class="text-sm opacity-70">
          <span aria-hidden>@${status.account.acct.includes("@") ? status.account.acct : status.account.acct+"@"+host(status.account.url)} \u2022 </span><span
          title=${tago.format(new Date(status.created_at), 'round-minute')+': '+(new Date(status.created_at)).toLocaleString()}
          aria-label=${tago.format(new Date(status.created_at), 'twitter-minute-now')}>
            ${tago.format(new Date(status.created_at), 'twitter-minute-now')}
          </span>
        </span>
      </span>
    </div>
  </a>
  ${showFull ? html`<div class="flex-grow text-right absolute top-4 right-4"><form method="dialog">
    <button type="submit" aria-label="Close dialog" target="_blank" class="p-2 m-2 text-gray-500 inline-block hover:bg-opacity-25 hover:bg-primary-3 hover:text-primary-3 rounded-full transition-colors has-tooltip">
      <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-8 ml-2 -translate-x-[50%] text-onscheme-3" aria-hidden>Close dialog</div>
      <iconify-icon icon="feather:x" />
    </button>
  </form></div>` : ``}
  ${status.in_reply_to_account_id && status.in_reply_to_id ? html`<a href=${"https://fosstodon.org/web/statuses/"+status.in_reply_to_id} class="ml-4 mr-4 mb-2 text-sm italic opacity-70 hover:opacity-100 hover:underline">Replying to a post</a>` : `` }
  ${status.spoiler_text && showFull ? html`<div class="ml-4 mr-4 mb-4 X-Arb">${status.spoiler_text}</div>` : ``}
  ${(!status.spoiler_text || !showFull) && html`<div class="ml-4 mr-4 X-Arb" dangerouslySetInnerHTML=${{__html: applyShortcodes(dompurifyBody(status.content), status.emojis || [])}}><//>`}
  ${status.spoiler_text && !showFull ? html`<div class="ml-4 mr-4 text-primary-3 hover:underline">
    <button onClick=${() => {(document.getElementById("sd"+status.id) as any).showModal()}}><strong>Read behind content warning <Inlineiconify-icon icon="mdi:chevron-double-right" className="inline w-4 h-4" /></strong></button>
  </div>` : ``}
  ${status.media_attachments ? html`<div class="m-4 mt-2 mb-0 flex flex-row">
    ${status.media_attachments.map(att => att.type == "image" && html`<a href=${att.remote_url || att.url}>
      <img class="rounded-md max-h-[50vh]" src=${att.preview_url} alt=${att.description} title=${att.description} />
    </a>`)}
  </div>` : ``}`;
  }
}