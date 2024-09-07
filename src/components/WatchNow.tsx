"use client";

import { useImageMovie } from "@/hooks/useImageMovie";
import { useImageTvSeries } from "@/hooks/useImageTvSeries";
import { useTrending } from "@/hooks/useTrending";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "./Button";

const WatchNow = () => {
  const swiperRef = useRef(null);
  const [itemId, setItemid] = useState("");
  const dispatch = useDispatch();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [movieId, setMovieId] = useState<number | undefined>(undefined);
  const [seriesId, setSeriesId] = useState<number | undefined>(undefined);

  const trendingQuery = useTrending();

  const movieQuery = useImageMovie(movieId);
  const seriesQuery = useImageTvSeries(seriesId);

  useEffect(() => {
    if (
      trendingQuery.data &&
      trendingQuery.data.length > 0 &&
      trendingQuery.data.media_type === "movie"
    ) {
      setMovieId(trendingQuery.data[0].id);
    }
  }, [trendingQuery.data]);

  useEffect(() => {
    if (
      trendingQuery.data &&
      trendingQuery.data.length > 0 &&
      trendingQuery.data.media_type === "tv"
    ) {
      setSeriesId(trendingQuery.data[0].id);
    }
  }, [trendingQuery.data]);

  if (trendingQuery.isPending || !trendingQuery.data)
    return <div>Loading...</div>;

  return (
    <>
      <section>
        <Swiper
          ref={swiperRef}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          loopedSlides={5}
          loop={true}
          speed={1000}
          onSlideChange={(swiper) => {
            setActiveSlideIndex(swiper.realIndex);
            setMovieId(trendingQuery.data[swiper.realIndex]?.id);
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {trendingQuery.data?.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <div
                className={`w-full max-h-[1100px] h-[1100px] lmd:max-h-[100vh] lmd:h-[100vh] bg-no-repeat bg-cover `}
                style={{
                  backgroundImage: `url('${process.env.NEXT_PUBLIC_ORIGINAL_IMAGE_URL}/${movieQuery.data?.posters?.[0]?.file_path}')`,
                }}
              >
                <div className="w-full h-full bg-dimBlack flex flex-col-reverse lg:flex-row justify-center items-center gap-10">
                  <div className="lg:max-w-[800px] mb-28 lmd:mb-40 lg:mb-0">
                    <h1
                      className={` text-white font-bold text-[30px] lg:text-[45px] leading-[40px] lmd:leading-[30px] mb-6 lmd:mb-10  ${
                        activeSlideIndex === index
                          ? "animate__animated animate__fadeInDown animate__slow"
                          : ""
                      }`}
                    >
                      {movie.name}
                    </h1>
                    <p
                      className={`${
                        activeSlideIndex === index
                          ? "animate__animated animate__fadeInDown animate__slow	"
                          : ""
                      } flex text-white font-semibold px-4 lmd:px-0 text-[16px]  lg:text-[18px] leading-[40px] lmd:w-[800px] lg:w-[650px] text-center`}
                    >
                      {movie.overview}
                    </p>
                    <div
                      className={`mt-8  flex ss:block gap-4 ${
                        activeSlideIndex === index
                          ? "animate__animated animate__fadeInDown animate__slow"
                          : ""
                      }`}
                    >
                      <Button
                        styles="bg-secondary ml-2 ss:ml-0  rounded-full text-[20px] w-[180px] h-[50px] shadow-3xl shadow-dimBlack font-[400] ease-in-out duration-500 hover:font-[800] hover:shadow-5xl hover:bg-secondary hover:shadow-dimBlack"
                        text="Watch Now"
                      />
                      <Button
                        styles=" ss:mx-5 px-2 bg-dimBlack rounded-full text-[20px] w-[180px] h-[50px] shadow-3xl shadow-dimBlack border-2 font-[400] hover:font-[800] ease-in-out duration-500"
                        text="Watch Trailer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default WatchNow;
