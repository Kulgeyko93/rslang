import { Word } from '../features/types';
import { getRandom } from './getRandom';

const createIndiciesArrayWithPlayWordIndex = (arrayOfIndices: Array<number>, playWordIndex: number): Array<number> => {
  if (!arrayOfIndices.includes(playWordIndex)) {
    const newIndex = getRandom(arrayOfIndices.length);
    arrayOfIndices.splice(newIndex, 1, playWordIndex);
  }
  return arrayOfIndices;
};

export const createGameArray = (originArray: Array<Word>, arrayOfIndices: Array<number>): Array<Word> =>
  arrayOfIndices.map((indexNumber) => originArray[indexNumber]);

export const createWordsArray = (
  originArray: Array<Word>,
  arrayOfIndices: Array<number>,
  playWordIndex: number,
): Array<Word> => {
  createIndiciesArrayWithPlayWordIndex(arrayOfIndices, playWordIndex);
  return createGameArray(originArray, arrayOfIndices);
};
