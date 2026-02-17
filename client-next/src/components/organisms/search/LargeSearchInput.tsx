'use client';

import React, { useCallback } from 'react';
import SearchInput from '@/components/molecules/search/SearchInput';
import styled from 'styled-components';
import qs from 'qs';
import { useRouter } from 'next/navigation';

const StyledSearchInput = styled(SearchInput)`
  margin-bottom: 1.5rem;
`;

function LargeSearchInput({
  initialKeyword,
}: {initialKeyword: string}) {
  const router = useRouter();
  const onSearch = useCallback(
    (keyword: string) => {
      const query = qs.stringify({
        q: keyword,
      });
      router.replace(`/search?${query}`);
    },
    [router],
  );

  return (
    <Block>
      <StyledSearchInput
        onSearch={onSearch}
        initial={initialKeyword}
        large
        autosearch
      />
    </Block>
  );
}

const Block = styled.div``;

export default LargeSearchInput;
