import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let initialized = false;
const bundle = async (rawCode: string) => {
  if (!initialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.15.15/esbuild.wasm',
    });

    initialized = true;
  }

  // To escape from vite replacement of process.env.NODE_ENV
  const envKey = ['process', 'env', 'NODE_ENV'].join('.');

  const { outputFiles } = await esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      [envKey]: '"production"',
      global: 'window',
    },
  });

  return outputFiles[0].text;
};

export default bundle;
