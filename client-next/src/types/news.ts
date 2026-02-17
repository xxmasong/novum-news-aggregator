export type NewsDataArticle = {
  title: string;
  description: string | null;
  content: string | null;
  link: string | null;
  image_url: string | null;
  keywords: string[] | null;
  category: string[] | null;
  country: string[] | null;
  source_id: string;
  creator: string[] | null; 
  pubDate: string;
};

export type NewsDataSource = {
  id: string;
  name: string | null;
  url: string | null;
  description: string | null;
  category: string[] | null;
  country: string[] | null;
};

export type NewsDataResponse = {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
  nextPage: string | null;
};

export type NewsDataOptions = {
  countries: {
    code: string;
    name: string;
  }[] | null, 
  categories: {
    name: string;
  }[] | null,
};
