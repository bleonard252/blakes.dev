---
layout: blog
tags: posts
title: An update on my open source projects - Blake Leonard
metaTitle: An update on my open source projects
metaDescription: |
  It is with a heavy heart that today I announce that, effective immediately, I am withdrawing my contributions to the open source and free software commons. This was a difficult decision to make, but after recent developments, revelations, and some helpful deep thinking, this seems like the right way for me.
---
<small><time datetime="2024-04-28">2024/04/28</time></small>

It is with a heavy heart that today I announce that, effective immediately, I am withdrawing my contributions to the open source and free software commons. This was a difficult decision to make, but after recent developments, revelations, and some helpful deep thinking, this seems like the right way for me.

I owe you an explanation, and then I will detail what the consequences will be.

## Sustainability
One of the biggest drivers to this decision is that open source software is, by design, not sustainable, because it doesn't make money in a society where an increasing amount of money is necessary to live. More than just covering the expenses a given project may accrue, such as domains or server hosting, money covers the cost of living of the developers, and enough of it allows them to hire help they wouldn't otherwise have, such as community management or support staff.

If I were paid to work on the things I was already working on, say Spades, I would use that money to cover any project expenses first, then to compensate and invest in myself: getting a car, going to school, paying rent, eating, that sort of thing. If I had more money after that, and a need, I'd then consider bringing on some help, particularly for support (i.e. triaging issues) or another developer.

I need to invest in my own personal future. I need to move out of my parents' house, partly for my own sanity; we can't all fit under one roof, there's just too many of us. I can't do that if I spend all my time writing unprofitable software and playing video games.

## Culpability
This one's mostly a concern: the potential to be held socially, ethically, and/or morally responsible for someone's use of my software. The licenses I use typically include some clause that disclaims me from the legal responsibility of someone misusing my software, so that's not what I'm worried about. It's the social crucifixion; the flame and blame for writing something that someone used to do something awful. It's never my intent, obviously, but I don't have the foresight to build in mitigations in code, and the virtues (and social pressure about those) of open-source free software prevent me from taking legal action against misusers, even if I could afford a lawyer.

Apart from its inherent unsustainability, one of the biggest flaws of free/libre open source is that you are giving anyone and everyone the right to use and modify your work, even cops, even the military[^1], even Google or Microsoft or Donald Trump or Adolf Hitler. If you release even one version of your software under a FLOSS license, you've completely dissolved any legal recourse you may have had.

I don't think Eugen Rochko, creator of Mastodon, ever thought his software would be used to build the platform of hate and misinformation ironically called Truth Social. It's been used in far more far-right situations than any of us are aware of, too. He has no way to stop them from using it; all he was able to do was force them to release the modified Mastodon source code, which is only the backend of the site. (The frontend is based on Soapbox, which is similarly FLOSS licensed, and someone recently got them to release that, too.)

This adjacently reminds me of the XZ backdoor too: when it first came out, everyone, including GitHub, blamed Lasse Collin just as much as Jia Tan. It was only when they reconnected to the Internet that they realized what had happened and tried to do damage control. They're absolved of the blame now, but I can't imagine what kinds of hateful messages ended up in that poor Finn's inbox.

While any of my projects could be at risk of misuse, I think the biggest target would be Spades because it is social in nature. At its easiest, it could be used to host something like a chat equivalent to Truth Social. Once it has encryption, it would be trivial to use it to, say, coordinate a terrorist attack or a genocide, and I'd be held socially responsible for enabling it as soon as that information comes out. (I wish Matrix/Element's similar compliance in the Palestinian genocide, by sponsoring and literally hosting the government officials and maybe the military that is facilitating it, would come to light. That would be fun.)

## Responsibility
Accessibility, security, privacy, and safety should be the top priorities of every developer. For accessibility, someone (I don't remember who) once said that if a disabled person cannot use your app or website, it is not usable. Security and privacy are paramount to trust. And if your device or program's users are not protected when they are using your thing, be it from you, from hackers, or from spam or harassment, your thing is not worth using for these people or anyone who remotely cares about these people.

Over the years I've realized just how much a complete app or website actually needs, contrary to what ends up in most websites or apps, and I don't like the idea of releasing incomplete software; that's why most of my Git commits have been big hunks instead of proper micro-commits. Accessibility is a big one I've skimped out on over the years; I'm spending weeks just trying to get the things to work well for me, I don't see the ROI for spending more time, getting more burnt out, to add something in I can't properly make sure works.

There's also a moral responsibility to make sure that I'm doing everything I can to protect my users. The attention around consent and personal safety around Mastodon has made it a clearer thing to note for me, and it is something I strive to do. But when I'm trying to get posting to work right, how am I expected to add basic safety features like reporting or muting? However, a big well-maintained software like Mastodon doesn't have this excuse.

My crown jewel Spades is failing at this one, too. I know for a fact that the app is not very accessible; I've basically never touched the semantic widgets, and the new command palette is probably completely missing to screen reader users, which would lead to unexpected command executions. The only safety feature I have right now is blocking (although, that's probably the most widely-supported safety feature in XMPP in general).

Good code is also well tested. Unfortunately I never learned about how to properly write scripted tests, or what to test, and I really don't have the patience to go through every single thing and come up with every way it could break. I want to make things light up and do cool things. I know GlaDOS disagrees, but designing tests is a burden for me. So I'm woefully underqualified to be doing this to begin with.

