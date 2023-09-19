import React, { useState } from "react";
import { Link } from "react-router-dom";

import FaceBookLogin from "../../components/FaceBookLogin";

// images/logo
import logo from "../../images/logo.png";
import appStore from "../../images/app-store.png";
import googlePlay from "../../images/google-play.png";
import { AiFillFacebook } from "react-icons/ai";

const Login = () => {
  const [typePass, setTypePass] = useState<boolean>(false);
  return (
    <div className="w-full h-full flex flex-col justify-between pt-12">
      <div className="w-full flex p-0 max-w-4xl mt-7 mx-auto mb-0">
        <div className="bg-mobile-app bg-center bg-no-repeat flex-1 h-[38rem] max-[900px]:hidden"></div>
        <div className="w-full max-w-sm mt-7 max-[900px]:m-auto max-[900px]:w-[80vw]">
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

              <span
                className="relative mb-5 text-xs text-gray-500 font-bold 
                         before:content-[''] before:absolute before:bg-gray-300 before:w-2/5 before:h-[1px] before:top-1/2 before:-translate-y-1/2 before:left-0
                         after:content-[''] after:absolute after:bg-gray-300 after:w-2/5 after:h-[1px] after:top-1/2 after:-translate-y-1/2 after:right-0"
              >
                OR
              </span>
            </div>

            <button
              className="h-9 mt-4 mb-4 mx-0 bg-[#0095f6] text-sm font-semibold text-white rounded-lg border-none border"
              type="submit"
            >
              Login In
            </button>
          </form>

          <div className="flex flex-col justify-center items-center my-2 py-2 text-sm border border-solid border-neutral-300 rounded-sm">
            <p className="text-sm m-4">
              Have an account?{" "}
              <Link className="text-[#73b6fb]" to="/login">
                Log in
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
  );
};

export default Login;
