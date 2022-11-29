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
    <div>
      <button onClick={formatHandler}>Format</button>
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
