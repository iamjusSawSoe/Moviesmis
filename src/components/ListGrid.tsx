import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../api/apiConfig";
import { toggleModalDetail } from "../store/Modal";
import Button from "./Button";
import { DetailModal } from "./index";

const ListGrid = (props) => {
  const [detailModal, setDetailModal] = useState(false);
  const [itemId, setItemid] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const isModalDetail = useSelector((state) => state.modal.isModalDetail);
  const dispatch = useDispatch();

  const responseGetList = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    const filterRes = responseJson.results.filter(
      (result) => result.backdrop_path !== null
    );
    console.log(filterRes);
    setItems(filterRes);
  };

  const responseLoadMore = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    setItems([...items, ...responseJson.results]);
    setPage(page + 1);
  };

  const getListRequest = async () => {
    if (props.category === "movies") {
      const url = `${apiConfig.baseUrl}movie/popular/${apiConfig.apiKey}&page=1`;
      responseGetList(url);
    } else {
      const url = `${apiConfig.baseUrl}tv/popular/${apiConfig.apiKey}&page=1`;
      responseGetList(url);
    }
  };

  const openModalDetail = (id) => {
    setDetailModal(!detailModal);
    setItemid(id);
  };

  useEffect(() => {
    getListRequest();
    document.body.style.overflow = isModalDetail ? "hidden" : "auto";
  }, [props.category, isModalDetail]);

  const loadMore = async () => {
    if (props.category === "movies") {
      const url = `${apiConfig.baseUrl}movie/popular/${apiConfig.apiKey}&page=${
        page + 1
      }`;
      responseLoadMore(url);
    } else {
      const url = `${apiConfig.baseUrl}tv/popular/${apiConfig.apiKey}&page=${
        page + 1
      }`;
      responseLoadMore(url);
    }
  };

  return (
    <section className="sm:my-14 mx-6 my-6 sm:mx-16  ">
      <div className="grid grid-cols-mobileAuto sm:grid-cols-auto gap-6">
        {items.map((item, index) => (
          <div
            className="group w-[150px] sm:w-[200px] sm:h-[400px]"
            key={index}
            onClick={() => {
              openModalDetail(item.id);
              dispatch(toggleModalDetail());
            }}
          >
            <div className=" h-[200px]  sm:h-[305px] w-[150px] sm:w-[200px] rounded-3xl group-hover:scale-[1.05] group-hover:border-[3px]  group-hover:ease-in-out hover:duration-150 group-hover:border-secondary ">
              <FaPlay className=" cursor-pointer absolute my-32 mx-20 text-4xl invisible group-hover:visible group-hover:ease-in-out group-hover:duration-500 z-50 text-transparent group-hover:text-secondary" />
              <img
                src={apiConfig.w500Image(item.poster_path)}
                className=" h-[200px] w-[150px] sm:w-auto sm:h-[300px] rounded-3xl object-fill cursor-pointer  group-hover:brightness-[.45]"
              />
            </div>
            <h1 className=" w-[140px] sm:w-auto text-white text-[16px] mt-3 group-hover:scale-[0.95] group-hover:ease-in-out group-hover:duration-150  group-hover:text-secondary ">
              {item.original_title || item.name}
            </h1>
          </div>
        ))}
      </div>
      <div className=" flex justify-center items-center">
        <Button
          styles=" rounded-full mt-20 sm:mt-0 py-1 px-8 font-[400] hover:font-[800] ease-in-out duration-500  "
          text="Load More..."
          onClick={loadMore}
        />
      </div>
      {detailModal && (
        <DetailModal
          openModalDetail={openModalDetail}
          itemId={itemId}
          itemCategory={props.category === "movies" ? "movie" : "tv"}
        />
      )}
    </section>
  );
};

export default ListGrid;
