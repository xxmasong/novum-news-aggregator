import { useCallback, useEffect, useState } from 'react';
import useScrollPagination from '@/hooks/useScrollPagination';
import { homeArticles } from '@/services/NewsService';
import useNews from './useNews';
import useAuth from './useAuth';

export default function useHeadlineNews() {
  const {user, validating} = useAuth();
  const {articles, page, updateArticles, keepNextPageKey} = useNews();
  const [loading, setLoading] = useState(false);

  const onLoadMoreByOffset = useCallback(async () => {
    setLoading(true);   
    let country:string[] = [];
    if (user && user?.country) {
      country = [user?.country?.code];
    }
    const data = await homeArticles(country, page);
    if (data?.status === 'success') {
      updateArticles([...articles!, ...data.results]);
      keepNextPageKey(data?.nextPage);
    }
    setLoading(false);
  }, [user, articles, keepNextPageKey, page, updateArticles]);

  useEffect(() => {
    if (!validating) {
      if (articles && articles?.length <= 10) {
        onLoadMoreByOffset();
      }
    }
  }, [validating]);

  useScrollPagination({
    offset: articles?.length,
    onLoadMoreByOffset,
  });

  return { articles, loading };
}
