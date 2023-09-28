import React, { useState } from "react";
import { Link } from "react-router-dom";

import FaceBookLogin from "../../components/FaceBookLogin";
import OrSeperate from "../../components/OrSeperate";
import Helmet from "../../components/Helmet";
// images/logo
import logo from "../../images/logo.png";
import appStore from "../../images/app-store.png";
import googlePlay from "../../images/google-play.png";
import { AiFillFacebook } from "react-icons/ai";

const Login = () => {
  const [typePass, setTypePass] = useState<boolean>(false);
  return (
    <Helmet title="Login • Instagram">
      <div className="flex flex-col grow">
        <div className="flex grow justify-center">
          <div className="h-[600px] basis-[420px] mb-3 mr-8 bg-mobile-app bg-center bg-no-repeat self-center hidden tablet-md:inline-block"></div>
          <div className="max-w-sm min-w-fit mt-7 flex flex-col grow justify-center">
            <form className="flex flex-col py-5 px-10 text-center bg-white mobile:border border-solid border-neutral-300 rounded-sm">
              <div className="inline-block w-[175px] h-[51px] m-auto mb-5 mt-4 cursor-pointer">
                <img src={logo} alt="logo" />
              </div>
              <input
                className="h-10 p-2 border border-solid rounded-[4px] border-neutral-300"
                type="Email"
                placeholder="Email"
                name="email"
              />
              <div className="relative mt-2">
                <input
                  className="w-full h-10 p-2 border border-solid rounded-[4px] border-neutral-300"
                  placeholder="Password"
                  name="password"
                />
                <h6
                  className="absolute font-semibold top-1/2 right-2 -translate-y-1/2 hover:cursor-pointer hover:opacity-50"
                  onClick={() => setTypePass(!typePass)}
                >
                  {typePass ? "Hide" : "Show"}
                </h6>
              </div>
              <button
                className="h-9 mt-4 mb-4 mx-0 bg-[#0095f6] text-sm font-semibold text-white rounded-lg border-none border"
                type="submit"
              >
                Login In
              </button>
              <OrSeperate />
              <div className="flex justify-center items-center m-auto cursor-pointer">
                <AiFillFacebook className="text-lg text-[#385185] mr-2" />
                <FaceBookLogin title="Log in with Facebook" />
              </div>
              <Link className="mt-3 text-xs" to="/forgotpwd">
                Forgot password?
              </Link>
            </form>
            <div className="flex flex-col justify-center items-center my-2 py-2 text-sm mobile:border border-solid border-neutral-300 rounded-sm">
              <p className="text-sm m-4">
                Don't have an account?{" "}
                <Link className="text-[#0095f6] font-semibold" to="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="my-3 mx-5">Get the app.</span>
              <div className="flex flex-col mobile-sm:flex-row justify-center my-3">
                <img className="w-full h-10 mr-3" src={appStore} alt="app-store badge" />
                <img className="w-full h-10" src={googlePlay} alt="google-play badge" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
