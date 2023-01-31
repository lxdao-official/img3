import logo from './logo.svg';
import styled from 'styled-components';

const LOGO_H1 = styled.h1`
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
      <LOGO_H1>国产良心 NFT</LOGO_H1>
      <LINE />
      <img src={logo.src} alt={'LXDAO'} />
    </>
  );
};
