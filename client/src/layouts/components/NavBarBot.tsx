import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  setIsCreatePostGlobal,
  setIsNotificationGlobalFalse,
  setIsSearchGlobalFalse,
} from "../../redux/features/globalStateSlice";
import { CreateIcon, MessagesIcon, HomeIcon, SettingsIcon } from "../../components/Icons";
import { ClassNameProps } from "../../utils/interface";
import avatar from "../../images/avatar-default.jpg";
import { logout } from "../../redux/features/authSlice";
const NavBarBot: React.FC<ClassNameProps> = ({ className }) => {
  const { isSearchGlobal, isNotificationGlobal } = useSelector((state: RootState) => state.globalState);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const [isMenuMore, setIsMenuMore] = useState<boolean>(false);
  const handleCloseSearchAndNotif = () => {
    if (isNotificationGlobal === true) {
      dispatch(setIsNotificationGlobalFalse());
    }
    if (isSearchGlobal === true) {
      dispatch(setIsSearchGlobalFalse());
    }
  };
  return (
    <div
      className={`${className} fixed bg-white bottom-0 w-full h-[48px] flex items-center justify-evenly border-t border-solid border-neutral-300 z-20 transition-all duration-300 ease-in-out`}
    >
      <div className="w-full min-w-[15rem] h-full flex items-center justify-evenly">
        <NavLink to="/" onClick={() => handleCloseSearchAndNotif()}>
          <HomeIcon className="w-[24px] h-[24px] flex justify-center" />
        </NavLink>
        <div
          onClick={() => {
            dispatch(setIsCreatePostGlobal());
            handleCloseSearchAndNotif();
          }}
        >
          <CreateIcon className="w-[24px] h-[24px] flex justify-center" />
        </div>
        <NavLink to="/direct/inbox" onClick={() => handleCloseSearchAndNotif()}>
          <MessagesIcon className="w-[24px] h-[24px] flex justify-center" />
        </NavLink>
        <NavLink to={`/${user?.username}`} onClick={() => handleCloseSearchAndNotif()}>
          <div className="w-6 h-6 rounded-[50%]">
            <img src={user?.avatar || avatar} alt="user-avatar" />
          </div>
        </NavLink>
        <div>
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
          </button>
          <div
            className={`${
              isMenuMore ? "flex" : "hidden"
            } absolute left-0 w-full bottom-12 items-center shadow-md rounded-t-lg bg-white`}
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
  );
};

export default NavBarBot;
