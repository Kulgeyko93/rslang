import { Word } from '../features/types';
import { getRandom } from './getRandom';

const createIndiciesArrayWithPlayWordIndex = (arrayOfIndices: Array<number>, playWordIndex: number): Array<number> => {
  if (!arrayOfIndices.includes(playWordIndex)) {
    const newIndex = getRandom(arrayOfIndices.length);
    arrayOfIndices.splice(newIndex, 1, playWordIndex);
  }
  return arrayOfIndices;
};

export const createWordsArray = (
  originArray: Array<Word>,
  arrayOfIndices: Array<number>,
  playWordIndex: number,
): Array<Word> => {
  createIndiciesArrayWithPlayWordIndex(arrayOfIndices, playWordIndex);
  return arrayOfIndices.reduce((resultArray: Array<Word>, indexNumber) => {
    resultArray.push(originArray[indexNumber]);
    return resultArray;
  }, []);
};

// eslint-disable-next-line max-len
export const createGameArray = (originArray: Array<Word>, arrayOfIndices: Array<number>): Array<Word> =>
  arrayOfIndices.reduce((resultArray: Array<Word>, indexNumber) => {
    resultArray.push(originArray[indexNumber]);
    return resultArray;
  }, []);
