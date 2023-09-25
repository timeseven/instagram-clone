import React from "react";
import { Link } from "react-router-dom";
import Helmet from "../../components/Helmet";

// images/logo
import logo from "../../images/logo.png";

const ResetPwd: React.FC = () => {
  return (
    <Helmet title="Reset Password • Instagram">
      <div className="fixed w-full h-[3.75rem] bg-white border border-solid border-neutral-300">
        <div className="relative max-w-[60rem] m-auto h-full flex items-center justify-between">
          <Link to="/" className="w-28 h-10">
            <img src={logo} alt="logo" className="w-full h-full" />
          </Link>
        </div>
      </div>
      <div className="pt-40 w-full h-[70vh] flex items-center justify-center">
        <form className="max-w-[24.25rem] py-0 px-12 border border-solid border-neutral-300 rounded-md flex flex-col items-center justify-center">
          <div className="mt-16 flex items-center justify-center font-bold text-base">Create A Strong Password</div>
          <div className="my-8 text-center text-sm text-neutral-600">
            Your password must be at least 6 characters and should include a combination of numbers, letters and special
            characters (!$@%).
          </div>
          <input
            className="w-full h-10 p-2 mx-2 border border-solid border-neutral-300 rounded-md"
            type="Password"
            placeholder="Password"
            name="password"
          />
          <button
            type="submit"
            className="w-full h-8 mt-14 mb-4 mx-0 bg-[#0095f6] text-sm font-semibold text-white border border-none rounded-lg"
            // className={isActive ? "" : ""}
          >
            Reset Password
          </button>
        </form>
      </div>
    </Helmet>
  );
};

export default ResetPwd;
