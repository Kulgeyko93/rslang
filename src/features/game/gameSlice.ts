import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRandomArray } from '../../utils/getRandomArray';
import { createWordsArray, createGameArray } from '../../utils/createWordsArray';
import { AppThunk, RootState } from '../../app/store';
import { getRandom } from '../../utils/getRandom';
import { Word } from '../../types';
import { countPagesInGroup, wordsPerPage } from '../../constants/games';

interface GameState {
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
  attempts: Array<number>;
  currentGame: string;
  gameLearnedWords: Array<string>;
}

const initialState: GameState = {
  isGameOpenFromTextBook: false,
  currentLevel: '0',
  originWordsArray: [],
  currentWordIndex: 0,
  currentWord: null,
  playWordsArray: [],
  isPlaying: false,
  wrongAnswers: [],
  correctAnswers: [],
  isGameEnd: false,
  isLoading: false,
  attempts: [1, 2, 3, 4, 5],
  currentGame: '',
  gameLearnedWords: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setOriginWordsArray: (state, action: PayloadAction<Array<Word>>) => {
      const data = action.payload;
      const newArrayOfIndices = getRandomArray(data.length, data.length);
      state.originWordsArray = createGameArray(data, newArrayOfIndices);
      state.gameLearnedWords = data.map((word) => word.id);
    },
    setPlayWordsArray: (state) => {
      switch (state.currentGame) {
        case 'audiocall': {
          if (state.currentWordIndex < state.originWordsArray.length && state.wrongAnswers.length < 5) {
            const data = state.originWordsArray;
            const newArrayOfIndices = getRandomArray(data.length, wordsPerPage);
            const newPlayWordsArray = createWordsArray(data, newArrayOfIndices, state.currentWordIndex);
            state.playWordsArray = newPlayWordsArray;
          } else {
            state.isGameEnd = true;
          }
          break;
        }
        case 'savannah': {
          if (state.currentWordIndex < state.originWordsArray.length && state.wrongAnswers.length < 5) {
            const data = state.originWordsArray;
            const newArrayOfIndices = getRandomArray(data.length, wordsPerPage);
            const newPlayWordsArray = createWordsArray(data, newArrayOfIndices, state.currentWordIndex);
            state.playWordsArray = newPlayWordsArray;
          } else {
            state.isGameEnd = true;
          }
          break;
        }
        case 'sprint': {
          if (state.currentWordIndex < state.originWordsArray.length) {
            state.playWordsArray = state.originWordsArray;
          } else {
            state.isGameEnd = true;
          }
          break;
        }
        case 'riddle': {
          if (state.currentWordIndex < state.originWordsArray.length && state.wrongAnswers.length < 5) {
            const data = state.originWordsArray;
            const newArrayOfIndices = getRandomArray(data.length, wordsPerPage);
            const newPlayWordsArray = createWordsArray(data, newArrayOfIndices, state.currentWordIndex);
            state.playWordsArray = newPlayWordsArray;
          } else {
            state.isGameEnd = true;
          }
          break;
        }
        default: {
          state.isGameEnd = false;
        }
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
      state.correctAnswers.push(action.payload);
    },
    pushWrongAnswers: (state, action: PayloadAction<Word>) => {
      state.wrongAnswers.push(action.payload);
      state.attempts.pop();
    },
    setIsGameEnd: (state, action: PayloadAction<boolean>) => {
      state.isGameEnd = action.payload;
    },
    setInitSettings: (state) => {
      state.currentLevel = '0';
      state.originWordsArray = [];
      state.currentWordIndex = 0;
      state.currentWord = null;
      state.playWordsArray = [];
      state.isPlaying = false;
      state.wrongAnswers = [];
      state.correctAnswers = [];
      state.isGameEnd = false;
      state.isLoading = false;
      state.attempts = [1, 2, 3, 4, 5];
      state.gameLearnedWords = [];
    },
    setInitSettingsFromBook: (state) => {
      state.currentLevel = '0';
      state.currentWordIndex = 0;
      state.currentWord = null;
      state.playWordsArray = [];
      state.isPlaying = false;
      state.wrongAnswers = [];
      state.correctAnswers = [];
      state.isGameEnd = false;
      state.isLoading = false;
      state.attempts = [1, 2, 3, 4, 5];
      state.gameLearnedWords = [];
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsGameOpenFromTextBook: (state, action: PayloadAction<boolean>) => {
      state.isGameOpenFromTextBook = action.payload;
    },
    setCurrentLevel: (state, action: PayloadAction<string>) => {
      state.currentLevel = action.payload;
    },
    setCurrentGame: (state, action: PayloadAction<string>) => {
      state.currentGame = action.payload;
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
  setCurrentLevel,
  setCurrentGame,
  setIsGameOpenFromTextBook,
  setInitSettingsFromBook,
} = gameSlice.actions;

export const fetchWords = (group: string): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  const randomPage = getRandom(countPagesInGroup);
  try {
    const { data } = await axios.get(`words?group=${group}&page=${randomPage}`);
    // eslint-disable-next-line no-console
    dispatch(setIsGameOpenFromTextBook(false));
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

export const playWords = (state: RootState): Array<Word> => state.game.playWordsArray;
export const playWord = (state: RootState): Word | null => state.game.currentWord;
export const isPlaying = (state: RootState): boolean => state.game.isPlaying;
export const isGameEnd = (state: RootState): boolean => state.game.isGameEnd;
export const wrongAnswers = (state: RootState): Array<Word> => state.game.wrongAnswers;
export const correctAnswers = (state: RootState): Array<Word> => state.game.correctAnswers;
export const isLoading = (state: RootState): boolean => state.game.isLoading;
export const currentLevel = (state: RootState): string => state.game.currentLevel;
export const isGameOpenFromTextBook = (state: RootState): boolean => state.game.isGameOpenFromTextBook;
export const attempts = (state: RootState): Array<number> => state.game.attempts;
export const currentGame = (state: RootState): string => state.game.currentGame;
export const gameLearnedWords = (state: RootState): Array<string> => state.game.gameLearnedWords;
export const originWordsArray = (state: RootState): Array<Word> => state.game.originWordsArray;

export default gameSlice.reducer;
