import React from "react";
import { Link } from "react-router-dom";
import Helmet from "../../components/Helmet";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

// images/logo
import logo from "../../images/logo.png";
import { setNullUser } from "../../redux/features/authSlice";

const EmailSent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSetNull = () => {
    dispatch(setNullUser());
  };
  return (
    <Helmet title="Email Sent • Instagram">
      <div className="fixed w-full h-[3.75rem] bg-white border border-solid border-neutral-300">
        <div className="relative max-w-[60rem] m-auto h-full flex items-center justify-between">
          <Link to="/" onClick={handleSetNull} className="w-28 h-10 mobile-sm:inline-block hidden">
            <img src={logo} alt="logo" className="h-full" />
          </Link>
          <Link className="mr-5" onClick={handleSetNull} to="/login">
            Log in to another account
          </Link>
        </div>
      </div>
      <div className="pt-40 h-[80vh] flex items-center justify-center">
        <div className="w-[22.5rem] h-[12.3rem] py-8 px-12 mobile:border border-solid border-neutral-300">
          <div className="flex items-center justify-center font-semibold">Email Sent</div>
          <div className="inline-block mt-2 text-sm text-center text-gray-500">
            We sent an email to <div className="inline-block font-bold">{user?.email} </div> with a link to recover your
            account.
          </div>
          <Link
            onClick={handleSetNull}
            className="flex items-center justify-center mt-4 font-medium text-[#3696f9]"
            to="/login"
          >
            OK
          </Link>
        </div>
      </div>
    </Helmet>
  );
};

export default EmailSent;
