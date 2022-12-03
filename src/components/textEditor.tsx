import { FC, useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import './textEditor.css';

const TextEditor: FC = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string>('**Hello world!!!**');
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
        <MDEditor value={value} onChange={(value) => setValue(value || '')} />
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
          <MDEditor.Markdown source={value} />
        </div>
      </div>
    );
  }
};

export default TextEditor;
