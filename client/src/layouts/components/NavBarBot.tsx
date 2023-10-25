import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setIsCreatePostGlobal } from "../../redux/features/globalStateSlice";
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
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  return (
    <div
      className={`${className} fixed bg-white bottom-0 w-full h-[48px] flex items-center justify-evenly border-t border-solid border-neutral-300 z-20 transition-all duration-300 ease-in-out`}
    >
      <div className="w-full min-w-[15rem] h-full flex items-center justify-evenly">
        <NavLink to="/">
          <HomeIcon className="w-[24px] h-[24px] flex justify-center" />
        </NavLink>
        <div>
          <ExploreIcon className="w-[24px] h-[24px] flex justify-center" />
        </div>
        <div onClick={() => dispatch(setIsCreatePostGlobal())}>
          <CreateIcon className="w-[24px] h-[24px] flex justify-center" />
        </div>
        <div>
          <MessagesIcon className="w-[24px] h-[24px] flex justify-center" />
        </div>
        <NavLink to={`/${user?.username}`}>
          <div className="w-6 h-6 rounded-[50%]">
            <img src={user?.avatar || avatar} alt="user-avatar" />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBarBot;
