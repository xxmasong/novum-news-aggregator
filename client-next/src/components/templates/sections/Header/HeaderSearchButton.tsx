'use client';

import styled from 'styled-components';
import { SearchIcon2 } from '@/static/svg';
import Link from 'next/link';
import { themedPalette } from '@/styles/themes';
import { Tooltip } from '@mui/material';
import { FlexBox } from '@/styles/styled';

function HeaderSearchButton() {
  const urlForSearch = '/search';

  return (
    <FlexBox>
      <Tooltip title="Search" arrow>
        <SearchButton href={urlForSearch}>
          <SearchIcon2 />
        </SearchButton>
      </Tooltip>
    </FlexBox>
  );
}

const SearchButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  border-radius: 50%;
  color: ${themedPalette.text1};
  cursor: pointer;
  &:hover {
    background: ${themedPalette.slight_layer};
  }
  svg {
    width: 1.125rem;
    height: 1.125rem;
  }
  margin-right: 1rem;
`;

export default HeaderSearchButton;
