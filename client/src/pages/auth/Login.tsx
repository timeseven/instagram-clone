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
      <div className="w-full h-full flex flex-col justify-between pt-12">
        <div className="w-full flex p-0 max-w-4xl mt-7 mx-auto mb-0">
          <div className="bg-mobile-app bg-center bg-no-repeat grow mt-2 h-[38rem] max-[875px]:hidden"></div>
          <div className="w-full max-w-sm mt-7 max-[875px]:m-auto max-[875px]:w-[80vw]">
            <form className="flex flex-col py-5 px-10 text-center bg-white border border-solid border-neutral-300 rounded-sm">
              <div className="w-48 h-14 m-auto mb-5 mt-4 cursor-pointer">
                <img src={logo} alt="logo" />
              </div>
              <input
                className="w-full h-10 p-2 border border-solid rounded-[4px] border-neutral-300"
                type="Email"
                placeholder="Email"
                name="email"
              />
              <div className="relative w-full mt-2">
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

            <div className="flex flex-col justify-center items-center my-2 py-2 text-sm border border-solid border-neutral-300 rounded-sm">
              <p className="text-sm m-4">
                Don't have an account?{" "}
                <Link className="text-[#0095f6] font-semibold" to="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="my-3 mx-5">Get the app.</span>
              <div className="flex justify-center my-3">
                <img className="h-10 mr-3" src={appStore} alt="app-store badge" />
                <img className="h-10" src={googlePlay} alt="google-play badge" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
