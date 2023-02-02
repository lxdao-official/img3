import React from 'react';
import styled from 'styled-components';

type TabsProps = {
  items: string[];
};

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Tabs: React.FC<React.PropsWithChildren<TabsProps>> = (props) => {
  const { children, ...rest } = props;
  return <TabsWrapper {...rest}>{children}</TabsWrapper>;
};
