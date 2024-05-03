export const isPointerInsideCanvas = (
  el: HTMLCanvasElement | null,
  e: MouseEvent
) => {
  const { left, right, top, bottom } = el!.getBoundingClientRect();
  const x = e.clientX >= left && e.clientX <= right;
  const y = e.clientY >= top && e.clientY <= bottom;

  if (x && y) return true;
  else return false;
};
