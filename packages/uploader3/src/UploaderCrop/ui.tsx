import styled from 'styled-components';
import { ModalStatus } from '../types';
import { maskStyles } from './styles';
import { Icon as IconifyIcon, IconProps } from '@iconify/react';
import React from 'react';
import { UploaderCroppProps } from './index';

export const Mask = styled.div<{ modalStatus: ModalStatus }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 1000;
  ${(props) => maskStyles[props.modalStatus]}
`;

export const CroppModal = styled.div<{ modalStatus: ModalStatus }>`
  --u3-wrapper-color: rgb(244, 244, 244);
  --u3-transparent-bg-color: rgb(236, 236, 236);
  --u3-transparent-bg-color2: rgb(200, 200, 200);
  --u3-action-bg-color: rgb(238, 238, 238);
  --u3-action-bg-color-active: rgb(228, 228, 228);
  --u3-action-text-color: rgb(90, 90, 90);
  --u3-text-color: rgb(90, 90, 90);
  --u3-border-radius: 5px;

  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate3d(-50%, -0%, 0);
  background-color: var(--u3-wrapper-color);
  border-radius: 10px;
  padding: 20px;
  z-index: 1001;
  ${(props) => maskStyles[props.modalStatus]};

  @media (prefers-color-scheme: dark) {
    --u3-wrapper-color: rgb(40, 40, 40);
    --u3-transparent-bg-color: rgb(100, 100, 100);
    --u3-transparent-bg-color2: rgb(120, 120, 120);
    --u3-action-bg-color: rgb(74, 74, 74);
    --u3-action-bg-color-active: rgb(64, 64, 64);
    --u3-text-color: rgb(180, 180, 180);
    --u3-action-text-color: rgb(180, 180, 180);
  }
`;

export const CropperWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CroppCanvasWrapper = styled.div<Pick<UploaderCroppProps, 'size'>>`
  width: ${(props) => {
    if (typeof props.size?.width === 'number') {
      return props.size?.width + 'px';
    }
    return props.size?.width;
  }};
  height: ${(props) => {
    if (typeof props.size?.height === 'number') {
      return props.size?.height + 'px';
    }
    return props.size?.height;
  }};
  background-color: var(--u3-transparent-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      45deg,
      var(--u3-transparent-bg-color2) 25%,
      transparent 25%,
      transparent 75%,
      var(--u3-transparent-bg-color2) 75%,
      var(--u3-transparent-bg-color2)
    ),
    linear-gradient(
      45deg,
      var(--u3-transparent-bg-color2) 25%,
      transparent 25%,
      transparent 75%,
      var(--u3-transparent-bg-color2) 75%,
      var(--u3-transparent-bg-color2)
    );
  background-size: 16px 16px;
  background-position: 0 0, 8px 8px;
`;

export const CroppImage = styled.img`
  background-color: var(--u3-transparent-bg-color);
  max-width: 100%;
  max-height: 100%;
`;

export const CroppTools = styled.div`
  display: flex;
  padding-top: 20px;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

export const Action = styled.div<{ active?: boolean }>`
  cursor: pointer;
  background-color: ${(props) => (props.active ? 'var(--u3-action-bg-color-active)' : 'var(--u3-action-bg-color)')};
  color: var(--u3-action-text-color);
  display: flex;
  padding: 6px;
  user-select: none;
  line-height: 0;
  align-items: center;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset;

  &:hover {
    background-color: var(--u3-action-bg-color-active);
  }
`;

export const Ratio = styled.div<{ active?: boolean }>`
  border: 1px solid var(--u3-action-text-color);
  display: block;
  height: 20px;
  box-sizing: border-box;
  transform: scale(0.82);
  line-height: 16px;
  padding: 1px 2px;
  font-size: 12px;
  border-radius: 4px;
  text-align: center;
  min-width: 16px;
`;

export const ActionGroup = styled.div`
  display: flex;
  border-radius: var(--u3-border-radius);

  & + & {
    margin-right: 10px;
  }

  ${Action}:first-child {
    border-top-left-radius: var(--u3-border-radius);
    border-bottom-left-radius: var(--u3-border-radius);
  }

  ${Action}:last-child {
    border-top-right-radius: var(--u3-border-radius);
    border-bottom-right-radius: var(--u3-border-radius);
  }
`;

export const Icon = (props: IconProps) => {
  let { style, height = 20, width = 20, ...restProps } = props;
  return <IconifyIcon style={{ lineHeight: 0 }} width={width} height={height} {...restProps} />;
};
