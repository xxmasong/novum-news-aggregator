import { useCallback, useEffect, useState } from 'react';
import { articles as endpoint } from '@/services/NewsService';
import useNews from './useNews';

export default function useArticle(urlTitle?: string) {
  const {article, preFetchArticle} = useNews();
  const [loading, setLoading] = useState(false);
  const title = decodeURI(urlTitle || "");

  const onLoadArticle = useCallback(async () => {
    const news = await endpoint({
      "qInTitle": title,
    });
    if (news?.status === 'success' && news.results.length >= 1) {
      preFetchArticle(news.results[0]);
    } else {
      preFetchArticle(null);
    }
  }, [preFetchArticle, title]);

  useEffect(() => {
    setLoading(true);
    if (!article || article?.title !== title) {
      onLoadArticle();
    } 
    setLoading(false);
  }, [article, title]);

  return { article, loading };
}
