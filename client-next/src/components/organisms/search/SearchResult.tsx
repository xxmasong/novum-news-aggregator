import { useCallback, useEffect, useState } from 'react';
import SearchResultInfo from '@/components/molecules/search/SearchResultInfo';
import ArticleCardList from '@/components/atoms/FlatArticleCardList';
import useScrollPagination from '@/hooks/useScrollPagination';
import { searchArticles } from '@/services/NewsService';
import useAuth from '@/hooks/useAuth';
import Loading from '@/components/molecules/Loading/Loading';
import { NewsDataArticle } from '@/types/news';

export interface SearchResultProps {
  keyword: string;
}

function SearchResult({ keyword }: SearchResultProps) {
  const {user} = useAuth();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<NewsDataArticle[]>([]);
  const [page, setPage] = useState("");

  const onLoadMoreByOffset = useCallback(async () => {
    setLoading(true);
    let country:string[] = [];
    if (user && user?.country) {
      country = [user?.country?.code];
    }
    const search = keyword?.replace(/^"(.*)"$/, '$1') || "";
    if (search.length > 0) {
      const data = await searchArticles(search, country, page, /^".*"$/.test(keyword));
      if (data?.status === 'success') {
        setArticles([...articles!, ...data.results]);
        setPage(data?.nextPage);
      }  
    }    
    setLoading(false);
  }, [user, keyword]);

  useEffect(() => {
    setArticles([]);
    onLoadMoreByOffset();
  }, [keyword]);

  useScrollPagination({
    offset: articles?.length,
    onLoadMoreByOffset,
  });

  if (!articles) 
    return null;

  if (!articles.length && loading)
    return (<Loading />);

  return (
    <>
      <SearchResultInfo count={articles.length} />
      <ArticleCardList articles={articles} />
      {loading && !!articles.length && <Loading />}
    </>
  );
}


export default SearchResult;
