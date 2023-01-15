import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Icon } from '@iconify/react';

import { convertIpfsToUrl, getFasterIpfsUrl } from './ipfs';

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
  icon?: {
    size?: number;
    color?: string;
    errorColor?: string;
    errorSize?: number;
  };
  timeout?: number;
};

export const Img3 = (props: Props) => {
  const { style, src = '', gateway, alt, className, timeout } = props;

  const icon = Object.assign({ size: 30, color: '#c0c0c0' }, props.icon);

  const [loadState, setLoadState] = useState('loading');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    if (src.startsWith('ipfs://')) {
      const hash = src.slice(7);
      // If specified, use the gateway
      if (gateway) {
        convertIpfsToUrl({ gateway, hash, timeout }, (err, url) => {
          if (err) {
            setLoadState('error');
          } else {
            setLoadState('loaded');
            setImagePreviewUrl(url!);
          }
        });
      } else {
        getFasterIpfsUrl({ hash, timeout })
          .then((url) => {
            setLoadState('loaded');
            setImagePreviewUrl(url);
          })
          .catch(() => {
            setLoadState('error');
          });
      }
    } else {
      setLoadState('not-ipfs');
      setImagePreviewUrl(src);
    }
  }, [props.src]);

  if (loadState === 'loading') {
    return (
      <Placeholder style={style} className={className}>
        <Icon
          icon={'line-md:loading-twotone-loop'}
          color={icon.color}
          style={{
            fontSize: icon.size,
            top: '50%',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Placeholder>
    );
  } else if (loadState === 'error') {
    return (
      <Placeholder style={style} className={className}>
        <Icon
          icon={'ic:round-broken-image'}
          color={icon.errorColor || icon.color}
          style={{
            fontSize: icon.errorSize || icon.size,
            top: '50%',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Placeholder>
    );
  }
  return <img className={className} style={{ display: 'inline-block', ...style }} src={imagePreviewUrl} alt={alt} />;
};

Img3.defaultProps = {
  timeout: 2000,
};
