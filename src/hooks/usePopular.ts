import { useQuery } from "@tanstack/react-query";
import { options } from "./config";

type Post = {
  id: number;
  title: string;
  body: string;
};

const fetchPopularMovies = async (page = 1): Promise<Array<Post>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/popular?language=en-US&page=${page}`,
    options
  );
  const data = await response.json();
  return data;
};

const usePopularMovies = (page: number) => {
  return useQuery({
    queryKey: ["popularMovies", page],
    queryFn: () => fetchPopularMovies(page),
  });
};

export { fetchPopularMovies, usePopularMovies };
