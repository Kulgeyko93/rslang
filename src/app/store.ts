import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import wordsReducer from '../features/words/wordsSlice';
import authReducer from '../features/auth/authSlice';
import audiocallReducer from '../features/audioCall/audioCallSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    words: wordsReducer,
    auth: authReducer,
    audiocall: audiocallReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
