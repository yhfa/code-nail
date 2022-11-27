import { useEffect, useState } from 'react';
import * as esbuild from 'esbuild-wasm';

import './App.css';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

function App() {
  const [initialized, setInitialized] = useState(false);
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    if (initialized) return;
    try {
      await esbuild.initialize({
        worker: true,
        wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.15.15/esbuild.wasm',
      });

      setInitialized(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    startService();
  });

  const clickHandler = async () => {
    if (!initialized) return;

    // To escape from vite replacement of process.env.NODE_ENV
    const envKey = ['process', 'env', 'NODE_ENV'].join('.');

    const { outputFiles } = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        [envKey]: '"production"',
        global: 'window',
      },
    });

    // console.log(outputFiles[0].text);

    setCode(outputFiles[0].text);
  };

  return (
    <div className="App">
      <textarea value={input} onChange={(e) => setInput(e.target.value)}>
        Hello
      </textarea>
      <div>
        <button onClick={clickHandler}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
