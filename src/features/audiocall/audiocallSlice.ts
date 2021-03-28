// import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRandomArray } from '../../utils/getRandomArray';
import { createWordsArray, createGameArray } from '../../utils/createWordsArray';
import { AppThunk, RootState } from '../../app/store';
import { getRandom } from '../../utils/getRandom';
import { Word } from '../types';
import { countPagesInGroup, wordsPerPage, wordsFromServer } from '../../const/games';
// import { countPagesInGroup, wordsPerPage } from '../../const/games';

interface AudiocallState {
  isGameOpenFromTextBook: boolean;
  currentLevel: string;
  originWordsArray: Array<Word>;
  currentWordIndex: number;
  currentWord: Word | null;
  playWordsArray: Array<Word>;
  isPlaying: boolean;
  wrongAnswers: Array<Word>;
  correctAnswers: Array<Word>;
  isGameEnd: boolean;
  isLoading: boolean;
}

const initialState: AudiocallState = {
  isGameOpenFromTextBook: false,
  currentLevel: '',
  originWordsArray: [],
  currentWordIndex: 0,
  currentWord: null,
  playWordsArray: [],
  isPlaying: false,
  wrongAnswers: [],
  correctAnswers: [],
  isGameEnd: false,
  isLoading: false,
};

export const audiocallSlice = createSlice({
  name: 'audiocall',
  initialState,
  reducers: {
    setOriginWordsArray: (state, action: PayloadAction<Array<Word>>) => {
      const data = action.payload;
      const newArrayOfIndices = getRandomArray(data.length, data.length);
      state.originWordsArray = createGameArray(data, newArrayOfIndices);
    },
    setPlayWordsArray: (state) => {
      if (state.currentWordIndex < state.originWordsArray.length && state.wrongAnswers.length < 5) {
        const data = state.originWordsArray;
        const newArrayOfIndices = getRandomArray(data.length, wordsPerPage);
        const newPlayWordsArray = createWordsArray(data, newArrayOfIndices, state.currentWordIndex);
        state.playWordsArray = newPlayWordsArray;
      } else {
        state.isGameEnd = true;
      }
    },
    setCurrentWord: (state) => {
      if (state.originWordsArray !== []) {
        const index = state.currentWordIndex;
        state.currentWord = state.originWordsArray[index];
      }
    },
    setCurrentWordIndex: (state) => {
      if (state.originWordsArray !== []) {
        state.currentWordIndex++;
      }
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    pushCorrectAnswers: (state, action: PayloadAction<Word>) => {
      state.correctAnswers.unshift(action.payload);
    },
    pushWrongAnswers: (state, action: PayloadAction<Word>) => {
      state.wrongAnswers.unshift(action.payload);
    },
    setIsGameEnd: (state, action: PayloadAction<boolean>) => {
      state.isGameEnd = action.payload;
    },
    setInitSettings: (state) => {
      state.currentWordIndex = 0;
      state.wrongAnswers = [];
      state.correctAnswers = [];
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setOriginWordsArray,
  setPlayWordsArray,
  setCurrentWord,
  setCurrentWordIndex,
  setIsPlaying,
  setIsGameEnd,
  pushCorrectAnswers,
  pushWrongAnswers,
  setInitSettings,
  setIsLoading,
} = audiocallSlice.actions;

export const fetchWords = (group: string): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const randomPage = getRandom(countPagesInGroup);
  try {
    // const { data } = await axios.get(`/words?page=${randomPage}&group=${group}`);
    const data = wordsFromServer;
    console.log(group, randomPage);
    dispatch(setOriginWordsArray(data));
    dispatch(setPlayWordsArray());
    dispatch(setCurrentWord());
    dispatch(setIsPlaying(true));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    // eslint-disable-next-line no-alert
    alert('Сервер недоступен! Попробуйте позже');
  }
  dispatch(setIsLoading(false));
};

export const playWords = (state: RootState): Array<Word> => state.audiocall.playWordsArray;
export const playWord = (state: RootState): Word | null => state.audiocall.currentWord;
export const isPlaying = (state: RootState): boolean => state.audiocall.isPlaying;
export const isGameEnd = (state: RootState): boolean => state.audiocall.isGameEnd;
export const wrongAnswers = (state: RootState): Array<Word> => state.audiocall.wrongAnswers;
export const correctAnswers = (state: RootState): Array<Word> => state.audiocall.correctAnswers;
export const isLoading = (state: RootState): boolean => state.audiocall.isLoading;

export default audiocallSlice.reducer;
