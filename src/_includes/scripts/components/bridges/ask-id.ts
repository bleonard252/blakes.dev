import { Component, h, html, render } from "htm/preact";
import { useState } from "preact/hooks";
import { BridgeSupportedPlatform, WizardCard, categorizePlatform } from "./wizard-card";
import { Button } from "../button";
import { ActivityPubAddress } from "../../bridges/convert-activitypub";
import { BridgesFromUser } from "../../bridges/base";
import { NostrAddress } from "../../bridges/convert-nostr";
import { XMPPAddress } from "../../bridges/convert-xmpp";
import { ReusableStrings } from "./page-to-service";
import { convertedPage } from "./converted";

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
    ${from == 'xmpp' && html`<p>For an XMPP account, this probably looks like <u><strong>username@domain.tld</strong></u>, but it could also look like <u><strong>domain.tld</strong></u>.</p>`}
    ${errors && errors?.map((error) => html`<p class="text-red-500 bg-red-50 dark:bg-red-900 p-4 my-4"><iconify-icon icon="lucide:alert-octagon" class="-align-[.2em]"></iconify-icon> ${error}</p>`)}
    <form class="contents" action="#" onsubmit=${(e) => e.preventDefault()}>
      <input disabled=${isLoading} type="text" class="w-full p-4 enabled:focus:outline-2 enabled:focus:outline-offset-2 enabled:focus:outline-primary-3 rounded-md bg-scheme-3 enabled:focus:bg-scheme-2 enabled:hover:bg-scheme-2 mt-4 invalid:border-red-500 invalid:border disabled:bg-scheme-1 disabled:text-onscheme-1/50" placeholder="Full handle, ID, or URL" id="remote-username" required />
      <${Button} disabled=${isLoading} type="submit" accesskey="enter" primary filled class="w-full mt-4" onclick=${async () => {
        const username = document.getElementById('remote-username') as HTMLInputElement;
        console.warn("Clicked!")
        if (username.value) {
          //window.location.hash = `from=${from}&to=${to}&username=${encodeURIComponent(username.value)}`;
          var fromAddr: Partial<BridgesFromUser> = {};
          if (from == 'activitypub') {
            fromAddr = ActivityPubAddress.fromString(username.value);
          } else if (from == 'nostr') {
            fromAddr = NostrAddress.fromString(username.value);
          } else if (from == 'atproto') {
            fromAddr = { toString: () => username.value };
          } else if (from == 'xmpp') {
            fromAddr = XMPPAddress.fromString(username.value);
          } else {
            setErrors(['Invalid source platform.']);
            return;
          }
          /** Which template substitutions are supported.
           * This is used to filter out bridges that require a template substitution that isn't supported.
           */
          function setSupportedBridges(): [string[], typeof bridges[0][]] {
            var supportedTemplates = [];
            if (Object.keys(fromAddr).includes("toString")) supportedTemplates.push("FROM");
            if (Object.keys(fromAddr).includes("domain") && fromAddr.domain) supportedTemplates.push("FROM_DOMAIN");
            if (Object.keys(fromAddr).includes("username") && fromAddr.username) supportedTemplates.push("FROM_USER");
            //if (Object.keys(fromAddr).includes("xmpp_resource")) supportedTemplates.push("FROM_RESOURCE");
            if (Object.keys(fromAddr).includes("pubkey") && fromAddr.pubkey) supportedTemplates.push("FROM_PUBKEY");
            const supportedBridges = bridges.filter((bridge) => {
              if (bridge.from != from) return false;
              if (bridge.to != to) return false;

              // Check if the bridge supports the template substitutions we need
              if (!supportedTemplates.includes("FROM") && bridge.template.includes("{FROM}")) return false;
              if (!supportedTemplates.includes("FROM_DOMAIN") && bridge.template.includes("{FROM_DOMAIN}")) return false;
              if (!supportedTemplates.includes("FROM_USER") && bridge.template.includes("{FROM_USER}")) return false;
              //if (!supportedTemplates.includes("FROM_RESOURCE") && bridge.template.includes("{FROM_RESOURCE}")) return false;
              if (!supportedTemplates.includes("FROM_PUBKEY") && bridge.template.includes("{FROM_PUBKEY}")) return false;
              return true;
            });
            return [supportedTemplates, supportedBridges];
          };
          var [_, supportedBridges] = setSupportedBridges();
          if (supportedBridges.length == 0) {
            if (from == 'nostr' && username.value.includes("@")) {
              // if you need a pubkey but didn't provide one, try looking up the pubkey
              setIsLoading(true);
              const res = await fetch(`https://${fromAddr.domain}/.well-known/nostr.json?user=${encodeURIComponent(fromAddr.username)}`).catch((e) => {
                return { status: 1, statusText: e.toString() } as Partial<Response>;
              });
              if (res.status == 200) {
                try {
                  var data = await res.json();
                } catch (e) {
                  setErrors(['No compatible bridges found. Try using a public key instead of an NIP-05 ID.']);
                  console.error("No compatible bridges found.");
                  return;
                }
                if (data.names[fromAddr.username]) {
                  fromAddr = NostrAddress.fromString(data.names[fromAddr.username]);
                  [_, supportedBridges] = setSupportedBridges();
                  if (supportedBridges.length == 0) {
                    setErrors(['How did we get here? Try using a public key instead of an NIP-05 ID.']);
                    console.error("No compatible bridges found. How did we get here?");
                    return;
                  }
                } else {
                  setErrors(['User not found. Try using a public key instead of an NIP-05 ID.']);
                  console.error("User not found: " + `${fromAddr.username}@${fromAddr.domain}`);
                  return;
                }
              } else {
                setErrors(['User not found. Try using a public key instead of an NIP-05 ID.', `Error ${res.status} when looking up user: ${res.statusText}`]);
                console.error("Domain not found: " + `${fromAddr.username}@${fromAddr.domain}`);
                return;
              }
            } else {
              setErrors(['No compatible bridges found. Try a different version of the ID.']);
              console.error("No compatible bridges found.");
              return;
            }
          }
          var index = 0, alternativesAvailable = false;
          if (supportedBridges.length > 1) {
            // this is to show the user they can refresh to get a different bridge, if the one they tried doesn't work.
            alternativesAvailable = true;
            // select a random supported bridge
            index = Math.floor(Math.random()*supportedBridges.length);
          }
          var bridge = supportedBridges[index];
          var template = bridge.template;

          // Apply template substitutions
          if (template.includes("{FROM}")) template = template.replace("{FROM}", fromAddr.toString());
          if (template.includes("{FROM_DOMAIN}")) template = template.replace("{FROM_DOMAIN}", fromAddr.domain);
          if (template.includes("{FROM_USER}")) template = template.replace("{FROM_USER}", fromAddr.username);
          //if (template.includes("{FROM_RESOURCE}")) template = template.replace("{FROM_RESOURCE}", fromAddr.xmpp_resource);
          if (template.includes("{FROM_PUBKEY}")) template = template.replace("{FROM_PUBKEY}", fromAddr.pubkey);

          setIsLoading(false);
          window.location.hash = `from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&username=${encodeURIComponent(username.value)}`;
          // TODO: someday, I'd like to have it so the wizard skips all this and just goes straight to the page if the above hash is set.
          // That way, someone can share parts of the bridge data in the hash and it'll skip those steps, making it easier to follow someone.
          render(html`<${convertedPage} from=${from} to=${to} bridge=${bridge} address=${template} alternatesAvailable=${alternativesAvailable}><//>`, rerenderTarget || document.getElementById('contents'));
        }
      }}>Convert<//>
    </form>`
  }
}

export function wizardAskIdPage(to: BridgeSupportedPlatform, from: BridgeSupportedPlatform, bridges: Array<Record<string, any>>, options: {errors?: Array<string>, rerenderTarget?: HTMLElement} = {}) {

}