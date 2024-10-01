import React from "react";

type Props = {};

const SkeletonLoader = (props: Props) => {
  return (
    <React.Fragment>
      <div>
        <div className="h-[200px] sm:h-[305px] w-[150px] sm:w-[200px] bg-gray-400 rounded-3xl animate-pulse"></div>
        <div className="w-[140px] h-[30px] mt-4 bg-gray-300 rounded-3xl animate-pulse"></div>
      </div>
    </React.Fragment>
  );
};

export default SkeletonLoader;
