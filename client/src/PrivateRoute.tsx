import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "./redux/store";

//if not login, go to login page
const PrivateRouter: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return !user ? <Navigate to={"/login"} /> : children;
};

export default PrivateRouter;
