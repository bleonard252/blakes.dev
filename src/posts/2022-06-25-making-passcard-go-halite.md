---
layout: blog
tags: posts
title: "The Making of Passcard: Go and Halite - Blake Leonard"
metaTitle: "The Making of Passcard: Go and Halite"
metaDescription: The motivation for Passcard and Halite, as well as my thoughts on my first (serious, progressing) project in Go.
---
# The Making of Passcard: Go and Halite
<small><time datetime="2023-05-17">2022/06/25</time>
<br />This post was manually imported from Blake's Devlog, which was on Hashnode.</small>

This is *The Making of Passcard*, a new short blog series where I talk about Passcard, Halite, and the wider environments these two projects fit into. Today I'll be sharing the motivation for Passcard and Halite, as well as my thoughts on my first (serious, progressing) project in Go.

---

# Why Passcard?

Basically, I really liked the idea behind [Keyoxide](https://keyoxide.org) (and the actual standard it uses, [Ariadne](https://ariadne.id)) and thought, well if you can securely and surely prove your identity that way, why can't you log in to websites like that? And so the basic idea for Passcard was born.

Passcard's modern idea stretches a little beyond that, though. Similar to Metamask, it'll be centered around an interruptive pop-up system that asks you to (pick which identity you want to use and) approve some permissions or allow access to some value. It'll be nice and user-friendly-- well, as nice and user-friendly as an interruptive pop-up can get. It'll also be highly configurable, and as secure as I can figure out how to make it. Of course, full disclaimer here, **I'm not a security expert**, so I'm relying heavily on the security of the technologies I'm building on top of.

The first component of the Passcard system I decided to build was the agent, which of course doubles as a command-line interface by which one could manage their Passcard information and their keys. Between Rust and Go, for this I picked Go simply because I wanted to try it out. I encountered a roadblock pretty quickly though: OpenPGP, which I had been planning to use for the project, has been pretty much deprecated, and so I did some research (and some stuff off of memory) and came across Saltpack, Ed25519, and NaCl (the latter two of which the former uses). This is when I devised making a container format that supported annotations. I spent a day or two brainstorming for names, passing through stuff like Salt Shaker and Salt Crystal (you see the theme I was trying to keep here) and landed on Halite, the crystal form of table salt. Fortunately, there were no Go packages by that name, so that name was mine for the taking. You can now find it on Gopkg and `go get` via [`codeberg.org/bleonard252/passcard-cli/halite`](https://pkg.go.dev/codeberg.org/bleonard252/passcard-cli/halite).

Now I've created a new stack, and the Passcard CLI is now the only tool available that can manage Halite keys. The web-based UI for Passcard hasn't been started yet, although it's going to interface with the Passcard CLI binary somehow. I can probably use Protocol Buffers for it though, since unlike Halite, it'll ONLY interface with itself.

# The state of Halite

Halite is intended to be a cross platform EdX25519 key format. This EdX25519 is not the same as [Keys.pub's version](https://www.keys.pub/docs/specs/keys.html#edx25519), which is an Ed25519 key converted. Halite's version involves two separate keys (four, if you count the public versions separately): one Ed25519 signing key, and one X25519 encryption key. I figured out that the public key is literally just the second half of the private key (at least for Ed25519), so when I built the private key container I had it store only the private keys, because the public keys came with them.

The private key format looks a little like the following (before it's encoded into [msgpack](https://msgpack.org)):

```plaintext
[
  "EdX25519",              // Algorithm
  "Halite.1",              // Brand and version
  {...},                   // Public annotations
  {...},                   // Private annotations
  [32, 41, 102, 9, 73...], // Private Ed25519 signing key (in msgpack's "binary" format)
  [29, 18, 47, 88, 230...] // Private X25519 encryption key (in msgpack's "binary" format)
]
```

# Thoughts on Go

Since I started using Go for this project, I've picked up on a few things that are different from other languages I'm familiar with, like Dart, JavaScript (TypeScript), Python, and Rust, including:

**Variables don't *have* to be declared with** `var` or equivalent. They do have to be declared, in which case the `var name type` syntax does work, but if I want to declare with a value, I have to do `name := value`.

**There's no throw/catch system.** Instead, Go lets you return multiple values, the last of which is typically an `error`, which is a nullable (nilable?) value. You could also just *panic* but that brings everything to a halt, so it should be used sparingly.

`nil`.

**I don't have to** `include()` every damn command file I want to use, or use any sketchy `require()` systems. I imagine this is REALLY AWESOME for Discord bots, just as it is for CLIs.

**Go doesn't have enums.** I learned the alternative for this involves something cool Go has, custom primitive-based types. Yeah, I can define a type for a "slice" (a non-fixed-size list) of any given type and define methods on that custom type.

**Go doesn't have classes.** Instead you use `struct`s, which are sorta like TypeScript interfaces. Oh, also Go has interfaces, but they work with those custom primitive-based types, and it also uses "the duck test": if it looks like a `Duck`, if you can call `quack()` on it like a `Duck`, then it's a `Duck`. It's really awesome, if you ask me.

# Next Steps

The next thing I plan to do is add basic cryptography commands to the Passcard CLI, such as encrypt, decrypt, sign, and verify. After that, I can probably add a command or so relating to annotations, and begin work on the *real* Passcard: the web extension.

***Later addition:*** I eventually decided to take the Passcard and Halite project in a different direction but its development is not a priority at this time. In the meantime, **please DO NOT** use Passcard or Halite for any serious usage; it has critical security flaws.
