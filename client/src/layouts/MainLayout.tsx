import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
const MainLayout: React.FC = () => {
  return (
    <div className="w-full h-full flex max-md:flex-col-reverse">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
