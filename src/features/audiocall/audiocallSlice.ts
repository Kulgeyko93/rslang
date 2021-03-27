// import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRandomArray } from '../../utils/getRandomArray';
import { createWordsArray } from '../../utils/createWordsArray';
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
};

export const audiocallSlice = createSlice({
  name: 'audiocall',
  initialState,
  reducers: {
    setOriginWordsArray: (state, action: PayloadAction<Array<Word>>) => {
      state.originWordsArray = action.payload;
    },
    setPlayWordsArray: (state, action: PayloadAction<Array<Word>>) => {
      const data = action.payload;
      const newArrayOfIndices = getRandomArray(data.length, wordsPerPage);
      const newPlayWordsArray = createWordsArray(data, newArrayOfIndices, state.currentWordIndex);
      state.playWordsArray = newPlayWordsArray;
    },
    setCurrentWord: (state) => {
      if (state.originWordsArray !== []) {
        const index = state.currentWordIndex;
        state.currentWord = state.originWordsArray[index];
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
  },
});

export const {
  setOriginWordsArray,
  setPlayWordsArray,
  setCurrentWord,
  setIsPlaying,
  pushCorrectAnswers,
  pushWrongAnswers,
} = audiocallSlice.actions;

export const fetchWords = (group: string): AppThunk => async (dispatch) => {
  const randomPage = getRandom(countPagesInGroup);
  try {
    // const { data } = await axios.get(`/words?page=${randomPage}&group=${group}`);
    const data = wordsFromServer;
    console.log(group, randomPage);
    dispatch(setOriginWordsArray(data));
    console.log(data);
    dispatch(setPlayWordsArray(data));
    dispatch(setCurrentWord());
    dispatch(setIsPlaying(true));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    // eslint-disable-next-line no-alert
    alert('Сервер недоступен! Попробуйте позже');
  }
};

export const playWords = (state: RootState): Array<Word> => state.audiocall.playWordsArray;
export const playWord = (state: RootState): Word | null => state.audiocall.currentWord;
export const isPlaying = (state: RootState): boolean => state.audiocall.isPlaying;

export default audiocallSlice.reducer;
