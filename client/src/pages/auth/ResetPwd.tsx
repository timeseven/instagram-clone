import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { resetPassword } from "../../redux/features/authSlice";

import Helmet from "../../components/Helmet";
// images/logo
import logo from "../../images/logo.png";

let schema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "Please set the password in correct format."
    )
    .required("Password is Required"),
});

const ResetPwd: React.FC = () => {
  const { token } = useParams() as {
    token: string;
  };
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { user, message } = useSelector((state: RootState) => state.auth);
  const [typePass, setTypePass] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(
        resetPassword({
          password: values.password,
          token: token,
        })
      );
      formik.setFieldValue("password", "");
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (formik.values.password.length >= 6 && !formik.errors.password) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [formik.values.password.length, formik.errors.password]);

  return (
    <Helmet title="Reset Password • Instagram">
      <div className="fixed w-full h-[3.75rem] bg-white border border-solid border-neutral-300">
        <div className="relative max-w-[60rem] m-auto h-full flex items-center justify-between">
          <Link to="/" className="w-28 h-10">
            <img src={logo} alt="logo" className="h-full" />
          </Link>
        </div>
      </div>
      <div className="pt-40 flex items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-[24.25rem] min-w-[15rem] py-0 px-12 border border-solid border-neutral-300 rounded-md flex flex-col items-center justify-center"
        >
          <div className="mt-16 flex items-center justify-center font-bold text-base">Create A Strong Password</div>
          <div className="my-8 text-center text-sm text-neutral-600">
            Your password must be at least 6 characters and should include a combination of numbers, letters and special
            characters (!$@%).
          </div>
          <div className="relative w-full">
            <input
              className="w-full h-10 p-2 mx-2 border border-solid border-neutral-300 rounded-md"
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
            <div className="w-full ml-3 text-red-500 flex">{formik.errors.password}</div>
          ) : null}
          <button
            type="submit"
            className={`${
              isActive ? "bg-sky-500" : "bg-sky-300"
            } w-full h-8 mt-14 mb-4 mx-0 text-sm font-semibold text-white border border-none rounded-lg`}
            disabled={!isActive}
          >
            Reset Password
          </button>
        </form>
      </div>
    </Helmet>
  );
};

export default ResetPwd;
