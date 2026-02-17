'use client';

import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import { themedPalette } from '@/styles/themes';
import { MoonIcon, SunIcon } from '@/static/svg';
import { FlexBox } from '@/styles/styled';
import { Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/hooks/useTheme';
import storage from '@/utils/storage';
import { useCookies } from 'react-cookie';
import {enableLightMode, enableTheme} from '@/store/theme';

function HeaderThemeButton() {
  const [, setCookie] = useCookies(['theme']);
  const dispatch = useDispatch();
  const theme = useTheme();

  const saveToStorage = (value: 'light' | 'dark') => {
    storage.setItem('theme', value); // For CSR
    setCookie('theme', value, {path: '/'}); // For SSR
  };

  const toggle = () => {
    if (!theme) return;
    if (theme === 'dark') {
      dispatch(enableLightMode());
      saveToStorage('light');
    } else {
      dispatch(enableTheme());
      saveToStorage('dark');
    }
  };

  const isDark = theme === 'dark';
  const transitions = useTransition(isDark, {
    initial: {
      transform: 'scale(1) rotate(0deg)',
      opacity: 1,
    },
    from: {
      transform: 'scale(0) rotate(-180deg)',
      opacity: 0,
    },
    enter: {
      transform: 'scale(1) rotate(0deg)',
      opacity: 1,
    },
    leave: {
      transform: 'scale(0) rotate(180deg)',
      opacity: 0,
    },

    reverse: true,
  });

  return (
    <FlexBox>
      <Tooltip title={isDark ? "Dark Mode" : "Light Mode"} arrow>
        <IconButton onClick={toggle}>
          {transitions((style, item) =>
            item ? (
              <Positioner>
                <AnimatedSVGWrapper style={style}>
                  <MoonIcon />
                </AnimatedSVGWrapper>
              </Positioner>
            ) : (
              <Positioner>
                <AnimatedSVGWrapper style={style}>
                  <SunIcon />
                </AnimatedSVGWrapper>
              </Positioner>
            ),
          )}
        </IconButton>
      </Tooltip>
    </FlexBox>
  );
}

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
  color: white;
  position: relative;

  &:hover {
    background: ${themedPalette.slight_layer};
  }
`;

const Positioner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SVGWrapper = styled.div`
  color: ${themedPalette.text1};
  svg {
    display: block;
  }
`;

const AnimatedSVGWrapper = animated(SVGWrapper);

export default HeaderThemeButton;
