'use client';

import ArticleCardGrid from '@/components/atoms/ArticleCardGrid';
import useHeadlineNews from '@/hooks/useHeadlineNews';

import MainTemplate from '@/components/molecules/main/MainTemplate';
import MainResponsive from '@/components/atoms/MainResponsive';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { push as pushNotification} from '@/store/notifications';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import useNews from '@/hooks/useNews';

function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { preFetchArticle } = useNews();
  const { articles, loading } = useHeadlineNews();
  
  useEffect(() => {
    if (user && (articles && articles.length <= 10 && articles.length > 1)) {
      dispatch(
        pushNotification({
          options: {
            content: (              
              <Alert 
                severity="success" 
                onClick={() => {
                  preFetchArticle(articles![0]);
                  router.push(`/article/${encodeURI(articles![0].title)}`);
                }}
                style={{ cursor: 'pointer' }}
              >
                <AlertTitle>Latest News</AlertTitle>
                {articles![0].title}
              </Alert>
            ),
          },
        })
      ); 
    }
  }, [user, articles]);

  return (
    <MainTemplate>
      <MainResponsive>
        <HomeBlock>
          <ArticleCardGrid
            articles={articles || []}
            loading={!articles?.length || loading}
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

export default HomePage;
