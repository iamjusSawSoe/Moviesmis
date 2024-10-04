"use client";

import ListGrid from "@/components/ListGrid";
import { Series, usePopularSeries } from "@/hooks/usePopularSeries";
import { useEffect, useState } from "react";

type Props = {};

const SeriesPage = (props: Props) => {
  const [page, setPage] = useState(1);
  const popularSeriesQuery = usePopularSeries(page);
  const [items, setItems] = useState<Series[]>([]);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  useEffect(() => {
    if (popularSeriesQuery.isFetched && popularSeriesQuery.data) {
      setItems((prevItems) => [...prevItems, ...popularSeriesQuery.data]);
    }
  }, [popularSeriesQuery.isFetched, popularSeriesQuery.data]);

  const loadMore = () => {
    setIsFetchingNextPage(true);
    setPage((prevPage) => prevPage + 1);

    if (popularSeriesQuery.data) {
      setTimeout(() => {
        setItems((prevItems) => [...prevItems, ...popularSeriesQuery.data]);
        setIsFetchingNextPage(false);
      }, 2000);
    }
  };

  return (
    <section className="w-100 ">
      <div
        className="w-full max-h-[550px] h-[400px] bg-no-repeat"
        style={{
          backgroundImage: `url(/darkMovieSection.jpg)`,
        }}
      >
        <h1 className=" text-center text-[50px] py-48 leading-8 font-bold text-white">
          Movies
        </h1>
      </div>

      {items.length > 0 && (
        <ListGrid
          items={items}
          isFetchingNextPage={isFetchingNextPage}
          loadMore={loadMore}
        />
      )}
    </section>
  );
};

export default SeriesPage;
