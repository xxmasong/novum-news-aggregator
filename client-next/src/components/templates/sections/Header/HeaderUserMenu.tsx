'use client';

import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import OutsideClickHandler from 'react-outside-click-handler';
import { themedPalette } from '@/styles/themes';
import media from '@/styles/media';

interface HeaderUserMenuProps {
  onClose: (e: any) => void;
  onLogout: () => void;
  visible: boolean;
}

const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({
  onClose,
  onLogout,
  visible,
}) => {
  if (!visible) return null;
  
  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <HeaderUserMenuBlock onClick={onClose}>
        <div className="menu-wrapper">                      
          <WrapperLink href="/account" style={{ display: 'block' }}>
            <HeaderUserMenuItemBlock>
              My Account
            </HeaderUserMenuItemBlock>
          </WrapperLink>
          <HeaderUserMenuItemBlock onClick={onLogout}>
            Log Out
          </HeaderUserMenuItemBlock>
        </div>
      </HeaderUserMenuBlock>
    </OutsideClickHandler>
  );
};

const HeaderUserMenuBlock = styled.div`
  position: absolute;
  top: 2.5rem;
  margin-top: 1rem;
  right: 1rem;
  > .menu-wrapper {
    position: relative;
    z-index: 5;
    width: 8rem;
    background: ${themedPalette.bg_element1};
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    .mobile-only {
      display: none;
      ${media.medium} {
        display: block;
      }
    }
  }
`;

const WrapperLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const HeaderUserMenuItemBlock = styled.div`
  color: ${themedPalette.text1};
  padding: 0.75rem 1rem;
  line-height: 1.5;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: ${themedPalette.bg_element2};
    color: ${themedPalette.primary1};
  }
`;

export default HeaderUserMenu;
