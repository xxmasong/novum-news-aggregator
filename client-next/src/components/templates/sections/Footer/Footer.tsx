import styled from 'styled-components';
import { themedPalette } from '@/styles/themes';
import { Link } from '@mui/material';
import { Stack } from '@mui/system';
import { useState, useEffect } from 'react';

interface FooterContainerProps {
  $isVisible: boolean;
}

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FooterContainer $isVisible={isVisible}>
      <Stack alignItems={'center'}>
        <Link 
          href="https://linkedin.com/in/zenmasong" 
          style={{
            color: themedPalette.text3,
            textDecoration: 'none',
          }}
        >
          &copy; 2023 by Xeno Masong
        </Link>
      </Stack>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer<FooterContainerProps>`
  display: ${props => (props.$isVisible ? 'block' : 'none')};
  background-color: ${themedPalette.bg_page1};
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 2em 0;
`;

export default Footer;
