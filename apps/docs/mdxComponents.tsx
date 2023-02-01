import { Callout, Tab, Tabs } from 'nextra-theme-docs';
import { Img3 } from '@lxdao/img3';
import { Uploader3 } from '@lxdao/uploader3';
import { Playground as Play } from '@/components/Playground';
import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { Icon } from '@iconify/react';
import React from 'react';
import styled from 'styled-components';

export default {
  Callout,
  Tabs,
  Tab,
  Img3,
  Uploader3,
  Playground: function (props: { files: SandpackFiles }) {
    return (
      <Play
        files={props.files}
        scope={{
          Img3,
          Uploader3,
          Icon,
          React,
          styled,
        }}
      />
    );
  },
};
