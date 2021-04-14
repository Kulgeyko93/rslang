import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { EntityState, Status, Settings } from '../../types';

interface SettingsResponse {
  id?: string;
  optional: Settings;
  wordsPerDay?: string;
}

export type SettingsState = EntityState<SettingsResponse>;

const initialState: SettingsState = {
  status: Status.Idle,
  data: {
    optional: {
      showTranslations: true,
      showControls: true,
    },
  },
  error: undefined,
};

export const fetchSettings = createAsyncThunk('settings/fetchSettings', async (_, { getState }) => {
  const rootState = getState() as RootState;
  const userId = rootState.auth.data?.userId;
  const response = await axios.get(`/users/${userId}/settings`);
  return response.data;
});

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async ({ settings }: { settings: Settings }, { getState }) => {
    const rootState = getState() as RootState;
    const userId = rootState.auth.data?.userId;
    if (!userId) {
      throw new Error('User does not exist yet');
    }
    const response = await axios.put(`/users/${userId}/settings`, {
      wordsPerDay: 1,
      optional: settings,
    });
    return response.data;
  },
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.pending, (state) => {
      state.status = Status.Loading;
    });
    builder.addCase(fetchSettings.fulfilled, (state, { payload }) => {
      state.status = Status.Succeeded;
      state.data = payload;
    });
    builder.addCase(fetchSettings.rejected, (state, { error }) => {
      state.status = Status.Failed;
      state.error = error.message;
    });
    builder.addCase(updateSettings.pending, (state) => {
      state.status = Status.Loading;
    });
    builder.addCase(updateSettings.fulfilled, (state, { payload }) => {
      state.status = Status.Succeeded;
      state.data = payload;
    });
    builder.addCase(updateSettings.rejected, (state, { error }) => {
      state.status = Status.Failed;
      state.error = error.message;
    });
  },
});

export function selectSettingsStatus(state: RootState): SettingsState['status'] {
  return state.settings.status;
}

export function selectSettingsError(state: RootState): SettingsState['error'] {
  return state.settings.error;
}

export function selectSettingsData(state: RootState): SettingsState['data'] {
  return state.settings.data;
}

export default settingsSlice.reducer;
