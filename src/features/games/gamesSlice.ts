import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { volume } from '../../constants/games';

interface GamesState {
  soundsVolume: number;
}

const initialState: GamesState = {
  soundsVolume: volume,
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setSoundsVolume: (state, action: PayloadAction<number>) => {
      state.soundsVolume = action.payload;
    },
  },
});

export const { setSoundsVolume } = gamesSlice.actions;

export const soundsVolume = (state: RootState): number => state.games.soundsVolume;

export default gamesSlice.reducer;
