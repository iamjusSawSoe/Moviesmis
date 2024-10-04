import React from "react";
import { BsSearch } from "react-icons/bs";

type Props = { changeSearchVal: (arg: string) => void };

const SearchBar = ({ changeSearchVal }: Props) => {
  return (
    <React.Fragment>
      <BsSearch className="text-white leading-9 text-[22px] cursor-pointer absolute m-2 p-1" />
      <input
        type="text"
        name="search"
        onChange={(event) => changeSearchVal(event.target.value)}
        placeholder="Search..."
        className="h-[35px] pl-9 rounded-full bg-slate-500 border-solid border-2 border-dimWhite outline-none text-white"
        autoComplete="off"
      />
    </React.Fragment>
  );
};

export default SearchBar;
