import shtml from 'sanitize-html';

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
export const tags = [
  ...shtml.defaults.allowedTags,
  "span", "img"
];
export const classes = {
  "span": ["hashtag", "mention", "invisible"]
}