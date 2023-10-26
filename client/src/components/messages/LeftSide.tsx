import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { CreateMessagesIcon } from "../../components/Icons";

const LeftSide = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-[60px] fixed items-center justify-center top-0 flex bg-white tablet:w-[104px] desktop:w-[397px]">
        <div onClick={() => navigate(-1)} className="flex mx-3 cursor-pointer tablet:hidden">
          <AiOutlineLeft className="w-7 h-7" />
        </div>
        <div className="w-full flex justify-center text-lg font-semibold mr-7 tablet:hidden desktop:flex">
          {user?.username}
        </div>
        <div className="mx-3 ml-auto tablet:mx-auto desktop:mr-2">
          <CreateMessagesIcon />
        </div>
      </div>
      <div className="fixed w-full h-[48px] font-semibold top-[60px] px-6 pt-4 pb-3 tablet:hidden desktop:inline-block">
        Messages
      </div>
      <div className="fixed w-full top-[108px] flex flex-col h-full tablet:w-[104px] tablet:top-[60px] desktop:w-[397px] desktop:top-[108px]">
        <Link to={`/direct/cvb`} className="flex w-full h-[72px] py-2 px-6">
          <div className="max-w-[56px] max-h-[56px] rounded-full">
            <img src={""} alt="user-profile" height={56} width={56} />
          </div>
          <div className="flex flex-col items-start ml-5 tablet:hidden desktop:flex">
            <span className="flex items-center mr-2 text-sm font-semibold grow">Even</span>
            <span className="flex items-center text-sm text-neutral-400 grow">123123 · 14 hours ago</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default LeftSide;
