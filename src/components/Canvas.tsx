import { FC, MutableRefObject, useEffect } from 'react';

import testImage from '../assets/images/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg';

interface CanvasInterface {
  width?: number;
  height?: number;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

export const Canvas: FC<CanvasInterface> = ({
  width = 1000,
  height = 600,
  canvasRef,
}) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const image = new Image();

    image.onload = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx?.drawImage(image, 0, 0, width, height);
    };
    image.src = testImage;
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className='border border-[black] border-solid'
    ></canvas>
  );
};
