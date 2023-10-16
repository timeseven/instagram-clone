import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { login, resetUser } from "../../redux/features/authSlice";

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
  password: yup.string().required("Password is Required"),
});

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { user, message } = useSelector((state: RootState) => state.auth);
  const [typePass, setTypePass] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      dispatch(resetUser());
    }
  }, [user, navigate]);

  useEffect(() => {
    if (formik.values.password.length >= 6 && formik.values.email.length > 0 && !formik.errors.email) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [formik.values.password.length, formik.values.email.length, formik.errors.email]);

  return (
    <Helmet title="Login • Instagram">
      <div className="flex flex-col grow">
        <div className="flex grow justify-center">
          <div className="h-[600px] basis-[420px] mb-3 mr-8 bg-mobile-app bg-center bg-no-repeat self-center hidden tablet-lg:inline-block"></div>
          <div className="max-w-sm min-w-fit mt-7 flex flex-col grow justify-center">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col py-5 px-10 text-center bg-white mobile:border border-solid border-neutral-300 rounded-sm"
            >
              <div className="inline-block w-[175px] h-[51px] m-auto mb-5 mt-4 cursor-pointer">
                <img src={logo} alt="logo" />
              </div>
              <input
                className="h-10 p-2 border border-solid rounded-[4px] border-neutral-300"
                type="Email"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500 flex">{formik.errors.email}</div>
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
              <button
                className={`${
                  isActive ? "bg-sky-500" : "bg-sky-300"
                } h-9 mt-4 mb-4 mx-0 text-sm font-semibold text-white rounded-lg border-none border`}
                type="submit"
                disabled={!isActive}
              >
                Log In
              </button>
              {message !== "success" ? <div className="text-red-500 flex">{message}</div> : null}
              <OrSeperate />
              <div className="flex justify-center items-center m-auto cursor-pointer">
                <AiFillFacebook className="text-lg text-[#385185] mr-2" />
                <FaceBookLogin title="Log in with Facebook" />
              </div>
              <Link className="mt-3 text-xs" to="/forgot-password">
                Forgot password?
              </Link>
            </form>
            <div className="flex flex-col justify-center items-center my-2 py-2 text-sm mobile:border border-solid border-neutral-300 rounded-sm">
              <p className="text-sm m-4">
                Don't have an account?{" "}
                <Link className="text-[#0095f6] font-semibold" to="/register">
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
