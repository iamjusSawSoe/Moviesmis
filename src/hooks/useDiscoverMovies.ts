import { useQuery } from "@tanstack/react-query";
import { options } from "./config";

export type Movie = {
  adult: Boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: Boolean;
  vote_average: number;
  vote_count: number;
};

const fetchDiscoverMovies = async (page = 1): Promise<Array<Movie>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    options
  );
  const data = await response.json();
  return data.results;
};

const useDiscoverMovies = (page: number) => {
  return useQuery({
    queryKey: ["discoverMovies", page],
    queryFn: () => fetchDiscoverMovies(page),
  });
};

export { fetchDiscoverMovies, useDiscoverMovies };
