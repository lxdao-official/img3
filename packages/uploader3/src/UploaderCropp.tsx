import Cropper from 'cropperjs';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Icon as ReactIcon, IconProps } from '@iconify/react';

import { CropperjsCSS } from './CropperjsCSS';

export type UploaderCroppProps = {
  size?: { width: number | string; height: number | string };
  aspectRatio?: number;
  fileUrl: string;
  fileType: string;
  show?: boolean;
  onConfirm?: (options: { imageData: string; thumbData: string; cropData: Cropper.Data }) => void;
  onCancel?: () => void;
};

export type CroppInstance = { replaceUrl: (url: string) => void };

export const UploaderCropp = forwardRef<CroppInstance, UploaderCroppProps>((props, ref) => {
  const { size = { width: 400, height: 400 }, fileUrl, fileType, ...restProps } = props;

  const cropperRef = useRef<Cropper>();
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scaleXRef = useRef(1);
  const scaleYRef = useRef(1);

  const [toast, setToast] = useState<string>('Initializing...');
  const [cropping, setCropping] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number>(restProps.aspectRatio || 1);
  const [show, setShow] = useState(restProps.show!);
  const [destroy, setDestroy] = useState(false);

  const cropperOptions: Cropper.Options = useMemo(() => {
    return {
      viewMode: 2,
      guides: false,
      highlight: false,
      aspectRatio: aspectRatio,
      autoCrop: true,
      autoCropArea: 1,
      zoomable: true,
      zoomOnTouch: true,
      zoomOnWheel: true,
      ready(this: { cropper: Cropper }) {
        cropperRef.current = this.cropper;
        setToast('');
        setCropping(false);
      },
    };
  }, [aspectRatio]);

  useEffect(() => {
    setShow(restProps.show!);
    if (restProps.show) {
      setDestroy(false);
    }
    setToast(restProps.show ? 'Initializing...' : '');
  }, [props.show]);

  useEffect(() => {
    const instance: CroppInstance = {
      replaceUrl: (url: string) => {
        imageRef.current!.src = url;
        if (cropperRef.current) {
          cropperRef.current.destroy();
        }
        cropperRef.current = new Cropper(imageRef.current!, cropperOptions);
      },
    };
    if ('function' == typeof ref) {
      ref(instance);
    } else if ('object' == typeof ref && ref) {
      ref.current = instance;
    }
  }, []);

  const initCropper = useCallback((imgElement: HTMLImageElement) => {
    new Cropper(imgElement!, cropperOptions);
  }, []);

  if (destroy) return null;

  return (
    <>
      <CropperjsCSS />
      <AnimationCss />
      <Mask
        ref={maskRef}
        className={show ? 'u3-fadeIn' : 'u3-fadeOut'}
        onAnimationEnd={(e) => {
          const target = e.currentTarget;
          if (target.classList.contains('u3-fadeIn')) {
            target.classList.remove('u3-fadeIn');
          } else if (target.classList.contains('u3-fadeOut')) {
            setDestroy(true);
          }
        }}
      />
      <Toast style={{ display: toast ? 'block' : 'none' }}>{toast}</Toast>
      <CroppModal
        ref={wrapperRef}
        className={show ? 'u3-zoomIn' : 'u3-zoomOut'}
        onAnimationEnd={(e) => {
          const target = e.currentTarget;
          if (target.classList.contains('u3-zoomIn')) {
            target.classList.remove('u3-zoomIn');
          }
        }}
      >
        <CropperWrapper>
          <CroppCanvas size={size}>
            <CroppImage
              src={fileUrl}
              ref={(image) => {
                if (image) {
                  imageRef.current = image;
                  initCropper(image);
                }
              }}
            />
          </CroppCanvas>
        </CropperWrapper>
        <CroppTools>
          <ActionGroup>
            {/* ratio action */}
            <Action
              active={16 / 9 === aspectRatio}
              onClick={() => {
                setAspectRatio(16 / 9);
                cropperRef.current?.setAspectRatio(16 / 9);
              }}
            >
              <Ratio>16:9</Ratio>
            </Action>
            <Action
              active={4 / 3 === aspectRatio}
              onClick={() => {
                setAspectRatio(4 / 3);
                cropperRef.current?.setAspectRatio(4 / 3);
              }}
            >
              <Ratio>4:3</Ratio>
            </Action>
            <Action
              active={1 === aspectRatio}
              onClick={() => {
                setAspectRatio(1);
                cropperRef.current?.setAspectRatio(1);
              }}
            >
              <Ratio>1:1</Ratio>
            </Action>
            <Action
              active={2 / 3 === aspectRatio}
              onClick={() => {
                setAspectRatio(2 / 3);
                cropperRef.current?.setAspectRatio(2 / 3);
              }}
            >
              <Ratio>2:3</Ratio>
            </Action>
            <Action
              active={0 === aspectRatio}
              onClick={() => {
                setAspectRatio(0);
                cropperRef.current?.setAspectRatio(NaN);
              }}
            >
              <Icon icon={'iconoir:frame-simple'} />
            </Action>
          </ActionGroup>
          {/*<ActionGroup>*/}
          {/*  <Action*/}
          {/*    onClick={() => {*/}
          {/*      cropperRef.current?.rotate(-45);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <Icon icon={'iconoir:long-arrow-left-down'} />*/}
          {/*  </Action>*/}
          {/*  <Action*/}
          {/*    onClick={() => {*/}
          {/*      cropperRef.current?.rotate(45);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <Icon icon={'iconoir:long-arrow-right-down'} />*/}
          {/*  </Action>*/}
          {/*</ActionGroup>*/}
          {/*<ActionGroup>*/}
          {/*  <Action*/}
          {/*    onClick={() => {*/}
          {/*      scaleXRef.current = scaleXRef.current * -1;*/}
          {/*      cropperRef.current?.scaleX(scaleXRef.current);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    /!*<Icon icon={'iconoir:divide-selection-2'} rotate={1} />*!/*/}
          {/*    <Icon icon="iconoir:flip-reverse" hFlip={true} />*/}
          {/*  </Action>*/}
          {/*  <Action*/}
          {/*    onClick={() => {*/}
          {/*      scaleYRef.current = scaleYRef.current * -1;*/}
          {/*      cropperRef.current?.scaleY(scaleYRef.current);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    /!*<Icon icon={'iconoir:divide-selection-2'} />*!/*/}
          {/*    <Icon icon="iconoir:flip-reverse" rotate={3} />*/}
          {/*  </Action>*/}
          {/*</ActionGroup>*/}
          {/*<ActionGroup>*/}
          {/*  <Action*/}
          {/*    onClick={() => {*/}
          {/*      cropperRef.current?.zoom(0.1);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <Icon icon={'iconoir:zoom-in'} />*/}
          {/*    /!*<Icon icon="iconoir:scale-frame-enlarge" />*!/*/}
          {/*  </Action>*/}
          {/*  <Action*/}
          {/*    onClick={() => {*/}
          {/*      cropperRef.current?.zoom(-0.1);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <Icon icon={'iconoir:zoom-out'} />*/}
          {/*    /!*<Icon icon="iconoir:scale-frame-reduce" />*!/*/}
          {/*  </Action>*/}
          {/*</ActionGroup>*/}
          <ActionGroup>
            <Action
              onClick={() => {
                cropperRef.current?.reset();
              }}
            >
              <Icon icon={'iconoir:refresh'} />
            </Action>
            <Action
              onClick={() => {
                if (cropping) return;
                props.onCancel?.();
              }}
            >
              <Icon icon={'iconoir:cancel'} />
            </Action>
            <Action
              active={cropping}
              onClick={() => {
                if (cropping) return;
                setCropping(true);
                const cropper = cropperRef.current;
                if (cropper) {
                  window.requestAnimationFrame(() => {
                    const imageBase64 = cropper.getCroppedCanvas().toDataURL(fileType);
                    const thumbnailBase64 = cropper.getCroppedCanvas({ maxWidth: 600, maxHeight: 600 }).toDataURL();
                    const cropData = cropper.getData(true);
                    props.onConfirm?.({ imageData: imageBase64, thumbData: thumbnailBase64, cropData });
                  });
                }
              }}
            >
              {cropping ? <Icon icon={'line-md:loading-twotone-loop'} /> : <Icon icon={'iconoir:check'} />}
            </Action>
          </ActionGroup>
        </CroppTools>
      </CroppModal>
    </>
  );
});

