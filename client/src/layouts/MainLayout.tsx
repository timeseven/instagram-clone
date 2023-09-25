import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
const MainLayout: React.FC = () => {
  return (
    <div className="absolute-center main-layout-container">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
