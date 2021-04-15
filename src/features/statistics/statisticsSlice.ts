import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
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
  isLoading: boolean;
  wordsPerDayArr: Array<LineChartDataItem>;
  increaseWordsPerDayArr: Array<LineChartDataItem>;
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

const initialState: StatisticsState = {
  learnedWords: [],
  correctAnswers: [],
  seriesCorrectAnswers: [],
  isLoading: false,
  wordsPerDayArr: [],
  increaseWordsPerDayArr: [],
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    setLongTermStatistics: (state, action: PayloadAction<object>) => {
      const data = action.payload;
      // const data = { '10 апреля': 5, '11 апреля': 15, '13 апреля': 6 };
      // устанавливаем wordsPerDayArr
      const wordsPerDay = Object.keys(data).map((key) => ({
        date: key,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value: data[key],
      }));
      state.wordsPerDayArr = wordsPerDay;
      // устанавливаем increaseWordsPerDayArr
      let sum = 0;
      const increaseWordsPerDay = wordsPerDay.map((item) => {
        sum += item.value;
        return { date: item.date, value: sum };
      });
      state.increaseWordsPerDayArr = increaseWordsPerDay;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setStatistics: (state, action: PayloadAction<Data>) => {
      const dataFromLocalStorage = action.payload;
      // устанавливаем learnedWords
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
      // устанавливаем correctAnswers
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
      // устанавливаем seriesCorrectAnswers
      state.seriesCorrectAnswers = dataFromLocalStorage.data.map((item) => ({
        name: item.name,
        value: item.longestSeriesCorrectAnswers,
        label: getNoun(item.longestSeriesCorrectAnswers, 'ответ', 'ответа', 'ответов'),
      }));
    },
  },
});

export const { setStatistics, setIsLoading, setLongTermStatistics } = statisticsSlice.actions;

export const fetchStatistics = (userId: string): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const { data } = await axios.get(`/users/${userId}/statistics`);
    dispatch(setLongTermStatistics(data.optional.data));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  dispatch(setIsLoading(false));
};

export const learnedWords = (state: RootState): Array<BarChartDataItem> => state.statistics.learnedWords;
export const correctAnswers = (state: RootState): Array<BarChartDataItem> => state.statistics.correctAnswers;
export const seriesAnswers = (state: RootState): Array<BarChartDataItem> => state.statistics.seriesCorrectAnswers;
export const isLoading = (state: RootState): boolean => state.statistics.isLoading;
export const wordsPerDayArr = (state: RootState): Array<LineChartDataItem> => state.statistics.wordsPerDayArr;
export const increaseWordsPerDayArr = (state: RootState): Array<LineChartDataItem> =>
  state.statistics.increaseWordsPerDayArr;

export default statisticsSlice.reducer;
