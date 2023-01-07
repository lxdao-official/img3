import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Error } from './Error';
import { fetchIpfsUrl, getFasterIpfsUrl } from './ipfs';
import { Loading } from './Loading';

const Placeholder = styled.div`
  position: relative;
  display: inline-block;
`;

type Props = {
  style?: React.CSSProperties;
  alt?: string;
  gateway?: string;
  className?: string;
  src: string;
  size?: number;
  color?: string;
  timeout?: number;
};

export const Img3 = (props: Props) => {
  const { style, src, gateway, alt, className, size, color, timeout } = props;

  const [imgState, setImgState] = useState('loading');
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (src.startsWith('ipfs://')) {
      const hash = src.slice(7);
      // If specified, use the gateway
      if (gateway) {
        fetchIpfsUrl({ gateway, hash, timeout }, (err, url) => {
          if (err) {
            setImgState('error');
          } else {
            setImgState('loaded');
            setImgSrc(url!);
          }
        });
      } else {
        getFasterIpfsUrl({ hash, timeout })
          .then((url) => {
            setImgState('loaded');
            setImgSrc(url);
          })
          .catch((err) => {
            setImgState('error');
          });
      }
    } else {
      setImgState('not-ipfs');
      setImgSrc(src);
    }
  }, []);

  if (imgState === 'loading') {
    return (
      <Placeholder style={style} className={className}>
        <Loading size={size} color={color} />
      </Placeholder>
    );
  } else if (imgState === 'error') {
    return (
      <Placeholder style={style} className={className}>
        <Error size={size} color={color} />
      </Placeholder>
    );
  }
  return <img className={className} style={{ display: 'inline-block', ...style }} src={imgSrc} alt={alt} />;
};

Img3.defaultProps = {
  timeout: 2000,
};
