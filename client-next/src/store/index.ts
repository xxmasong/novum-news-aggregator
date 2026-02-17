import { combineReducers } from '@reduxjs/toolkit';
import core, { CoreState } from './core';
import error, { ErrorState } from './error';
import scroll, { ScrollState } from './scroll';
import home, { HomeState } from './home';
import theme, { ThemeState } from './theme';
import notifications, { NotificationsState } from './notifications';
import news, { NewsState } from './news';

export type RootState = {
  core: CoreState;
  news: NewsState;
  error: ErrorState;
  scroll: ScrollState;
  home: HomeState;
  theme: ThemeState;
  notifications: NotificationsState;
};

const rootReducer = combineReducers({
  core,
  news: news.reducer,
  error: error.reducer,
  scroll: scroll.reducer,
  home: home.reducer,
  theme: theme.reducer,
  notifications: notifications.reducer,
});

export default rootReducer;
