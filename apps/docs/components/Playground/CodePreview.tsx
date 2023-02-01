import { LiveProvider, LiveError, LivePreview } from 'react-live';
import * as React from 'react';
import { SandpackFiles, SandpackLayout } from '@codesandbox/sandpack-react';
import styled from 'styled-components';
import { files2code } from '@/components/Playground/files2code';
import { useContext, useEffect, useState } from 'react';
import { SwcContext } from '../../Hooks/useSwc';
import { Loading } from '@nextui-org/react';

const Wrapper = styled.div`
  display: block;
  min-height: 350px;
  overflow: auto;
  border: 1px solid hsl(var(--nextra-primary-hue) 100% 45%/0.2);
  border-radius: 4px;
`;

export const CodePreview: React.FunctionComponent<{ files: SandpackFiles; scope: Record<string, any> }> = (props) => {
  const [code, setCode] = useState('');

  const swc = useContext(SwcContext);

  useEffect(() => {
    if (!swc.initialized) return;
    files2code(props.files).then((c) => {
      setCode(c);
    });
  }, [props.files, swc]);

  if (swc.initialized) {
    return (
      <Wrapper>
        <LiveProvider language={'javascript'} code={code} scope={props.scope} noInline={true}>
          <LivePreview />
          <LiveError />
        </LiveProvider>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </Wrapper>
    );
  }
};
