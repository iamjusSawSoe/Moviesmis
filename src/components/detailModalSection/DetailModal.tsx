import React, { useState, useEffect, useRef } from "react";
import apiConfig from "../api/apiConfig";
import { ImCross } from "react-icons/im";
import { AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalDetail } from "@/store/features/modalSlice";
import Button from "../Button";
import CastList from "./CastList";
import TrailerList from "./TrailerList";

const DetailModal = (props) => {
  const [itemDetail, setItemDetail] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailerHeight, setTrailerHeight] = useState([]);
  const [watchTrailer, setWatchTrailer] = useState(false);
  const divHeight = useRef(null);

  const closeTrailer = () => {
    setWatchTrailer(!watchTrailer);
  };

  const getItemDetailRequest = async () => {
    const url = `${apiConfig.baseUrl}${props.itemCategory}/${props.itemId}${apiConfig.apiKey}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setItemDetail(responseJson);
    setGenres(responseJson.genres);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getItemDetailRequest();
    setTrailerHeight(divHeight.current.offsetHeight);
    const vidHeight = document.getElementById("divHeight");
  }, [props.itemCategory, props.itemId]);

  const getHoursMins = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return (
      <p className=" text-yellow-400 font-semibold text-[14px] leading-[30px]">
        {hours}h {minutes}mins
      </p>
    );
  };

  const str = (first, last) => {
    let stringFirst = `${first}`;
    let stringLast = `${last}`;
    if (
      stringFirst.slice(0, 4) === stringLast.slice(0, 4) &&
      itemDetail.in_production === false
    ) {
      return `${stringFirst.slice(0, 4)}`;
    } else {
      return `${stringFirst.slice(0, 4)} - ${
        itemDetail.in_production ? " " : stringLast.slice(0, 4)
      }`;
    }
  };

  const rating = (rate) => {
    let rating = `${rate}`;
    return `${rating.slice(0, 3)}`;
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-dimBlack focus:outline-none ">
        <div className="relative h-full max-w-auto ss:max-w-[1300px] md:h-auto  animate__animated animate__fadeInDown ">
          {watchTrailer && (
            <TrailerList
              close={closeTrailer}
              id={props.itemId}
              category={props.itemCategory}
              height={trailerHeight}
            />
          )}
          {!watchTrailer && (
            <div
              id="divHeight"
              ref={divHeight}
              className="border-0 bItem rounded-lg shadow-lg relative flex flex-col w-[360px] ss:w-[700px] md:w-[1100px] xl:w-[1300px]  outline-none focus:outline-none bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: ` linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),url(${apiConfig.originalImage(
                  itemDetail.backdrop_path
                )})`,
              }}
            >
              <ImCross
                className=" cursor-pointer text-white text-xl ml-auto m-5 hover:text-secondary"
                onClick={() => {
                  props.openModalDetail();
                  dispatch(toggleModalDetail());
                }}
              />
              <div className=" mx-4 ss:mx-12  my-6 ss:my-16 md:my-4 flex flex-col md:flex-row justify-center md:items-center gap-10 md:gap-12 xl:gap-20">
                <div className="">
                  <img
                    src={apiConfig.w500Image(itemDetail.poster_path)}
                    className=" m-auto h-[350px] ss:h-[450px] md:h-[500px] rounded-3xl object-fill cursor-pointer"
                  />
                  <div className="mt-6 flex justify-center items-center">
                    <Button
                      styles="bg-secondary px-[15px] ss:px-[20px]  rounded-full text-[16px] shadow-3xl shadow-dimBlack font-[400] ease-in-out duration-500 hover:font-[800] hover:shadow-5xl hover:bg-secondary hover:shadow-dimBlack  "
                      text="Watch Now"
                      onClick={() => setWatchTrailer(!watchTrailer)}
                    />
                    <Button
                      styles=" ml-5 px-[15px] ss:px-[20px] bg-dimBlack rounded-full text-[16px]  shadow-3xl shadow-dimBlack border-2 font-[400] hover:font-[800] ease-in-out duration-500 "
                      text="Watch Trailer"
                      onClick={() => setWatchTrailer(!watchTrailer)}
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-white font-bold text-[38px] ss:text-[56px]  leading-[50px] ss:leading-[30px] md:text-[46px] md:leading-[50px] mb-4">
                    {itemDetail.title || itemDetail.name}
                  </h1>
                  {/* for tablet (>phone) size */}
                  <div className="hidden ss:flex items-center mb-4 gap-8">
                    <p className=" text-yellow-400 font-semibold text-[13px] ss:text-[14px] leading-[30px]">
                      {itemDetail.release_date ||
                        str(
                          itemDetail.first_air_date,
                          itemDetail.last_air_date
                        )}
                    </p>
                    {itemDetail.runtime && getHoursMins(itemDetail.runtime)}
                    {itemDetail.number_of_seasons && (
                      <p className=" text-yellow-400 font-semibold text-[14px] leading-[30px]">
                        Total Seasons : {itemDetail.number_of_seasons}
                      </p>
                    )}
                    {itemDetail.number_of_episodes && (
                      <p className=" text-yellow-400 font-semibold text-[14px] leading-[30px]">
                        Total Episodes : {itemDetail.number_of_episodes}
                      </p>
                    )}
                    <div className="flex items-center justify-evenly gap-2 ">
                      <AiFillStar className=" text-yellow-400 font-semibold text-[16px] leading-[20px] mb-[2px]" />
                      <p className="text-yellow-400 text-[14px] leading-[30px]">
                        {rating(itemDetail.vote_average)}
                      </p>
                    </div>
                  </div>
                  <div className="hidden ss:flex items-center gap-4">
                    {genres.map((genre, index) => (
                      <div
                        key={index}
                        className=" bg-dimBlue rounded-full border-whiteColor border-[2px]  py-1 px-6   mb-4"
                      >
                        <h1 className="text-white text-center mb-[2px] text-sm">
                          {genre.name}
                        </h1>
                      </div>
                    ))}
                  </div>

                  {/* for phone size */}
                  <div className="flex justify-center items-center my-6  ss:hidden">
                    <div className="flex-col items-center mb-4 gap-8 mr-auto">
                      <p className=" text-yellow-400 font-semibold text-[13px] ss:text-[14px] leading-[30px]">
                        {itemDetail.release_date ||
                          str(
                            itemDetail.first_air_date,
                            itemDetail.last_air_date
                          )}
                      </p>
                      {itemDetail.runtime && getHoursMins(itemDetail.runtime)}
                      {itemDetail.number_of_seasons && (
                        <p className=" text-yellow-400 font-semibold text-[14px] leading-[30px]">
                          Total Seasons : {itemDetail.number_of_seasons}
                        </p>
                      )}
                      {itemDetail.number_of_episodes && (
                        <p className=" text-yellow-400 font-semibold text-[14px] leading-[30px]">
                          Total Episodes : {itemDetail.number_of_episodes}
                        </p>
                      )}
                      <div className="flex items-center gap-2  ">
                        <AiFillStar className=" text-yellow-400 font-semibold text-[16px] leading-[20px] mb-[2px]" />
                        <p className="text-yellow-400 text-[14px] leading-[30px]">
                          {rating(itemDetail.vote_average)}
                        </p>
                      </div>
                    </div>
                    <div className="flex-col items-center gap-4">
                      {genres.map((genre, index) => (
                        <div
                          key={index}
                          className=" bg-dimBlue rounded-full border-whiteColor border-[2px] w-[175px] h-[34px] py-1 px-6   mb-4"
                        >
                          <h1 className="text-white text-center mb-[2px] text-sm">
                            {genre.name}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-white font-semibold text-[17px] ss:text-[18px] leading-[30px] md:text-[15px] w-[350px] ss:w-[580px]">
                    {itemDetail.overview}
                  </p>
                  <CastList id={props.itemId} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default DetailModal;
