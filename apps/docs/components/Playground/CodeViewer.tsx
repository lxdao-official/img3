import {
  CodeEditor,
  FileTabs,
  SandpackLayout,
  SandpackStack,
  useActiveCode,
  useSandpack,
  useSandpackTheme,
} from '@codesandbox/sandpack-react';
import styled from 'styled-components';

const Wrapper = styled(SandpackLayout)`
  display: block;
  height: 340px;
  overflow: hidden;
  pre {
    padding: 0;
  }
`;

export function CodeViewer() {
  const { sandpack } = useSandpack();
  const { code } = useActiveCode();
  const { theme } = useSandpackTheme();

  return (
    <Wrapper style={{ backgroundColor: theme.colors.surface1 }}>
      <FileTabs></FileTabs>
      <div style={{ height: 300, overflowY: 'auto' }}>
        <CodeEditor
          decorators={[]}
          code={code}
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
