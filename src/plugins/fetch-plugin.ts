import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const localCache = localforage.createInstance({
  name: 'localCache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of index.js
      build.onLoad({ filter: /(^index\.js$)/ }, async () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      // Works for all files not index.js
      build.onLoad({ filter: /.*/ }, async (args) => {
        // Check to see if we have already fetched this file and if it is in cache
        const cachedResult = await localCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        // If it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }
      });

      // Handle css files
      build.onLoad({ filter: /.css$/ }, async (args) => {
        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
            `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        // Store response in cache
        await localCache.setItem(args.path, result);

        return result;
      });

      // Handle js,jsx and ts files
      build.onLoad({ filter: /.*/ }, async (args) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        // Store response in cache
        await localCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
