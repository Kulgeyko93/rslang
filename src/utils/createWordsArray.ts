import { getRandom } from './getRandom';

const createIndiciesArrayWithPlayWordIndex = (arrayOfIndices: Array<number>, playWordIndex: number): Array<number> => {
  if (!arrayOfIndices.includes(playWordIndex)) {
    const newIndex = getRandom(arrayOfIndices.length);
    arrayOfIndices.splice(newIndex, 1, playWordIndex);
  }
  return arrayOfIndices;
};

export const createWordsArray = (
  originArray: Array<any>,
  arrayOfIndices: Array<number>,
  playWordIndex: number,
): Array<any> => {
  createIndiciesArrayWithPlayWordIndex(arrayOfIndices, playWordIndex);
  return arrayOfIndices.reduce((resultArray: Array<any>, indexNumber) => {
    resultArray.push(originArray[indexNumber]);
    return resultArray;
  }, []);
};
