import React from 'react';
import { SandpackProvider, SandpackFiles, SandpackTheme } from '@codesandbox/sandpack-react';
import { CodeViewer } from './CodeViewer';
import { CodePreview } from './CodePreview';
import { Tab, Tabs } from './Tabs';
import { getFilesDependencies } from './/getFilesDependencies';
import { DependenciesContext } from '@/components/Playground/DependenciesContext';

type PlaygroundProps = {
  files: SandpackFiles;
  scope: Record<string, any>;
};

const theme: SandpackTheme = {
  colors: {
    surface1: '#f8f9fb',
    surface2: '#EBEDF0',
    surface3: '#e4e7eb',
    clickable: '#737373',
    base: '#323232',
    disabled: '#C5C5C5',
    hover: '#1f2933',
    accent: '#2e7692',
  },
  syntax: {
    plain: '#1F2933',
    comment: {
      color: '#A7B6C2',
      fontStyle: 'italic',
    },
    keyword: '#1A56DB',
    tag: '#1A56DB',
    punctuation: '#394b59',
    definition: '#A23DAD',
    property: '#2e7692',
    static: '#1A56DB',
    string: '#1992D4',
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
    size: '13px',
    lineHeight: '20px',
  },
};

export const Playground = (props: PlaygroundProps) => {
  const filesPaths = Object.keys(props.files);
  const hasTypescript = filesPaths.some((file) => {
    return file.endsWith('.ts') || file.endsWith('.tsx');
  });

  const allDependencies = getFilesDependencies(props.files);

  return (
    <div style={{ width: '100%' }}>
      <SandpackProvider
        theme={theme}
        template={hasTypescript ? 'react-ts' : 'react'}
        files={props.files}
        customSetup={{
          dependencies: {
            ...allDependencies,
          },
        }}
      >
        <DependenciesContext.Provider value={allDependencies}>
          <Tabs items={['Preview', 'Code']}>
            <Tab>
              <CodePreview files={props.files} scope={props.scope} />
            </Tab>
            <Tab>
              <CodeViewer />
            </Tab>
          </Tabs>
        </DependenciesContext.Provider>
      </SandpackProvider>
    </div>
  );
};
