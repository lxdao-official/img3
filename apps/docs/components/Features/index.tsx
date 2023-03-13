import * as React from 'react';
import { Container } from '@nextui-org/react';
import { Feature, FeaturesWrapper } from '@/components/Features/Featrue';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const SubTitle = styled.div`
  font-weight: 500;
  font-size: clamp(14px, 3vw, 21px);
  line-height: 60px;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  color: #666f85;
`;

const Quote = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: #101828;
  margin-top: clamp(6px, 1.5vw, 12px);
  margin-bottom: clamp(10px, 4vw, 24px);
  @media (max-width: 650px) {
    letter-spacing: 0.08rem;
  }
`;

const Wrapper = styled.div`
  padding: clamp(30px, 10vw, 120px) 0;
  background-color: #fafafa;
`;

export const Features: React.FC<React.PropsWithChildren<any>> = (props) => {
  return (
    <Wrapper>
      <Container lg style={{ maxWidth: 1216 }}>
        <SubTitle>our functions</SubTitle>
        <Quote>
          It provides the easiest way for developers to implement images rendering and uploading based on Web3 storage like IPFS.
        </Quote>
        <FeaturesWrapper>
          <Feature
            icon={<Icon fontSize={36} color={'#31E2C7'} icon="material-symbols:image-rounded" />}
            title={'Img3'}
            description={
              '<Img3 /> is a fundamental component for Web3 Applications. It extends HTML <img /> with Web3 decentralization storage, like IPFS. With <Img3 /> you can put "ipfs://" in the src attribute and render the image from IPFS with the fastest gateway. We will support Arweave soon.'
            }
            link="/components/Img3"
          />
          <Feature
            icon={<Icon fontSize={36} color={'#31E2C7'} icon="material-symbols:cloud-upload" />}
            title={'Uploader3'}
            description={
              'Uploader3 is a React-based Web3 image upload component that supports multiple image uploading, image cropping, and uploading images to Web3 Storage providers (like IPFS). There are two ways for uploading, by using a backend API or the Uploader3 Connector.'
            }
            link="/components/Uploader3"
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
            link="/components/uploader3-connector"
          />
        </FeaturesWrapper>
      </Container>
    </Wrapper>
  );
};
