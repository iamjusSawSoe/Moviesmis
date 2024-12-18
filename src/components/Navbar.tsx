import { changeSearchValue } from "@/store/features/searchSlice";
import { setTheme, toggleDarkMode } from "@/store/features/themeSlice";
import { RootState } from "@/store/store";
import { navLinks } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { MdNightsStay } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { close, logo, menu } from "../assets";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const navbarRef = useRef(null);

  const [toggle, setToggle] = useState(false);
  const [lightDarkIcon, setLightDarkIcon] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const pathName = usePathname();

  const [tempSearchVal, setTempSearchVal] = useState("");

  const changeSearchVal = (val: any) => {
    setTempSearchVal(val);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(changeSearchValue(tempSearchVal));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [dispatch, tempSearchVal]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    dispatch(setTheme(savedTheme));
  }, [dispatch]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dispatch, isDarkMode]);

  useEffect(() => {
    function handleScroll() {
      setScrollPos(window.pageYOffset);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={` ${
        scrollPos > 70
          ? " dark:bg-primary  dark:border-[#232c36] bg-[#f5f5f5] "
          : "h-[100px] ss:bg-transparent border-transparent"
      } border-b-2 shrink fixed z-10 top-0  w-full flex justify-between items-center py-4 px-8 xl:px-[100px] `}
    >
      <div className="flex justify-between items-center">
        <Image
          src={logo}
          alt="logo"
          className="w-[80px] h-[80px] object-contain xl:mr-36 mr-16"
        />
        <ul className="list-none md:flex hidden justify-end items-center flex-1">
          {navLinks.map((navLink, index) => (
            <li
              key={navLink.id}
              className={`text-[#475668] dark:text-white h-8 leading-8 font-bold text-lg navlink fromLeft hover:text-secondary cursor-pointer ${
                index === navLinks.length - 1 ? "mr-0" : "xl:mr-10 mr-8"
              }`}
            >
              <Link
                href={navLink.path}
                className={`${
                  pathName === navLink.path
                    ? "text-secondary border-b-[1px] border-solid border-secondary border-spacing-8 pb-[4.5px]"
                    : ""
                }`}
              >
                {navLink.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center">
        <div className="ss:flex hidden items-center">
          <SearchBar changeSearchVal={changeSearchVal} />
        </div>

        {lightDarkIcon ? (
          <MdNightsStay
            onClick={() => {
              setLightDarkIcon(!lightDarkIcon);
              dispatch(toggleDarkMode());
            }}
            className="text-white text-[23px] mx-8 leading-9 cursor-pointer"
          />
        ) : (
          <BsFillSunFill
            onClick={() => {
              setLightDarkIcon(!lightDarkIcon);
              dispatch(toggleDarkMode());
            }}
            className={`text-[23px] mx-8 leading-9 cursor-pointer text-white`}
          />
        )}

        {/* For Smaller Devices */}
        <div className="md:hidden flex items-center">
          <Image
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle((prevToggle) => !prevToggle)}
          />

          <div
            className={` ${
              toggle ? "md:hidden flex flex-col" : "hidden"
            } bg-slate-700 absolute top-[6.3rem] right-0 p-6 rounded-3xl min-w-[160px] mx-4 `}
          >
            <ul className="flex list-none flex-col justify-center items-center flex-1">
              {navLinks.map((navLink) => (
                <li
                  key={navLink.id}
                  className={` ${
                    scrollPos > 100
                      ? "dark:text-[#475668] text-white"
                      : "text-white"
                  } text-dimSecondary hover:text-secondary cursor-pointer font-bold text-lg mb-4`}
                >
                  <Link
                    href={navLink.path}
                    className={`${
                      pathName === navLink.path
                        ? "text-secondary border-b-[1px] border-solid border-secondary border-spacing-8 pb-[4.5px]"
                        : ""
                    }`}
                  >
                    {navLink.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex ss:hidden items-center">
              <SearchBar changeSearchVal={changeSearchVal} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
