import { useEffect, useRef, useState } from 'react';

import colorPicker from './assets/icons/colorPicker.svg';
import { Canvas } from './components/Canvas';
import { ColorDropper } from './components/ColorDropper';
import { getColor } from './utils/getColor';
import { isPointerInsideCanvas } from './utils/isPointerInsideCanvas';

const App = () => {
  const [hexCode, setHexCode] = useState<string>('');
  const [isDropperActive, setIsDropperActive] = useState<boolean>(false);
  const [showColorDropper, setShowColorDropper] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const colorDropperRef = useRef<HTMLDivElement | null>(null);
  const [imageData, setImageData] = useState<Uint8ClampedArray | undefined>(
    undefined
  );

  //Toggle color dropper functional
  const toggleDropper = () => setIsDropperActive((prevValue) => !prevValue);

  useEffect(() => {
    const canvas = canvasRef.current;
    let color: string | undefined;

    //Select and show color hex code
    function mouseClickHandler(e: MouseEvent) {
      const checkPointerPosition = isPointerInsideCanvas(canvas, e);
      if (checkPointerPosition && color) setHexCode(color);
    }

    //Handle mouse move event
    const mouseMoveHandler = (e: MouseEvent) => {
      const ctx = canvas?.getContext('2d', { willReadFrequently: true });
      const colorDropper = colorDropperRef.current;
      const { left, top } = canvas!.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      //Check if mouse pointer inside canvas or not
      const checkPointerPosition = isPointerInsideCanvas(canvas, e);
      //Get a specific mouse position and
      //return the color's hex code of a specific pixel
      color = getColor(canvas, e);

      //Get and save cropped image data
      setImageData(ctx?.getImageData(x - 5, y - 5, 11, 11).data);

      //If Color dropper exists, set position and hide mouse cursor
      if (colorDropper) {
        colorDropper.style.left = `${e.clientX}px`;
        colorDropper.style.top = `${e.clientY}px`;
        colorDropper!.style.cursor = 'none';
      }

      //Check if mouse pointer is inside canvas then show color dropper
      if (checkPointerPosition) {
        setShowColorDropper(true);
      } else {
        if (colorDropper) {
          setShowColorDropper(false);
        }
      }
    };

    //If user activate color dropper then add listeners
    //on mousemove and mouse click
    if (isDropperActive) {
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('click', mouseClickHandler);
    }

    return () => {
      //Remove event listeners on component's unmount
      //and when dependency array has changed
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('click', mouseClickHandler);
    };
  }, [isDropperActive]);

  return (
    <>
      <div className='flex mx-auto max-w-fit flex-col gap-y-4 pt-6'>
        <div className='flex items-center justify-center'>
          <div className='flex flex-[1_1_50%] gap-x-3 items-center'>
            <div
              className='p-3 bg-slate-400 rounded-full cursor-pointer'
              onClick={toggleDropper}
            >
              <img
                width={20}
                height={20}
                src={colorPicker}
                alt='color picker'
              />
            </div>
            {isDropperActive && (
              <span className='font-semibold text-lg'>
                Color dropper is active
              </span>
            )}
          </div>
          <div className='flex-[1_1_50%]'>
            <p className='text-lg font-bold'>{hexCode}</p>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Canvas canvasRef={canvasRef} />
        </div>
      </div>
      <ColorDropper
        colorDropperRef={colorDropperRef}
        imageData={imageData}
        showColorDropper={showColorDropper}
      />
    </>
  );
};

export default App;
