import { rgbaToHex } from './rgbaToHex';

export const getColor = (canvas: HTMLCanvasElement | null, e: MouseEvent) => {
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const imageData = ctx.getImageData(x, y, 1, 1);
  const pixel = imageData.data;

  const hexColor = rgbaToHex(pixel[0], pixel[1], pixel[2], pixel[3]);

  return hexColor;
};
