import { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1
  }
  100% {
    opacity: 0
  }
`;

const zoomIn = keyframes`
  0% {
    opacity: 0;
    transform-origin: center center;
    transform: translate3d(-50%, -0%, 0) scale3d(1.15, 1.15, 1.15)
  }
  100% {
    opacity: 1;
    transform-origin: center center;
    transform: translate3d(-50%, -0%, 0) scale3d(1, 1, 1)
  }
`;

const zoomOut = keyframes`
  0% {
    opacity: 1;
    transform-origin: center center;
    transform: translate3d(-50%, -0%, 0) scale3d(1, 1, 1)
  }
  100% {
    opacity: 0;
    transform-origin: center center;
    transform: translate3d(-50%, -0%, 0) scale3d(0.85, 0.85, 0.85)
  }
`;

const modalInit = css`
  display: none;
`;

const modalAfterHide = modalInit;

const modalFadeShow = css`
  animation: ${fadeIn} 0.25s ease-in-out;
  animation-fill-mode: forwards;
`;

const modalFadeHide = css`
  animation: ${fadeOut} 0.25s ease-in-out;
  animation-fill-mode: forwards;
`;

export const maskStyles = {
  init: modalInit,
  afterHide: modalAfterHide,
  afterShow: css``,
  show: modalFadeShow,
  hide: modalFadeHide,
};

const modalZoomShow = css`
  animation: ${zoomIn} 0.25s ease-in-out;
  animation-fill-mode: forwards;
`;

const modalZoomHide = css`
  animation: ${zoomOut} 0.25s ease-in-out;
  animation-fill-mode: forwards;
`;

export const modalStyles = {
  init: modalInit,
  afterHide: modalAfterHide,
  show: modalZoomShow,
  hide: modalZoomHide,
};
