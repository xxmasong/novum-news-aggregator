'use client';

import ArticleCardGrid from '@/components/atoms/ArticleCardGrid';

import MainTemplate from '@/components/molecules/main/MainTemplate';
import MainResponsive from '@/components/atoms/MainResponsive';
import styled from 'styled-components';

import useCategoryNews from '@/hooks/useCategoryNews';

interface CategoryPageProps {
  category: string;
}

function CategoryPage({ category }: CategoryPageProps) {
  const { newsByCategory, loading } = useCategoryNews(category);

  return (
    <MainTemplate>
      <MainResponsive>
        <HomeBlock>
          <ArticleCardGrid
            articles={newsByCategory?.[category as keyof typeof newsByCategory] || []}
            loading={!newsByCategory?.[category as keyof typeof newsByCategory]?.length || loading}
            forHome
          />
        </HomeBlock>
      </MainResponsive>
    </MainTemplate>
  );
}

const HomeBlock = styled.main`
  display: flex;
  margin-top: 2rem;
  flex: 1;
`;

export default CategoryPage;
