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
  @media (max-width: 650px) {
    width: 50px;
    height: 50px;
    float: left;
    margin-right: 20px;
  }
`;

const Title = styled.h3`
  height: 38px;
  font-weight: 700;
  font-size: min(28px, max(16px, calc(var(--rpx) * 4)));
  line-height: 34px;
  color: #101828;
  padding-top: calc(var(--rpx) * 4);
  padding-bottom: calc(var(--rpx) * 5);
  @media (max-width: 650px) {
    padding-top: 0;
    padding-bottom: 0;
    line-height: 50px;
  }
`;

const IconItem = styled.div`
  @media (max-width: 650px) {
    transform: scale(0.75)
  }
}`;

const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.675;
  color: #666f85;
  margin-top: 16px;
  clear: both;
  @media (max-width: 650px) {
    font-size: 14px;
    letter-spacing: -0.1px;
  }
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
      <IconWrapper>
        <IconItem>{props.icon}</IconItem>
      </IconWrapper>
      <Title>{props.title}</Title>
      <Description>{props.description}</Description>
    </div>
  );
};
