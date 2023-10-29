import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/features/authSlice";
import {
  setIsCreatePostGlobal,
  setIsSearchGlobalFalse,
  setIsSearchGlobalTrue,
  setIsNotificationGlobalFalse,
  setIsNotificationGlobalTrue,
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
  SearchActiveIcon,
  NotificationsActiveIcon,
  NotificationsIcon,
} from "../../components/Icons";
import { resetUser, searchUser } from "../../redux/features/userSlice";
import avatar from "../../images/avatar-default.jpg";

const NavBarTop: React.FC = () => {
  const { isSearchGlobal, isNotificationGlobal } = useSelector((state: RootState) => state.globalState);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isFolded, setIsFolded] = useState(isSearchGlobal || isNotificationGlobal);
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

  const handleCreate = () => {
    dispatch(setIsCreatePostGlobal());
    handleCloseSearchAndNotif();
  };

  const handleCloseSearchAndNotif = () => {
    if (isNotificationGlobal === true) {
      dispatch(setIsNotificationGlobalFalse());
    }
    if (isSearchGlobal === true) {
      dispatch(setIsSearchGlobalFalse());
    }
  };
  const handleFocus = () => {
    dispatch(setIsSearchGlobalTrue());
    dispatch(setIsNotificationGlobalFalse());
  };

  const handleSearchClick = () => {
    if (isSearchGlobal) {
      dispatch(setIsSearchGlobalFalse());
    } else {
      dispatch(setIsSearchGlobalTrue());
      dispatch(setIsNotificationGlobalFalse());
    }
  };

  const handleNotificationClick = () => {
    if (isNotificationGlobal) {
      dispatch(setIsNotificationGlobalFalse());
    } else {
      dispatch(setIsNotificationGlobalTrue());
      dispatch(setIsSearchGlobalFalse());
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

  useEffect(() => {
    if (isSearchGlobal || isNotificationGlobal) {
      setIsFolded(true);
    } else {
      setIsFolded(false);
    }
    if (!isSearchGlobal) {
      dispatch(resetUser());
      setSearchValue("");
    }
  }, [isSearchGlobal, isNotificationGlobal]);

  return (
    <div className="h-[60px] tablet:h-screen">
      <div
        className={`fixed bg-white w-full h-[60px] border-b border-solid border-neutral-300 z-20 transition-all duration-300 ease-in-out
                 tablet:w-[72px] tablet:h-screen tablet:border-b-0 tablet:border-r
                 desktop:transition-[width] desktop:duration-300
                 ${isFolded ? "desktop:w-[72px] desktop-lg:w-[72px]" : "desktop:w-[245px] desktop-lg:w-[335px]"}`}
      >
        <div
          className={`w-full h-full px-3 flex items-center justify-between
                   tablet:h-screen  tablet:pt-2 tablet:pb-5  tablet:flex-col  
                   ${isFolded ? "desktop:items-center" : "desktop:items-start"}`}
        >
          <div
            onClick={() => handleCloseSearchAndNotif()}
            className={`h-full flex items-center justify-start flex-1
                     tablet:w-[48px] tablet:h-[92px] tablet:items-center tablet:justify-center
                     desktop: transition-[width] desktop: duration-300
                     ${
                       isFolded ? "desktop:w-[72px] desktop:justify-center" : "desktop:w-[245px] desktop:justify-start"
                     }`}
          >
            <Link to="/" className="tablet:h-[92px] tablet:flex tablet:items-end desktop:items-center">
              <img
                className={`w-[104px] h-[40px] tablet:hidden ${isFolded ? "desktop:hidden" : "desktop:inline-block"}`}
                src={logo}
                alt="instagram logo"
              />
              <img
                className={`w-[24px] h-[24px] mb-7 hidden tablet:inline-block ${
                  isFolded ? "desktop:inline-block" : "desktop:hidden"
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
            <div className="mb-4 hidden tablet:p-2 tablet:inline-block" onClick={() => handleCloseSearchAndNotif()}>
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <HomeIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span
                    className={`pl-4 text-[#262626] hidden ${isFolded ? "desktop:hidden" : "desktop:inline-block"}`}
                  >
                    Home
                  </span>
                </div>
              </NavLink>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block">
              <div onClick={() => handleSearchClick()} className="flex items-center m-auto cursor-pointer">
                {isSearchGlobal ? (
                  <SearchActiveIcon className="w-[24px] h-[24px] flex justify-center" />
                ) : (
                  <SearchIcon className="w-[24px] h-[24px] flex justify-center" />
                )}
                <span className={`pl-4 text-[#262626] hidden ${isFolded ? "desktop:hidden" : "desktop:inline-block"}`}>
                  Search
                </span>
              </div>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block" onClick={() => handleCloseSearchAndNotif()}>
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <ExploreIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span
                    className={`pl-4 text-[#262626] hidden ${isFolded ? "desktop:hidden" : "desktop:inline-block"}`}
                  >
                    Explore
                  </span>
                </div>
              </NavLink>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block" onClick={() => handleCloseSearchAndNotif()}>
              <NavLink to="/direct/inbox">
                <div className="flex items-center m-auto">
                  <MessagesIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span
                    className={`pl-4 text-[#262626] hidden ${isFolded ? "desktop:hidden" : "desktop:inline-block"}`}
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
                onFocus={() => handleFocus()}
                // onBlur={() => handleBlur()}
              />
              <AiOutlineSearch className="absolute top-[15px] peer-focus:hidden left-5 w-6 h-6 group-focus:hidden fill-neutral-400" />
            </div>
            <div className="p-2 tablet:mb-4">
              <div onClick={() => handleNotificationClick()}>
                <div className="flex items-center m-auto cursor-pointer">
                  {isNotificationGlobal ? (
                    <NotificationsActiveIcon className="w-[24px] h-[24px] flex justify-center" />
                  ) : (
                    <NotificationsIcon className="w-[24px] h-[24px] flex justify-center" />
                  )}
                  <span
                    className={`pl-4 text-[#262626] hidden ${isFolded ? "desktop:hidden" : "desktop:inline-block"}`}
                  >
                    Notification
                  </span>
                </div>
              </div>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block">
              <button onClick={() => handleCreate()}>
                <div className="flex items-center m-auto">
                  <CreateIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span
                    className={`pl-4 text-[#262626] hidden ${isFolded ? "desktop:hidden" : "desktop:inline-block"}`}
                  >
                    Create
                  </span>
                </div>
              </button>
            </div>
            <div
              className="tablet:p-2 mb-4 hidden tablet:inline-block grow"
              onClick={() => handleCloseSearchAndNotif()}
            >
              <NavLink to={`/${user?.username}`}>
                <div className="flex items-center m-auto">
                  <div className="w-6 h-6 rounded-[50%]">
                    <img src={user?.avatar || avatar} alt="user-avatar" />
                  </div>
                  <span
                    className={`pl-4 text-[#262626] hidden ${isFolded ? "desktop:hidden" : "desktop:inline-block"}`}
                  >
                    Profile
                  </span>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="tablet:p-2 mb-3 hidden tablet:inline-block">
            <button
              onClick={() => {
                setIsMenuMore(!isMenuMore);
                handleCloseSearchAndNotif();
              }}
              className="flex items-center justify-center"
              type="button"
              title="more options"
            >
              <div>
                <SettingsIcon />
              </div>
              <div className={`ml-3 hidden ${isFolded ? "desktop:hidden" : "desktop:inline-block"} `}>More</div>
            </button>
            <div
              className={`${
                isMenuMore ? "flex" : "hidden"
              } absolute left-0 w-full bottom-20 items-center shadow-md rounded-lg`}
            >
              <div className="border-t p-1 w-full">
                <button
                  onClick={() => {
                    dispatch(logout());
                  }}
                  type="button"
                  title="logout"
                  className="w-full cursor-pointer text-red-500"
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
