/* eslint-disable array-callback-return */
import { Word } from '../types';

export const createArrayEnAndRUWords = (wordList: Array<Word>): Array<Array<string>> => {
  const resultRu: Array<string> = [];
  const resultEn: Array<string> = [];

  wordList.map((item: Word) => {
    resultEn.push(item.word);
    resultRu.push(item.wordTranslate);
  });

  return [resultEn, resultRu];
};
