import { Callout, Tab, Tabs } from 'nextra-theme-docs';
import { Img3 } from '@lxdao/img3';
import { Uploader3 } from '@lxdao/uploader3';
import { Playground as Play, PlaygroundProps } from '@/components/Playground';
import { Icon } from '@iconify/react';
import React from 'react';
import styled from 'styled-components';
import { createConnector } from '@lxdao/uploader3-connector';
import { Tooltip } from '@nextui-org/react';

const MDXComponents = {
  Callout,
  Tabs,
  Tab: (props: any) => <Tab style={{ paddingTop: 10 }} {...props} />,
  Img3,
  Tooltip,
  Uploader3,
  Anchor: (props: { id: string }) => {
    return (
      <>
        <span className={'nx-absolute -nx-mt-20'} id={props.id}></span>
      </>
    );
  },
  Playground: function (props: PlaygroundProps) {
    return (
      <Play
        {...props}
        scope={{
          Img3,
          Uploader3,
          Icon,
          React,
          styled,
          createConnector,
        }}
      />
    );
  },
};

export default MDXComponents;
