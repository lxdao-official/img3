import Cropper from 'cropperjs';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { Icon as IconifyIcon, IconProps } from '@iconify/react';

import { CropperjsCSS } from '../CropperjsCSS';
import { ModalStatus } from '../types';
import { maskStyles } from './styles';

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

export const UploaderCrop = forwardRef<CroppInstance, UploaderCroppProps>((props, ref) => {
  const { size = { width: 400, height: 400 }, fileUrl, fileType, ...restProps } = props;

  const [modalStatus, setModalStatus] = useState<ModalStatus>('init');
  const [cropperReady, setCropperReady] = useState<boolean>(false);

  const cropperRef = useRef<Cropper>();
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [cropping, setCropping] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number>(restProps.aspectRatio || 1);

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
      toggleDragModeOnDblclick: true,
      ready(this: { cropper: Cropper }) {
        cropperRef.current = this.cropper;
        setCropping(false);
        setCropperReady(true);
      },
    };
  }, [aspectRatio]);

  useEffect(() => {
    if (modalStatus === 'init') {
      if (props.show) {
        setModalStatus('show');
      }
    } else {
      if (props.show) {
        if (modalStatus === 'afterHide' || modalStatus === 'hide') {
          setModalStatus('show');
        }
      } else {
        if (modalStatus === 'afterShow' || modalStatus === 'show') {
          setModalStatus('hide');
        }
      }
    }
  }, [props.show, modalStatus]);

  useEffect(() => {
    const instance: CroppInstance = {
      replaceUrl: (url: string) => {
        imageRef.current!.src = url;
        cropperRef.current?.destroy();
        cropperRef.current = new Cropper(imageRef.current!, cropperOptions);
      },
    };
    if ('function' == typeof ref) {
      ref(instance);
    } else if ('object' == typeof ref && ref) {
      ref.current = instance;
    }
  }, [cropperOptions, ref]);

  const initCropper = useCallback(
    (imgElement: HTMLImageElement) => {
      if (!imgElement.classList.contains('cropper-hidden')) {
        setCropperReady(false);
        new Cropper(imgElement!, cropperOptions);
      }
    },
    [cropperOptions]
  );

  return (
    <>
      <CropperjsCSS />
      <Mask
        modalStatus={modalStatus}
        ref={maskRef}
        style={{ display: modalStatus == 'init' ? 'none' : '' }}
        onAnimationEnd={() => {
          if (modalStatus === 'hide') {
            setModalStatus('afterHide');
          }
        }}
      />
      <CroppModal
        ref={wrapperRef}
        modalStatus={modalStatus}
        onAnimationStart={() => {
          if (modalStatus === 'show') {
            window.requestAnimationFrame(() => {
              initCropper(imageRef.current!);
            });
          }
        }}
        onAnimationEnd={(event) => {
          const target = event.currentTarget;
          if (target.classList.contains('u3-hide')) {
            if (cropperRef.current) {
              cropperRef.current.destroy();
            }
          }
        }}
      >
        <CropperWrapper>
          <CroppCanvas size={size}>
            <CroppImage src={fileUrl} style={{ maxWidth: size.width, maxHeight: size.height }} ref={imageRef} />
          </CroppCanvas>
        </CropperWrapper>
        <CroppTools>
          <ActionGroup>
            <Action
              onClick={() => {
                if (cropping || !cropperReady) return;
                cropperRef.current?.reset();
              }}
            >
              <Icon icon={'iconoir:refresh'} />
            </Action>
            <Action
              onClick={() => {
                if (cropping || !cropperReady) return;
                cropperRef.current?.destroy();
                props.onCancel?.();
              }}
            >
              <Icon icon={'iconoir:cancel'} />
            </Action>
            <Action
              active={cropping}
              onClick={() => {
                if (cropping || !cropperReady) return;
                setCropping(true);
                const cropper = cropperRef.current;
                if (cropper) {
                  window.requestAnimationFrame(() => {
                    const imageBase64 = cropper.getCroppedCanvas().toDataURL(fileType);
                    const thumbnailBase64 = cropper.getCroppedCanvas({ maxWidth: 600, maxHeight: 600 }).toDataURL();
                    const cropData = cropper.getData(true);
                    setCropping(false);
                    props.onConfirm?.({ imageData: imageBase64, thumbData: thumbnailBase64, cropData });
                  });
                }
              }}
            >
              {cropperReady ? (
                cropping ? (
                  <Icon icon={'line-md:loading-twotone-loop'} />
                ) : (
                  <Icon icon={'iconoir:check'} />
                )
              ) : (
                <Icon icon="eos-icons:three-dots-loading" />
              )}
            </Action>
          </ActionGroup>
          <ActionGroup>
            {/* ratio action */}
            <Action
              active={16 / 9 === aspectRatio}
              onClick={() => {
                setAspectRatio(16 / 9);
                cropperRef.current?.reset();
                cropperRef.current?.setAspectRatio(16 / 9);
              }}
            >
              <Ratio>16:9</Ratio>
            </Action>
            <Action
              active={4 / 3 === aspectRatio}
              onClick={() => {
                setAspectRatio(4 / 3);
                cropperRef.current?.reset();
                cropperRef.current?.setAspectRatio(4 / 3);
              }}
            >
              <Ratio>4:3</Ratio>
            </Action>
            <Action
              active={1 === aspectRatio}
              onClick={() => {
                setAspectRatio(1);
                cropperRef.current?.reset();
                cropperRef.current?.setAspectRatio(1);
              }}
            >
              <Ratio>1:1</Ratio>
            </Action>
            <Action
              active={2 / 3 === aspectRatio}
              onClick={() => {
                setAspectRatio(2 / 3);
                cropperRef.current?.reset();
                cropperRef.current?.setAspectRatio(2 / 3);
              }}
            >
              <Ratio>2:3</Ratio>
            </Action>
            <Action
              active={0 === aspectRatio}
              onClick={() => {
                setAspectRatio(0);
                cropperRef.current?.reset();
                cropperRef.current?.setAspectRatio(NaN);
              }}
            >
              <Icon icon={'iconoir:frame-simple'} />
            </Action>
          </ActionGroup>
        </CroppTools>
      </CroppModal>
    </>
  );
});

UploaderCrop.displayName = 'UploaderCrop';

const Mask = styled.div<{ modalStatus: ModalStatus }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 1000;
  ${(props) => maskStyles[props.modalStatus]}
`;

const CroppModal = styled.div<{ modalStatus: ModalStatus }>`
  --u3-wrapper-color: rgb(244, 244, 244);
  --u3-transparent-bg-color: rgb(236, 236, 236);
  --u3-transparent-bg-color2: rgb(200, 200, 200);
  --u3-action-bg-color: rgb(238, 238, 238);
  --u3-action-bg-color-active: rgb(228, 228, 228);
  --u3-action-text-color: rgb(90, 90, 90);
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
  padding-top: 20px;
  flex-direction: row-reverse;
  justify-content: space-between;
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

const ActionGroup = styled.div`
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

const Icon = (props: IconProps) => {
  let { style, ...restProps } = props;
  return <IconifyIcon style={{ lineHeight: 0, fontSize: 20, height: 20, width: 20 }} {...restProps} />;
};
