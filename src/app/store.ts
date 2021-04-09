import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import wordsReducer from '../features/words/wordsSlice';
import authReducer from '../features/auth/authSlice';
import gamesReducer from '../features/games/gamesSlice';
import gameReducer from '../features/game/gameSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    words: wordsReducer,
    auth: authReducer,
    games: gamesReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
