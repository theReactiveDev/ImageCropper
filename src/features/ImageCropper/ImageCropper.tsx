import { useEffect, useRef, useState } from 'react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';

import { Button } from '@components/Button';
import { getCroppedImage, drawMaskedImage } from './helpers';
import style from './imageCropper.module.css';
import 'react-image-crop/dist/ReactCrop.css';

export const ImageCropper = () => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [imageIsReady, setImageIsReady] = useState(false);
  const [cropIsActive, setCropIsActive] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleCropActive() {
    setCropIsActive(true);
  }

  function handleDownload() {
    if (completedCrop?.width && completedCrop?.height && canvasRef.current) {
      try {
        getCroppedImage(canvasRef.current, completedCrop);
      } catch (error) {
        alert(error);
      }
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      drawMaskedImage(canvasRef.current)
        .then(() => setImageIsReady(true))
        .catch(alert);
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.cropContainer}>
        <div className={style.scrollWrapper}>
          <ReactCrop
            className={style.crop}
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            disabled={!cropIsActive}
            onComplete={(crop) => setCompletedCrop(crop)}
            minWidth={50}
            minHeight={50}
          >
            <canvas className={style.canvas} ref={canvasRef} />
          </ReactCrop>
        </div>
      </div>

      <div className={style.buttonGroup}>
        <Button
          variant="dark"
          disabled={!imageIsReady}
          onClick={handleCropActive}
        >
          Crop
        </Button>

        <Button disabled={!completedCrop} onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
};
