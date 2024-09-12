import { useQuery } from "@tanstack/react-query";
import { options } from "./config";
import { Series } from "./usePopularSeries";

const fetchTopRatedSeries = async (page = 1): Promise<Array<Series>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/tv/top_rated?language=en-US&page=${page}`,
    options
  );
  const data = await response.json();
  return data.results;
};

const useTopRatedSeries = (page: number) => {
  return useQuery({
    queryKey: ["topRatedSeries", page],
    queryFn: () => fetchTopRatedSeries(page),
    enabled: !!page,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export { fetchTopRatedSeries, useTopRatedSeries };
