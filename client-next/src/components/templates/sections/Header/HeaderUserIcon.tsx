import * as React from 'react';
import styled from 'styled-components';
import { Tooltip } from '@mui/material';
import { UserIcon } from '@/static/svg';
import { AuthUser } from '@/types/user';
import { themedPalette } from '@/styles/themes';

export interface HeaderUserIconProps {
  user: AuthUser|null|undefined;
  onClick: (e: React.MouseEvent) => void;
}

const HeaderUserIcon: React.FC<HeaderUserIconProps> = ({ user, onClick }) => {
  return (
    <Tooltip title={user?.name || "My Account"} arrow>
      <HeaderUserIconBlock onClick={onClick}>
        <UserIcon />
      </HeaderUserIconBlock>
    </Tooltip>  
  );
};

const HeaderUserIconBlock = styled.div`
  cursor: pointer;
  svg {
    display: block;
    height: 2rem;
    width: 2rem;
    box-shadow: 0px 0 8px rgba(0, 0, 0, 0.085);
    transition: 0.125s all ease-in;
    border-radius: 50%;
    object-fit: cover;
    font-size: 1.5rem;
    color: ${themedPalette.text3};
    margin-left: 0.25rem;
    margin-right: -0.4375rem;
  }
  display: flex;
  align-items: center;
  &:hover {
    img {
      box-shadow: 0px 0 12px rgba(0, 0, 0, 0.1);
    }
    svg {
      color: ${themedPalette.text1};
    }
  }
`;

export default HeaderUserIcon;
