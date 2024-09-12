"use client";

import { useTrending } from "@/hooks/useTrending";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "./Button";

const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

const WatchNow = () => {
  const swiperRef = useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [allSlidesData, setAllSlidesData] = useState<any[]>([]);

  const trendingQuery = useTrending();

  useEffect(() => {
    if (trendingQuery.data) {
      const slidesData = trendingQuery.data.map((item: any) => {
        let image = "";
        if (item.media_type === "movie") {
          image = `${process.env.NEXT_PUBLIC_ORIGINAL_IMAGE_URL}${item.backdrop_path}`;
        } else if (item.media_type === "tv") {
          image = `${process.env.NEXT_PUBLIC_ORIGINAL_IMAGE_URL}${item.backdrop_path}`;
        }

        return { ...item, image };
      });

      setAllSlidesData(slidesData);
      setIsImagesLoaded(true);
    }
  }, [trendingQuery.data]);

  if (trendingQuery.isPending || !isImagesLoaded) {
    return <div>Loading...</div>;
  }

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
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {allSlidesData?.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div
                className={`w-full h-[100vh] bg-no-repeat bg-cover`}
                style={{
                  backgroundImage: `url('${item.image}')`,
                }}
              >
                <div className="w-full h-full bg-dimBlack flex flex-col-reverse lg:flex-row justify-center items-center gap-10">
                  <div className="lg:max-w-[800px] mb-28 lmd:mb-40 lg:mb-0">
                    <h1
                      className={` text-white font-bold text-[30px] lg:text-[45px] leading-[40px] lmd:leading-[30px] mb-6 lmd:mb-10 ${
                        activeSlideIndex === index
                          ? "animate__animated animate__fadeInDown animate__slow"
                          : ""
                      }`}
                    >
                      {item.name || item.title}
                    </h1>
                    <p
                      className={`${
                        activeSlideIndex === index
                          ? "animate__animated animate__fadeInDown animate__slow"
                          : ""
                      } flex text-white font-semibold px-4 lmd:px-0 text-[16px]  lg:text-[18px] leading-[40px] lmd:w-[800px] lg:w-[650px] text-center`}
                    >
                      {item.overview}
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
