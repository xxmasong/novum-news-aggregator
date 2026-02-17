import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeState = {
  theme: 'dark' | 'light' | 'default';
  systemTheme: 'dark' | 'light' | 'not-ready';
};

const initialState: ThemeState = {
  theme: 'default',
  systemTheme: 'not-ready',
};

const theme = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    enableTheme(state) {
      state.theme = 'dark';
    },
    enableLightMode(state) {
      state.theme = 'light';
    },
    setSystemTheme(state, action: PayloadAction<'dark' | 'light'>) {
      state.systemTheme = action.payload;
    },
  },
});

export const { enableTheme, enableLightMode, setSystemTheme } = theme.actions;
export default theme;
