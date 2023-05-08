import React, { useEffect, useState, useContext, createContext, useMemo, ReactNode } from 'react';
import styled from 'styled-components';

import { Icon } from '@iconify/react';

import { getFasterIpfsLink } from './ipfsTools';

const Placeholder = styled.div`
  position: relative;
  display: inline-block;
`;

type Img3Props = {
  style?: React.CSSProperties;
  className?: string;
  src: string;
  alt?: string;
  /** Overwrite gateways . */
  gateways?: string[];
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
  /** global default gateway */
  defaultGateway?: string;
};

type Img3ProviderProps = {
  /** global default gateway */
  defaultGateway: string;
  children: ReactNode;
}

const Img3Context = createContext({defaultGateway : ''});

export const Img3Provider: React.FC<Img3ProviderProps> = ({ children, defaultGateway }) => {
  const img3ContextValue = useMemo(
    () => ({
      defaultGateway: defaultGateway,
    }),
    [defaultGateway]
  );
  return (
    <Img3Context.Provider value={img3ContextValue}>
      {children}
    </Img3Context.Provider>
  )
}

export const Img3: React.FC<Img3Props> = (props) => {
  const { style, src = '', gateways, alt, className, timeout = 2000 } = props;
  const defaultGateway = useContext(Img3Context)?.defaultGateway;  

  const icon = Object.assign({ size: 30, color: '#c0c0c0' }, props.icon);

  const [loadState, setLoadState] = useState('loading');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    if (src.startsWith('ipfs://')) {
      // If specified, use the gateway
      getFasterIpfsLink({ ipfs: src, timeout, gateways: defaultGateway ? [defaultGateway] : gateways })
        .then((url) => {
          setLoadState('loaded');
          setImagePreviewUrl(url);
        })
        .catch(() => {
          setLoadState('error');
        });
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
