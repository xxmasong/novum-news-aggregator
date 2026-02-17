'use client';

import SearchTemplate from '@/components/templates/SearchTemplate';
import LargeSearchInput from '@/components/organisms/search/LargeSearchInput';
import SearchResult from '@/components/organisms/search/SearchResult';
import { useSearchParams } from 'next/navigation';

function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';

  return (
    <SearchTemplate>
      <LargeSearchInput initialKeyword={q} />
      <SearchResult keyword={q} />
    </SearchTemplate>
  );
}

export default SearchPage;
