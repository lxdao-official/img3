import logo from './logo.svg';
import styled from 'styled-components';
import Image from 'next/image';

const H1 = styled.h1`
  font-size: 1.75em;
  font-weight: 700;
`;

const LINE = styled.hr`
  border: none;
  height: 16px;
  border-right-style: solid;
  border-right-width: thin;
  border-right-color: rgba(0, 0, 0, 0.1);
  margin: 0 1em;
  .dark & {
    border-right-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Logo = () => {
  return (
    <>
      <H1>Img3</H1>
      <LINE />
      <Image src={logo.src} alt={'LXDAO'} width={121} height={36} />
    </>
  );
};
