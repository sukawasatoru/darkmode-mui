// via. https://github.com/microsoft/monaco-editor/blob/b4737b6/samples/browser-esm-webpack-typescript-react/src/components/Editor.tsx

import {useColorScheme} from '@mui/material';
import * as monaco from 'monaco-editor';
import {FC, useEffect, useRef} from 'react';

// @ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  }
};

export const Editor: FC = () => {
  const divEl = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;
  const {mode, systemMode} = useColorScheme();

  // `systemMode` become `undefined` if set `'light'` or `'dark'` to the `setMode()`.
  const appearance = systemMode || mode;

  useEffect(() => {
    if (divEl.current) {
      editor = monaco.editor.create(divEl.current, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
        language: 'typescript',
        theme: appearance === 'light' ? 'vs' : 'vs-dark',
      });
    }
    return () => {
      editor.dispose();
    };
  }, []);

  useEffect(() => {
    monaco.editor.setTheme(appearance === 'light' ? 'vs' : 'vs-dark');
  }, [appearance]);

  return <div
    className="Editor"
    ref={divEl}
    style={{height: '200px'}}
  />;
};
