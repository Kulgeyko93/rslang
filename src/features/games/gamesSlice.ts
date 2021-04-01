import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { volume } from '../../const/games';

interface GamesState {
  soundsVolume: number;
  currentGame: string;
}

const initialState: GamesState = {
  soundsVolume: volume,
  currentGame: '',
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setSoundsVolume: (state, action: PayloadAction<number>) => {
      state.soundsVolume = action.payload;
    },
    setCurrentGame: (state, action: PayloadAction<string>) => {
      state.currentGame = action.payload;
    },
  },
});

export const { setSoundsVolume, setCurrentGame } = gamesSlice.actions;

export const soundsVolume = (state: RootState): number => state.games.soundsVolume;
export const currentGame = (state: RootState): string => state.games.currentGame;

export default gamesSlice.reducer;
