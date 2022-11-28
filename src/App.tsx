import { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';

import './App.css';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

function App() {
  const [initialized, setInitialized] = useState(false);
  const [input, setInput] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
    if (iframeRef.current) iframeRef.current.srcdoc = html;
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

    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(outputFiles[0].text, '*');
    }
  };

  const html = `
      <html>
      <head> </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener(
            'message',
            (event) => {
              try {
                eval(event.data);
              } catch (error) {
                const root = document.getElementById('root');
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
                console.error(error);
              }
            },
            false
          );
        </script>
      </body>
      </html>

  `;

  return (
    <div className="App">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <div>
        <button onClick={clickHandler}>Submit</button>
      </div>
      <iframe
        ref={iframeRef}
        title="code preview"
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
}

export default App;
