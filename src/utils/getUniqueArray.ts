export const getUniqueArray = (array: Array<string>): Array<string> =>
  array.reduce((res: Array<string>, item) => {
    if (!res.includes(item)) {
      res.push(item);
    }
    return res;
  }, []);
