'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Logo } from '@/static/svg';
import { themedPalette } from '@/styles/themes';

function HeaderLogo() {
  return (
    <HeaderLogoBlock>
      <Link href="/">
        <Logo />
      </Link>
    </HeaderLogoBlock>
  );
}

const HeaderLogoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: baseline;
  color: ${themedPalette.text1};
  font-weight: bold;
  font-size: 1.3125rem;
  text-decoration: none;
  font-family: Fira Mono, monospace; 
  a {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
    margin-top: 0.5rem;
  }
`;

export default HeaderLogo;
