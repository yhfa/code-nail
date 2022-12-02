import { FC, useRef, useEffect } from 'react';

interface IPreview {
  code: string;
}

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

const Preview: FC<IPreview> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) iframeRef.current.srcdoc = html;

    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      title="code preview"
      srcDoc={html}
      sandbox="allow-scripts"
    />
  );
};

export default Preview;