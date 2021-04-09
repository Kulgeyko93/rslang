/* eslint-disable array-callback-return */
import { Word } from '../features/types';

export const createRandomArrRuWords = (wordList: Array<Word>): Array<string> => {
  const result: Array<string> = [];
  const randomHalfWordList: Array<string> = [];
  let indexRandomHalf = 0;
  for (let i = 0; i < wordList.length / 2; i++) {
    let randomIndex = Math.floor(Math.random() * (wordList.length));
    while (randomHalfWordList.indexOf(wordList[randomIndex].wordTranslate) !== -1) {
      randomIndex = Math.floor(Math.random() * (wordList.length));
    }
    randomHalfWordList.push(wordList[randomIndex].wordTranslate);
  }

  wordList.map((item: Word) => {
    if (randomHalfWordList.includes(item.wordTranslate)) {
      result.push(randomHalfWordList[indexRandomHalf]);
      indexRandomHalf += 1;
    } else {
      result.push(item.wordTranslate);
    }
  });

  return result;
};
