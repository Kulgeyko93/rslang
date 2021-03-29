import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { Status, EntityState, Word } from '../../types';

type WordsState = EntityState<Word[]>;

const initialState: WordsState = {
  status: Status.Idle,
  data: null,
  error: undefined,
};

export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async ({ group = 0, page = 0 }: { group?: number; page?: number } = {}) => {
    const response = await axios.get('/words', {
      params: {
        group,
        page,
      },
    });
    return response.data;
  },
);

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWords.pending, (state) => {
      state.status = Status.Loading;
    });
    builder.addCase(fetchWords.fulfilled, (state, { payload }) => {
      state.status = Status.Succeeded;
      state.data = payload;
    });
    builder.addCase(fetchWords.rejected, (state, { error }) => {
      state.status = Status.Failed;
      state.error = error.message;
    });
  },
});

export function selectWordsStatus(state: RootState): WordsState['status'] {
  return state.words.status;
}

export function selectWordsError(state: RootState): WordsState['error'] {
  return state.words.error;
}

export function selectWordsData(state: RootState): WordsState['data'] {
  return state.words.data;
}

export default wordsSlice.reducer;
