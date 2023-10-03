import React, { useState } from "react";
import { Link } from "react-router-dom";
import SuggestionUserSkeleton from "../skeleton/SuggestionUserSkeleton";
import Footer from "../../layouts/components/Footer";

const SuggesstionUser: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div>
      <div className="h-[66px] mt-[16px] mb-[10px] flex items-center justify-between">
        <Link to={`/`} className="w-full mr-1 flex items-center justify-between overflow-y-visible">
          <div>
            <img src={`${require("../../images/avatar-default.jpg")}`} height={56} width={56} alt="" />
          </div>
          <div className="flex flex-col grow">
            <span className="ml-3 leading-[18px] font-semibold">timeseven</span>
            <span className="ml-3 leading-[18px] text-neutral-500">even qian</span>
          </div>
          <button className="text-blue-400 font-semibold">Switch</button>
        </Link>
      </div>
      <div className="mb-3 -ml-4 w-[calc(100%+32px)] flex flex-col">
        <div className="px-[16px] flex justify-between">
          <div className="text-neutral-500 font-semibold text-sm">Suggestions for you</div>
          <button className="font-semibold text-sm">See All</button>
        </div>
        {isLoading ? (
          <div className="ml-1 mb-1">
            <SuggestionUserSkeleton />
          </div>
        ) : true ? (
          <div className="flex flex-col ml-1 mb-1 py-2" key="">
            <Link to={`/`} className="py-2 px-4 flex items-center">
              <div className="">
                <img src={`${require("../../images/avatar-default.jpg")}`} height={32} width={32} alt="" />
              </div>
              <div className="grow flex flex-col">
                <span className="ml-3 text-[15px] leading-[18px] font-semibold">kkllsop</span>
                <span className="ml-3 text-[15px] leading-[18px] text-neutral-500">Jay Chou</span>
              </div>
              {true ? (
                <button className="text-blue-400 font-semibold">unFollow</button>
              ) : (
                <button className="text-blue-400 font-semibold">Follow</button>
              )}
            </Link>
            <Link to={`/`} className="py-2 px-4 flex items-center">
              <div className="">
                <img src={`${require("../../images/avatar-default.jpg")}`} height={32} width={32} alt="" />
              </div>
              <div className="grow flex flex-col">
                <span className="ml-3 text-[15px] leading-[18px] font-semibold">kkllsop</span>
                <span className="ml-3 text-[15px] leading-[18px] text-neutral-500">Jay Chou</span>
              </div>
              {true ? (
                <button className="text-blue-400 font-semibold">unFollow</button>
              ) : (
                <button className="text-blue-400 font-semibold">Follow</button>
              )}
            </Link>
            <Link to={`/`} className="py-2 px-4 flex items-center">
              <div className="">
                <img src={`${require("../../images/avatar-default.jpg")}`} height={32} width={32} alt="" />
              </div>
              <div className="grow flex flex-col">
                <span className="ml-3 text-[15px] leading-[18px] font-semibold">kkllsop</span>
                <span className="ml-3 text-[15px] leading-[18px] text-neutral-500">Jay Chou</span>
              </div>
              {true ? (
                <button className="text-blue-400 font-semibold">unFollow</button>
              ) : (
                <button className="text-blue-400 font-semibold">Follow</button>
              )}
            </Link>
          </div>
        ) : null}
      </div>
      <div className="mb-3 -ml-4 w-[calc(100%+32px)]">
        <Footer />
      </div>
    </div>
  );
};

export default SuggesstionUser;
