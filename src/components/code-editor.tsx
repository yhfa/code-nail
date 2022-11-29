import { FC, useRef } from 'react';
import MonacoEditor, { OnChange } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface ICodeEditor {
  initialValue: string;
  onChange: OnChange;
}

const CodeEditor: FC<ICodeEditor> = ({ initialValue, onChange }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const formatHandler = () => {
    if (!editorRef.current) return;

    // Get current value from editor
    const unformatted = editorRef.current.getModel()?.getValue() || '';

    // Format the value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      singleQuote: true,
      useTabs: true,
    });

    // Set the formatted value back to editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="group relative h-full">
      <button
        className="absolute top-1 right-1 z-20 bg-orange-500 px-3 py-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        onClick={formatHandler}
      >
        Format
      </button>
      <MonacoEditor
        onChange={onChange}
        value={initialValue}
        height="500px"
        theme="vs-dark"
        language="javascript"
        onMount={(editor) => (editorRef.current = editor)}
        options={{
          cursorBlinking: 'expand',
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
