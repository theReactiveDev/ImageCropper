import type { PixelCrop } from 'react-image-crop';

export async function drawCroppedImage(
  source: HTMLCanvasElement,
  target: OffscreenCanvas,
  crop: PixelCrop
) {
  const ctx = target.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scale = window.devicePixelRatio || 1;

  target.width = crop.width * scale;
  target.height = crop.height * scale;

  ctx.imageSmoothingQuality = 'high';
  ctx.scale(scale, scale);

  ctx.drawImage(
    source,
    crop.x,
    crop.y,
    target.width,
    target.height,
    0,
    0,
    target.width,
    target.height
  );
}
