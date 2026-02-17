import { useCallback, useEffect, useState } from 'react';
import useScrollPagination from '@/hooks/useScrollPagination';
import { categoryArticles } from '@/services/NewsService';
import useNews from './useNews';
import useAuth from './useAuth';

export default function useCategoryNews(category?: string) {
  const {user} = useAuth();
  const { newsByCategory, page, updateNewsByCategory, keepNextPageKey } = useNews();
  const [loading, setLoading] = useState(false);

  const onLoadMoreByOffset = useCallback(async () => {
    setLoading(true);
    let country:string[] = [];
    if (user && user?.country) {
      country = [user?.country?.code];
    }
    if (!category) {
      category = "top";
    } 
    const data = await categoryArticles([category], country, page);
    if (data?.status === 'success') {
      updateNewsByCategory(category!, [...(newsByCategory?.[category as keyof typeof newsByCategory] ?? []), ...data.results]);
      keepNextPageKey(data?.nextPage);
    }
    setLoading(false);
  }, [category, newsByCategory, keepNextPageKey, page, updateNewsByCategory]);

  useEffect(() => {
    if (category) {
      if (newsByCategory && newsByCategory[category as keyof typeof newsByCategory]?.length <= 10) {
        onLoadMoreByOffset();
      }
    }
  }, [category]);

  useScrollPagination({
    offset: category ? newsByCategory?.[category as keyof typeof newsByCategory]?.length : newsByCategory?.top?.length,
    onLoadMoreByOffset,
  });

  return { newsByCategory, loading };
}
