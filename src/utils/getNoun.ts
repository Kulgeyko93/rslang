export const getNoun = (count: number, one: string, few: string, many: string): string => {
  let n = Math.abs(count);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return `${count} ${many}`;
  }
  n %= 10;
  if (n === 1) {
    return `${count} ${one}`;
  }
  if (n >= 2 && n <= 4) {
    return `${count} ${few}`;
  }
  return `${count} ${many}`;
};
