const shortcode = /(\:[a-zA-Z0-9_-]+\:)/g;

export default function applyShortcodes(text: string, emojis: Record<string, any>[]) {
  let output = text;
  for (const emoji of emojis) {
    for (const instance of text.matchAll(shortcode)) {
      if (instance[1] == ':'+emoji.shortcode+':') {
        output = output.replace(instance[1], `<img src="${emoji.url}" class="inline-block w-5 h-5" title="${emoji.shortcode}" />`);
      }
    }
  }
  return output;
}