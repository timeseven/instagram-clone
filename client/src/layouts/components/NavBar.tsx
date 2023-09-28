import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../images/logo.png";
import {
  CreateIcon,
  ExploreIcon,
  MessagesIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  LikeIcon,
} from "../../components/Icons";
const NavBar: React.FC = () => {
  return (
    <div className="w-[17.5vw] tablet:w-[72px] mobile:w-screen flex flex-col p-3 border-r border-solid border-neutral-300 z-1 transition-all duration-300 ease-in-out">
      <div className="h-screen mobile:h-[15px] flex flex-col">
        <div className="h-[10vh] tablet:w-[48px]">
          <div className="h-[73px] pt-6 pb-4 px-3">
            <Link to="/">
              <img className="w-[6.5rem] h-[2.5rem] mb-7 tablet:hidden" src={logo} alt="instagram logo" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col mobile:flex-row justify-around">
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <HomeIcon className="w-[24px] h-[24px] flex justify-center" />
                <span className="pl-4 text-[#262626] tablet:hidden">Home</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <SearchIcon className="w-[24px] h-[24px] flex justify-center" />
                <span className="pl-4 text-[#262626] tablet:hidden">Search</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <ExploreIcon className="w-[24px] h-[24px] flex justify-center" />
                <span className="pl-4 text-[#262626] tablet:hidden">Explore</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <MessagesIcon className="w-[24px] h-[24px] flex justify-center" />
                <span className="pl-4 text-[#262626] tablet:hidden">Message</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <LikeIcon className="w-[24px] h-[24px] flex justify-center" />
                <span className="pl-4 text-[#262626] tablet:hidden">Notification</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <CreateIcon className="w-[24px] h-[24px] flex justify-center" />
                <span className="pl-4 text-[#262626] tablet:hidden">Create</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/abcd">
              <div className="flex items-center m-auto">
                <HomeIcon className="w-[24px] h-[24px] flex justify-center" />
                <span className="pl-4 text-[#262626] tablet:hidden">Profile</span>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="mb-8 ml-2 mobile:hidden">
          <button className="flex items-center justify-center" type="button" title="more options">
            <div>
              <SettingsIcon />
            </div>
            <div className="ml-3 tablet:hidden">More</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
