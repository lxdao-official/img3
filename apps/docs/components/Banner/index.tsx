import styled from 'styled-components';
import * as React from 'react';
import { Button, Container } from '@nextui-org/react';
import Link from 'next/link';

const BannerContainer = styled.div`
  background: linear-gradient(180deg, #47f9ae 0%, #00b1fd 100%);
`;

const ButtonLink = styled.button`
  width: 180px;
  height: 48px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
  margin-top: 40px;
`;

const ButtonText = styled.span`
  color: #47f8af;
  background: linear-gradient(90deg, #47f8af 15.56%, #01b2fc 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-size: 20px;
  font-weight: 600;
`;

export const Banner: React.FC<React.PropsWithChildren<any>> = (props) => {
  return (
    <BannerContainer>
      <Container display={'flex'} direction={'column'} justify={'center'} alignItems={'center'} style={{ height: 600 }}>
        <h1 style={{ fontSize: 108, fontWeight: 600, color: 'white', fontFamily: 'Inter' }}>{'<Img3 />'}</h1>
        <p style={{ color: 'white', fontSize: 20, lineHeight: '36px', marginTop: 40 }}>
          An essential infrastructure in the Web3 storage field.
        </p>
        <Link href={'./components/Img3'}>
          <ButtonLink>
            <ButtonText>Get Started</ButtonText>
          </ButtonLink>
        </Link>
      </Container>
    </BannerContainer>
  );
};
