import { useState } from 'react';
import { OnChange } from '@monaco-editor/react';

import bundle from '../bundler';
import CodeEditor from './codeEditor';
import Preview from './preview';

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
    <div className="App">
      <CodeEditor initialValue={'const a = 2;'} onChange={codeChangeHandler} />
      <div>
        <button onClick={clickHandler}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
}

export default CodeCell;
