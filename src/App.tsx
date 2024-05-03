import { useEffect, useRef, useState } from 'react';

import colorPicker from './assets/icons/colorPicker.svg';
import { Canvas } from './components/Canvas';
import { ColorDropper } from './components/ColorDropper';
import { getColor } from './utils/getColor';
import { isPointerInsideCanvas } from './utils/isPointerInsideCanvas';

import testImage from './assets/images/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg';

const App = () => {
  const [hexCode, setHexCode] = useState<string>('');
  const [isDropperActive, setIsDropperActive] = useState<boolean>(false);
  const [showColorDropper, setShowColorDropper] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const colorDropperRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const dropperCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const toggleDropper = () => setIsDropperActive((prevValue) => !prevValue);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dropper = dropperCanvasRef.current;
    let color: string | undefined;

    function mouseClickHandler() {
      if (color) setHexCode(color);
    }

    const mouseMoveHandler = (e: MouseEvent) => {
      if (dropper) {
        const ctx = dropper.getContext('2d');
        const image = new Image();
        image.onload = () => {
          const width = canvas!.width;
          const height = canvas!.height;
          ctx?.drawImage(image, 0, 300, 200, 200, 0, 0, width, height);
        };
        image.src = testImage;
      }
      const colorDropper = colorDropperRef.current;
      const checkPointerPosition = isPointerInsideCanvas(canvas, e);
      color = getColor(canvas, e);

      if (colorDropper) {
        colorDropper.style.left = `${e.clientX}px`;
        colorDropper.style.top = `${e.clientY}px`;
        pathRef.current!.setAttribute('fill', color!);
        // colorDropper!.style.cursor = 'none';
      }

      if (checkPointerPosition) {
        setShowColorDropper(true);
      } else {
        setShowColorDropper(false);
      }
    };

    if (isDropperActive) {
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('click', mouseClickHandler);
    }

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('click', mouseClickHandler);
    };
  }, [isDropperActive]);

  return (
    <>
      <div className='flex mx-auto max-w-fit flex-col gap-y-4 p-6'>
        <div className='flex items-center justify-center'>
          <div
            className='flex flex-[1_1_50%] cursor-pointer gap-x-3'
            onClick={toggleDropper}
          >
            <img
              src={colorPicker}
              alt='color picker'
              className='fill-red-500 stroke-orange-300'
            />
            {isDropperActive && <span>Dropper is active</span>}
          </div>
          <div className='flex-[1_1_50%]'>
            <p>{hexCode}</p>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Canvas canvasRef={canvasRef} />
        </div>
      </div>
      {showColorDropper && (
        <ColorDropper
          colorDropperRef={colorDropperRef}
          dropperCanvasRef={dropperCanvasRef}
          pathRef={pathRef}
        />
      )}
    </>
  );
};

export default App;
