import DOMPurify from 'isomorphic-dompurify';
import shtml from 'sanitize-html';

/** @deprecated */
export const attributes = {
  ...shtml.defaults.allowedAttributes,
  img: [
    {
      name: 'class',
      values: ['inline-block w-5 h-5']
    },
    "src",
    "title"
  ]
  // span: [
  //   {
  //     name: 'class',
  //     multiple: true,
  //     values: ['hashtag',mention invisible']
  //   }
  // ]
};
/** @deprecated */
export const tags = [
  ...shtml.defaults.allowedTags,
  "span", "img"
];
/** @deprecated */
export const classes = {
  "span": ["hashtag", "mention", "invisible"]
}

// add the ALLOWED_CLASSES config option to DOMPurify
declare module 'dompurify' {
  interface Config {
    ALLOWED_CLASSES?: Record<string, string[]>;
    CLASS_PREFIX?: string;
  }
}

DOMPurify.addHook('uponSanitizeAttribute', (node, data, config) => {
  if (data.attrName == 'class' && data.attrValue && config.ALLOWED_CLASSES && config.ALLOWED_CLASSES[node.tagName.toLowerCase()]) {
    const attrClasses = data.attrValue.split(' ');
    const newClasses = attrClasses.filter(c => classes[node.tagName.toLowerCase()]?.includes(c) ?? false);
    data.attrValue = newClasses.join(' ');
  }
  if (data.attrName == 'class' && data.attrValue && config.CLASS_PREFIX) {
    const attrClasses = data.attrValue.split(' ');
    const newClasses = attrClasses.map(c => config.CLASS_PREFIX + c);
    data.attrValue = newClasses.join(' ');
  }
});

export function dompurifyBody(dirty: string | Node): string {
  return DOMPurify.sanitize(dirty, {
    FORBID_TAGS: ['style', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    FORBID_ATTR: ['style'],
    ADD_TAGS: ['p', 'span', 'img', 'br'],
    ADD_ATTR: ['rel', 'class'],
    ALLOWED_CLASSES: {'span': ['hashtag', 'mention', 'invisible']},
    KEEP_CONTENT: true,
    RETURN_TRUSTED_TYPE: false,
  });
}
export function dompurifyHeader(dirty: string | Node): string {
  return DOMPurify.sanitize(dirty, {
    FORBID_TAGS: ['style', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'br'],
    FORBID_ATTR: ['style'],
    ADD_ATTR: ['rel', 'class'],
    KEEP_CONTENT: true,
    RETURN_TRUSTED_TYPE: false,
  });
}