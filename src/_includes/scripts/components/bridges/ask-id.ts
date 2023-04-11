import { Component, h, html, render } from "htm/preact";
import { BridgeSupportedPlatform, WizardCard, categorizePlatform } from "./wizard-card";
import { Button } from "../button";
import { ActivityPubAddress } from "../../bridges/convert-activitypub";
import { BridgesFromUser } from "../../bridges/base";
import { NostrAddress } from "../../bridges/convert-nostr";
import { XMPPAddress } from "../../bridges/convert-xmpp";

export function wizardAskIdPage(to: BridgeSupportedPlatform, from: BridgeSupportedPlatform, bridges: Array<Record<string, any>>, {errors, rerenderTarget}: {errors?: Array<string>, rerenderTarget?: HTMLElement} = {}) {
  function rerenderWithErrors(errors: string[]): void {
    render(wizardAskIdPage(to, from, bridges, {errors, rerenderTarget}), rerenderTarget || document.getElementById('contents'));
  }
  return html`<center><h1>Bridge Tool</h1></center>
  <p>Enter the full ID of the account you want to bridge. This ID will include their username and domain name (such as me@blakes.dev) or a random-looking jumble, called a public key.</p>
  ${from == 'activitypub' && html`<p>For an ActivityPub/Mastodon account, this probably looks like <u><strong>@username@domain.tld</strong></u>,
  but it could also look like <u><strong>https://domain.tld/users/username</strong></u> or <u><strong>https://domain.tld/@username</strong></u>.</p>`}
  ${from == 'nostr' && html`<p>For a Nostr account, this is probably a public key starting with <u><strong>npub</strong></u>, but it might look like an email address.</p>`}
  ${from == 'atproto' && html`<p>For a AT Protocol or Bluesky account, this probably looks like <u><strong>@username.bsky.social</strong></u>.</p>`}
  ${from == 'xmpp' && html`<p>For an XMPP account, this probably looks like <u><strong>username@domain.tld</strong></u>, but it could also look like <u><strong>domain.tld</strong></u>.</p>`}
  ${errors && errors?.map((error) => html`<p class="text-red-500 bg-red-50 dark:bg-red-900 p-4 my-4"><iconify-icon icon="lucide:alert-octagon"></iconify-icon> ${error}</p>`)}
  <input type="text" class="w-full p-4 focus:outline-2 outline-offset-2 outline-primary-3 rounded-md bg-scheme-3 focus:bg-scheme-2 hover:bg-scheme-2 mt-4 invalid:border-red-500" placeholder="Full handle, ID, or URL" id="remote-username" required />
  <${Button} primary filled class="w-full mt-4" onclick=${() => {
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
        rerenderWithErrors(['Invalid source platform.']);
        return;
      }
      /** Which template substitutions are supported.
       * This is used to filter out bridges that require a template substitution that isn't supported.
       */
      var supportedTemplates = [];
      if (Object.keys(fromAddr).includes("toString")) supportedTemplates.push("FROM");
      if (Object.keys(fromAddr).includes("domain")) supportedTemplates.push("FROM_DOMAIN");
      if (Object.keys(fromAddr).includes("username")) supportedTemplates.push("FROM_USER");
      //if (Object.keys(fromAddr).includes("xmpp_resource")) supportedTemplates.push("FROM_RESOURCE");
      if (Object.keys(fromAddr).includes("pubkey")) supportedTemplates.push("FROM_PUBKEY");
      var supportedBridges = bridges.filter((bridge) => {
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
      if (supportedBridges.length == 0) {
        rerenderWithErrors(['No compatible bridges found. Try a different version of the ID.']);
        console.error("No compatible bridges found.");
        return;
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

      window.location.hash = `from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&username=${encodeURIComponent(username.value)}`;
      // someday, I'd like to have it so the wizard skips all this and just goes straight to the page if the above hash is set.
      // That way, someone can share parts of the bridge data in the hash and it'll skip those steps, making it easier to follow someone.
      // TODO: the final page, with info about the selected bridge and the ability to copy the converted address.
      // Until then:
      render(html`${template}`, rerenderTarget || document.getElementById('contents'));
    }
  }}>Convert<//>
  `
}