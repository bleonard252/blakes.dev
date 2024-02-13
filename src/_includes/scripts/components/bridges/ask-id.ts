import { Component, h, html, render } from "htm/preact";
import { useState } from "preact/hooks";
import { BridgeSupportedPlatform, categorizePlatform } from "./wizard-card.js";
import { Button } from "../button.js";
import { convertedPage } from "./converted.js";
import runConversion from "../../bridges/convert.js";
import { ReusableStrings } from "./page-to-service.js";

export class askIdPage extends Component<h.JSX.HTMLAttributes & {from: BridgeSupportedPlatform, to: BridgeSupportedPlatform, bridges: Array<Record<string, any>>, rerenderTarget?: HTMLElement}> {
  render() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, _setErrors] = useState<Array<string>>([]);
    const { from, to, bridges, rerenderTarget } = this.props;
    function setErrors(errors: Array<string>) {
      setIsLoading(false);
      _setErrors(errors);
    }
    const toCategory = categorizePlatform(to);
    return html`<center><h1>Connecting your ${ReusableStrings.platform[to]} account with a${from.match(/^[aeiouAEIOU]/)?.length && "n"} ${ReusableStrings.platform[from]} account</h1></center>
    <p>Enter the full ID of the account you want to ${toCategory == "social" ? "follow" : toCategory == "chat" ? "talk to" : "connect with"}. Try the ID or username that they've shared with you!</p>
    ${from == 'activitypub' && html`<p>For an ActivityPub/Mastodon account, this probably looks like <u><strong>@username@domain.tld</strong></u>,
    but it could also look like <u><strong>https://domain.tld/users/username</strong></u> or <u><strong>https://domain.tld/@username</strong></u>.</p>`}
    ${from == 'nostr' && html`<p>For a Nostr account, this is probably a public key starting with <u><strong>npub</strong></u>, but it might look like an email address.</p>`}
    ${from == 'atproto' && html`<p>For an AT Protocol or Bluesky account, this probably looks like <u><strong>@username.bsky.social</strong></u>.</p>`}
    ${from == 'matrix' && html`<p>For a Matrix account, this probably looks like <u><strong>@username:domain.tld</strong></u>, but it could also look like <u><strong>#roomalias:domain.tld</strong></u>.</p>`}
    ${from == 'xmpp' && html`<p>For an XMPP account, this probably looks like <u><strong>username@domain.tld</strong></u>, but it could also look like <u><strong>domain.tld</strong></u>.</p>`}
    ${errors && errors?.map((error) => html`<p class="text-red-500 bg-red-50 dark:bg-red-900 p-4 my-4"><iconify-icon icon="lucide:alert-octagon" class="-align-[.2em]"></iconify-icon> ${error}</p>`)}
    <form class="contents" action="#" onsubmit=${(e) => e.preventDefault()}>
      ${to == 'matrix' && html`<p class="mb-0"><iconify-icon icon="lucide:help-circle" class="-align-[.2em] inline-block text-blue-500"></iconify-icon> Since you're using Matrix, we need a little more information.</p>
      <label for="matrix-user" class="block"><input type="radio" required id="matrix-user" name="matrix-type" value="user" /> <strong>User</strong>: ${toCategory == "social" ? `DM this user.` : `Chat with this user.`}</label>
      <label for="matrix-room" class="block"><input type="radio" required id="matrix-room" name="matrix-type" value="room" /> <strong>Room</strong>: ${toCategory == "social" ? `Follow this account, room, group, or user.` : `Join this chatroom.`}</label>`}
      <label for="remote-username" class="block text-sm mb-0">Full ID, handle, key, or username</label>
      <input disabled=${isLoading} type="text" class="w-full p-4 enabled:focus:outline-2 enabled:focus:outline-offset-2 enabled:focus:outline-primary-3 rounded-md bg-scheme-3 enabled:focus:bg-scheme-2 enabled:hover:bg-scheme-2 mt-2 invalid:border-red-500 invalid:border disabled:bg-scheme-1 disabled:text-onscheme-1/50" placeholder="Full handle, ID, or URL" id="remote-username" required />
      <${Button} disabled=${isLoading} type="submit" accesskey="enter" aria-label="Convert" primary filled class="w-full mt-4" onclick=${async () => {
        const username = document.getElementById('remote-username') as HTMLInputElement;
        const matrix_type_user = document.getElementById('matrix-user') as HTMLInputElement;
        const matrix_type_room = document.getElementById('matrix-room') as HTMLInputElement;
        const matrix_type = matrix_type_user?.checked ? 'user' : matrix_type_room?.checked ? 'room' : null;
        if (username.value && (to != 'matrix' || matrix_type)) {
          //window.location.hash = `from=${from}&to=${to}&username=${encodeURIComponent(username.value)}`;
          //var fromAddr: Partial<BridgesFromUser> = {};
          setIsLoading(true);
          try {
            const result = await runConversion({ from, to, originalAddress: username.value, bridges, setErrors, matrixType: matrix_type });
            if (!result) {
              setIsLoading(false);
              return;
            }
            const { bridge, address, alternativesAvailable } = result;
            setIsLoading(false);
            window.location.hash = `from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&username=${encodeURIComponent(username.value)}`;
            // TODO: someday, I'd like to have it so the wizard skips all this and just goes straight to the page if the above hash is set.
            // That way, someone can share parts of the bridge data in the hash and it'll skip those steps, making it easier to follow someone.
            render(html`<${convertedPage} from=${from} to=${to} bridge=${bridge} address=${address} alternatesAvailable=${alternativesAvailable}><//>`, rerenderTarget || document.getElementById('contents'));
          } catch (e) {
            setIsLoading(false);
            console.error(e);
            setErrors(['A critical error occurred. This should have been handled better. Please email me@blakes.dev with more information.', e.message]);
          }
        } else {
          setErrors(['All fields are required.']);
        }
      }}>Convert<//>
    </form>`
  }
}
