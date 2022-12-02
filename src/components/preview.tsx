import { FC, useRef, useEffect } from 'react';

interface IPreview {
  code: string;
  error: string;
}

const html = `
<html>
<head> </head>
<body>
  <div id="root"></div>
  <script>
    const handleError = (error) =>{
      const root = document.getElementById('root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
      console.error(error);
    };

    window.addEventListener('error', (event) => {
      event.preventDefault();
      handleError(event.error);
    });

    window.addEventListener(
      'message',
      (event) => {
        try {
          eval(event.data);
        } catch (error) {
          handleError(error)
        }
      },
      false
    );
  </script>
</body>
</html>

`;

const Preview: FC<IPreview> = ({ code, error }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Reset the current content
    if (iframeRef.current) iframeRef.current.srcdoc = html;

    // Delay the processing of the code to avoid reset the content
    setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(code, '*');
      }
    }, 50);
  }, [code]);

  return (
    <div className="relative grow">
      <iframe
        ref={iframeRef}
        className="h-full w-full bg-white"
        title="code preview"
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {error && (
        <div className="absolute top-3 left-3 text-red-600">{error}</div>
      )}
    </div>
  );
};

export default Preview;
