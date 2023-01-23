import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Icon } from '@iconify/react';

import { convertIpfsToLink, getFasterIpfsLink } from './ipfsTools';

const Placeholder = styled.div`
  position: relative;
  display: inline-block;
`;

type Img3Props = {
  style?: React.CSSProperties;
  className?: string;
  src: string;
  alt?: string;
  /** Specifies the gateway of ipfs. */
  gateway?: string;
  /** Interactive icon style. */
  icon?: {
    /** icon size. */
    size?: number;
    /** icon color. */
    color?: string;
    /** error icon size. */
    errorSize?: number;
    /** error icon color. */
    errorColor?: string;
  };
  /** The timeout for the ipfs file request. default: 2000 */
  timeout?: number;
};

export const Img3 = (props: Img3Props) => {
  const { style, src = '', gateway, alt, className, timeout } = props;

  const icon = Object.assign({ size: 30, color: '#c0c0c0' }, props.icon);

  const [loadState, setLoadState] = useState('loading');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    if (src.startsWith('ipfs://')) {
      // If specified, use the gateway
      if (gateway) {
        convertIpfsToLink({ gateway, ipfs: src, timeout }, (err, url) => {
          if (err) {
            setLoadState('error');
          } else {
            setLoadState('loaded');
            setImagePreviewUrl(url!);
          }
        });
      } else {
        getFasterIpfsLink({ ipfs: src, timeout })
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
