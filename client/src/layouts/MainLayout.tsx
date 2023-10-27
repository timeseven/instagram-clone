import React from "react";
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
const MainLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen overflow-y-scroll overflow-x-hidden flex flex-col
                 tablet:flex-row"
    >
      <NavBarTop />
      <Outlet />
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
