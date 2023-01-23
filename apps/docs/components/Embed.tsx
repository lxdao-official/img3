import sdk, { Project } from '@stackblitz/sdk';
import { useEffect, useRef } from 'react';

const project: Project = {
  title: 'Node serve demo',
  description: 'Node.js server demo using the "serve" package',
  template: 'create-react-app',
  files: {
    'index.html': '<div id="root"></div>',
    'index.js': `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));`,
    'App.tsx': `
import * as React from 'react';
export default function App() {
  return <div>hello world</div>;
}`,
  },
  dependencies: {
    'styled-components': '*',
    '@types/react': '*',
  },
};

export function Embed() {
  const ref = useRef(null);
  useEffect(() => {
    sdk
      .embedProject(ref.current!, project, {
        clickToLoad: true,
        openFile: 'package.json,App.tsx',
        terminalHeight: 50,
        hideNavigation: true,
        hideExplorer: true,
        hideDevTools: true,
        height: 500,
        view: 'preview',
      })
      .catch((e) => {
        console.log(e);
      });

    // sdk.embedProjectId(ref.current!, 'sdk-github-project', {
    //   forceEmbedLayout: true,
    //   openFile: 'index.ts',
    //   hideExplorer: true,
    //   hideNavigation: true,
    //   hideDevTools: true,
    // });
  }, []);
  return (
    <div style={{ border: '1px solid #000' }}>
      <div
        ref={ref}
        style={{
          borderRadius: 4,
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      />
    </div>
  );
}
