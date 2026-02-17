import { useCallback, useContext } from "react";
import { NewsContext } from "@/providers/NewsContextProvider";
import { NewsDataArticle } from "@/types/news";
import { setNewsArticles, setNewsByCategory, setNewsReadArticle, setNextPage } from "@/store/news";

export default function useNews() {
  const [news, dispatch] = useContext(NewsContext);

  const updateArticles = useCallback((articles: NewsDataArticle[]) => {
    if (dispatch) {
      dispatch(setNewsArticles(articles));
    }
  }, [dispatch]);

  const updateNewsByCategory = useCallback((category: string, articles: NewsDataArticle[]) => {
    if (dispatch) {
      dispatch(setNewsByCategory({category: category, articles: articles}));
    }
  }, [dispatch]);

  const preFetchArticle = useCallback((article: NewsDataArticle | null) => {
    if (dispatch) {
      dispatch(setNewsReadArticle(article));
    }
  }, [dispatch]);

  const keepNextPageKey = useCallback((page: string | null) => {
    if (dispatch) {
      dispatch(setNextPage(page));
    }
  }, [dispatch]);

  return {
    sources: news?.sources,
    articles: news?.articles,
    newsByCategory: news?.newsByCategory,
    article: news?.article,
    page: news?.nextPage,
    updateArticles,
    updateNewsByCategory,
    preFetchArticle,
    keepNextPageKey,
  };
}
