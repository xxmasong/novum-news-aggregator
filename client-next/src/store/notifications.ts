import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
import { notifications as notificationsDefaults } from '@/config';

export interface Notification {
  message: SnackbarMessage;
  options: OptionsObject;
  dismissed: boolean;
}

export type NotificationsState = Notification[];

const initialState: NotificationsState = [];

const notifications = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    push: (state, action: PayloadAction<Partial<Notification>>) => {
      const id = Math.random().toString();
      state.push({
        ...action.payload,
        message: action.payload.message,
        dismissed: false,
        options: {
          ...notificationsDefaults.options,
          ...action.payload.options,
          key: id,
        } as any,
      });
    },
    close: (state, action: PayloadAction<SnackbarKey | undefined>) => {
      const key = action.payload;
      const dismissAll = !key;
      return state.map((notification) => ({
        ...notification,
        dismissed: dismissAll || notification.options.key === key,
      }));
    },
    remove: (state, action: PayloadAction<SnackbarKey>) => {
      const key = action.payload;
      return state.filter((notification) => notification.options.key !== key);
    },
  },
});

export const { push, close, remove } = notifications.actions;
export default notifications;
