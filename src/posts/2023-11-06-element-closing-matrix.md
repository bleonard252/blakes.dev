---
layout: single # TODO: use a blog post layout that shows similar blog posts
tags: posts
title: Element's licensing changes endanger Matrix - Blake Leonard
metaTitle: Element's licensing changes endanger Matrix.
metaDescription: Element is forking, relicensing, and taking over development for the main Matrix server software. The foundations of the open ecosystem are eroding. I also discuss this news as it relates to Spades and the Fediverse.
---
# Element's licensing changes endanger Matrix.
<small><time datetime="2023-11-06">2023/11/06</time></small>

Today, the founders and leaders of the [Matrix](https://matrix.org) instant messaging ("chat") ecosystem, New Vector Ltd., better known as [Element](https://element.io), decided to not only fork (or perhaps take full ownership of) Synapse and Dendrite, the "reference" servers for the ecosystem, but also to relicense them to AGPL. While relicensing may be in good conscience and AGPL is certainly a good license to choose, the killer here is the copyright reassignment and the surrender of your rights as an open source contributor afforded to Element by the [contributor license agreement, or CLA,](https://www.apache.org/licenses/contributor-agreements.html#clas) they've chosen to enact.

Another important change is that, apparently, the Matrix Foundation will no longer be developing their copies of Synapse, Dendrite, and related components. Both Element's and the Foundation's posts about the matter state that administrators will "need to get their upstream releases from Element’s repositories going forward" (this is the Foundation post's verbiage). While existing contributions into the Matrix ecosystem that base off of these projects, like [Beeper](https://beeper.com), may continue to operate as normal, they may find themselves prevented by the new license from updating to use new Element code, and therefore growing outdated and incompatible with much of the ecosystem, which is driven in no small part by the Element frontend and Synapse.

This news comes a few months in the wake of the Matrix Foundation announcing that they are [underfunded and undersupported](https://matrix.org/blog/2022/12/01/funding-matrix-via-the-matrix-org-foundation/), and alongside a reminder that most of the work on these important keystones of the Matrix ecosystem has been done by Element employees anyway. Unlike Mastodon, the centralization problem is exascerbated by all of Element and the Matrix ecosystem putting people onto Element, Synapse, and the one central server by default for ease of use.

For those in the back: this is why Mastodon putting Mastodon.social front and center is dangerous.

An additional danger is shown by the Matrix IRC gateway/portal/bridge breaking so bad that [Libera.chat told them to close the bridge](https://libera.chat/news/matrix-irc-bridge-updates) until it gets fixed (and [activity in the bridge repository](https://github.com/matrix-org/matrix-appservice-irc/commits/develop) stopped shortly thereafter). Meanwhile, Biboumi on XMPP continues to work just fine. I still think Libera.chat should consider opening up a Biboumi-based entry-point.

## Diversifying
I previously built a Matrix client, called [Tesseract](https://bleonard252.gitlab.io/tesseract/). In its current state it is vastly incomplete, and compatibility is beginning to fail. You can try it but I don't recommend using it anymore as it is not maintained and could, potentially, have gaping security and privacy holes, on top of it being far behind in features.

Recently, however, I've [started a new chat app](https://source.blakes.dev/me/spades-flutter), with a superior design, built on XMPP. This was a difficult choice mainly driven by the federation model being inherently better. Over time, though, I'm slowly learning that choosing XMPP over Matrix really was the right move after all.

On Matrix, the mass of users on Element and matrix.org means that if you deviate from whatever they're doing, whether it's specified or not, _you're_ the incompatible one. Since XMPP/Jabber doesn't have any such large entities (anymore), new implementations like my own have room to deviate and pick new paths forward, while remaining compatible -- or at least as compatible as anyone using Jabber would expect.

A big problem with Jabber is how small its userbase and community are. Chat, like social networking and microblogging, is a networked good: it's only useful if other people are using it. Some XMPP nerds have managed to force their friends and family to use the protocol. Most people, however, don't have much use for it. It doesn't help that the overwhelming majority of the chatrooms available at [search.jabber.network](https://search.jabber.network) are about XMPP itself: clients, servers, bots, and the like.

## Convergence
It is my hope that someday, maybe in a few years' time, one of two things will happen: either Matrix collapses and Jabber (or MIMI) grows the way the Fediverse has, or MIMI will be the key to breaking down the walls between Matrix and Jabber, and both protocols will be able to communicate almost natively.

This would put to rest the XMPP-and-Matrix gateways that are broken at the fault of Matrix's polluted federation, and I would not need nor want to create or maintain the on-device gateway my XMPP-based app may eventually support.

At least, it would be nice if Element collapsed and the People took its own reigns in that region.