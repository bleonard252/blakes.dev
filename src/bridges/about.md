---
layout: single.webc
title: About the Bridge Tool @ blakes.dev
meta_title: About the Bridge Tool
---
# About the Bridge Tool
This tool is intended to help you discover and use bridges and gateways. This allows you to follow social accounts or chat with other people who are using a different network than you.

## FAQ
### How do I use this tool?
1. The first page of [the Wizard](/bridges/) asks what platform **YOU** are on. You should make an educated guess if you don't know for sure which platform you're on. The most likely service names you'll have familiarity with, such as "Mastodon," are listed below the official protocol or platform names.
2. The second page looks like the first, but it is for the platform **YOUR FRIEND** is on. Handles with two at-signs are typically ActivityPub handles, handles with one at-sign at the beginning and a domain name after it are typically Bluesky handles, and handles with an at-sign in the middle are sometimes Nostr handles. If the username begins with "npub", it is a Nostr handle.
3. You'll put in **YOUR FRIEND**'s username on the next page.
Then, the tool will select a bridge and give you the bridged username to use. That's all there is to it.

If you can't use the Wizard, you'll need to select a bridge and perform the handle conversion yourself. This is only intended for people who already know what they're doing, 

### The platform my friend is using is listed on the first page, but not on the second page! Where did it go?
If their ID has the same or a similar format as yours, i.e. @username@domain.tld or `npub1...`, then you should try using that ID directly and adding it into your app by searching for it or using the "add contact", "find by username", or similar feature.

If that doesn't work, and you know what your and your friends' platforms are, then there might not be a bridge that exists to connect your platforms. This may be because such a bridge is inappropriate, such as between a social and a chat app; because none of the bridges that are running are public; or because such a bridge has never been made.

If you know of a public, working gateway or bridge between federated or decentralized platforms that isn't listed, [email me](mailto:ebst6h4s@duck.com?subject=Bridge%20Wizard%20-%20New%20Bridge) or [mention me on the Fediverse](https://fosstodon.org/@blake) with more details.

### I can't follow a Nostr account from my Fediverse account. What's the problem?
<a name="nostr-blocked" id="nostr-blocked"></a>
Some servers on the Fediverse may have blocked the Nostr bridge you're trying to use. They do this because of the type of content typical of Nostr, and (its potential for) spam. You can get around this by signing up for a different server, or by using Nostr directly.

In the future, I may find and advertise a curated list of bridged Nostr accounts you can interact with.

### Does this bridge let me use a Mastodon app to connect to Nostr?
Not exactly. You can't sign in to a Nostr account with a Mastodon app. However, users on Nostr can follow your Fediverse/ActivityPub account by using this tool to discover your address.

### I can't follow a Bluesky account from my Fediverse account (or vice versa). Can you help me?

Like with Nostr, some Fediverse servers block Bluesky bridges. Bluesky has known moderation shortcomings, so many servers block it to protect their members. You can get around this by signing up for a different server, or by using Bluesky or another AT Protocol service directly.

(At the time of writing, the Bluesky bridge is not yet online.)

### What features work between ActivityPub and Nostr?
At this time, these features ARE known to work between the two networks, for bridges using the Mostr software (the only one listed right now does).
* <span class="text-green-600 dark:text-green-500">Following accounts. ActivityPub accounts do receive follow notifications.</span>
* <span class="text-green-600 dark:text-green-500">Replying to posts.</span>
* <span class="text-green-600 dark:text-green-500">Seeing profile information (this may take some time, and images may not load).</span>
* <span class="text-green-600 dark:text-green-500">Seeing and sending images.</span>

These features are known NOT to work:
* <span class="text-red-600 dark:text-red-500">Favoriting. You can do it, but it won't carry over to the other network.</span>
* <span class="text-red-600 dark:text-red-500">Boosting/repeating. You can do it, but like favoriting, it won't carry over to the other network.</span>
* <span class="text-red-600 dark:text-red-500">Zapping. I'm not exactly sure what this is but ActivityPub doesn't support this at all.</span>
* <span class="text-red-600 dark:text-red-500">Direct messages. While Nostr's DMs appear to be end-to-end encrypted, most Fediverse DM systems are not, and are not received in any form on the Fediverse end.</span>

<!-- TODO: this should be moved to a compatibilty table somewhere that can be embedded into the bridge page. -->

### Why isn't Twitter listed?
Centralized sites don't bridge nearly as well as federated or decentralized platforms do. See [the motivations page](/bridges/why/) for more details.
