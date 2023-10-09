import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { register } from "../../redux/features/authSlice";

import FaceBookLogin from "../../components/FaceBookLogin";
import OrSeperate from "../../components/OrSeperate";
import Helmet from "../../components/Helmet";

// images/logo
import logo from "../../images/logo.png";
import appStore from "../../images/app-store.png";
import googlePlay from "../../images/google-play.png";
import { AiFillFacebook } from "react-icons/ai";

// set schema for validation
let schema = yup.object().shape({
  email: yup.string().email("Email should be valid").required("Email is Required"),
  fullname: yup.string().required("Full Name is Required"),
  username: yup.string().required("Username is Required"),
  password: yup.string().required("Password is Required"),
});

const SignUp: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { user, message } = useSelector((state: RootState) => state.auth);
  const [typePass, setTypePass] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // jusdge button isActive
  useEffect(() => {
    if (
      formik.values.password.length >= 6 &&
      formik.values.email.length > 0 &&
      !formik.errors.email &&
      formik.values.fullname.length > 0 &&
      formik.values.username.length > 0
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    formik.values.email.length,
    formik.errors.email,
    formik.values.fullname.length,
    formik.values.password.length,
    formik.values.username.length,
  ]);

  return (
    <Helmet title="Sign Up • Instagram ">
      <div className="flex flex-col">
        <div className="flex justify-center">
          <div className="max-w-sm mt-3 flex flex-col justify-center">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col py-5 px-10 text-center bg-white mobile:border border-solid border-neutral-300 rounded-sm"
            >
              <div className="w-48 h-14 m-auto mb-5 mt-4 cursor-pointer">
                <img src={logo} alt="logo" />
              </div>
              <div className="text-neutral-500 text-base leading-5 font-semibold">
                Sign up to see photos and videos from your friends.
              </div>
              <span className="flex justify-center items-center h-9 mt-4 mb-4 mx-0 bg-sky-500 text-sm font-semibold text-white rounded-lg border-none border">
                <AiFillFacebook className="text-xl mr-1" />
                <FaceBookLogin title="Log in with Facebook" />
              </span>
              <OrSeperate />
              <input
                className="h-10 p-2 border border-solid rounded-[4px] border-neutral-300"
                type="text"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500 flex">{formik.errors.email}</div>
              ) : null}
              <input
                className="mt-2 h-10 p-2 border border-solid rounded-[4px] border-neutral-300"
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={formik.handleChange("fullname")}
                onBlur={formik.handleBlur("fullname")}
                value={formik.values.fullname}
              />
              {formik.errors.fullname && formik.touched.fullname ? (
                <div className="text-red-500 flex">{formik.errors.fullname}</div>
              ) : null}
              <input
                className="mt-2 h-10 p-2 border border-solid rounded-[4px] border-neutral-300"
                type="text"
                placeholder="Username"
                name="username"
                onChange={formik.handleChange("username")}
                onBlur={formik.handleBlur("username")}
                value={formik.values.username}
              />
              {formik.errors.username && formik.touched.username ? (
                <div className="text-red-500 flex">{formik.errors.username}</div>
              ) : null}
              <div className="relative mt-2">
                <input
                  className="w-full h-10 p-2 border border-solid rounded-[4px] border-neutral-300"
                  placeholder="Password"
                  type={typePass ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <h6
                  className="absolute font-semibold top-1/2 right-2 -translate-y-1/2 hover:cursor-pointer hover:opacity-50"
                  onClick={() => setTypePass(!typePass)}
                >
                  {typePass ? "Hide" : "Show"}
                </h6>
              </div>
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-500 flex">{formik.errors.password}</div>
              ) : null}
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
                className={`${
                  isActive ? "bg-sky-500" : "bg-sky-300"
                } h-9 mt-4 mb-4 mx-0 text-sm font-semibold text-white border border-none rounded-lg`}
                type="submit"
                disabled={!isActive}
              >
                Sign Up
              </button>
              {message !== "success" ? <div className="text-red-500 flex">{message}</div> : null}
            </form>
            <div className="flex flex-col justify-center items-center my-2 py-2 text-sm mobile:border border-solid border-neutral-300 rounded-sm">
              <p className="text-sm m-4">
                Have an account?{" "}
                <Link className="text-[#73b6fb]" to="/login">
                  Log in
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

export default SignUp;