const AnimationCss = createGlobalStyle`
  @keyframes u3-fade-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }

  @keyframes u3-fade-out {
    0% {
      opacity: 1
    }
    100% {
      opacity: 0
    }
  }

  .u3-fadeIn {
    animation: u3-fade-in 0.25s ease-in-out;
    animation-fill-mode: forwards;
  }

  .u3-fadeOut {
    animation: u3-fade-out 0.25s ease-in-out;
    animation-fill-mode: forwards;
  }

  @keyframes u3-zoom-in {
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
  }

  @keyframes u3-zoom-out {
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
  }

  .u3-zoomIn {
    animation: u3-zoom-in 0.25s ease-in-out;
    animation-fill-mode: forwards;
  }

  .u3-zoomOut {
    animation: u3-zoom-out 0.25s ease-in-out;
    animation-fill-mode: forwards;
  }
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 1000;
`;

const CroppModal = styled.div<Partial<UploaderCroppProps>>`
  --u3-wrapper-color: rgb(244, 244, 244);
  --u3-transparent-bg-color: rgb(236, 236, 236);
  --u3-transparent-bg-color2: rgb(200, 200, 200);
  --u3-action-bg-color: rgb(238, 238, 238);
  --u3-action-bg-color-active: rgb(228, 228, 228);
  --u3-action-text-color: rgb(90, 90, 90);
  --u3-border-radius: 5px;

  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);

  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate3d(-50%, -0%, 0);
  background-color: var(--u3-wrapper-color);
  border-radius: 10px;
  padding: 20px;
  z-index: 1001;

  @media (prefers-color-scheme: dark) {
    --u3-wrapper-color: rgb(40, 40, 40);
    --u3-transparent-bg-color: rgb(100, 100, 100);
    --u3-transparent-bg-color2: rgb(120, 120, 120);
    --u3-action-bg-color: rgb(74, 74, 74);
    --u3-action-bg-color-active: rgb(64, 64, 64);
    --u3-action-text-color: rgb(180, 180, 180);
  }
`;

const CropperWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CroppCanvas = styled.div<Pick<UploaderCroppProps, 'size'>>`
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
  //background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
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

const CroppImage = styled.img`
  background-color: var(--u3-transparent-bg-color);
  max-width: 100%;
  max-height: 100%;
`;

const CroppTools = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const Toast = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -0%, 0);
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 10px;
  color: #fff;
  z-index: 1110;
  padding: 20px;
`;

const Action = styled.div<{ active?: boolean }>`
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

const Ratio = styled.div<{ active?: boolean }>`
  border: 1px solid var(--u3-action-text-color);
  display: block;
  height: 16px;
  transform: scale(0.82);
  line-height: 16px;
  padding: 1px 2px;
  font-size: 12px;
  border-radius: 4px;
  text-align: center;
  min-width: 16px;
`;

const ActionGroup = styled.div`
  display: flex;
  border-radius: var(--u3-border-radius);

  & + & {
    margin-left: 10px;
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

const Icon = (props: IconProps) => {
  let { style, ...restProps } = props;
  return <ReactIcon style={{ lineHeight: 0, fontSize: 20, height: 20, width: 20 }} {...restProps} />;
};
