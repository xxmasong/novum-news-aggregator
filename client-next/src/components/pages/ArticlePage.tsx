'use client';

import * as React from 'react';
import ArticleViewer from '@/components/organisms/article/ArticleViewer';
import PageTemplate from '@/components/templates/PageTemplate';

export interface ArticlePageProps {
  urlTitle: string;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ urlTitle }) => {
  return (
    <PageTemplate>
      <ArticleViewer urlTitle={urlTitle} />
    </PageTemplate>
  );
};

export default ArticlePage;
