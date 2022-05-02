import shtml from 'sanitize-html';

export const attributes = {
  ...shtml.defaults.allowedAttributes,
  // span: [
  //   {
  //     name: 'class',
  //     multiple: true,
  //     values: ['hashtag',mention invisible']
  //   }
  // ]
};
export const tags = [
  ...shtml.defaults.allowedTags,
  "span"
];
export const classes = {
  "span": ["hashtag", "mention", "invisible"]
}