'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { createGlobalStyle } from 'styled-components';
import { themedPalette } from '@/styles/themes';

interface Props {}

const GrayBackground = createGlobalStyle`
  body {
    background: ${themedPalette.bg_page1};
  }
`;

const WhiteBackground = createGlobalStyle`
  body {
    background: ${themedPalette.bg_page2};
  }
`;

/**
 * Bacgkround should be gray on following paths
 * - /
 * - /category
 */
function Background(props: Props) {
  const pathname = usePathname();

  const isGray = useMemo(
    () => pathname === '/' || pathname.startsWith('/category'),
    [pathname],
  );

  return isGray ? <GrayBackground /> : <WhiteBackground />;
}

export default Background;
