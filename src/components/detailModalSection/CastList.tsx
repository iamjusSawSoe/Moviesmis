import React, { useState, useEffect } from "react";
import { Cast, useCastList } from "@/hooks/useCastList";
import Image from "next/image";

type CastListProps = {
  id: string;
};

const CastList = (props: CastListProps) => {
  const castListQuery = useCastList(props.id);
  const [castList, setCastList] = useState<Cast[]>([]);

  useEffect(() => {
    if (castListQuery.data?.cast && castListQuery.data.cast.length > 0) {
      setCastList([...castListQuery.data.cast.slice(0, 5)]);
    }
  }, [castListQuery.data]);

  return (
    <section className="my-5">
      <h1 className="  text-white text-[26px] leading-8 font-semibold my-3">
        Casts
      </h1>
      <div className="flex items-center gap-4">
        {castList?.map((cast, index) => (
          <div key={index} className="group">
            <Image
              alt="movie poster items"
              src={`${process.env.NEXT_PUBLIC_W500_IMAGE_URL}${cast.profile_path}`}
              className=" h-[150px] rounded-3xl object-fill group-hover:scale-[0.945] group-hover:ease-in-out group-hover:duration-150"
              width={220}
              height={150}
            />
            <h1 className="text-white text-[13px] md:text-[14px] mt-2 text-center group-hover:scale-[0.95] group-hover:ease-in-out group-hover:duration-150  group-hover:text-secondary ">
              {cast.name}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CastList;
