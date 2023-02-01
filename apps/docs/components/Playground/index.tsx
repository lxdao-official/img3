import { SandpackProvider, SandpackFiles } from '@codesandbox/sandpack-react';
import { CodeViewer } from '@/components/Playground/CodeViewer';
import { Tab, Tabs as RawTabs } from 'nextra-theme-docs';
import { CodePreview } from '@/components/Playground/CodePreview';
import styled from 'styled-components';
import { freeCodeCampDark } from '@codesandbox/sandpack-themes';

type PlaygroundProps = {
  files: SandpackFiles;
  scope: Record<string, any>;
};

const Tabs = styled(RawTabs)`
  padding-right: 0;
`;

export const Playground = (props: PlaygroundProps) => {
  return (
    <div style={{ width: '100%' }}>
      <SandpackProvider
        theme={freeCodeCampDark}
        template="react"
        files={props.files}
        customSetup={{
          entry: '/index.js',
        }}
      >
        <Tabs items={['Preview', 'Code']}>
          <Tab style={{ paddingTop: 10 }}>
            <CodePreview files={props.files} scope={props.scope} />
          </Tab>
          <Tab style={{ paddingTop: 10 }}>
            <CodeViewer />
          </Tab>
        </Tabs>
      </SandpackProvider>
    </div>
  );
};
