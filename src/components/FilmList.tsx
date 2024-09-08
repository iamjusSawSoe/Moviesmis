"use client";

import { useEffect, useRef, useState } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "animate.css";
import Axios from "axios";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { FaPlay } from "react-icons/fa";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import apiConfig from "../api/apiConfig";
import { toggleModalDetail } from "../store/Modal";
import Button from "./Button";
type Props = { name: string; category: string; type: string };

const FilmList = (props: Props) => {
  SwiperCore.use([Autoplay]);
  const isModalDetail = useSelector((state) => state.modal.isModalDetail);
  const dispatch = useDispatch();
  const [itemId, setItemid] = useState("");
  const [detailModal, setDetailModal] = useState(false);
  const swiperRef = useRef(null);

  const { data, isError } = useQuery(
    ["film", props.category, props.type],
    async () => {
      return await Axios.get(
        `${apiConfig.baseUrl}${props.category}/${props.type}/${apiConfig.apiKey}&page=1`
      ).then((res) => res.data.results);
    },
    {
      staleTime: 30000,
      cacheTime: 60000,
      refetchOnWindowFocus: false,
    }
  );

  if (isError) {
    return <h1> Sorry, there was an error </h1>;
  }

  useEffect(() => {
    document.body.style.overflow = isModalDetail ? "hidden" : "auto";
  }, [isModalDetail]);

  const openModalDetail = (id) => {
    setDetailModal(!detailModal);
    swiperRef.current.swiper.autoplay.stop();
    setItemid(id);
  };

  return (
    <section className=" mx-6 sm:mx-10 my-10 ">
      <div className="flex justify-between items-center ">
        <h1 className="dark:text-white text-[#13191d] text-[20px] sm:text-[40px] leading-3 sm:text-2xl font-bold ">
          {props.name}
        </h1>
        <Link to={`/${props.category === "movie" ? "movies" : "series"}`}>
          <Button
            styles=" rounded-full py-0 sm:py-1 px-6 sm:px-8 font-[400] hover:font-[800] ease-in-out duration-500  "
            text="More..."
          />
        </Link>
      </div>
      <AnimationOnScroll
        duration="2.5"
        animateIn="animate__slideInRight"
        animateOnce="true"
      >
        <div className=" mt-8 ">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            grabCursor={true}
            spaceBetween={10}
            slidesPerView="auto"
            loopedSlides={20}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
          >
            {data?.map((item, index) => (
              <SwiperSlide
                key={index}
                className="group xl:w-[11.5%] md:w-[15.1%] lmd:w-[20%] sm:w-[24.2%] ss:w-[28%] w-[45%] h-[320px]"
              >
                <div
                  className="h-[305px] rounded-3xl hover:scale-[1.05] hover:border-[3px]  hover:ease-in-out hover:duration-150 hover:border-secondary "
                  onClick={() => {
                    openModalDetail(item.id);
                    dispatch(toggleModalDetail());
                  }}
                >
                  <FaPlay className=" cursor-pointer absolute my-32 mx-20 text-4xl invisible group-hover:visible group-hover:ease-in-out group-hover:duration-500 z-50 text-transparent group-hover:text-secondary" />
                  <img
                    src={apiConfig.w500Image(item.poster_path)}
                    className=" h-[300px] rounded-3xl object-fill cursor-pointer group-hover:brightness-[.45]"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </AnimationOnScroll>

      {/* {detailModal && (
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
