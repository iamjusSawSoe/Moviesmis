import { useQuery } from "@tanstack/react-query";
import { options } from "./config";

type MovieImage = {
  backdrops: [];
  id: number;
  logos: [];
  posters: [
    {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }
  ];
};

const fetchImageMovie = async (
  movieId: number | undefined
): Promise<Array<MovieImage>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/images`,
    options
  );
  const data = await response.json();
  return data;
};

const useImageMovie = (movieId: number | undefined) => {
  return useQuery({
    queryKey: ["movieImage", movieId],
    queryFn: () => fetchImageMovie(movieId),
    enabled: !!movieId,
  });
};

export { fetchImageMovie, useImageMovie };
