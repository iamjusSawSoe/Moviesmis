"use client";

import ListGrid from "@/components/ListGrid";
import { Movie } from "@/hooks/useDiscoverMovies";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import { useEffect, useState } from "react";

const MoviesPage = () => {
  const [page, setPage] = useState(1);
  const popularMoviesQuery = usePopularMovies(page);
  const [items, setItems] = useState<Movie[]>([]);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  useEffect(() => {
    if (popularMoviesQuery.isFetched && popularMoviesQuery.data) {
      setItems((prevItems) => [...prevItems, ...popularMoviesQuery.data]);
      console.log("this is from single call", popularMoviesQuery.data);
    }
  }, [popularMoviesQuery.isFetched, popularMoviesQuery.data]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const loadMore = () => {
    setIsFetchingNextPage(true);
    console.log("this is from load more");
    setPage((prevPage) => prevPage + 1);
    if (popularMoviesQuery.data) {
      setItems((prevItems) => [...prevItems, ...popularMoviesQuery.data]);
      setIsFetchingNextPage(false);
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

export default MoviesPage;