## Personal health
I'm also facing some mental health challenges, including some kind of executive dysfunction, where I want to do something, I can be ready to do something (editor open, and already know what to do and how to do it), and just not be able to make myself do it. I'm not sure why that happens or what I could ever do about it. It's been there as long as I can remember and it's been so much worse in the last couple years. Again, I need money for a doctor to even figure out if it is medical; maybe I'm just in eternal burnout or something and there's jack shit I can do.

## Diversity; or, White American Techbro-ism
If there's one thing the tech world, and the world in general, doesn't need, it's more people like me: "privileged," cisgender, heterosexual[^2], white American men. I end up in the tech-bro category because I have a technical interest in things like Bluesky and Nostr or AI or blockchain, or because I don't see the same boogeyman as everyone else does in Threads. I don't think that any of these are good things, by the way. For Threads, my view is that since I am not in any great danger of harassment from Threads users, I'm in a position to help encourage people to join the wider Fediverse, and I stand to minor benefit since I can follow some people who are not (yet) on a smaller instance, like Joe Biden or the Green brothers. "AI" has its potential, although generative AI is at best a party trick. And while blockchain tech is cool and had the potential to solve digital money, they decided to become a shining example of why financial regulations are necessary.

You may disagree with me, and I think you're right to do so. These things are a result of my identity, particularly that I'm not oppressed and I just don't see or experience the same risks that people of color, transgender people, gay people, women, or people with disabilities do. My perspective is the same as the prevalent perspectives in every industry. My voice is the one that doesn't need to be heard, really the one that needs to shut the hell up, because the world needs more Black, trans, gay, feminine, and Disabled perspectives. Tech in particular also needs more non-American representation, too.

So, part of this decision is shutting the hell up and leaving room for someone else to speak.

I was reminded of this because of Mastodon's recent decision to start an American non-profit, where they also said they still wanted to be Europe-based because there are no real European social options other than Mastodon; they have American social media, TikTok, and maybe some mainland Chinese or Indian socials too. The Americentrism and anglocentrism of tech is also something that was discussed during that Fosstodon drama some time back, and was a minor motivation behind me leaving that server.

## The consequences
All things considered, the following will be in effect:
* Many of the repositories under the `bleonard252` namespaces on GitHub, GitLab, and Codeberg have been privatized and archived.
* My personal Forgejo instance at `source.blakes.dev` is no longer publicly accessible.
* Source code, built artifacts such as binaries, and the issue trackers for most of the repositories are no longer generally available.
* Persuant to relevant licenses, if you have the built binary for any of these, you are entitled to the source code. Send me an email to `oss AT blakes DOT dev` and ask for the source code, and it will be provided to you. To prevent unauthorized or unnecessary access, I will not send the source code to you if you cannot prove you have the built artifact; I will accept the artifact itself, attached to the email, or (a set of) SHA hashes (such as the output of `sha256sum *` in the root of a bundle, or `sha256sum filename` if there is only one file).
* `just_audio_mpv`, a hacky library I wrote to connect `just_audio` to `mpv` so that Bodacious could run on Linux, is now completely deprecated and end-of-life. Please use `just_audio_media_kit` instead, it's far better made and far better supported. The source will continue to be available so that I don't accidentally break someone's app.
* Nimbus has been taken off the Internet. Nimbus was a proof-of-concept for forums built on Matrix, but now I think that forums are best suited to run on forum software, especially if that software implements ActivityPub. Plus, I don't want to encourage the use of Matrix, given the critical flaws it has that make it unreasonably expensive to self host.
* LucidLog and Bodacious are already on the Play Store and I don't think they will be removed. The sources may still be available on GitHub or Codeberg, but if they aren't, you can email me and I'll just give it to you, no questions asked.
  * These apps may disappear off of F-Droid and IzzyOnDroid because the source code is no longer available. From now on, the recommended way to get LucidLog is Google Play, and I do not recommend installing Bodacious because it is incomplete.
* Bodacious is in hibernation. I think the next thing to do for it would be switching to JAMK, but I don't think I'll get around to it any time soon.
* I've already said this, I think, but just to make it clear, the ActivityPub-based chat service I had started to build, Babilejo, is officially dead. End-to-end encryption is essential for any chat app in 2024, and an essential security and privacy tool, which I would never have been able to provide in Babilejo, since there is not yet any ActivityPub implementation of end-to-end encrypted messaging. Its spiritual successor is Spades.
* I'm quite passionate about Spades and I think I will continue to develop it. However, I may release it as proprietary, potentially paid, software if the licenses of my dependencies allow, or otherwise I will keep it to myself and never release it publicly.
* My plugin for the Decky loader, Bookmarks, will probably remain available, because otherwise it would disappear from the store. It's not a terribly useful plugin anymore, now that someone developed a more complete browser plugin. I might end up pulling it if supporting it gets too much to handle.
* I have kept most of my personal dahliaOS-related repositories available, for historical sake.
* I am finally officially stepping down from the dahliaOS team, relinquishing my powers and responsibilities. Maybe someday I shall return.

## Conclusion
The burdens of open source maintenance have grown to be too much to bear. I've loved programming for as long as I've done it, but the responsibilities are too great and now I believe that my code is best kept to myself. If you have any questions, concerns, or feedback, feel free to email me at oss AT blakes.dev.

I sincerely apologize for any inconvenience this may have caused.

[^1]: okay let's be honest, the military/government can do whatever the hell they want and nobody can stop them. so it's not like this would matter anyway
[^2]: Well actually I'm heteroromantic asexual or demisexual but that's no different in this context.
