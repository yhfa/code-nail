import { FC, useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import { Cell } from '../redux';
import './textEditor.css';
import { useAction } from './../hooks/useAction';

interface ITextEditor {
  cell: Cell;
}

const TextEditor: FC<ITextEditor> = ({ cell: { id, content } }) => {
  const [editing, setEditing] = useState(false);
  const { updateCell } = useAction();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => document.removeEventListener('click', listener);
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={content}
          onChange={(value) => updateCell(id, value || '')}
        />
      </div>
    );
  } else {
    return (
      <div
        className="text-editor border-spacing-1 border border-gray-600 border-b-gray-700 bg-[#202123] p-3"
        onClick={() => setEditing(true)}
        onKeyDown={() => setEditing(true)}
        aria-hidden="true"
      >
        <div className="">
          <MDEditor.Markdown source={content || 'Click to edit'} />
        </div>
      </div>
    );
  }
};

export default TextEditor;
