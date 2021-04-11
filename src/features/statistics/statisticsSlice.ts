import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getNoun } from '../../utils/getNoun';
import { getUniqueArray } from '../../utils/getUniqueArray';

export interface BarChartDataItem {
  name: string;
  value: number;
  label: string;
}

export interface LineChartDataItem {
  date: string;
  value: number;
}

interface StatisticsState {
  learnedWords: Array<BarChartDataItem>;
  correctAnswers: Array<BarChartDataItem>;
  seriesCorrectAnswers: Array<BarChartDataItem>;
}

export interface DataItem {
  name: string;
  words: Array<string>;
  countCorrectAnswers: number;
  longestSeriesCorrectAnswers: number;
}
export interface Data {
  date: string;
  data: Array<DataItem>;
}
// если в какую-то игру не играли, то в localStorage не заносим о ней результаты.
// Из localStorage надо удалять statistics, если текущая дата изменилась
// const data: Data = {
//   date: '9 апреля',
//   data: [
//     {
//       name: 'Аудиовызов',
//       words: ['ahead', 'top', 'end', 'spring', 'hello'],
//       countCorrectAnswers: 2,
//       longestSeriesCorrectAnswers: 5,
//     },
//     {
//       name: 'Спринт',
//       words: ['ahead', 'top', 'end', 'spring'],
//       countCorrectAnswers: 1,
//       longestSeriesCorrectAnswers: 1,
//     },
//     {
//       name: 'Своя игра',
//       words: ['ahead', 'top', 'end', 'spring', 'today'],
//       countCorrectAnswers: 2,
//       longestSeriesCorrectAnswers: 18,
//     },
//     {
//       name: 'Саванна',
//       words: ['ahead', 'top', 'end', 'spring', 'today'],
//       countCorrectAnswers: 2,
//       longestSeriesCorrectAnswers: 18,
//     },
//   ],
// };

const initialState: StatisticsState = {
  learnedWords: [],
  correctAnswers: [],
  seriesCorrectAnswers: [],
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setStatistics: (state, action: PayloadAction<Data>) => {
      const dataFromLocalStorage = action.payload;
      const learnedWordsArr = dataFromLocalStorage.data.map((item) => ({
        name: item.name,
        value: item.words.length,
        label: getNoun(item.words.length, 'слово', 'слова', 'слов'),
      }));
      const allLearnedWords = dataFromLocalStorage.data.map((item) => item.words).flat();
      const learnedWords = getUniqueArray(allLearnedWords);
      learnedWordsArr.push({
        name: 'Общее кол-во',
        value: learnedWords.length,
        label: getNoun(learnedWords.length, 'слово', 'слова', 'слов'),
      });
      state.learnedWords = learnedWordsArr;
      const correctAnswersArr = dataFromLocalStorage.data.map((item) => {
        const percent = Math.round((item.countCorrectAnswers * 100) / item.words.length);
        return { name: item.name, value: percent, label: `${percent}%` };
      });
      const sumAllPercents = correctAnswersArr.reduce((res, item) => {
        // eslint-disable-next-line no-param-reassign
        res += item.value;
        return res;
      }, 0);
      const gamesCount = dataFromLocalStorage.data.length;
      const commonPercent = Math.round(sumAllPercents / gamesCount);
      correctAnswersArr.push({
        name: 'Общий %',
        value: commonPercent,
        label: `${commonPercent}%`,
      });
      state.correctAnswers = correctAnswersArr;
      state.seriesCorrectAnswers = dataFromLocalStorage.data.map((item) => ({
        name: item.name,
        value: item.longestSeriesCorrectAnswers,
        label: getNoun(item.longestSeriesCorrectAnswers, 'ответ', 'ответа', 'ответов'),
      }));
    },
  },
});

export const { setStatistics } = statisticsSlice.actions;

export const learnedWords = (state: RootState): Array<BarChartDataItem> => state.statistics.learnedWords;
export const correctAnswers = (state: RootState): Array<BarChartDataItem> => state.statistics.correctAnswers;
export const seriesAnswers = (state: RootState): Array<BarChartDataItem> => state.statistics.seriesCorrectAnswers;

export default statisticsSlice.reducer;
