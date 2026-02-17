import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';

const SearchTemplateBlock = styled.div`  
  width: 768px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3.5rem;
  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 2rem;
  }
  ${media.small} {
    margin-top: 0.5rem;
    width: 100%;
  }
`;

export interface SearchTemplateProps {
  children: React.ReactNode;
}

function SearchTemplate({ children }: SearchTemplateProps) {
  return (
    <SearchTemplateBlock>
      {children}
    </SearchTemplateBlock>
  );
}

export default SearchTemplate;
