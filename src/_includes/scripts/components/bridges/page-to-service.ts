import { Component, h, html } from "htm/preact";
import { BridgeSupportedPlatform, WizardCard, categorizePlatform } from "./wizard-card";

export const ReusableStrings = {
  social_step2: "Select the service of the account you want to follow. You'll need to know their full username for the next step.",
  chat_step2: "Select the service of the person you want to chat with, or the group you want to join. You'll need to know their full username for the next step.",
};

export function wizardToServicePage(to: BridgeSupportedPlatform, bridges: Array<Record<string, any>>) {
  const category = categorizePlatform(to);
  return html`<center><h1>Bridge Tool</h1></center>
  <p>${category == 'social' ? ReusableStrings.social_step2 : category == 'chat' ? ReusableStrings.chat_step2 : 'Select the target platform.'}</p>
  <div class="grid grid-cols-2 gap-4">
    <h2 class="col-span-full">Social</h2>
    ${bridges.filter((v) => v.from == 'activitypub' && v.to == to).length > 0 && html`<${WizardCard} platform="activitypub" href="#from=activitypub"><//>`}
    ${bridges.filter((v) => v.from == 'nostr' && v.to == to).length > 0 && html`<${WizardCard} platform="nostr" href="#from=nostr"><//>`}
    ${bridges.filter((v) => v.from == 'bluesky' && v.to == to).length > 0 && html`<${WizardCard} platform="bluesky" href="#from=bluesky"><//>`}
    <h2 class="col-span-full">Messaging</h2>
    ${bridges.filter((v) => v.from == 'matrix' && v.to == to).length > 0 && html`<${WizardCard} platform="matrix" href="#from=matrix"><//>`}
    ${bridges.filter((v) => v.from == 'xmpp' && v.to == to).length > 0 && html`<${WizardCard} platform="xmpp" href="#from=xmpp"><//>`}
  </div>`;
}