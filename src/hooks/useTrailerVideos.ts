import { useQuery } from "@tanstack/react-query";
import { options } from "./config";

export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

type CreditList = {
  id: string;
  cast: Cast[];
};

const fetchTrailerVideos = async (
  movieId: string | undefined
): Promise<CreditList> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${movieId}/credits`,
    options
  );
  const data = await response.json();
  return data;
};

const useCastList = (movieId: string | undefined) => {
  return useQuery({
    queryKey: ["castList", movieId],
    queryFn: () => fetchTrailerVideos(movieId),
    enabled: !!movieId,
  });
};

export { fetchTrailerVideos, useCastList };
