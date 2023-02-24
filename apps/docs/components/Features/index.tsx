import * as React from 'react';
import { Col, Container, Grid, Spacer } from '@nextui-org/react';
import { Feature, FeaturesWrapper } from '@/components/Features/Featrue';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const SubTitle = styled.div`
  font-weight: 500;
  font-size: max(14px, min(21px, calc(var(--rpx) * 2)));
  line-height: 60px;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  color: #666f85;
`;

const Quote = styled.p`
  font-weight: 500;
  //font-size: min(1.6rem, max(16px, calc(var(--rpx) * 3)));
  font-size: 1.6rem;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: #101828;
  margin-top: calc(var(--rpx) * 1.5);
  margin-bottom: calc(var(--rpx) * 5);
  @media (max-width: 650px) {
    letter-spacing: 0.08rem;
  }
`;

const Wrapper = styled.div`
  padding: calc(var(--rpx) * 10) 0;
  background-color: #fafafa;
`;

export const Features: React.FC<React.PropsWithChildren<any>> = (props) => {
  return (
    <Wrapper>
      <Container lg style={{ maxWidth: 1216 }}>
        <SubTitle>our function</SubTitle>
        <Quote>
          It provides the easiest way for you to implement images rendering, uploading, etc. based on Web3 storage like
          IPFS.
        </Quote>
        <FeaturesWrapper>
          <Feature
            icon={<Icon fontSize={36} color={'#31E2C7'} icon="material-symbols:image-rounded" />}
            title={'Img3'}
            description={
              '<Img3 /> is a fundamental components for Web3 Apps. It extends HTML <img /> with Web3 decentralization storage, like IPFS. With <Img3 /> you can put ipfs:// in the src and render the image from IPFS with the fastest gateway. Will support ar soon.'
            }
          />
          <Feature
            icon={<Icon fontSize={36} color={'#31E2C7'} icon="material-symbols:cloud-upload" />}
            title={'Uploader3'}
            description={
              'Uploader3 is a React-based Web3 image upload component that supports multiple image uploads, image cropping, and uploading images to Web3 Storage providers (like IPFS). There are two ways for uploading, by using a backend API or the Uploader3 Connector.'
            }
          />
          <Feature
            icon={
              <span
                style={{
                  background: '#31E2C7',
                  borderRadius: 6,
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 12,
                  padding: '3px 6px',
                }}
              >
                SDK
              </span>
            }
            title={'SDK Connector'}
            description={
              'Uploader3 Connector is a connector for Uploader3. Currently, it only supports NFT.storage IPFS service provider.'
            }
          />
        </FeaturesWrapper>
      </Container>
    </Wrapper>
  );
};
