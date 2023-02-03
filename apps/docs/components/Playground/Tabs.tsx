import React from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { SandpackState, UnstyledOpenInCodeSandboxButton, useSandpack } from '@codesandbox/sandpack-react';
import sdk from '@stackblitz/sdk';
import { PlaygroundContextType, usePlayground } from './PlaygroundContext';

function openInStackBlitz(sandpack: SandpackState, playground: PlaygroundContextType) {
  const files: Record<string, string> = {};

  for (const [key, value] of Object.entries(sandpack.files)) {
    files[key.substring(1)] = value.code;
  }
  delete files['tsconfig.json'];
  delete files['public/index.html'];
  delete files['package.json'];

  files['index.html'] = '<div id="root"></div>';

  sdk.openProject(
    {
      title: 'Playground - @lxdao/img3',
      description: playground.title,
      template: 'create-react-app',
      dependencies: {
        '@types/react': '^18.0.8',
        '@types/react-dom': '^18.0.2',
        react: '^18.1.0',
        'react-dom': '^18.1.0',
        typescript: 'latest',
        ...playground.dependencies,
      },
      files,
      settings: {
        compile: {
          trigger: 'auto',
          clearConsole: false,
        },
      },
    },
    {
      newWindow: true,
      openFile: [
        Object.keys(playground.files)
          .map((f) => f.substring(1))
          .join(','),
      ],
    }
  );
}

export const Tabs: React.FC<React.PropsWithChildren<{ items: string[] }>> = (props) => {
  const { items } = props;
  const [active, setActive] = React.useState(0);

  const playground = usePlayground();

  const mapChildren = React.Children.map(props.children, (child, index) => {
    const childElement = child as React.ReactElement;
    return React.cloneElement(childElement, {
      key: index,
      style: {
        ...childElement.props.style,
        display: active === index ? 'block' : 'none',
      },
    });
  });

  const { sandpack } = useSandpack();

  return (
    <TabWrapper style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button.Group size={'xs'} style={{ backgroundColor: 'var(--color-primary9)', padding: 4, margin: 0 }}>
          {items.map((item, index) => (
            <Button
              key={item}
              disabled={active === index}
              onClick={() => setActive(index)}
              css={{
                backgroundColor: active === index ? '#fff' : 'transparent',
                color: 'var(--color-primary1)',
                borderRadius: 2,
                fontWeight: 500,
              }}
            >
              {item}
            </Button>
          ))}
        </Button.Group>
        <ActionTools>
          <Tooltip content={'Open in StackBlitz'} placement="top">
            <ActionButton
              onClick={() => {
                openInStackBlitz(sandpack, playground);
              }}
            >
              <Icon icon="simple-icons:stackblitz" width="18" height="18" />
            </ActionButton>
          </Tooltip>
          <Tooltip content={'Open in CodeSandbox'} placement="top">
            <ActionButton>
              <UnstyledOpenInCodeSandboxButton
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <Icon icon="ph:codesandbox-logo-fill" width="18" height="18" />
              </UnstyledOpenInCodeSandboxButton>
            </ActionButton>
          </Tooltip>
        </ActionTools>
      </div>
      <div style={{ paddingTop: 10 }}>{mapChildren}</div>
    </TabWrapper>
  );
};

const ActionTools = styled.div`
  display: none;
  align-items: center;
`;

const TabWrapper = styled.div`
  margin-top: 16px;

  &:hover {
    ${ActionTools} {
      display: flex;
    }
  }
`;

const ActionButton = styled.div`
  display: block;
  background-color: var(--color-primary9);
  padding: 4px;
  border-radius: 100%;
  color: var(--color-primary3);
  margin: 0 5px;
`;

export const Tab = (props: { children: React.ReactNode; style?: React.CSSProperties }) => {
  return <div style={props.style}>{props.children}</div>;
};
