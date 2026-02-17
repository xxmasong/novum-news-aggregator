'use client';

import { Fragment, ReactNode } from 'react';
import { CssBaseline } from "@mui/material";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';

import SW from '@/components/templates/load/SW';
import Notifier from '@/components/templates/load/Notifier';
import Footer from '@/components/templates/sections/Footer';
import Header from '@/components/templates/sections/Header';
import Background from '@/components/templates/load/Background';
import BodyTransition from '@/components/atoms/BodyTransition';
import { themedPalette, themes } from '@/styles/themes';

const GlobalStyles = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${themedPalette.text1};
  box-sizing: border-box;

}

* {
  box-sizing: inherit;
}

code {
  font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

input, button, textarea {
  font-family: inherit;
}

html, body, #root {
  height: 100%;
}

body {
  ${themes.light}
}

@media (prefers-color-scheme: dark) {
  body {
    ${themes.dark}
  }
}

body[data-theme='light'] {
  ${themes.light};
}

body[data-theme='dark'] {
  ${themes.dark};
}

`;

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Fragment>
      <CssBaseline />
      <GlobalStyles />
      <Notifier />
      <SW />
      <Background />
      <Header />
      <BodyTransition />
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
      <main style={{ minHeight: 'calc(100vh - 64px - 64px)' }}>
        {children}
      </main>
      <Footer /> 
    </Fragment>
  );
}

export default Layout;
