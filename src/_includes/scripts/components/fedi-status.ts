/// <reference types="megalodon" />
import { html } from "htm/preact";
import applyShortcodes from "../applyshortcodes";
import TimeAgo from 'javascript-time-ago';
import ta_en from 'javascript-time-ago/locale/en.json';
import { tags, attributes, classes } from "../sanitize";

function host(uri) {
  return new URL(uri).hostname;
}

TimeAgo.addDefaultLocale(ta_en);
const tago = new TimeAgo('en');

export default function fediStatus(status: Entity.Status, showFull = false) {
  return html`<a class="group" href=${status.account.url}>
  <div class="flex flex-row items-center p-4">
    <img src=${status.account.avatar_static} class="h-12 rounded-full mr-2" aria-hidden />
    <span>
      <span class="text-primary-3 group-hover:underline">${status.account.display_name ?? status.account.username}<span class="hidden"> says</span></span><br />
      <span class="text-sm opacity-70">
        <span aria-hidden>@${status.account.acct.includes("@") ? status.account.acct : status.account.acct+"@"+host(status.account.url)} &bull; </span><span
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
    <Icon icon="feather:x" />
  </button>
</form></div>` : ``}
${status.in_reply_to_account_id && status.in_reply_to_id ? html`<a href=${"https://fosstodon.org/web/statuses/"+status.in_reply_to_id} class="ml-4 mr-4 mb-2 text-sm italic opacity-70 hover:opacity-100 hover:underline">Replying to a post</a>` : `` }
${status.spoiler_text && showFull ? html`<div class="ml-4 mr-4 mb-4 X-Arb">${status.spoiler_text}</div>` : ``}
<div class="ml-4 mr-4 X-Arb">
  ${(!showFull && status.spoiler_text) || html`<SanitizedHTML html=${applyShortcodes(status.content, status.emojis || [])} allowedTags=${tags} allowedAttributes=${attributes} allowedClasses=${classes} />`}
</div>
${status.spoiler_text && !showFull ? html`<div class="ml-4 mr-4 text-primary-3 hover:underline">
  <button onClick=${() => {(document.getElementById("sd"+status.id) as any).showModal()}}><strong>Read behind content warning <InlineIcon icon="mdi:chevron-double-right" className="inline w-4 h-4" /></strong></button>
</div>` : ``}
${status.media_attachments ? html`<div class="m-4 mt-2 mb-0 flex flex-row">
  ${status.media_attachments.map(att => att.type == "image" ? html`<a href=${att.remote_url || att.url}>
    <img class="rounded-md max-h-[50vh]" src=${att.preview_url} alt=${att.description} title=${att.description} />
  </a>` : ``)}
</div>` : ``}`;
}