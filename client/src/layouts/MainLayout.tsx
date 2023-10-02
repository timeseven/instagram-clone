import React from "react";
import { Outlet } from "react-router-dom";
import NavBarTop from "./components/NavBarTop";
import NavBarBot from "./components/NavBarBot";
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col">
      <NavBarTop />
      <Outlet />
      <NavBarBot className="tablet:hidden" />
    </div>
  );
};

export default MainLayout;
