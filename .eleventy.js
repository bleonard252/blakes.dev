const webcPlugin = require("@11ty/eleventy-plugin-webc");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

module.exports = function eleventy(config) {
  config.addPassthroughCopy({'static': '/'});
  config.addPassthroughCopy({'node_modules/@11ty/is-land/is-land.js': '/scripts/vendor/is-land.js'});
  config.addPassthroughCopy({'node_modules/iconify-icon/dist/iconify-icon.min.js': '/scripts/vendor/iconify-icon.js'});
  config.setUseGitIgnore(false);
  config.watchIgnores.add("src/_includes/styles/theme/*.yaml"); // this doesn't update anything unless you run `pnpm build:themes`
  //config.addPlugin(mdxPlugin);
  config.addPlugin(webcPlugin, {
    components: "src/_includes/components/{blakes-,**/blakes-,theme-switcher/,wrapped/}*.webc",
  });
  config.addPlugin(EleventyRenderPlugin);
  config.addPlugin(EleventyVitePlugin, {
    tempFolderName: ".11ty-vite",
    viteOptions: {
      publicDir: "../static",
      appType: 'mpa',
      build: {
        outDir: "vite-dist",
        copyPublicDir: true,
        rollupOptions: {
          output: {
            //preserveModules: true,
            // assetFileNames({ name }) {
            //   return name?.replace(/^src\//, '') ?? '';
            // }
          },
          preserveEntrySignatures: "strict",
        }
      }
    }
  });



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