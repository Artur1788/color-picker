import { FC } from 'react';
import { getMiddleElemIndex } from '../utils/getMiddleElemIndex';
import { rgbaToHex } from '../utils/rgbaToHex';

interface ColorDropperProps {
  colorDropperRef: React.MutableRefObject<HTMLDivElement | null>;
  imageData: Uint8ClampedArray | undefined;
  showColorDropper: boolean;
}

export const ColorDropper: FC<ColorDropperProps> = ({
  colorDropperRef,
  imageData,
  showColorDropper,
}) => {
  //Create colors data array from image data
  const colorsData = [];
  if (imageData) {
    for (let i = 0; i <= imageData.length; i += 4) {
      colorsData.push(
        rgbaToHex(
          imageData[i],
          imageData[i + 1],
          imageData[i + 2],
          imageData[i + 3]
        )
      );
    }
  }

  return (
    <div
      className={`
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
      ${
        showColorDropper
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }
      `}
      ref={colorDropperRef}
    >
      <div
        className='
          absolute
          -z-10
          grid
          grid-cols-[repeat(11,minmax(10.5px,1fr))]
          gap-[1px]
          bg-neutral-400
          w-[154px]
          h-[154px]'
      >
        {colorsData.map((color, idx) => (
          <div
            key={idx + color}
            style={{ backgroundColor: color }}
            className={`${
              //Add box shadow on middle element of data
              idx === getMiddleElemIndex(11, 11)
                ? 'shadow-[0_0_2px_1px_white]'
                : 'shadow-none'
            }`}
          />
        ))}
        <div
          className='
          absolute
          bottom-[20%]
          left-[50%]
          -translate-x-[50%]
          rounded-full
          bg-white
          px-2
          border'
        >
          <span className='text-xs font-semibold'>
            {/* Show hex code of the current pixel */}
            {colorsData[getMiddleElemIndex(11, 11)]}
          </span>
        </div>
      </div>
      <svg
        width='150'
        height='150'
        viewBox='0 0 160 160'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M80 148C117.555 148 148 117.555 148 80C148 42.4446 117.555 12 80 12C42.4446 12 12 42.4446 12 80C12 117.555 42.4446 148 80 148ZM80 160C124.183 160 160 124.183 160 80C160 35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z'
          // Fill icon with current pixel's color
          fill={colorsData[getMiddleElemIndex(11, 11)]}
        />
      </svg>
    </div>
  );
};
