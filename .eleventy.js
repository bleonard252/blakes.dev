const mdxPlugin = require("@jamshop/eleventy-plugin-mdx");
const preactRender = require('preact-render-to-string');
const webcPlugin = require("@11ty/eleventy-plugin-webc");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function eleventy(config) {
  config.addPassthroughCopy({'static': '/'});
  // config.addPassthroughCopy({'node_modules/@11ty/is-land/is-land.js': '/scripts/vendor/is-land.js'});
  config.addPassthroughCopy({'node_modules/iconify-icon/dist/iconify-icon.min.js': '/scripts/vendor/iconify-icon.js'});
  config.setUseGitIgnore(false);
  config.addPlugin(mdxPlugin);
  config.addPlugin(webcPlugin, {
    components: [
      "~/src/_includes/components/blakes-*.webc",
      "npm:@11ty/is-land/*.webc"
    ]
  });
  config.addPlugin(EleventyRenderPlugin);

  config.addExtension([ "11ty.jsx", "11ty.ts", "11ty.tsx" ], {
    key: "11ty.js",
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: "_includes",
      layouts: "_includes",
    },
  };
};