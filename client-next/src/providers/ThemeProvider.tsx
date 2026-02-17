import { useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import themes from '@/config/themes';
import { Themes } from '@/enums/constants';
import { RootState } from '@/store';
import { setSystemTheme } from '@/store/theme';

const ThemeProvider = ({ children }: {children: ReactNode}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    dispatch(setSystemTheme(systemPrefersDark ? Themes.DARK : Themes.LIGHT));
  }, [dispatch]);
  
  useEffect(() => {
    if (theme !== Themes.DEFAULT) {
      document.body.dataset.theme = theme;
    }
  }, [theme]);

  return <MuiThemeProvider theme={createTheme(themes[theme])}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
