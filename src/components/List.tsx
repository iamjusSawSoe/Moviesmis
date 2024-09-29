"use client";
import { usePathname } from "next/navigation";
import ListGrid from "./ListGrid";

const List = () => {
  const pathName = usePathname();
  const locationURL = pathName.slice(1);

  return (
    <section className="w-100 ">
      <div
        className="w-full max-h-[550px] h-[400px] bg-no-repeat"
        style={{
          backgroundImage: `url(/darkMovieSection.jpg)`,
        }}
      >
        <h1 className=" text-center text-[50px] py-48 leading-8 font-bold text-white">
          {locationURL.charAt(0).toUpperCase() + locationURL.slice(1)}
        </h1>
      </div>

      <ListGrid />
    </section>
  );
};

export default List;
