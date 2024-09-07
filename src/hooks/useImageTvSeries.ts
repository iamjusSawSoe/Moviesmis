import { useQuery } from "@tanstack/react-query";
import { options } from "./config";

type SerieImage = {
  backdrops: [
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

const fetchImageTvSeries = async (
  serieId: number | undefined
): Promise<Array<SerieImage>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/tv/${serieId}/images`,
    options
  );
  const data = await response.json();
  return data;
};

const useImageTvSeries = (serieId: number | undefined) => {
  return useQuery({
    queryKey: ["movieImage", serieId],
    queryFn: () => fetchImageTvSeries(serieId),
    enabled: !!serieId,
  });
};

export { fetchImageTvSeries, useImageTvSeries };
