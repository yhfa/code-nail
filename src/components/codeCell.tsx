import { useState, useEffect } from 'react';
import { OnChange } from '@monaco-editor/react';

import bundle from '../bundler';
import CodeEditor from './codeEditor';
import Preview from './preview';
import Resizable from './resizable';

function CodeCell() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const clickHandler = async () => {
    const code = await bundle(input);
    setCode(code);
  };

  const codeChangeHandler: OnChange = (value) => {
    if (typeof value === 'string') setInput(value);
  };

  return (
    <Resizable direction="vertical">
      <div className="flex h-full flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={'const a = 2;'}
            onChange={codeChangeHandler}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
