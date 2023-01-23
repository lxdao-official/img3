import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';
import darkTheme from 'prism-react-renderer/themes/nightOwl';
import * as React from 'react';
import styled from 'styled-components';
import stripIndent from 'strip-indent';
import { useEffect } from 'react';

const EditorWrapper = styled.div`
  background-color: hsl(var(--nextra-primary-hue) 100% 39%/0.05);
  pre {
    white-space: pre !important;
    overflow: auto;
    font-size: 0.875rem !important;
  }
`;

const Title = styled.div`
  background-color: hsl(var(--nextra-primary-hue) 100% 39%/0.1);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  color: hsl(var(--nextra-primary-hue) 100% 39%);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
`;

const PreviewWrapper = styled(EditorWrapper)`
  overflow: hidden;
  padding: 1rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

export const LiveCode: React.FunctionComponent<{ code: string; scope: Record<string, any> }> = (props) => {
  const code = stripIndent(props.code).trim();
  const [isDark, setIsDark] = React.useState(false);
  useEffect(() => {
    // @ts-ignore
    const html: HTMLHtmlElement = document.querySelector<HTMLHtmlElement>('html');
    const observer = new MutationObserver((mutations) => {
      if (html.classList.contains('dark')) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    });
    observer.observe(html, { subtree: false, childList: false, attributes: true });
    return () => {
      // observer.disconnect();
    };
  }, []);
  return (
    <LiveProvider language={'typescript'} code={code} theme={isDark ? darkTheme : lightTheme} scope={props.scope}>
      <Title>Live PLAYGROUND</Title>
      <EditorWrapper>
        <LiveEditor
          style={{
            fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
            fontSize: '0.875rem',
            overflowX: 'auto',
          }}
        />
        <LiveError />
      </EditorWrapper>
      <Title style={{ borderRadius: 0 }}>LIVE PREVIEW</Title>
      <PreviewWrapper>
        <LivePreview />
      </PreviewWrapper>
    </LiveProvider>
  );
};
