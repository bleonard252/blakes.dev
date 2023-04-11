import { Component, h, html, render } from "htm/preact";
import { BridgeSupportedPlatform, WizardCard, categorizePlatform } from "./wizard-card";
import { Button } from "../button";
import MarkdownIt from "markdown-it";
import dangerouslyWriteHTML from "../../dangerously_set_html";

const md = new MarkdownIt();

export class convertedPage extends Component<h.JSX.HTMLAttributes & {from: BridgeSupportedPlatform, to: BridgeSupportedPlatform, bridge: Record<string, any>, address: string, alternatesAvailable?: boolean}> {
  render() {
    const toCategory = categorizePlatform(this.props.to);
    return html`<center><h1>Here's the address to follow:</h1></center>
    <p>Copy and paste this address into your app's search bar or contact adding screen.</p>
    <!-- I need a read-only copyable text input here. -->
    <span class="flex flex-row w-full my-4">
      <input readonly type="text" class="flex-grow p-4 enabled:focus:outline-2 enabled:focus:outline-offset-2 enabled:focus:outline-primary-3 rounded-md bg-scheme-3 text-center font-bold" value=${this.props.address} />
      <${Button} primary filled flex class="aspect-square p-4 ml-2 my-0 has-tooltip" aria-label="Copy to clipboard" onclick=${() => navigator.clipboard.writeText(this.props.address)}>
        <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-12 -translate-x-[80%] text-onscheme-3">Copy to clipboard</div>
        <iconify-icon icon="lucide:clipboard-copy"></iconify-icon>
      <//>
    </span>
    <div class="flex flex-col mt-2 gap-2">
      ${this.props.bridge.homepage && html`<p class="text-center mb-0">This bridge is provided by <a href=${this.props.bridge.homepage}>${new URL(this.props.bridge.homepage).hostname}</a>.</p>`}
      ${this.props.to == 'nostr' && html`<p class="text-center italic mb-0">You can use this <a href=${`nostr:${this.props.address}`}>Nostr address link</a> to follow this account from any supporting Nostr client.</p>`}
      ${this.props.bridge['nostr:relay'] && html`<details class=" hover:bg-scheme-2 open:bg-scheme-3 p-2 open:py-4 transition-[padding]">
        <summary>You might need to use a relay to follow this user. Tap or click here to show it.</summary>
        <p>Add the relay address below to your Nostr client's relay list. Then, you can follow this account.</p>
        <span class="flex flex-row w-full my-2">
          <input readonly type="text" class="flex-grow p-4 enabled:focus:outline-2 enabled:focus:outline-offset-2 enabled:focus:outline-primary-3 rounded-md bg-scheme-3 text-center font-bold" value=${this.props.bridge['nostr:relay']} />
          <${Button} primary filled flex class="aspect-square p-4 ml-2 my-0 has-tooltip" aria-label="Copy to clipboard" onclick=${() => navigator.clipboard.writeText(this.props.bridge['nostr:relay'])}>
            <div class="tooltip rounded-md shadow-lg p-1 bg-scheme-3 mt-12 -translate-x-[80%] text-onscheme-3">Copy to clipboard</div>
            <iconify-icon icon="lucide:clipboard-copy"></iconify-icon>
          <//>
        </span>
      </details>`}
      ${this.props.to == 'xmpp' && html`<p class="text-center italic">You can use this <a href=${`xmpp:${this.props.address}`}>XMPP address link</a> to ${toCategory == 'social' ? "follow" : toCategory == 'chat' ? "chat with" : 'connect with'} this account from any supporting XMPP client.</p>`}
      ${this.props.bridge.description && html`<article class="prose dark:prose-invert mx-auto" dangerouslySetInnerHTML=${({__html: md.render(this.props.bridge.description)})}>${this.props.bridge.description}</article>`}
      ${this.props.bridge.notes && this.props.bridge.notes.map((note) => html`<span class="block p-2 max-w-none prose dark:prose-invert bg-blue-500 bg-opacity-10">
        <p class="-mb-4"><iconify-icon icon="lucide:info" class="inline-block text-blue-500"></iconify-icon> <span class="text-blue-500 font-bold">Note:</span></p>
        ${dangerouslyWriteHTML(md.render(note))}
      </span>`)}
      ${this.props.bridge.warnings && this.props.bridge.warnings.map((warning) => html`<span class="block p-2 max-w-none prose dark:prose-invert bg-yellow-500 bg-opacity-10">
        <p class="-mb-4"><iconify-icon icon="lucide:alert-triangle" class="inline-block text-yellow-500"></iconify-icon> <span class="text-yellow-500 font-bold">Warning:</span></p>
        ${dangerouslyWriteHTML(md.render(warning))}
      </span>`)}
    </div>`;
  }
}