---
layout: blog
tags: posts
title: Even More Thoughts on XMPP and Matrix - Blake Leonard
metaTitle: Even More Thoughts on XMPP and Matrix
metaDescription: The whole XMPP vs Matrix thing really takes its toll on me. I see the problems with Matrix and its implementations, and I see the benefits of XMPP and its implementations. It's just that, in my position, it's two hells and a half to try to make anything.
---
# Even More Thoughts on XMPP and Matrix
<small><time datetime="2023-03-02">2023/03/02</time>
<br />This was originally a [Fosstodon thread](https://fosstodon.org/@blake/109956441080739119), and is a follow-up to [this write.as post](https://write.as/yq7w4n7mfvmr6.md) and a post on Misintelligence, entitled "[I want to love XMPP. Here's why I can't](http://misintelligence.xyz/want-to-love-xmpp/)." The post below was manually imported from Blake's Devlog, which was on Hashnode.</small>

The whole [XMPP](https://fosstodon.org/tags/xmpp) versus [Matrix](https://fosstodon.org/tags/matrix) thing (as a client developer with limited patience, it truly is a "versus", since I can only work on one lol) really takes its toll on me. Like yes, I see the problems with Matrix and its implementations, and I see the benefits of XMPP and its implementations. It's just that, in my position, it's two hells and a half to try to make anything. What the fuck is SASL? Is that still the recommended way to log in? Do I have to summon Satan and then sacrifice a goat?

It's a lot more down and dirty with XMPP since, among other things, there are a lot of server things to support: different ways of accessing it (i.e. BOSH), different types of security (i.e. `:443` TLS vs STARTTLS), different authentication schemes (i.e. SASL2)... That's before you have to figure out what kind of other things the server supports (i.e. MUCs or MAM) and end-to-end encryption, which even [Tesseract](https://gitlab.com/bleonard252/tesseract)[^1] didn't have, and there are at least 3 ways to do it within XMPP.

The ecosystem for XMPP is really dry. Like sure, there's a XEP for everything, but there's no indication of where or if anything is actually implemented, even in some example fork. A lot of features take years to implement since clients have to wait on servers to implement something before they can use it.

I'm in an MUC for the development of a Flutter-based XMPP client (Moxxy) whose codebase I do not understand in the slightest. The code is pretty repetitive and all over the place. It's really surprising how much boilerplate code this guy is putting into this thing for it to have the most basic features working: sending and receiving DMs, as basic messages and images, and with OMEMO 2 for E2EE, which nothing but Moxxy supports. MUCs, even Moxxy's own(!), aren't supported yet. There's someone who wants to start working on it (as do I, but again, I don't understand one line of the codebase).

I've considered forking Moxxy to look like the Spades design-in-code I have, and adding features to both Moxxy and Spades, but once again, I have no idea how the code works or where anything is.

The bridges ecosystem is rather dry, unless you're a sysadmin (which is about 99% of the people using XMPP). There's one okay public gateway and it has two public instances (one of which is way behind the other), and there appear to be no public Biboumi (IRC) gateways.

Even if it's a really active area, it's not really vibrant and on first glance looks like it hasn't been touched for years, no matter what you look at. Every single client and xmpp.org look ancient, because they're built for the most conservative techies out there who were really into tech in the 80s and are now too old to mentally accept change.

(I do recognize that the one XMPP client for Android worth anyone's time, Conversations, is getting a complete facelift. I'm excited to see what that looks like, and how that's going to affect its many forks.)

Matrix does a few things right that XMPP does not (and likely can not):

* **Marketing and PR.** They do have a pretty substantial financial backing from Element/EMS and some European government agencies, I think, so they seem to be able to fund a PR/social team. They have just-frequent-enough updates about "flagship" products[^2] on their [blog](https://matrix.org/blog), and about the wider ecosystem in general, so you can see just how active it is in one place. "This Week in Matrix" is really great because it shows you projects big and small[^3], clients, servers, bridges, probably a bot at least once, and fun toys like Third Room. It shows these updates on a weekly basis as they come out, and shows you just how big the community is and just how many choices are available to you. I think with the advent of Mastodon there's a great opportunity here for grassroots advertising for XMPP to "fix" this point.
    
* **Rooms as a first-class mechanism.** It does make DMs a little more clunky (since you could have several DM-like rooms with any given user), but everything else works so much better. MUCs have to be strapped on and it's an entire spec of its own, rather than an integral part of the system.
    
* **Implementations are required for acceptance.** While I do think committing every extension to the main spec is an awful, terrible idea, this is already done better than XMPP where it'll sit in Experimental forever without exception, making servers and clients not feel comfortable implementing it, unless every server and client on the face of the earth implements it, at which point it'll be *considered* for promotion.
    
* **It uses HTTPS and JSON.** These are modern technologies that everyone who has written a networking program in the last century knows how to use. It makes the ecosystem really easy to approach. JSON even has a battle-tested binary format MsgPack, although no Matrix servers use it at the moment. XML on the other hand has a few attempts at it, although the best you can probably do is gzip it, which many HTTPS clients can do, and XMPP can do too, I think.
    
* **It's well documented with code examples.** You'd be hard pressed to even find an SDK for it, and a code example without one couldn't reasonably fit on a web page.
    
* I keep thinking of more but it's not fair to XMPP to keep listing them.
    

I absolutely have to trash on Matrix too, so here is a list in the reverse; things XMPP does right that Matrix never will, from someone who hasn't actually used it very much at all and probably will get half of these wrong:

* **Way more efficient.** I have no idea how or why this works but this is a common reason people (want to) use XMPP instead of Matrix. I think a huge part of this has to do with Matrix's obsession with maintaining the DAG.
    
* **Its addresses make sense.** What the fuck is `:` doing in Matrix addresses? `@` means "at", it tells you (and your server) where someone or something is. The # Matrix uses for its rooms is definitely better than arbitrarily defining a subdomain for your multi-user chats, although I think this is technically possible with XMPP MUCs and maybe MIX chats.
    
* **Gateways at the user level**, complete with authentication and asking users for the screen name of the other users. This is very sparsely supported but it's there, and where it exists, it works well. I just wish more gateways (Bifrost) and clients (Conversations?) supported this.
    
* **The use of XML.** It does basically what Matrix's new Extensible Events do, but Jabber has done this since the beginning of time itself. The data model of XML is vastly superior, especially in the use cases of these two protocols, although it is maybe too verbose (`<namespace:verylongtagname attribute=name>somevaluehere</namespace:verylongtagname>`).
    
* **Extensions kept seperate.** Some things, like MUCs, probably should be folded into a main spec. The closest XMPP has to a living main spec is XEPs marked Stable or Active. Other XEPs, like reactions, rich replies, location sharing, and calendar events, are best kept separate.
    

I think a good marketing push from the XMPP Foundation would be wise, although the window is fading fast as the refugee Mastodonians who have a newfound appreciation for federated tech are way more likely to see Matrix over XMPP, and more likely to find the former useful, especially given Mozilla and KDE have Matrix homeservers (I have an account [`@blake:kde.org`](https://matrix.to/#/@blake:kde.org)!). XMPP was never built for group conversations; many stick to IRC for that, although IRC sucks for many other reasons.

* **IRC has no history.** Maybe this is something that some servers and one client out there have now. History is pretty important when you log off or lose connection and want to catch up with what you've missed out on, or for people to get your attention (especially as a mod) about a problem user in the room.
    
* **IRC is not extensible.** I'm sure this is by design but the way IRC was in 1990 is the way it is now and the way it'll be forever. Sure, there's IRCv3, but none of the glaring shortcomings of IRC that every proprietary platform out there set out to fix have been solved. Ooh look, there's avatars now, but you won't know because there's not one client that has it by default, and probably no more than one client that supports it at all.
    
* **IRC exposes your IP address.** Maybe this was less of a concern in IRC's heyday when some ISPs acted as a gateway, but now the entire world knows Mike Shinoda connected to a Linkin Park IRC channel from a California Road Runner ISP. That's not as much of a risk as it is shameful, although if there isn't an ISP gateway masking your IP, you're connecting as basically your zip code. If someone knows your name or what your house looks like, that zip code is enough to find you.
    
* **IRC lacks modern chat features.** No reactions, no typing indicators (although frankly that's really only useful in small groups or DMs, or for moderators).
    
* **IRC also doesn't use ubiquitous technology.** Granted, it has way more implementations than XMPP does, as SDKs, clients, and servers. Everything.
    
* **IRC doesn't federate.** (Maybe IRCv3 does this, I'm not sure.) The best modern comparison I can make would be Slack. You have to log in separately for every server you connect to, and you have to connect to them all individually.
    

I think IRC does still have a place, though. With the right setup, users of federated protocols could easily join IRC rooms. Libera.chat does this with Matrix, although it wouldn't be difficult to set up a public Biboumi instance tied to Libera.chat too (and I think they should someday, at least as a trial). This could lead to a Slack or Discord like use-case when done right; for example, a project-oriented IRC server with many channels tied to that project could have a Matrix space that makes that server behave more like a Discord server for Matrix users. I can't think of an equivalent thing for XMPP although XEP-0030 Service Discovery appears to be capable of advertising public channels (and I think Biboumi does this, actually).

All that being said, because of the data model and performance benefits, I'd love to help build a modern client like Moxxy and bring more people to the XMPP side. It's just a pain in the ass to develop for and it leads me to either go back to Matrix or give up entirely.

Right now I'm probably just going to give up and go work on my website or something.

---

Comments and suggestions are welcome on [this Fediverse post](https://fosstodon.org/@blake/109956984291905673), or directly to me at XMPP [`blake@federation.quest`](http://xmpp:blake@federation.quest), Matrix [`@blake:kde.org`](https://matrix.to/#/@blake:kde.org), email [`me@blakes.dev`](http://mailto:me@blakes.dev), or via Mastodon DMs [`@blake@fosstodon.org`](https://fosstodon.org/@blake).

Footnotes:

[^1]: a kinda-clunky Flutter-based Matrix client I made, which was officially declared an abandoned project a few months ago.

[^2]: Element and Synapse. For XMPP, the equivalents would likely be Conversations and Prosody/ejabberd.

[^3]: no, Tesseract never made it onto TWIM, although if I kept working on it, I would have asked about it.
