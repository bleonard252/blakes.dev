---
layout: blog # TODO: use a blog post layout that shows similar blog posts
tags: posts
title: Personal notes about OSS maintenance - Blake Leonard
metaTitle: Personal notes about OSS maintenance
metaDescription: |
  A personal note, in response to the current discourse on OSS maintenance. I talk about just_audio_mpv and money.
---
<small><time datetime="2024-03-31">2024/03/31</time></small>

A personal note, in response to the current discourse on OSS maintenance:

There's one tiny OSS library I actually maintain, `just_audio_mpv`, a Flutter package to connect the also Flutter plugin `just_audio` to MPV via another package. The code I wrote is really just duct taped PVC pipes to connect the two, used to make the Linux version of Bodacious work. Someone else wrote a much better version and I definitely recommend switching to that one if you can, it should be mostly seamless[^1]. (I also am still technically on the dahliaOS team, but I haven't done anything there in a long time and I don't think I will anymore, either.)

It's by far the most popular thing I maintain, and I still have open issues that should be trivial if only I could get myself to do them. See, I have some long-standing mental health issues, and even before those I've had trouble sticking with any one project for more than a few weeks[^2] at at a time, rarely able to convince myself to go back to them. The package itself should not have to be updated[^3] too often since it's just glue between two packages, and assuming semantic versioning is followed on both, there should be no breakage.

As it turns out though, the glue is hacky and things don't work. So I've seen a few issues filed, a couple of them with total disregard for what kind of information qualifies for an issue. Some of them have been fixed, but most of them remain open because I can't get myself to fix them.

While I don't face the same level or kind of slander or abuse for my work, I feel it's underappreciated. As it turns out, the audience most likely to understand or appreciate the things I put out are also the kind of people who wouldn't use it, because they're terminal lovers, or they're using a different desktop environment, or they don't have an account on the particular platform it relies on.

At the same time, as my followers on the Fediverse might know, I don't think I like being popular or relied on. It's a lot of pressure that I'm definitely not used to, and definitely not prepared to withstand. In part, this is why I've been so keen to discontinue `just_audio_mpv` (I haven't yet, since I'd rather a more direct approach to Linux audio than MPV, which the other package still uses)! I don't want to deal with the pressure of having to maintain a package. Maybe this is the autism kicking in: I've always struggled with social situations, and this is no exception. Add on the pressure that someone is relying on me, and now I'm starting to fold.

From what I can tell, Lasse Collin, the maintainer of XZ, [faced this same kind of pressure](https://www.mail-archive.com/xz-devel@tukaani.org/msg00568.html), which was in part caused by and in greater part exploited by "Jia Tan" in service of adding the backdoor.

Open source maintenance would be significantly improved with more access to money. This may not have helped Lasse Collin, especially since there was already someone eager to take on the mantle, but I know that it would be helpful for so many open-source projects, that the few that have enough funding, like Mastodon, absolutely benefit from it, and that I personally would be much more incentivized to work on something I'm paid for, ESPECIALLY if I'm not trying to handle it all by myself (i.e. I can afford to hire help[^4]).

[^1]: The only change you should need to make would be, you might have to remove the `JAMPV_` custom log-mapping settings, but that's it.
[^2]: I suppose, apart from the "big thing" I made as a young boy, called PotatoWare. I can talk about that another time.
[^3]: although maybe it should be, if the `just_audio` plugin interface has changed since then, God I should really be keeping an eye on that...!
[^4]: I think I'd only try to hire a co-maintainer after I make sure I can take care of my own life, whether that be by funding of my open-source work, UBI, a day job, or maybe a combination. That would mean stuff like rent and food are taken care of at my house. I don't think my passion projects would ever qualify for THAT much money.
