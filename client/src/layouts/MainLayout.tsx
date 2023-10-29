import React, { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Outlet } from "react-router-dom";
import NavBarTop from "./components/NavBarTop";
import NavBarBot from "./components/NavBarBot";
import CreatePost from "../components/post/CreatePost";
import DeletePost from "../components/post/DeletePost";
import EditPost from "../components/post/EditPost";
import Search from "../components/Search";
import NotificationBox from "../components/NotificationBox";
import CreateConversation from "../components/conversation/CreateConversation";
import DeleteConversation from "../components/conversation/DeleteConversation";
import { BASE_URL_SOCKET } from "../utils/baseUrl";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "../redux/features/socketSlice";
import SocketClient from "../SocketClient";
import { setIsNotificationGlobalFalse, setIsSearchGlobalFalse } from "../redux/features/globalStateSlice";
const MainLayout: React.FC = () => {
  const { sData } = useSelector((state: RootState) => state.socket);
  const { isSearchGlobal, isNotificationGlobal } = useSelector((state: RootState) => state.globalState);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const socketIo = io(BASE_URL_SOCKET);
  const socketRef = useRef<Socket>(socketIo);

  const handleCloseSearchAndNotif = () => {
    if (isNotificationGlobal === true) {
      dispatch(setIsNotificationGlobalFalse());
    }
    if (isSearchGlobal === true) {
      dispatch(setIsSearchGlobalFalse());
    }
  };

  useEffect(() => {
    socketRef.current = socketIo;
    if (socketRef.current) {
      dispatch(setSocket(socketRef.current));
    }
  }, [dispatch]);
  return (
    <div
      className="min-h-screen overflow-y-scroll overflow-x-hidden flex flex-col
                 tablet:flex-row"
    >
      {user?.token && <SocketClient />}
      <NavBarTop />
      <div className="w-screen h-screen" onClick={() => handleCloseSearchAndNotif()}>
        <Outlet />
      </div>
      <Search />
      <NotificationBox />
      <CreatePost />
      <DeletePost />
      <EditPost />
      <CreateConversation />
      <DeleteConversation />
      <NavBarBot className="tablet:hidden" />
    </div>
  );
};

export default MainLayout;
