/* eslint-disable array-callback-return */
import { IWord } from '../interface/interfaces';

export const createArrayEnAndRUWords = (wordList: Array<IWord>): Array<Array<string>> => {
  const resultRu: Array<string> = [];
  const resultEn: Array<string> = [];

  wordList.map((item: IWord) => {
    resultEn.push(item.word);
    resultRu.push(item.wordTranslate);
  });

  return [resultEn, resultRu];
};
