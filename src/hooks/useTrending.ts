import { useQuery } from "@tanstack/react-query";
import { options } from "./config";

type Trending = {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

const fetchTrending = async (): Promise<Array<Trending>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/trending/all/day?language=en-US`,
    options
  );
  const data = await response.json();
  return data.results;
};

const useTrending = () => {
  return useQuery({
    queryKey: ["trending"],
    queryFn: () => fetchTrending(),
  });
};

export { fetchTrending, useTrending };
