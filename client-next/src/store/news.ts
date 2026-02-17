import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { NewsDataArticle, NewsDataSource } from '@/types/news';

export interface NewsState {
  sources: NewsDataSource[];
  articles: NewsDataArticle[];
  newsByCategory: {
    top: NewsDataArticle[];
    world: NewsDataArticle[];
    politics: NewsDataArticle[];
    business: NewsDataArticle[];
    entertainment: NewsDataArticle[];
    sports: NewsDataArticle[];
    health: NewsDataArticle[];
    technology: NewsDataArticle[];
    science: NewsDataArticle[];
  };
  article: NewsDataArticle | undefined | null;
  nextPage: string | null;
}

export const initialNewsState: NewsState = {
  sources: [],
  articles: [],
  newsByCategory: {
    top: [],
    world: [],
    politics: [],
    business: [],
    entertainment: [],
    sports: [],
    health: [],
    technology: [],
    science: [],
  },
  article: undefined,
  nextPage: null,
};

const news = createSlice({
  name: 'news',
  initialState: initialNewsState,
  reducers: {
    setNewsSources(state, action: PayloadAction<NewsDataSource[]>) {
      state.sources = action.payload;
    },
    setNewsArticles(state, action: PayloadAction<NewsDataArticle[]>) {
      state.articles = action.payload;
    },
    setNewsByCategory(state, action: PayloadAction<{ category: string, articles: NewsDataArticle[] }>) {
      const { category, articles } = action.payload;
      state.newsByCategory[category as keyof typeof state.newsByCategory] = articles;
    },
    setNewsReadArticle(state, action: PayloadAction<NewsDataArticle | undefined | null>) {
      state.article = action.payload;
    },
    setNextPage(state, action: PayloadAction<string | null>) {
      state.nextPage = action.payload;
    },
  },
});

export const { 
    setNewsSources, setNewsArticles, setNewsByCategory, setNewsReadArticle, setNextPage 
  } = news.actions;
export const newsSources = (state: RootState) => state.news.sources;
export const newsArticles = (state: RootState) => state.news.articles;
export const newsByCategory = (
    state: RootState, 
    category: string,
  ) => state.news.newsByCategory[category as keyof typeof state.news.newsByCategory];
export const newsArticle = (state: RootState) => state.news.article;
export const nextPage = (state: RootState) => state.news.nextPage;

export default news;
