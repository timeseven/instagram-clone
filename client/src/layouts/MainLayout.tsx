import React from "react";
import { Outlet } from "react-router-dom";
import NavBarTop from "./components/NavBarTop";
import NavBarBot from "./components/NavBarBot";
import CreatePost from "../components/post/CreatePost";
import DeletePost from "../components/post/DeletePost";
import EditPost from "../components/post/EditPost";
import Search from "../components/Search";
const MainLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen overflow-y-scroll overflow-x-hidden flex flex-col
                 tablet:flex-row"
    >
      <NavBarTop />
      <Outlet />
      <Search />
      <CreatePost />
      <DeletePost />
      <EditPost />
      <NavBarBot className="tablet:hidden" />
    </div>
  );
};

export default MainLayout;
