export const getMiddleElemIndex = (rows: number, cols: number): number => {
  return cols * Math.floor(rows / 2) + Math.floor(cols / 2);
};
