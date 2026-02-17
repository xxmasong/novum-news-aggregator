import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { NewsDataOptions } from "@/types/news";
import { allCategories, allCountries } from "@/services/NewsService";

export const OptionsContext = createContext<
  [
    NewsDataOptions | null,
    Dispatch<SetStateAction<NewsDataOptions>> | null,
  ]
>([null, null]);

function OptionsContextProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<NewsDataOptions>({
    countries: null, categories: null,
  });

  useEffect(() => {
    (async () => {
      const [countries, categories] = await Promise.all([
        allCountries(), allCategories(),
      ]);
      setOptions({countries: countries, categories: categories});
    })();
  }, []);

  return (
    <OptionsContext.Provider value={[options, setOptions]}>
      {children}
    </OptionsContext.Provider>
  );
}

export default OptionsContextProvider;
