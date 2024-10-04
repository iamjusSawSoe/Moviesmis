import { useQuery } from "@tanstack/react-query";
import { options } from "./config";

export type SearchMovies = {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SearchSeries = {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number;
  popularity: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

export type SearchItem = SearchMovies | SearchSeries;

type requestData = {
  searchValue: string;
  include_adult?: boolean;
  page?: number;
};

const fetchSearchMulti = async ({
  searchValue,
  include_adult = false,
  page = 1,
}: requestData): Promise<{ results: SearchItem[]; total_pages: number }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/search/multi?query=${searchValue}&include_adult=${include_adult}&language=en-US&page=${page}`,
    options
  );
  const data = await response.json();
  return {
    results: data.results ?? [],
    total_pages: data.total_pages ?? 1, // Default to 1 if total_pages is not present
  };
};

const useSearchMulti = (data: requestData) => {
  return useQuery({
    queryKey: ["searchMulti", data.searchValue, data.page],
    queryFn: () => fetchSearchMulti(data),
    enabled: !!data.searchValue,
    placeholderData: (previousQueryData) => {
      return previousQueryData;
    },
    staleTime: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export { fetchSearchMulti, useSearchMulti };
