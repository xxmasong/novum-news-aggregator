import { useCallback, useEffect, useState } from 'react';
import { NewsDataArticle } from '@/types/news';
import { articles as endpoint } from '@/services/NewsService';
import useNews from './useNews';

export default function useRelatedNews() {
  const {article} = useNews();
  const [articles, setArticles] = useState<NewsDataArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const onLoadRelated = useCallback(async () => {
    let keywordRelated: NewsDataArticle[] = [];
    let categoryRelated: NewsDataArticle[] = [];
    setArticles([]);
    if (article?.keywords && article?.keywords?.length > 0) {
      const keywords = article.keywords.join(" OR ");
      const news = await endpoint({
        "q": keywords,
      });
      if (news?.status === 'success') {
        keywordRelated = news?.results || [];
      }
    } 
    if (article?.category && article?.category?.length > 0) {
      const news = await endpoint({
        "category": article.category,
      });
      if (news?.status === 'success') {
        categoryRelated = news?.results || [];
      }
    }
    setArticles([
      ...keywordRelated.filter((newData: NewsDataArticle) => {
        return article?.title !== newData.title;
      }),
      ...categoryRelated.filter((newData: NewsDataArticle) => {
        return article?.title !== newData.title 
          && !keywordRelated!.some(item => item.title === newData.title);
      }),
    ]);
  }, [article]);

  useEffect(() => {
    setLoading(true);
    if (article?.title) {
      onLoadRelated();
    }
    setLoading(false);
  }, [article?.title]);

  return { articles, loading };
}
