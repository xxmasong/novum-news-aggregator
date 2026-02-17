import React from 'react';
import { themedPalette } from '@/styles/themes';
import styled from 'styled-components';
import media from '@/styles/media';

export interface SearchResultInfoProps {
  count: number;
}

function SearchResultInfo({ count }: SearchResultInfoProps) {
  if (count === 0) {
    return <Info>No news article found.</Info>;
  }
  return (
    <Info>
      <b>{count}</b> news articles found.
    </Info>
  );
}

const Info = styled.p`
  margin-bottom: 4rem;
  font-size: 1.125rem;
  line-height: 1.5;
  ${media.small} {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  color: ${themedPalette.text2};
  b {
    color: ${themedPalette.text1};
  }
`;

export default SearchResultInfo;
