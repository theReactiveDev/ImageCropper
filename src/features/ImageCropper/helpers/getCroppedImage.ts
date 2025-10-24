import type { PixelCrop } from 'react-image-crop';
import { drawCroppedImage } from './drawCroppedImage';

export async function getCroppedImage(
  sourceCanvas: HTMLCanvasElement,
  crop: PixelCrop
) {
  const croppedCanvas = new OffscreenCanvas(crop.width, crop.height);

  const ctx = croppedCanvas.getContext('2d');
  if (!ctx) {
    throw new Error('No 2d context');
  }

  drawCroppedImage(sourceCanvas, croppedCanvas, crop);

  const blob = await croppedCanvas.convertToBlob({
    type: 'image/png',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'cropped-image.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
