---
layout: single # TODO: use a blog post layout that shows similar blog posts
tags: posts
title: Doing standards right - Blake Leonard
metaTitle: Doing standards right
metaDescription: This World Standards Day, let's work on making standards, and making them well. They should be small yet complete and they should be extensible out of the box.
---
# Doing standards right
<small><time datetime="2023-10-14">2023/10/14</time></small>

Today, the 14th of October, is World Standards Day. The [International Organization for Standardization (ISO)](https://www.iso.org/), [International Electrotechnical Commission (IEC)](https://www.iec.ch), and [International Telecommunication Union (ITU)](https://www.itu.int), collectively known as the World Standards Cooperation, and other organizations like the Standards Council of Canada, agreed on the date to commemorate the day in 1946 when the groundwork was laid for the formation of the ISO the following February.

For the record, the [American National Standards Institute](https://www.ansi.org) (ANSI) [seems to disagree](https://web.archive.org/web/20231012/https://www.ansi.org/events/standards-events/world-standards-day).

This year's World Standards Day comes at a time when standardization, particularly on the Internet, is more important than ever. The World Wide Web Consortium (W3C)'s ActivityPub specification has become a critical standard in the construction of the Social Web, more commonly known as the Fediverse. The European Union's Digital Markets Act is mandating interoperability, ostensibly by standards like ActivityPub, for certain large platforms. Meta's Instagram-tied microblogging service Threads is involved in all of this.

While standardization is crucial to the advancement of society, and we must not let perfect be the enemy of good, it's important that we get things right along the way, and continue to grow cooperatively and/or in friendly competition.

Most of the standards I'm aware of and all of the standards I'm concerned about in this post are Internet related, so if you're not interested in the minutiae of computer protocols and APIs or don't know the terminology, you might want to stop reading now.

## Core specifications
When writing a specification or defining a standard, it's important to both design it small and design it complete. A bare minimum implementation of a specification or standard should be fully compatible with more fully-featured implementations of the same standard.

Here's an example. A fully compliant ActivityPub implementation should be able to support everything another fully compliant implementation throws at it. One problem right now is that certain valid ActivityPub objects (and activities) are not recognized by some popular implementations. This manifests itself in situations like an array `type` field (important for extensibility, which we'll get to later) being unexpected and therefore dropped, unconventional structures breaking clients, and other problems I can't think of off the top of my head.

For ActivityPub, the fix is in two parts. Firstly, implementations need to actually fully implement the spec. To make that easier, the spec should codify the common structure. The latter part can be made even easier by throwing out "JSON-LD" compatibility, which is completely unsupported by most implementations anyway, but I think that could make the main specification larger as certain elements that rely on JSON-LD defining it may need to be redefined.

A related problem with the Extensible Messaging and Presence Protocol, XMPP or Jabber, is that the core specification is not the bare minimum anymore. Certain elements deserve to be merged into the main, complete specification, and [XEP-0030 Service Discovery](https://xmpp.org/extensions/xep-0030.html), [XEP-0045 Multi-User Chat](https://xmpp.org/extensions/xep-0045.html), [XEP-0198 Stream Management](https://xmpp.org/extensions/xep-0198.html), and [XEP-0313 Message Archive Management](https://xmpp.org/extensions/xep-0313.html) are among them.

Matrix has an opposite problem. Its core specification for client-server operations (which has an effect in client-to-client operations as well) is absurdly large, and a bunch of things that should be extensions are being written into the spec. Some Matrix Spec Changes (MSCs) that deserve to be in the core specification are [MSC-1767 Extensible Events](https://github.com/matrix-org/matrix-spec-proposals/pull/1767) and [MSC-2674 Event Relationships](https://github.com/matrix-org/matrix-spec-proposals/pull/2674). On the other hand, [MSC-3588 Encrypted Stories as Rooms](https://github.com/matrix-org/matrix-spec-proposals/pull/3588) and [MSC-1772 Matrix spaces](https://github.com/matrix-org/matrix-spec-proposals/pull/1772) should have been extensions instead.

## Extensions
Matrix doesn't have a standardized extensions framework. MSC-1767 had to be created to give a fallback mechanism. XMPP has [XEP-0428 Fallback Indicators](https://xmpp.org/extensions/xep-0428.html), also not a part of the core specification.

ActivityPub does this right. It has two extensibility fallback mechanisms: an extension types system that requires a spec type be used for fallback purposes, and a field on every Activity and Object that describes what it represents to clients that don't support a given type (extension or standard). The one thing it's missing is a standard process for extensions, which is the gap the [Fediverse Enhancement Proposals](https://codeberg.org/fediverse/feps) project aims to fill.

Extensions are crucial to a growing ecosystem, and extensions with a fallback mechanism provide a way for entities that don't (yet) know about an extension to handle it anyway. MSC-1767 should have been in the core spec to begin with, and ActivityPub should have a standard means of defining extensions. At least both of these are being worked on.

The last thing that's important for extensions and fallback frameworks is that they're actually used by implementations. XMPP is its own mess and I highly doubt half of the modern, maintained clients out there support XEP-0428. MSC-1767 support is coded in but thus far unused in major clients like Element. But ActivityPub's extension types mechanism, as it turns out, [may break certain services](https://social.coop/@smallcircles/111164451502269955) if you use it, dropping your message entirely, even if it's something the service could otherwise work with!

---

Standardization is important, and therefore the design of such standards are also important. Making sure there is plenty of room to grow mitigates the concerns of organizations like Signal. Keeping the core specification small yet complete means that new endeavors can get off the ground quickly and the ecosystem can grow. Other things that are important for standards are adoption -- which official sanction, such as by a recognized standards organization like ISO, W3C, or IETF, helps tremendously with, up-to-date documentation such as guides to make upgrading and implementing easier, and tooling such as SDKs for the same reason. Many standards have some of these, but the best standards account for all of these tenets: small yet complete core, extensibility and fallback, adoption, documentation, and tooling. This is how you make a standard you can't live without: like the World Wide Web itself!
