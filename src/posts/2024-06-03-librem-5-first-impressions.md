---
layout: blog
tags: posts
title: Librem 5 First Impressions - Blake Leonard
metaTitle: Librem 5 First Impressions
metaDescription: |
  I just received the Librem 5, a Linux phone with hardware killswitches made by Purism. It's a solid phone, somewhat thick, but definitely well designed and well built. Unlike many conventional smartphones, it runs on a Linux distribution built for phones, a variant of PureOS, which is itself built on Ubuntu and PostmarketOS (which makes Linux available for phones). This latter quality is what interests me most as a Linux user and developer, and as a long-time Android user.
---
<small><time datetime="2024-06-03">2024/06/03</time></small>

I just received the [Librem 5](https://puri.sm/products/librem-5/), a Linux phone with hardware killswitches (mobile, wifi/bluetooth, and microphone/camera) made by Purism SBC, from a seller on Mastodon. It's a solid phone, somewhat thick, but definitely well designed and well built. Unlike many conventional smartphones, it runs on a Linux distribution built for phones, a variant of PureOS, which is itself built on Ubuntu and PostmarketOS (which makes Linux available for phones). This latter quality is what interests me most as a Linux user and developer, and as a long-time Android user.

The phone has some noticeable weight to it, particularly compared to the phones I've had before. It's also about double the thickness of a regular modern smartphone, too. It has USB-C (great!), cellular (I'm not sure what generation it supports but, if I had to guess, it's probably up to 4G LTE), WiFi, Bluetooth, and really everything else. It even has a headphone jack (it came with wired earbuds, which is pretty cool but I'm never going to use them).

It does not have an OLED screen, which is noticeable in the dark. The processor feels like it was mid-range in 2010. The flashlight has a very warm color.

![A screenshot of the phone's user interface, which has a top bar consisting of WiFi and Bluetooth icons, the time, and the battery, below which is the empty overview mode, which contains a search bar, a group of favorited apps, and a grid of the installed apps on the system.](https://f005.backblazeb2.com/file/bleon-zip-uploads/2024-06-03-librem-5-first-impressions/10116d3e-cf31-440e-b5ca-5aa637e51c03_0a08403094378eff8e9e602b285a3069d8f112f1.png)

The "shell" that comes on it out of the box, Phosh or Phone Shell, is a little strange to navigate, but a part of me actually likes it. It's based on the GNOME shell for desktop, so a lot of the UI looks and feels like GNOME. You have to swipe a significant distance (a flick should do the trick!) to open the notification drawer or the overview drawer. The notification drawer is a bit bare-bones. Unlike Android but much like GNOME, there's very little customization you can do to it. Unlike both vanilla GNOME and Android, it doesn't have a Settings shortcut in Quick Settings, and also unlike GNOME, it's a drag gesture instead of a tap. There's also no back button or back gesture, which is extremely disorienting. Also there's no concept of a "home screen", so you have either the Overview forced open or an app.

![A screenshot of the system UI again, this time in the regular overview mode with one app open. There is a down arrow above this app to indicate that you swipe down to close the panel.](https://f005.backblazeb2.com/file/bleon-zip-uploads/2024-06-03-librem-5-first-impressions/28df675e-ffe9-48aa-af4c-560a9b4f256b_513644993c07bfdc6ee801ad559ee90e467219d3.png)

The Phosh overview drawer shows a classic overview of your apps, in a scrolling horizontal list. Below this, you also have your favorite (pinned) apps, then a list of all your apps. By default, this list is filtered to mobile-friendly apps (I'm not sure how it knows), but you can see all your installed apps with the "Show all apps" button.

In my opinion, Phosh needs three things: flick-to-open for both drawers, a back button (bound to Escape by default, but changeable per app, i.e. to Alt+Left), and long-press functionality on the overview open apps list (to apply the compositor resize override, for example).

Chatty, or Chats, the messenger that comes with it, supports XMPP (and Matrix), which is nice, although it has pretty much no utilities to handle, for example, encryption. I guess I can't criticize too much since Spades, my XMPP client, doesn't have encryption yet either. I haven't tested its SMS/MMS facilities because I'm not putting a real SIM card in it (I don't plan on using it as a daily driver). It also doesn't support RCS and probably won't for a long time, so I wouldn't be able to switch to it even temporarily, since I'd start losing messages (mostly from my brother). It looks like XMPP and Matrix are supported via libpurple; it might be possible to add things like Signal and Telegram directly to it, although they'd have the same poor level of support as XMPP (and Matrix).

![A screenshot of the Chat app, opened to a conversation with blake at federation dot quest. Half of the messages are purple system messages about failed decryptions.](https://f005.backblazeb2.com/file/bleon-zip-uploads/2024-06-03-librem-5-first-impressions/7967ef87-8977-4f0b-8be6-4fc2ca27020f_4afac75e582dc1d5c91f738205a4a674d891adb9.png)

Epiphany, better known as GNOME Web, also comes pre-installed. Firefox is clearly not built for mobile use: the entire top bar is super cramped and pop-up boxes are pushed off the screen. YouTube videos play at maybe 5 FPS and the built in speakers are pretty muffled and awful sounding.

I tried using the Gemini client Lagrange on it, but it is entirely shoved off the side of the screen. It also doesn't support touch-screen gestures at all, on the Linux/Flathub version. Basically, it's completely unusable, even though it should be trivial to add mobile support (I don't know enough C to do that myself, unfortunately).

![A screenshot of Lagrange, open to its about help page. The browser chrome at the bottom and the page itself are cut off.](https://f005.backblazeb2.com/file/bleon-zip-uploads/2024-06-03-librem-5-first-impressions/10116d3e-cf31-440e-b5ca-5aa637e51c03_0a08403094378eff8e9e602b285a3069d8f112f1.png)

The Files app (Nautilus) also doesn't support long-press to open menus. As soon as you let up, the menu closes, meaning you can't click any menu items.

The Maps app, which is an official GNOME app, feels really weird to use on a mobile device. The actual map area is blurry for some reason. This was the motivation behind my (still very early) app Squirrel Maps.

The camera is pretty good, actually, although pictures come out grainier and the built-in camera app appears to be a developer preview and that really shows. I took a picture of one of my cats with it, and when I tried it later, the rear camera was totally inaccessible. Maybe it didn't like that I had, at one point, disconnected the camera with the kill switch.

----------

I got this device both as a toy (because I've never used the Linux mobile offerings before) and as a development device. There's definitely a lot of development to do with this device, starting with its basic smartphone abilities, such as WEA (Wireless Emergency Alerts) and RCS, and going all the way to quality-of-life improvements like, maybe, a new store app and UnifiedPush.

I also intend(ed) to develop Spades against this device, too, to make sure it works well on both it and my normal Android phone.

Linux mobile is not yet in a place where you could or should use it as your main phone, and especially not at this price point. I'm not sure why any developer would buy this, either; you'd be way better off going with a Pinephone if you want to develop for Linux mobile.

Apart from the noticeably slow processor, it's a pretty well made low-to-mid-range phone overall, although the software is far behind Android and iOS, even in its "basic" features like RCS, WEA, and the camera. The hardware switches are great if you're paranoid or wanted by any three-letter agency, but at that price point you'd be better off going to therapy or turning yourself in. I'm going to keep it as a development device, but it's far from ready to be used as a phone.
