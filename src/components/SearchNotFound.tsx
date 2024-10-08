import { TbDatabaseSearch } from "react-icons/tb";

type Props = {
  searchQuery: string;
};

const SearchNotFound = (props: Props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[100dvh]">
        <TbDatabaseSearch className=" text-9xl  align-middle mb-6 text-secondary dark:text-white" />
        <h1 className="text-2xl font-bold text-center text-secondary dark:text-white">
          No results found for {props.searchQuery}
        </h1>
      </div>
    </>
  );
};

export default SearchNotFound;
