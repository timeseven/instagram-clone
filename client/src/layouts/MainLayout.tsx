import React from "react";
import { Outlet } from "react-router-dom";
import NavBarTop from "./components/NavBarTop";
import NavBarBot from "./components/NavBarBot";
import CreatePost from "../components/post/CreatePost";
const MainLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen overflow-y-scroll overflow-x-hidden flex flex-col
                 tablet:flex-row"
    >
      <NavBarTop />
      <Outlet />
      <CreatePost />
      <NavBarBot className="tablet:hidden" />
    </div>
  );
};

export default MainLayout;
