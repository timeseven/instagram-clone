import React from "react";
import { Outlet } from "react-router-dom";
import NavBarTop from "./components/NavBarTop";
import NavBarBot from "./components/NavBarBot";
const MainLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen overflow-y-scroll overflow-x-hidden flex flex-col
                 tablet:flex-row"
    >
      <NavBarTop />
      <Outlet />
      <NavBarBot className="tablet:hidden" />
    </div>
  );
};

export default MainLayout;
