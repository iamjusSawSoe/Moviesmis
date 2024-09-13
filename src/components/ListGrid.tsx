"use client";

import { Movie } from "@/hooks/useDiscoverMovies";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import { Series, usePopularSeries } from "@/hooks/usePopularSeries";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

type ListGrid = {
  category: string;
};

const ListGrid = ({ category }: ListGrid) => {
  const [detailModal, setDetailModal] = useState(false);
  const [itemId, setItemid] = useState("");
  const [items, setItems] = useState<Movie[] | Series[]>([]);
  const [page, setPage] = useState(1);
  // const isModalDetail = useSelector((state) => state.modal.isModalDetail);
  // const dispatch = useDispatch();

  const popularMoviesQuery = usePopularMovies(1);
  const popularSeriesQuery = usePopularSeries(1);

  useEffect(() => {
    if (items.length > 0) setItems([]);

    if (category === "movies" && popularMoviesQuery.data) {
      setItems(popularMoviesQuery.data);
    }

    if (category === "series" && popularSeriesQuery.data) {
      setItems(popularSeriesQuery.data);
    }
  }, [
    category,
    items.length,
    popularMoviesQuery.data,
    popularSeriesQuery.data,
  ]);

  if (popularMoviesQuery.isPending || popularSeriesQuery.isPending) {
    return <div>Loading...</div>;
  }

  if (popularMoviesQuery.isError || popularSeriesQuery.isError) {
    return <h1> Sorry, there was an error </h1>;
  }

  // const openModalDetail = (id) => {
  //   setDetailModal(!detailModal);
  //   setItemid(id);
  // };

  return (
    <section className="sm:my-14 mx-6 my-6 sm:mx-16">
      <div className="grid grid-cols-mobileAuto sm:grid-cols-auto gap-6 film-list">
        {items.map((item, index) => (
          <div
            className="group w-[150px] sm:w-[200px] sm:h-[400px]"
            key={index}
          >
            <div className=" h-[200px]  sm:h-[305px] w-[150px] sm:w-[200px] rounded-3xl group-hover:scale-[1.05] group-hover:border-[3px]  group-hover:ease-in-out hover:duration-150 group-hover:border-secondary ">
              <FaPlay className=" cursor-pointer absolute my-32 mx-20 text-4xl invisible group-hover:visible group-hover:ease-in-out group-hover:duration-500 z-50 text-transparent group-hover:text-secondary" />
              <Image
                src={`${process.env.NEXT_PUBLIC_W500_IMAGE_URL}${item.poster_path}`}
                className=" h-[200px] w-[150px] sm:w-auto sm:h-[300px] rounded-3xl object-fill cursor-pointer  group-hover:brightness-[.45]"
                height={300}
                width={150}
                alt="List Grid Image"
              />
            </div>
            <h1 className=" w-[140px] sm:w-auto text-secondary dark:text-white text-[16px] mt-3 group-hover:scale-[0.95] group-hover:ease-in-out group-hover:duration-150  group-hover:text-secondary ">
              {item.original_title || item.original_name}
            </h1>
          </div>
        ))}
      </div>
      {/* <div className=" flex justify-center items-center">
        <Button
          styles=" rounded-full mt-20 sm:mt-0 py-1 px-8 font-[400] hover:font-[800] ease-in-out duration-500  "
          text="Load More..."
          onClick={loadMore}
        />
      </div> */}
      {/* {detailModal && (
        <DetailModal
          openModalDetail={openModalDetail}
          itemId={itemId}
          itemCategory={category === "movies" ? "movie" : "tv"}
        />
      )} */}
    </section>
  );
};

export default ListGrid;
