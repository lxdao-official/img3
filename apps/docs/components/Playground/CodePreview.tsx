import { LiveProvider, LiveError, LivePreview } from 'react-live';
import * as React from 'react';
import { SandpackFiles, SandpackLayout, useSandpackTheme } from '@codesandbox/sandpack-react';
import styled from 'styled-components';
import { files2code } from '@/components/Playground/files2code';
import { useContext, useEffect, useState } from 'react';
import { SwcContext } from '../../Hooks/useSwc';
import { Loading } from '@nextui-org/react';

const Wrapper = styled.div<{ borderColor: string }>`
  display: block;
  min-height: 350px;
  overflow: auto;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 4px;
`;

export const CodePreview: React.FC<{ files: SandpackFiles; scope: Record<string, any> }> = (props) => {
  const [code, setCode] = useState('');

  const swc = useContext(SwcContext);

  const { theme } = useSandpackTheme();

  useEffect(() => {
    if (!swc.initialized) return;
    files2code(props.files).then((c) => {
      setCode(c);
    });
  }, [props.files, swc]);

  if (swc.initialized && code) {
    return (
      <Wrapper borderColor={theme.colors.surface2}>
        <LiveProvider language={'javascript'} code={code} scope={props.scope} noInline={true}>
          <LivePreview />
          <LiveError />
        </LiveProvider>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper
        borderColor={theme.colors.surface2}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Loading />
        <span style={{ paddingLeft: 10, fontSize: 16 }}>Initializing...</span>
      </Wrapper>
    );
  }
};
