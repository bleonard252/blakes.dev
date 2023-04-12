import { Component, Ref, h, html } from "htm/preact";

export type BridgeSupportedPlatform =
  'activitypub' | 'nostr' | 'atproto'
  | 'matrix' | 'xmpp' | 'irc';

export function categorizePlatform(platform: BridgeSupportedPlatform): 'social' | 'chat' | null {
  if (platform == 'activitypub') return 'social';
  else if (platform == 'nostr') return 'social';
  else if (platform == 'atproto') return 'social';
  else if (platform == 'matrix') return 'chat';
  else if (platform == 'xmpp') return 'chat';
  else if (platform == 'irc') return 'chat';
  else return null;
}

export class WizardCard extends Component<h.JSX.HTMLAttributes & {
  /** The platform the card represents. */
  platform: BridgeSupportedPlatform,
  /** Whether the platform is used for social or chat, if relevant.
   * This is typically used on the second page of the wizard with XMPP,
   * to distinguish between social (Libervia/Movim) and chat (Conversations) bridges.
   *
   * Social platforms where DMs are also bridged are still considered social.
   */
  category?: 'social' | 'chat' | null,
}> {
  render({platform, category, ...props}) {
    if (platform == 'activitypub') return html`<a class="X-BridgeWizardCard bg-amber-300 dark:bg-yellow-700 hover:bg-amber-400 dark:hover:bg-amber-600" ...${props}><h3>ActivityPub</h3>Mastodon, Misskey, Pixelfed, Pleroma, "the Fediverse"...</a>`;
    else if (platform == 'nostr') return html`<a class="X-BridgeWizardCard bg-purple-300 dark:bg-purple-900 hover:bg-purple-400 dark:hover:bg-purple-800" ...${props}><h3>Nostr</h3></a>`;
    else if (platform == 'atproto') return html`<a class="X-BridgeWizardCard bg-sky-300 dark:bg-sky-900 hover:bg-sky-400 dark:hover:bg-sky-800" ...${props}><h3>AT Protocol</h3>Bluesky</a>`;
    else if (platform == 'matrix') return html`<a class="X-BridgeWizardCard bg-green-300 dark:bg-green-900 hover:bg-green-400 dark:hover:bg-green-800" ...${props}><h3>Matrix</h3>Element</a>`;
    else if (platform == 'xmpp') return html`<a class="X-BridgeWizardCard bg-orange-300 dark:bg-orange-900 hover:bg-orange-400 dark:hover:bg-orange-800" ...${props}><h3>XMPP</h3>${category == 'social' ? "Libervia, Movim" : category == 'chat' ? "Conversations, Dino, Gajim, Jabber..." : "Conversations, Libervia, Movim..."}</a>`;
    else return html`<span class="X-BridgeWizardCard bg-gray-300 dark:bg-gray-900" ...${props}><h3>${platform}</h3>Unknown platform</span>`;
  }
}
