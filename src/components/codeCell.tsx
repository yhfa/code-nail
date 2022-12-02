import { useState, useEffect } from 'react';
import { OnChange } from '@monaco-editor/react';

import bundle from '../bundler';
import CodeEditor from './codeEditor';
import Preview from './preview';
import Resizable from './resizable';

function CodeCell() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const codeChangeHandler: OnChange = (value) => {
    if (typeof value === 'string') setInput(value);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { code, error } = await bundle(input);
      setCode(code);
      setCodeError(error);
    }, 1000);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div className="flex h-full flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={'const a = 2;'}
            onChange={codeChangeHandler}
          />
        </Resizable>
        <Preview code={code} error={codeError} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
