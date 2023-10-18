import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/features/authSlice";
import {
  setIsCreatePostGlobal,
  setIsSearchGlobal,
  setIsSearchGlobalFalse,
  setIsSearchGlobalTrue,
} from "../../redux/features/globalStateSlice";
import useDebounce from "../../hooks/useDebounce";
import userService from "../../services/userServices";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../../images/logo.png";
import insLogo from "../../images/Instagram-logo.png";
import {
  CreateIcon,
  ExploreIcon,
  MessagesIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  LikeIcon,
} from "../../components/Icons";
import avatar from "../../images/avatar-default.jpg";
import { resetUser, searchUser } from "../../redux/features/userSlice";

const NavBarTop: React.FC = () => {
  const { isSearchGlobal } = useSelector((state: RootState) => state.globalState);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isMenuMore, setIsMenuMore] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const debouncedValue = useDebounce(searchValue, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      dispatch(resetUser());
    }
  };

  const handleBlur = () => {
    dispatch(setIsSearchGlobalFalse());
    dispatch(resetUser());
    setSearchValue("");
  };

  const handleClick = () => {
    console.log("click", isSearchGlobal);
    if (isSearchGlobal) {
      dispatch(setIsSearchGlobalFalse());
    } else {
      dispatch(setIsSearchGlobalTrue());
    }
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      return;
    }
    const fetchSearch = async () => {
      await dispatch(searchUser(debouncedValue));
    };
    fetchSearch();
  }, [debouncedValue]);

  return (
    <div className="h-[60px] tablet:h-screen">
      <div
        className={`fixed bg-white w-full h-[60px] border-b border-solid border-neutral-300 z-20 transition-all duration-300 ease-in-out
                 tablet:w-[72px] tablet:h-screen tablet:border-b-0 tablet:border-r
                 desktop:transition-[width] desktop:duration-300
                 ${isSearchGlobal ? "desktop:w-[72px] desktop-lg:w-[72px]" : "desktop:w-[245px] desktop-lg:w-[335px]"}`}
      >
        <div
          className={`w-full h-full px-3 flex items-center justify-between
                   tablet:h-screen  tablet:pt-2 tablet:pb-5  tablet:flex-col  
                   ${isSearchGlobal ? "desktop:items-center" : "desktop:items-start"}`}
        >
          <div
            className={`h-full flex items-center justify-start flex-1
                     tablet:w-[48px] tablet:h-[92px] tablet:items-center tablet:justify-center
                     desktop: transition-[width] desktop: duration-300
                     ${
                       isSearchGlobal
                         ? "desktop:w-[72px] desktop:justify-center"
                         : "desktop:w-[245px] desktop:justify-start"
                     }`}
          >
            <Link to="/" className="tablet:h-[92px] tablet:flex tablet:items-end desktop:items-center">
              <img
                className={`w-[104px] h-[40px] tablet:hidden ${
                  isSearchGlobal ? "desktop:hidden" : "desktop:inline-block"
                }`}
                src={logo}
                alt="instagram logo"
              />
              <img
                className={`w-[24px] h-[24px] mb-7 hidden tablet:inline-block ${
                  isSearchGlobal ? "desktop:inline-block" : "desktop:hidden"
                }`}
                src={insLogo}
                alt="instagram logo2"
              />
            </Link>
          </div>
          <div
            className="h-full flex items-center
                     tablet:pt-3 tablet:flex-col 
                     desktop:items-start"
          >
            <div className="mb-4 hidden tablet:p-2 tablet:inline-block">
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <HomeIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span
                    className={`pl-4 text-[#262626] hidden ${
                      isSearchGlobal ? "desktop:hidden" : "desktop:inline-block"
                    }`}
                  >
                    Home
                  </span>
                </div>
              </NavLink>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block">
              <div onClick={() => handleClick()} className="flex items-center m-auto cursor-pointer">
                <SearchIcon className="w-[24px] h-[24px] flex justify-center" />
                <span
                  className={`pl-4 text-[#262626] hidden ${isSearchGlobal ? "desktop:hidden" : "desktop:inline-block"}`}
                >
                  Search
                </span>
              </div>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block">
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <ExploreIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span
                    className={`pl-4 text-[#262626] hidden ${
                      isSearchGlobal ? "desktop:hidden" : "desktop:inline-block"
                    }`}
                  >
                    Explore
                  </span>
                </div>
              </NavLink>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block">
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <MessagesIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span
                    className={`pl-4 text-[#262626] hidden ${
                      isSearchGlobal ? "desktop:hidden" : "desktop:inline-block"
                    }`}
                  >
                    Message
                  </span>
                </div>
              </NavLink>
            </div>
            <div className="p-2 relative tablet:hidden">
              <input
                placeholder="Search"
                className="h-[36px] min-w-[230px] pl-10 peer focus:pl-3 bg-neutral-200 rounded-lg"
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={() => dispatch(setIsSearchGlobalTrue())}
                onBlur={() => handleBlur()}
              />
              <AiOutlineSearch className="absolute top-[15px] peer-focus:hidden left-5 w-6 h-6 group-focus:hidden fill-neutral-400" />
            </div>
            <div className="p-2 tablet:mb-4">
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <LikeIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span
                    className={`pl-4 text-[#262626] hidden ${
                      isSearchGlobal ? "desktop:hidden" : "desktop:inline-block"
                    }`}
                  >
                    Notification
                  </span>
                </div>
              </NavLink>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block">
              <button onClick={() => dispatch(setIsCreatePostGlobal())}>
                <div className="flex items-center m-auto">
                  <CreateIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span
                    className={`pl-4 text-[#262626] hidden ${
                      isSearchGlobal ? "desktop:hidden" : "desktop:inline-block"
                    }`}
                  >
                    Create
                  </span>
                </div>
              </button>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block">
              <NavLink to={`/${user?.username}`}>
                <div className="flex items-center m-auto">
                  <div className="w-6 h-6 rounded-[50%]">
                    <img src={avatar} alt="user-avatar" />
                  </div>
                  <span
                    className={`pl-4 text-[#262626] hidden ${
                      isSearchGlobal ? "desktop:hidden" : "desktop:inline-block"
                    }`}
                  >
                    Profile
                  </span>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="tablet:p-2 mb-3 hidden tablet:inline-block">
            <button
              onClick={() => setIsMenuMore(!isMenuMore)}
              className="flex items-center justify-center"
              type="button"
              title="more options"
            >
              <div>
                <SettingsIcon />
              </div>
              <div className={`ml-3 hidden ${isSearchGlobal ? "desktop:hidden" : "desktop:inline-block"} `}>More</div>
            </button>
            <div
              className={`${
                isMenuMore ? "flex" : "hidden"
              } absolute left-0 w-full bottom-20 items-center shadow-md rounded-lg`}
            >
              <div className="border-t p-1 w-full">
                <button
                  onClick={() => dispatch(logout())}
                  type="button"
                  title="logout"
                  className="w-full cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarTop;
