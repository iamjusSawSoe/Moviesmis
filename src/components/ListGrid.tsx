"use client";

import { Movie } from "@/hooks/useDiscoverMovies";
import { Series } from "@/hooks/usePopularSeries";
import Image from "next/image";
import React, { useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import SkeletonLoader from "./SkeletonLoader";

type ListGridProps = {
  items: Movie[] | Series[];
  loadMore: () => void;
  isFetchingNextPage: boolean;
};

const ListGrid = ({ items, loadMore, isFetchingNextPage }: ListGridProps) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section className="sm:my-14 mx-6 my-6 sm:mx-16">
      <div className="grid grid-cols-mobileAuto sm:grid-cols-auto gap-6 film-list">
        {items.map((item, index) => (
          <div
            className="group w-[150px] sm:w-[200px] sm:h-[400px]"
            key={index}
          >
            <div className="h-[200px] sm:h-[305px] w-[150px] sm:w-[200px] rounded-3xl group-hover:scale-[1.05] group-hover:border-[3px] group-hover:ease-in-out hover:duration-150 group-hover:border-secondary">
              <FaPlay className="cursor-pointer absolute my-32 mx-20 text-4xl invisible group-hover:visible group-hover:ease-in-out group-hover:duration-500 z-50 text-transparent group-hover:text-secondary" />
              <Image
                src={`${process.env.NEXT_PUBLIC_W500_IMAGE_URL}${item.poster_path}`}
                className="h-[200px] w-[150px] sm:w-auto sm:h-[300px] rounded-3xl object-fill cursor-pointer group-hover:brightness-[.45]"
                height={300}
                width={150}
                alt="List Grid Image"
              />
            </div>
            <h1 className="w-[140px] sm:w-auto text-secondary dark:text-white text-[16px] mt-3 group-hover:scale-[0.95] group-hover:ease-in-out group-hover:duration-150 group-hover:text-secondary">
              {"original_title" in item
                ? item.original_title
                : item.original_name}
            </h1>
          </div>
        ))}

        {isFetchingNextPage && (
          <React.Fragment>
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </React.Fragment>
        )}

        <div ref={ref} className="h-10"></div>
      </div>{" "}
    </section>
  );
};

export default ListGrid;
