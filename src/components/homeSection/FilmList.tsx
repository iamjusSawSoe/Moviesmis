"use client";

import { Movie } from "@/hooks/useDiscoverMovies";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import { Series, usePopularSeries } from "@/hooks/usePopularSeries";
import { SearchItem } from "@/hooks/useSearchMulti";
import { useTopRatedMovies } from "@/hooks/useTopRatedMovies";
import { useTopRatedSeries } from "@/hooks/useTopRatedSeries";
import { toggleModalDetail } from "@/store/features/modalSlice";
import { RootState } from "@/store/store";
import "animate.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import Button from "../Button";

type Props = { name: string; category: string; type: string };

const FilmList = (props: Props) => {
  const dispatch = useDispatch();
  const { isModalDetail } = useSelector((state: RootState) => state.modal);

  const [itemId, setItemid] = useState("");
  const swiperRef = useRef<SwiperRef>(null);

  const [filmList, setFilmList] = useState<Movie[] | Series[] | SearchItem[]>(
    []
  );
  const popularMoviesQuery = usePopularMovies(1);
  const popularSeriesQuery = usePopularSeries(1);
  const topRatedSeriesQuery = useTopRatedSeries(1);
  const topRatedMoviesQuery = useTopRatedMovies(1);

  useEffect(() => {
    if (filmList.length > 0) setFilmList([]);
    if (
      props.category === "movie" &&
      props.type === "popular" &&
      popularMoviesQuery.data
    ) {
      setFilmList(popularMoviesQuery.data);
    }

    if (
      props.category === "tv" &&
      props.type === "popular" &&
      popularSeriesQuery.data
    ) {
      setFilmList(popularSeriesQuery.data);
    }

    if (
      props.category === "movie" &&
      props.type === "top_rated" &&
      topRatedMoviesQuery.data
    ) {
      setFilmList(topRatedMoviesQuery.data);
    }

    if (
      props.category === "tv" &&
      props.type === "top_rated" &&
      topRatedSeriesQuery.data
    ) {
      setFilmList(topRatedSeriesQuery.data);
    }
  }, [
    props.category,
    popularMoviesQuery.isSuccess,
    popularMoviesQuery.data,
    popularSeriesQuery.isSuccess,
    popularSeriesQuery.data,
    filmList.length,
    props.type,
    topRatedMoviesQuery.data,
    topRatedSeriesQuery.data,
  ]);

  if (popularMoviesQuery.isError || popularSeriesQuery.isError) {
    return <h1> Sorry, there was an error </h1>;
  }

  // useEffect(() => {
  //   document.body.style.overflow = isModalDetail ? "hidden" : "auto";
  // }, [isModalDetail]);

  const openModalDetail = (id: string) => {
    dispatch(toggleModalDetail());
    // swiperRef.current.swiper.autoplay.stop();
    setItemid(id);
  };

  return (
    <section className=" mx-6 sm:mx-10 my-10 ">
      <div className="flex justify-between items-center ">
        <h1 className="dark:text-white text-[#13191d] text-[20px] sm:text-[40px] leading-3 sm:text-2xl font-bold ">
          {props.name}
        </h1>
        <Link href={`/${props.category === "movie" ? "movies" : "series"}`}>
          <Button
            styles=" rounded-full py-0 sm:py-1 px-6 sm:px-8 font-[400] hover:font-[800] ease-in-out duration-500  "
            text="More..."
          />
        </Link>
      </div>
      <div className="mt-8">
        {filmList.length > 0 ? (
          <Swiper
            ref={swiperRef}
            grabCursor={true}
            spaceBetween={20}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            className="film-list"
            modules={[Autoplay]}
          >
            {filmList.map((item, index) => (
              <SwiperSlide
                key={item.id}
                className="group xl:w-[11.5%] md:w-[15.1%] lmd:w-[20%] sm:w-[24.2%] ss:w-[28%] w-[45%] h-[320px] hover:mt-[10px]"
              >
                <div className="h-[305px] relative rounded-3xl hover:scale-[1.05] hover:border-[3px] hover:ease-in-out hover:duration-150 hover:border-secondary">
                  <FaPlay className="cursor-pointer absolute my-32 mx-20 text-4xl invisible group-hover:visible group-hover:ease-in-out group-hover:duration-500 z-50 text-transparent group-hover:text-secondary" />
                  <Image
                    alt={`${
                      "original_title" in item
                        ? item.original_title
                        : item.original_name
                    }`}
                    src={`${process.env.NEXT_PUBLIC_W500_IMAGE_URL}${item.poster_path}`}
                    className=" rounded-3xl object-fill cursor-pointer group-hover:brightness-[.45] "
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    onError={(e) => {
                      e.currentTarget.onerror = null; // Prevent looping
                      e.currentTarget.src = ""; // Clear the image src to hide broken image icon

                      const parentElement =
                        e.currentTarget.closest(".h-[305px]");
                      if (parentElement) {
                        parentElement.classList.add(
                          "bg-gray-500",
                          "flex",
                          "items-center",
                          "justify-center"
                        );
                        parentElement.textContent = "No Image Found";
                      }
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="film-list gap-5 flex">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <SwiperSlide
                  key={index}
                  className="group xl:w-[11.5%] md:w-[15.1%] lmd:w-[20%] sm:w-[24.2%] ss:w-[28%] w-[45%] h-[320px]"
                >
                  <div className="h-[305px] rounded-3xl bg-gray-300 animate-pulse" />
                </SwiperSlide>
              ))}
          </div>
        )}
      </div>
      {/* <CastList id="912649" /> */}
      {/* {isModalDetail && (
        <DetailModal
          openModalDetail={() => openModalDetail()}
          itemId={itemId}
          itemCategory={props.category}
          itemType={props.type}
        />
      )} */}
    </section>
  );
};

export default FilmList;
