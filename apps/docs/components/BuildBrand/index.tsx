import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: min(56px, calc(var(--rpx) * 8));
  font-weight: 800;
  text-align: center;
`;

export const BuildBrand = () => {
  return <Wrapper>BUILD IN LXDAO</Wrapper>;
};
