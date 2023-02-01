import {
  CodeEditor,
  FileTabs,
  SandpackLayout,
  SandpackStack,
  useActiveCode,
  useSandpack,
} from '@codesandbox/sandpack-react';
import styled from 'styled-components';

const Wrapper = styled(SandpackLayout)`
  display: block;
  background-color: transparent;
  pre {
    padding: 0;
  }
`;

export function CodeViewer() {
  const { sandpack } = useSandpack();
  const { code } = useActiveCode();

  return (
    <Wrapper>
      <FileTabs></FileTabs>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        <CodeEditor
          decorators={[]}
          code={code}
          filePath={sandpack.activeFile}
          initMode={sandpack.initMode}
          showLineNumbers
          showInlineErrors
          showReadOnly={false}
          wrapContent={false}
          readOnly
        />
      </div>
    </Wrapper>
  );
}
