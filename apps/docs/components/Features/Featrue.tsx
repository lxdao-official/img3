import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 50px;
  background-color: transparent;
  flex: 1;
  & + & {
    margin-left: 20px;
  }
  @media (max-width: 650px) {
    margin-top: 50px;
    margin-left: 0 !important;
  }
`;

const IconWrapper = styled.div`
  width: 106px;
  height: 106px;
  background: rgba(0, 251, 140, 0.1);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 650px) {
    width: 60px;
    height: 60px;
    float: left;
    margin-right: 20px;
  }
`;

const Title = styled.a`
  display: inline-block;
  height: 38px;
  font-weight: 700;
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  line-height: 34px;
  color: #101828;
  padding-top: clamp(10px, 4vw, 50px);
  padding-bottom: clamp(8px, 2vw, 20px);
  box-sizing: content-box;
  @media (max-width: 650px) {
    padding-top: 0;
    padding-bottom: 0;
    line-height: 60px;
  }
`;

const IconItem = styled.div`
  @media (max-width: 650px) {
    transform: scale(0.75)
  }
}`;

const Description = styled.div`
  font-weight: 400;
  font-size: 1.15625rem;
  line-height: 1.675;
  color: #666f85;
  margin-top: 16px;
  clear: both;
  @media (max-width: 650px) {
    //  font-size: 14px;
    //  letter-spacing: -0.1px;
    padding-top: 20px;
  }
`;

export const FeaturesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

export const Feature: React.FC<
  React.PropsWithChildren<{
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
  }>
> = (props) => {
  return (
    <Wrapper>
      <IconWrapper>
        <IconItem>{props.icon}</IconItem>
      </IconWrapper>
      <Title href={props.link}>{props.title}</Title>
      <Description>{props.description}</Description>
    </Wrapper>
  );
};
