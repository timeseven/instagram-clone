import React from "react";
import { Link, NavLink } from "react-router-dom";

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
const NavBarTop: React.FC = () => {
  return (
    <div className="h-[60px] tablet:h-screen">
      <div
        className="fixed bg-white w-full h-[60px] border-b border-solid border-neutral-300 z-1 transition-all duration-300 ease-in-out
                 tablet:w-[72px] tablet:h-screen tablet:border-b-0 tablet:border-r
                 desktop:w-[245px] desktop-lg:w-[335px]"
      >
        <div
          className="w-full h-full px-3 flex items-center justify-between
                   tablet:h-screen  tablet:pt-2 tablet:pb-5  tablet:flex-col  
                   desktop:items-start"
        >
          <div
            className="h-full flex items-center justify-start flex-1
                     tablet:w-[48px] tablet:h-[92px] tablet:items-center tablet:justify-center
                     desktop:w-[245px] desktop:justify-start"
          >
            <Link to="/" className="tablet:h-[92px] tablet:flex tablet:items-end desktop:items-center">
              <img className="w-[104px] h-[40px] tablet:hidden  desktop:inline-block" src={logo} alt="instagram logo" />
              <img
                className="w-[24px] h-[24px] mb-7 hidden tablet:inline-block desktop:hidden"
                src={insLogo}
                alt="instagram logo2"
              />
            </Link>
          </div>
          <div
            className="h-full flex flex-row-reverse items-center
                     tablet:pt-3 tablet:flex-col 
                     desktop:items-start"
          >
            <div className="mb-4 hidden tablet:p-2 tablet:inline-block">
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <HomeIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span className="pl-4 text-[#262626] hidden desktop:inline-block">Home</span>
                </div>
              </NavLink>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block">
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <SearchIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span className="pl-4 text-[#262626] hidden desktop:inline-block">Search</span>
                </div>
              </NavLink>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block">
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <ExploreIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span className="pl-4 text-[#262626] hidden desktop:inline-block">Explore</span>
                </div>
              </NavLink>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block">
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <MessagesIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span className="pl-4 text-[#262626] hidden desktop:inline-block">Message</span>
                </div>
              </NavLink>
            </div>
            <div className="p-2 tablet:mb-4">
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <LikeIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span className="pl-4 text-[#262626] hidden desktop:inline-block">Notification</span>
                </div>
              </NavLink>
            </div>
            <div className="p-2 tablet:mb-4">
              <NavLink to="/">
                <div className="flex items-center m-auto">
                  <CreateIcon className="w-[24px] h-[24px] flex justify-center" />
                  <span className="pl-4 text-[#262626] hidden desktop:inline-block">Create</span>
                </div>
              </NavLink>
            </div>
            <div className="tablet:p-2 mb-4 hidden tablet:inline-block">
              <NavLink to="/abcd">
                <div className="flex items-center m-auto">
                  <div className="w-6 h-6 rounded-[50%]">
                    <img src={avatar} alt="user-avatar" />
                  </div>
                  <span className="pl-4 text-[#262626] hidden desktop:inline-block">Profile</span>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="tablet:p-2 mb-3 hidden tablet:inline-block">
            <button className="flex items-center justify-center" type="button" title="more options">
              <div>
                <SettingsIcon />
              </div>
              <div className="ml-3 hidden desktop:inline-block">More</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarTop;
