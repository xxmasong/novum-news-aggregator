import { useContext } from "react";
import { OptionsContext } from "@/providers/OptionsContextProvider";

function useOptions() {
  const [options] = useContext(OptionsContext);

  return {
    countries: options?.countries,
    categories: options?.categories,
  };
}

export default useOptions;
