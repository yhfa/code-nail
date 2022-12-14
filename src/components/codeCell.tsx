import { useState, useEffect, FC } from 'react';
import { OnChange } from '@monaco-editor/react';

import bundle from '../bundler';
import CodeEditor from './codeEditor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../redux';
import { useAction } from '../hooks';

interface ICodeCell {
  cell: Cell;
}

const CodeCell: FC<ICodeCell> = ({ cell: { content, id } }) => {
  const { updateCell } = useAction();
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const codeChangeHandler: OnChange = (value) => {
    if (typeof value === 'string') updateCell(id, value);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { code, error } = await bundle(content);
      setCode(code);
      setCodeError(error);
    }, 1000);

    return () => clearTimeout(timer);
  }, [content]);

  return (
    <Resizable direction="vertical">
      <div className="flex h-[calc(100%_-_10px)] flex-row">
        <Resizable direction="horizontal">
          <CodeEditor initialValue={content} onChange={codeChangeHandler} />
        </Resizable>
        <Preview code={code} error={codeError} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
