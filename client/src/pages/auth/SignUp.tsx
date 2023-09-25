import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FaceBookLogin from "../../components/FaceBookLogin";
import OrSeperate from "../../components/OrSeperate";
import Helmet from "../../components/Helmet";
// images/logo
import logo from "../../images/logo.png";
import appStore from "../../images/app-store.png";
import googlePlay from "../../images/google-play.png";
import { AiFillFacebook } from "react-icons/ai";

const SignUp = () => {
  const [typePass, setTypePass] = useState<boolean>(false);

  return (
    <Helmet title="Sign Up • Instagram ">
      <div className="flex flex-col justify-center w-full h-full bg-white">
        <div className="flex justify-center m-auto w-full max-w-4xl">
          <div className="w-full max-w-[350px] mt-3">
            <form className="flex flex-col py-5 px-10 text-center bg-white border border-solid border-neutral-300 rounded-sm">
              <div className="w-48 h-14 m-auto mb-5 mt-4 cursor-pointer">
                <img src={logo} alt="logo" />
              </div>
              <div className="text-neutral-500 text-base leading-5 font-semibold">
                Sign up to see photos and videos from your friends.
              </div>
              <button className="flex justify-center items-center h-9 mt-4 mb-4 mx-0 bg-[#0095f6] text-sm font-semibold text-white rounded-lg border-none border">
                <AiFillFacebook className="text-xl mr-1" />
                <FaceBookLogin title="Log in with Facebook" />
              </button>
              <OrSeperate />
              <input
                className="w-full h-10 p-2 border border-solid rounded-[4px] border-neutral-300"
                type="Email"
                placeholder="Email"
                name="email"
              />
              <input
                className="w-full mt-2 h-10 p-2 border border-solid rounded-[4px] border-neutral-300"
                type="text"
                placeholder="Full Name"
                name="fullname"
              />

              <input
                className="w-full mt-2 h-10 p-2 border border-solid rounded-[4px] border-neutral-300"
                type="text"
                placeholder="Username"
                name="username"
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
              <span className="text-xs mt-5 text-gray-500">
                People who use our service may have uploaded your contact information to Instagram.
                <Link className="text-[#00376b00]" to="https://www.facebook.com/help/instagram/261704639352628">
                  {" "}
                  Learn More
                </Link>{" "}
              </span>
              <span className="text-xs mt-3 text-gray-500">
                By signing up, you agree to our{" "}
                <Link className="text-[#00376b]" to="https://help.instagram.com/581066165581870/?locale=en_US">
                  Terms
                </Link>{" "}
                ,{" "}
                <Link className="text-[#00376b]" to="https://www.facebook.com/privacy/policy">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link className="text-[#00376b]" to="https://help.instagram.com/1896641480634370/">
                  Cookies Policy .
                </Link>
              </span>

              <button
                className="h-9 mt-4 mb-4 mx-0 bg-[#0095f6] text-sm font-semibold text-white border border-none rounded-lg "
                type="submit"
              >
                Sign Up
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
    </Helmet>
  );
};

export default SignUp;
