'use client';

import React, { useEffect } from 'react';
import ArticleHead from '@/components/molecules/article/ArticleHead';
import ArticleContent from '@/components/molecules/article/ArticleContent';
import { useRouter } from 'next/navigation';
import ArticleSkeleton from '@/components/molecules/article/ArticleSkeleton';
import RelatedArticle from './RelatedArticle';
import useArticle from '@/hooks/useArticle';
import Button from '@/components/atoms/Button';
import styled from 'styled-components';
import media from '@/styles/media';
import { themedPalette } from '@/styles/themes';
import { MdHome } from 'react-icons/md';

export interface ArticleViewerProps {
  urlTitle: string;
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({
  urlTitle,
}) => {
  const router = useRouter();
  const { article, loading } = useArticle(urlTitle);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [urlTitle]);
 
  useEffect(() => {
    if (!loading && article === null) {
      router.push('/');
    }
  }, [article, router, loading]);

  return (
    <>{loading ? (
      <ArticleSkeleton />
    ):(
      <>
        <ArticleHead />
        <ArticleContent />
        {article && 
          <ArticleReturn>
            <Button 
              color='transparent' 
              size='large' 
              onClick={() => router.push('/')}
            >
              <MdHome />Back
            </Button>
          </ArticleReturn>
        }        
        {!loading && article && <RelatedArticle />}
      </>      
    )}</>    
  );
};

const ArticleReturn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themedPalette.text3};
  margin-top: 1rem;
  svg {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  ${media.small} {
    margin-top: 0.5rem;
  }
`;

export default React.memo(ArticleViewer);
