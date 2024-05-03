import { FC } from 'react';

interface ColorDropperProps {
  colorDropperRef: React.MutableRefObject<HTMLDivElement | null>;
  pathRef: React.MutableRefObject<SVGPathElement | null>;
  dropperCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export const ColorDropper: FC<ColorDropperProps> = ({
  colorDropperRef,
  pathRef,
  dropperCanvasRef,
}) => {
  return (
    <div
      className='
      flex 
      items-center
      justify-center
      fixed
      -translate-x-[50%]
      -translate-y-[50%]
      w-[150px]
      h=[150px]
      rounded-[50%]
      overflow-hidden
      '
      ref={colorDropperRef}
    >
      <div className='relative'>
        <canvas
          ref={dropperCanvasRef}
          width={150}
          height={150}
          className='
          bg-black/50
          absolute
          -z-10
          '
        ></canvas>
        <svg
          width='150'
          height='150'
          viewBox='0 0 160 160'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            ref={pathRef}
            fillRule='evenodd'
            clipRule='evenodd'
            d='M80 148C117.555 148 148 117.555 148 80C148 42.4446 117.555 12 80 12C42.4446 12 12 42.4446 12 80C12 117.555 42.4446 148 80 148ZM80 160C124.183 160 160 124.183 160 80C160 35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z'
            fill='#D9D9D9'
          />
        </svg>
      </div>
    </div>
  );
};
