import { html, h } from "htm/preact";

export default function dangerouslyWriteHTML(input): h.JSX.Element {
  //return eval('const {html} = require("htm/preact"); html`'+JSON.stringify(html.replace('`','\\`')).slice(1,-1)+'`');
  const inputArray = [input];
  Object.defineProperty(inputArray, 'raw', { value: [input] });
  return html(inputArray as unknown as TemplateStringsArray);
}