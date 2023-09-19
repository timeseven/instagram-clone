import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
