import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
