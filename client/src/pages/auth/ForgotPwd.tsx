import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { forgotPassword, resetUser } from "../../redux/features/authSlice";

import Helmet from "../../components/Helmet";
import OrSeperate from "../../components/OrSeperate";
// images/logo
import logo from "../../images/logo.png";

let schema = yup.object().shape({
  email: yup.string().email("Email should be valid").required("Email is Required"),
});

const ForgotPwd: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { user, message } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(forgotPassword(values));
      formik.setFieldValue("email", "");
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/email-sent");
    } else {
      navigate("");
      dispatch(resetUser());
    }
  }, [dispatch, user, navigate]);
  useEffect(() => {
    if (formik.values.email.length > 0 && !formik.errors.email) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [formik.values.email.length, formik.errors.email]);
  return (
    <Helmet title="Forgot Password • Instagram">
      <div className="fixed w-full h-[3.75rem] bg-white border border-solid border-neutral-300">
        <div className="relative max-w-[60rem] m-auto h-full flex items-center">
          <Link to="/" className="w-28 h-10">
            <img src={logo} alt="logo" className="h-full" />
          </Link>
        </div>
      </div>
      <div className="pt-40 flex items-center justify-center mb-20">
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-[24.25rem] min-w-[15rem] py-0 px-12 border border-solid border-neutral-300 rounded-md flex flex-col items-center justify-center"
        >
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
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="w-full text-red-500 flex">{formik.errors.email}</div>
          ) : null}
          <button
            type="submit"
            className={`${
              isActive ? "bg-sky-500" : "bg-sky-300"
            } w-full h-8 mt-4 mb-4 mx-0 text-sm font-semibold text-white border border-none rounded-lg`}
            disabled={isActive ? false : true}
          >
            Send login link
          </button>
          <Link className="text-sm text-[#385185] mb-8" to="https://help.instagram.com/374546259294234">
            Can't reset your password?
          </Link>
          <OrSeperate />
          <Link className="text-sm font-semibold" to="/register">
            Create new account
          </Link>
          {message !== "success" ? <div className="text-red-500 flex">{message}</div> : null}
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
