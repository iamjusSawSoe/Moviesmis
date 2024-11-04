import React, { useState, useEffect } from "react";
import apiConfig from "../api/apiConfig";
import { ImCross } from "react-icons/im";

type TrailerProps = {
  id: string;
  category: string;
  height: number;
  close: () => void;
};

const TrailerList = (props: TrailerProps) => {
  const [trailer, setTrailer] = useState([]);

  const getTrailer = async () => {
    const url = `${apiConfig.baseUrl}${props.category}/${props.id}/videos${apiConfig.apiKey}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setTrailer(responseJson.results);
  };

  useEffect(() => {
    getTrailer();
  }, [props.category, props.id]);

  return (
    <div className="animate__animated animate__fadeInDown border-0 bItem rounded-lg top-[30%] ss:top-0 shadow-lg relative flex flex-col w-[350px] ss:w-[700px] md:w-[1000px] xl:w-[1300px] outline-none focus:outline-none bg-black">
      {trailer.slice(0, 1).map((videos, index) => (
        <div key={index}>
          <div className="absolute right-0 bg-black w-[65px] h-[60px] ">
            <ImCross
              className=" bg-black  cursor-pointer text-white text-[18px] leading-7 mx-5 my-6 hover:text-secondary"
              onClick={props.close}
            />
          </div>

          <iframe
            src={`https://www.youtube.com/embed/${videos.key}?rel=0&fs=0&modestbranding=1`}
            height={props.height - 50}
            width="100%"
            title="video"
            allowFullScreen
            className={`h-[270px] ss:h-[400px] md:h-[600px] xl:h-[650px]`}
          ></iframe>
        </div>
      ))}
      {trailer.length === 0 && (
        <div className={`w-[]`}>
          <div className="absolute right-0 bg-black w-[65px] h-[60px] ">
            <ImCross
              className=" bg-black  cursor-pointer text-white text-[18px] leading-7 mx-5 my-6 hover:text-secondary"
              onClick={props.close}
            />
          </div>
          <h1 className="text-white text-center absolute text-[20px] ss:text-[35px] leading-7 mx-5 my-6 hover:text-secondary cursor-pointer top-[40%] ss:top-[45%] left-[10%] ss:left-[35%]">
            {" "}
            Sorry, No Trailer Available.
          </h1>
          <iframe
            src={``}
            height={props.height - 50}
            width="100%"
            title="video"
            className="h-[270px] ss:h-[400px] md:h-[600px] xl:h-[650px]"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default TrailerList;
