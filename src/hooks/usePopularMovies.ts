import { useQuery } from "@tanstack/react-query";
import { options } from "./config";
import { Movie } from "./useDiscoverMovies";

const fetchPopularMovies = async (page = 1): Promise<Array<Movie>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/popular?language=en-US&page=${page}`,
    options
  );
  const data = await response.json();
  return data.results;
};

const usePopularMovies = (page: number) => {
  return useQuery({
    queryKey: ["popularMovies", page],
    queryFn: () => fetchPopularMovies(page),
    enabled: !!page,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export { fetchPopularMovies, usePopularMovies };
