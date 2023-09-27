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
    <div className="fixed w-fit h-screen p-3 border-r border-solid border-neutral-300 left-0 top-0 z-1 transition-all duration-300 ease-in-out">
      <div className="flex flex-col grow-0 shrink-0">
        <div className="w-[16vw] h-[10vh]">
          <div className="h-[73px] pt-6 pb-4 px-3">
            <Link to="/">
              <img className="w-[6.5rem] h-[2.5rem] mb-7" src={logo} alt="instagram logo" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-around">
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <HomeIcon className="w-[1.6rem] h-[1.6rem] flex justify-center" />
                <span className="pl-4 text-[#262626]">Home</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <SearchIcon className="w-[1.6rem] h-[1.6rem] flex justify-center" />
                <span className="pl-4 text-[#262626]">Search</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <ExploreIcon className="w-[1.6rem] h-[1.6rem] flex justify-center" />
                <span className="pl-4 text-[#262626]">Explore</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <MessagesIcon className="w-[1.6rem] h-[1.6rem] flex justify-center" />
                <span className="pl-4 text-[#262626]">Message</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <LikeIcon className="w-[1.6rem] h-[1.6rem] flex justify-center" />
                <span className="pl-4 text-[#262626]">Notification</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <CreateIcon className="w-[1.6rem] h-[1.6rem] flex justify-center" />
                <span className="pl-4 text-[#262626]">Create</span>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center p-3 mb-4">
            <NavLink to="/">
              <div className="flex items-center m-auto">
                <HomeIcon className="w-[1.6rem] h-[1.6rem] flex justify-center" />
                <span className="pl-4 text-[#262626]">Profile</span>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="absolute w-full bottom-0 mb-8 ml-2">
          <button className="flex items-center justify-center" type="button" title="more options">
            <div>
              <SettingsIcon />
            </div>
            <div className="ml-3">More</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
