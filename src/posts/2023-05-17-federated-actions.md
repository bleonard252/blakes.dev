---
layout: blog
tags: posts
title: Thoughts on federated actions - Blake Leonard
metaTitle: Thoughts on federated actions
metaDescription: Considering Web Intents and a custom web+activity protocol handler to solve the Fediverse's second-biggest pain point.
---
# Thoughts on federated actions
<small><time datetime="2023-05-17">2023/05/17</time></small>

Earlier today I [tested an idea](https://replit.com/@bleonard252/DualHeaderRedirectTest?v=1) where using both an HTTP redirect's Location header and a Refresh header, one could potentially use the Location header as a primary destination to try and the Refresh header as a secondary destination. The idea is that this would solve the Fediverse's biggest pain point: cross-instance interactions.

Neither Firefox nor Chrome make any attempt to load the Refresh header's page in the background (or at all).

I attempted a method involving JavaScript and iframes, and it didn't work. On Firefox, it asked permission to follow the link, which is mildly inconvenient, but then skips opening it in the browser and tries opening it on the system anyway. I did not test this in Chrome.

## Web Intents
[Paul Kinlan](https://paul.kinlan.me/what-happened-to-web-intents/) worked on Web Intents at Chrome, which didn't last very long because it was overly Android oriented (and didn't work on Android). Maybe a different approach to the same idea could be of benefit.

A revived version of Web Intents could include:
* An async `navigator.registerIntentHandler` JavaScript API, which takes a type and a list of handled actions.
  * Can be called with the same type to replace its action list.
  * Type does not have to resolve or be on the same domain (unlike registerProtocolHandler)
  * Different behaviors should be accepted (i.e. popup, same-window, background action...).
  * An HTTP method to use can be selected, but the default should be POST (because that makes sense).
  * Resolves if success, rejects if it fails. Waits to be accepted in the browser.
* An async `navigator.invokeIntent` JavaScript API
  * Can specify a `fallbackUrl` to try if the intent isn't registered. Also great for polyfills!
  * Rejects if it isn't registered and the fallback isn't set, or if the intent has a network error or non-OK status code.
  * Throws right away if the fallback is specified and not a valid URI.
  * Security-wise, operates a lot like `window.open`, except you don't get access to the window.
* An `intent:` URI scheme to invoke intents for sites where JS is disabled (i.e. with the NoScript extension). When doing it this way, no data gets returned to the intent.
* An `intents` section in Web Manifest that allows for registering intent handlers alongside a PWA (or in non-JS desktop browsers somehow).

Other points that don't quite fit in a good spot above:
* Types and actions in the registration are separate. The type is required but no action has to be registered.
* An intent invocation with no action is only invoked against types that are registered, but don't have any actions listed.

## Web Follow
I noticed when writing this post that Kinlan also [wrote about a different way](https://paul.kinlan.me/thoughts-on-web-follow/) to use a custom protocol handler and a refresh header to accomplish this. I'll propose a wider approach based on that one:

```
web+activity://fosstodon.org/users/blake?activity=Follow
web+activity:?activity=Create&type=Note&content=Earlier%20today%20I%20tested%20an%20idea...
web+activity://fosstodon.org/users/blake/statuses/108346645545391550?activity=Announce
```

This is built upon ActivityPub to cause a server to prepare to perform a given Activity, with the rest going wherever makes sense (for most things, it's going to be `target`.) Ideally, it'll ask for confirmation before performing the action, in order to prevent forced follows.

Using the `Referer` header might help here to show what domain the request came from, so you can just click to act there from then on, using `204 No Content` as a confirmation.

The basic format is this.
* The scheme is `web+activity`, which is inspired by the Activity Streams/ActivityPub MIME type, `application/activity+json`.
* It uses // to resemble a URL, but it could be optional. It should always be assumed that the target object is behind HTTPS (with exceptions like `.onion` or `.i2p` domains or Localhost). This is totally omitted if there is no target object to act on.
* The canonical authority, host, port, and path for an object, identified by its `id` field, is used. In other words, the only things thrown out are the scheme, query string, and fragment, the latter two of which shouldn't be there to begin with. This is also left out if you aren't acting on an object.
* The `activity` parameter, which should only appear once, indicates the [Activity type](https://www.w3.org/TR/activitystreams-vocabulary/#activity-types) to use. Please capitalize it for consistency.
* If the `activity` is `Create` or something similar I don't know about (acting on an object that does not (yet) exist), the `type` parameter indicates what [Object or Link type](https://www.w3.org/TR/activitystreams-vocabulary/#object-types) should be created.
* Most additional parameters will become fields in the `target`. (I think technically `type` does this too.)

This version may be best done with JavaScript buttons and/or a popup-page follow link.

You may submit your thoughts to [this post on Fosstodon](https://fosstodon.org/@blake/110386903022196809).
