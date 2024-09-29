type Props = {};

const SkeletonLoader = (props: Props) => {
  return (
    <div className="w-[150px] sm:w-[200px] sm:h-[400px] bg-gray-300 rounded-3xl animate-pulse"></div>
  );
};

export default SkeletonLoader;
