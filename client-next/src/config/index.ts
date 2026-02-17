import isMobile from '@/utils/is-mobile';

import type { Notifications } from '../types/types';
import themes from './themes';

const title = 'Novum - News Aggregator';

const email = 'xxmasong@gmail.com';

const repository = 'https://github.com/xxmasong/novum-news-aggregator';

const messages = {
  app: {
    crash: {
      title: 'A Critical Error Occured!',
      options: {
        email: `Report bug to ${email}`,
        reset: 'Try resetting application here',
      },
    },
  },
  loader: {
    fail: 'An error occured in component loading process. Try again later.',
  },
  404: 'Resource Not Found!',
};

const dateFormat = 'MMMM DD, YYYY';

const notifications: Notifications = {
  options: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    autoHideDuration: 6000,
  },
  maxSnack: isMobile ? 3 : 4,
};

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
  image: '/cover.png',
  description: 'Starter kit for modern web applications',
};
const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export {
  loader,
  notifications,
  themes,
  dateFormat,
  messages,
  repository,
  email,
  title,
  defaultMetaTags,
  giphy404,
};
