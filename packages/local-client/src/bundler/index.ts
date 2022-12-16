import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let initialized = false;
const bundle = async (
  rawCode: string
): Promise<{ code: string; error: string }> => {
  if (!initialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.15.15/esbuild.wasm',
    });

    initialized = true;
  }

  // To escape from vite replacement of process.env.NODE_ENV
  const envKey = ['process', 'env', 'NODE_ENV'].join('.');

  try {
    const { outputFiles } = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        [envKey]: '"production"',
        global: 'window',
      },
      jsxFactory: '__React.createElement',
      jsxFragment: '__React.Fragment',
    });

    return {
      code: outputFiles[0].text,
      error: '',
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        code: '',
        error: error.message,
      };
    } else {
      throw error;
    }
  }
};

export default bundle;
