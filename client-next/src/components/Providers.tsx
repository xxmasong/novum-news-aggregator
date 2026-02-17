'use client';

import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { makeStore, AppStore } from '@/store/store';
import { useRef } from 'react';
import { SnackbarProvider } from 'notistack';
import { Grow } from '@mui/material';
import ThemeProvider from '@/providers/ThemeProvider';
import AuthContextProvider from '@/providers/AuthContextProvider';
import NewsContextProvider from '@/providers/NewsContextProvider';
import OptionsContextProvider from '@/providers/OptionsContextProvider';
import NextAppDirEmotionCacheProvider from '@/components/ThemeRegistry/EmotionCache';
import { notifications } from '@/config';

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <CookiesProvider>
        <Provider store={storeRef.current}>
          <ThemeProvider>
            <SnackbarProvider
              maxSnack={notifications.maxSnack}
              TransitionComponent={Grow}
              autoHideDuration={3000}
            >
              <AuthContextProvider>
                <NewsContextProvider>
                  <OptionsContextProvider>
                    {children}
                  </OptionsContextProvider>
                </NewsContextProvider>
              </AuthContextProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </Provider>
      </CookiesProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
