import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { EntityState, Status } from '../types';

export interface Auth {
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

type AuthState = EntityState<Auth>;

const initialState: AuthState = {
  status: Status.Idle,
  data: null,
  error: undefined,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post('/signin', {
      email,
      password,
    });
    return response.data;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.status = Status.Succeeded;
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = Status.Loading;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.status = Status.Succeeded;
      state.data = payload;
    });
    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.status = Status.Failed;
      state.error = error.message;
    });
  },
});

export const { setAuthData } = authSlice.actions;

export function selectAuthStatus(state: RootState): AuthState['status'] {
  return state.auth.status;
}

export function selectAuthError(state: RootState): AuthState['error'] {
  return state.auth.error;
}

export function selectAuthData(state: RootState): AuthState['data'] {
  return state.auth.data;
}

export default authSlice.reducer;
