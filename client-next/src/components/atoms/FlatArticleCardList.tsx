import * as React from 'react';
import styled from 'styled-components';
import ArticleCard, { ArticleCardSkeleton } from './FlatArticleCard';
import { themedPalette } from '../../styles/themes';
import { NewsDataArticle } from '@/types/news';

const ArticleCardListBlock = styled.div``;

interface ArticleCardListProps {
  articles: NewsDataArticle[];
}

const ArticleCardList: React.FC<ArticleCardListProps> = ({ articles }) => {
  return (
    <ArticleCardListBlock>
      {articles.map((article, id) => (
        <ArticleCard key={id} article={article} />
      ))}
    </ArticleCardListBlock>
  );
};

export type ArticleCardListSkeletonProps = {
  forLoading?: boolean;
};

export function ArticleCardListSkeleton({
  forLoading,
}: ArticleCardListSkeletonProps) {
  return (
    <ArticleCardListBlock>
      {forLoading && <Separator />}
      {Array.from({ length: forLoading ? 1 : 3 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </ArticleCardListBlock>
  );
}

const Separator = styled.div`
  border-top: 1px solid ${themedPalette.border4};
`;

export default ArticleCardList;
