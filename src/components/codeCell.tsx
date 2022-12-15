import { useEffect, FC } from 'react';
import { OnChange } from '@monaco-editor/react';

import CodeEditor from './codeEditor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../redux';
import { useAction, useAppSelector } from '../hooks';

interface ICodeCell {
  cell: Cell;
}

const CodeCell: FC<ICodeCell> = ({ cell: { content, id } }) => {
  const { updateCell, createBundle } = useAction();
  const bundle = useAppSelector(({ bundles }) => bundles[id]);

  const codeChangeHandler: OnChange = (value) => {
    if (typeof value === 'string') updateCell(id, value);
  };

  useEffect(() => {
    if (!bundle) createBundle(id, content);
    const timer = setTimeout(() => createBundle(id, content), 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, createBundle, id]);

  return (
    <Resizable direction="vertical">
      <div className="flex h-[calc(100%_-_10px)] flex-row">
        <Resizable direction="horizontal">
          <CodeEditor initialValue={content} onChange={codeChangeHandler} />
        </Resizable>
        {!bundle || bundle.bundling ? (
          <div className="flex h-full flex-grow items-center bg-white px-[10%]">
            <div className="h-3 w-full animate-[fadeIn_.5s] overflow-hidden rounded-full bg-zinc-300">
              <div className="h-full w-full origin-[0%_50%] animate-[indeterminate_1s_linear_infinite] bg-orange-500"></div>
            </div>
          </div>
        ) : (
          <Preview code={bundle.code} error={bundle.error} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
