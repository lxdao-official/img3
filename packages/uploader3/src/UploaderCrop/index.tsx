import Cropper from 'cropperjs';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CropperjsCSS } from '../CropperjsCSS';
import { ModalStatus } from '../types';
import {
  Action,
  ActionGroup,
  CroppCanvasWrapper,
  CropperWrapper,
  CroppImage,
  CroppModal,
  CroppTools,
  Icon,
  Mask,
  Ratio,
} from './ui';

export type UploaderCroppProps = {
  size?: { width: number | string; height: number | string };
  aspectRatio?: number;
  fileUrl: string;
  fileType: string;
  fileName: string;
  show?: boolean;
  onConfirm?: (options: { imageData: string | null; thumbData: string | null; cropData: Cropper.Data | null }) => void;
  onCancel?: () => void;
};

export const UploaderCrop: React.FC<UploaderCroppProps> = (props) => {
  const { size = { width: 400, height: 400 }, fileUrl, fileType, fileName, ...restProps } = props;

  const [modalStatus, setModalStatus] = useState<ModalStatus>('init');
  const [cropperReady, setCropperReady] = useState<boolean>(false);

  const cropperRef = useRef<Cropper>();
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [cropping, setCropping] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number>(restProps.aspectRatio || 1);
  const [fullSize, setFullSize] = useState<boolean>(false);

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
    cropperRef.current?.destroy();
    setCropperReady(false);
    cropperRef.current = new Cropper(imageRef.current!, cropperOptions);
  }, [fileUrl, fileType]);

  const initCropper = useCallback(
    (imgElement: HTMLImageElement) => {
      if (!imgElement.classList.contains('cropper-hidden')) {
        setCropperReady(false);
        new Cropper(imgElement!, cropperOptions);
      }
    },
    [cropperOptions]
  );

  const updateAspectRatio = function (r: number, v?: number) {
    if (fullSize) {
      cropperRef.current?.enable();
      setFullSize(false);
    }
    setAspectRatio(r);
    cropperRef.current?.reset();
    cropperRef.current?.setAspectRatio(v ?? r);
  };

  return (
    <>
      <CropperjsCSS />
      <Mask
        role={'mask'}
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
        role={'modal'}
        ref={wrapperRef}
        modalStatus={modalStatus}
        data-file-type={fileType}
        onAnimationStart={() => {
          if (modalStatus === 'show') {
            window.requestAnimationFrame(() => {
              initCropper(imageRef.current!);
            });
          }
        }}
        onAnimationEnd={(event) => {
          if (modalStatus === 'hide') {
            if (cropperRef.current) {
              cropperRef.current.destroy();
            }
          }
        }}
      >
        <div style={{ paddingBottom: '10px', color: 'var(--u3-text-color)' }}>{fileName}</div>
        <CropperWrapper role={'cropper'}>
          <CroppCanvasWrapper size={size}>
            <CroppImage src={fileUrl} style={{ maxWidth: size.width, maxHeight: size.height }} ref={imageRef} />
          </CroppCanvasWrapper>
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
                    // No cropping of files with aspectRatio of 0
                    if (aspectRatio === 0 && fullSize) {
                      setCropping(false);
                      props.onConfirm?.({ imageData: null, thumbData: null, cropData: null });
                    } else {
                      const imageBase64 = cropper.getCroppedCanvas().toDataURL(fileType);
                      const thumbnailBase64 = cropper.getCroppedCanvas({ maxWidth: 600, maxHeight: 600 }).toDataURL();
                      const cropData = cropper.getData(true);
                      setCropping(false);
                      props.onConfirm?.({ imageData: imageBase64, thumbData: thumbnailBase64, cropData });
                    }
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
                updateAspectRatio(16 / 9);
              }}
            >
              <Ratio>16:9</Ratio>
            </Action>
            <Action
              active={4 / 3 === aspectRatio}
              onClick={() => {
                updateAspectRatio(4 / 3);
              }}
            >
              <Ratio>4:3</Ratio>
            </Action>
            <Action
              active={1 === aspectRatio}
              onClick={() => {
                updateAspectRatio(1);
              }}
            >
              <Ratio>1:1</Ratio>
            </Action>
            <Action
              active={2 / 3 === aspectRatio}
              onClick={() => {
                updateAspectRatio(2 / 3);
              }}
            >
              <Ratio>2:3</Ratio>
            </Action>
            <Action
              active={0 === aspectRatio && !fullSize}
              onClick={() => {
                updateAspectRatio(0, NaN);
              }}
            >
              <Icon icon={'iconoir:frame-simple'} height={16} width={16} />
            </Action>
            <Action
              active={fullSize}
              onClick={() => {
                updateAspectRatio(0, NaN);
                setFullSize(true);
                cropperRef.current?.disable();
              }}
            >
              <Ratio>full</Ratio>
            </Action>
          </ActionGroup>
        </CroppTools>
      </CroppModal>
    </>
  );
};

UploaderCrop.displayName = 'UploaderCrop';
