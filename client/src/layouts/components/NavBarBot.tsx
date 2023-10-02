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
import { ClassNameProps } from "../../utils/interface";
import avatar from "../../images/avatar-default.jpg";

const NavBarBot: React.FC<ClassNameProps> = ({ className }) => {
  return (
    <div
      className={`${className} fixed bg-white z-10 bottom-0 w-full h-[48px] flex items-center justify-evenly border-t border-solid border-neutral-300 z-1 transition-all duration-300 ease-in-out`}
    >
      <div className="w-full min-w-[15rem] h-full flex items-center justify-evenly">
        <NavLink to="/">
          <HomeIcon className="w-[24px] h-[24px] flex justify-center" />
        </NavLink>
        <NavLink to="/">
          <SearchIcon className="w-[24px] h-[24px] flex justify-center" />
        </NavLink>
        <NavLink to="/">
          <ExploreIcon className="w-[24px] h-[24px] flex justify-center" />
        </NavLink>
        <NavLink to="/">
          <MessagesIcon className="w-[24px] h-[24px] flex justify-center" />
        </NavLink>
        <NavLink to="/abcd">
          <div className="w-6 h-6 rounded-[50%]">
            <img src={avatar} alt="user-avatar" />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBarBot;
