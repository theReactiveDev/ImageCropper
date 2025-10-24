export async function drawMaskedImage(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    throw new Error('No 2d context');
  }

  function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
    });
  }

  const [img, mask] = await Promise.all([
    loadImage(
      'https://s3.in.axelnn.com/dev-vinteo-ai/items/b2a7a4de-5f26-4584-8653-6a6da7a6b8b0/1761128139.png '
    ),
    loadImage(
      'https://s3.in.axelnn.com/dev-vinteo-ai/outputs/workflows/generic/remove-bg/b2a7a4de-5f26-4584-8653-6a6da7a6b8b0/01_removed_background_mask.png'
    ),
  ]);

  canvas.width = img.width;
  canvas.height = img.height;

  //   const scale = Math.min(
  //     canvas.width / mask.width,
  //     canvas.height / mask.height
  //   );

  const offsetX = (canvas.width - mask.width) / 2;
  const offsetY = (canvas.height - mask.height) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(mask, offsetX, offsetY, mask.width, mask.height);

  const maskData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const maskPixels = maskData.data;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const imagePixels = imageData.data;

  for (let i = 0; i < imagePixels.length; i += 4) {
    const alphaValue = maskPixels[i];
    imagePixels[i + 3] = alphaValue;
  }

  ctx.putImageData(imageData, 0, 0);
}
