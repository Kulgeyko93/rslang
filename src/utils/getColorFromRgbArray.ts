export default function getColorFromRgbArray(rgbArray: number[]): string {
  return `rgba(${[...rgbArray, 0.5].join(', ')})`;
}
