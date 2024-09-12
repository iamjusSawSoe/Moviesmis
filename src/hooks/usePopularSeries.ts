import { useQuery } from "@tanstack/react-query";
import { options } from "./config";

export type Series = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string;
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

const fetchPopularSeries = async (page = 1): Promise<Array<Series>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/tv/popular?language=en-US&page=${page}`,
    options
  );
  const data = await response.json();
  return data.results;
};

const usePopularSeries = (page: number) => {
  return useQuery({
    queryKey: ["popularSeries", page],
    queryFn: () => fetchPopularSeries(page),
    enabled: !!page,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export { fetchPopularSeries, usePopularSeries };
