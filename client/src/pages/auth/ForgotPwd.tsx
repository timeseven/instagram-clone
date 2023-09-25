import React, { useState } from "react";
import { Link } from "react-router-dom";

import Helmet from "../../components/Helmet";
import OrSeperate from "../../components/OrSeperate";
// images/logo
import logo from "../../images/logo.png";

const ForgotPwd: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <Helmet title="Forgot Password • Instagram">
      <div className="fixed w-full h-[3.75rem] bg-white border border-solid border-neutral-300">
        <div className="relative max-w-[60rem] m-auto h-full flex items-center">
          <Link to="/" className="w-28 h-10">
            <img src={logo} alt="logo" className="w-full h-full" />
          </Link>
        </div>
      </div>
      <div className="pt-40 w-full flex items-center justify-center">
        <form className="max-w-[24.25rem] py-0 px-12 border border-solid border-neutral-300 rounded-md flex flex-col items-center justify-center">
          <div className="w-24 h-24 mt-6 mb-4 bg-ins-icons bg-no-repeat bg-lock"></div>
          <div className="mb-2 font-semibold">Trouble logging in?</div>
          <div className="mb-2 text-sm text-neutral-500">
            Enter your email, phone, or username and we'll send you a link to get back into your account.
          </div>
          <input
            className="w-full h-10 p-2 mx-2 border border-solid border-neutral-300 rounded-md"
            type="Email"
            placeholder="Email"
            name="email"
          />
          <button
            type="submit"
            className="w-full h-8 mt-4 mb-4 mx-0 bg-[#0095f6] text-sm font-semibold text-white border border-none rounded-lg"
            // className={isActive ? "" : ""}
            disabled={isActive ? false : true}
          >
            Send login link
          </button>
          <Link className="text-sm text-[#385185] mb-8" to="https://help.instagram.com/374546259294234">
            Can't reset your password?
          </Link>
          <OrSeperate />
          <Link className="text-sm font-semibold" to="/signup">
            Create new account
          </Link>
          <div className="flex flex-col justify-center items-center h-10 w-[24.25rem] mt-20 bg-[#fafafa] border border-solid border-neutral-300">
            <Link className="font-semibold text-sm" to="/login">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </Helmet>
  );
};

export default ForgotPwd;
