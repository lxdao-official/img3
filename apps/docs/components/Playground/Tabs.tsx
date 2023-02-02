import React from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { SandpackState, UnstyledOpenInCodeSandboxButton, useSandpack } from '@codesandbox/sandpack-react';
import sdk from '@stackblitz/sdk';
import { useDependencies } from './DependenciesContext';

function openInStackBlitz(sandpack: SandpackState, dependencies: Record<string, string>) {
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
      title: 'Example - LXDAO ',
      description: 'A example for @lxdao/img3',
      template: 'create-react-app',
      dependencies: {
        '@types/react': '^18.0.8',
        '@types/react-dom': '^18.0.2',
        react: '^18.1.0',
        'react-dom': '^18.1.0',
        typescript: 'latest',
        ...dependencies,
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
      openFile: [sandpack.activeFile],
    }
  );
}

export const Tabs: React.FC<React.PropsWithChildren<{ items: string[] }>> = (props) => {
  const { items } = props;
  const [active, setActive] = React.useState(0);

  const { dependencies } = useDependencies();

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
                openInStackBlitz(sandpack, dependencies);
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
  color: var(--color-primary1);
  margin: 0 5px;
`;

export const Tab = (props: { children: React.ReactNode; style?: React.CSSProperties }) => {
  return <div style={props.style}>{props.children}</div>;
};
