import { Spacer } from '@nextui-org/react';
import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  width: 106px;
  height: 106px;
  background: rgba(0, 251, 140, 0.1);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  height: 38px;
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  color: #101828;
`;

const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 29px;
  color: #666f85;
  margin-top: 16px;
`;

export const Feature: React.FC<
  React.PropsWithChildren<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>
> = (props) => {
  return (
    <div>
      <IconWrapper>{props.icon}</IconWrapper>
      <Spacer y={4} />
      <Title>{props.title}</Title>
      <Spacer y={0.5} />
      <Description>{props.description}</Description>
    </div>
  );
};
