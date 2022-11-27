import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, (args) => {
        return { path: args.path, namespace: 'a' };
      });

      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args) => {
        return {
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
          namespace: 'a',
        };
      });

      build.onResolve({ filter: /.*/ }, async (args) => {
        // Handle main file of a module
        return {
          path: `https://www.unpkg.com/${args.path}`,
          namespace: 'a',
        };
      });
    },
  };
};
