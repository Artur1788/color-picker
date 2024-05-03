export const rgbaToHex = (r: number, g: number, b: number, a: number) => {
  const alphaHex = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0');

  const redHex = r.toString(16).padStart(2, '0');
  const greenHex = g.toString(16).padStart(2, '0');
  const blueHex = b.toString(16).padStart(2, '0');

  const hexColor = `#${redHex}${greenHex}${blueHex}${alphaHex}`;

  return hexColor.toUpperCase().slice(0, -4);
};
