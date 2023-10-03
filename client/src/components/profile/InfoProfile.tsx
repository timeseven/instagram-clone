import React, { useState } from "react";
import InfoProfileSkeleton from "../skeleton/InfoProfileSkeleton";
import EditProfile from "./EditProfile";

import avatar from "../../images/avatar-default.jpg";

const InfoProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="flex">
      {isLoading ? (
        <InfoProfileSkeleton />
      ) : (
        <div className="w-full">
          <div className="w-full tablet-sm:hidden">
            <div className="flex mt-4 mx-4 mb-6">
              <div className="mr-7 min-w-[77px]">
                <img src={avatar} width={77} height={77} alt="user-profile" />
              </div>
              <div className="flex flex-col justify-between grow">
                <div className="text-xl leading-[40px]">timeseven</div>
                <div className="leading-[32px]">
                  <button
                    type="button"
                    className="bg-[#efefef] w-[8rem] h-8 font-semibold text-sm  rounded-md"
                    title="Edit profile"
                  >
                    Edit profile
                  </button>
                </div>
              </div>
            </div>
            <div className="px-4 pb-5 leading-4 font-semibold text-sm">even qian</div>
            <div className="flex justify-around py-3 border-t">
              <button className="w-1/3 flex flex-col items-center justify-center">
                <span className="leading-[18px] font-medium pr-1">3</span>
                <span className="leading-[18px] text-neutral-500">Post</span>
              </button>
              <button className="w-1/3 flex flex-col items-center justify-center">
                <span className="leading-[18px] font-medium pr-1">10</span>
                <span className="leading-[18px] text-neutral-500">followers</span>
              </button>
              <button className="w-1/3 flex flex-col items-center justify-center">
                <span className="leading-[18px] font-medium pr-1">34</span>
                <span className="leading-[18px] text-neutral-500">following</span>
              </button>
            </div>
          </div>
          <div className="w-full hidden tablet-sm:inline-block">
            <div className="w-full flex px-[30px] pt-[32px] mb-[44px] flex-col ">
              <div className="w-full flex">
                <div className="flex mr-[30px]">
                  <div className="mx-[31px]">
                    <img src={avatar} width={150} height={150} alt="user-profile" />
                  </div>
                </div>
                <div className="flex flex-col justify-between grow">
                  <div className="flex items-center">
                    <div className="text-xl leading-[40px]">timeseven</div>
                    <div className="leading-[32px] ml-5">
                      <button
                        type="button"
                        className="bg-[#efefef] w-auto px-4 h-8 font-semibold text-sm  rounded-md"
                        title="Edit profile"
                      >
                        Edit profile
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <button className="flex items-center mr-10">
                      <span className="leading-[18px] font-medium pr-1">3</span>
                      <span className="leading-[18px] text-neutral-500">Post</span>
                    </button>
                    <button className="flex items-center mr-10">
                      <span className="leading-[18px] font-medium pr-1">10</span>
                      <span className="leading-[18px] text-neutral-500">followers</span>
                    </button>
                    <button className="flex items-center mr-10">
                      <span className="leading-[18px] font-medium pr-1">34</span>
                      <span className="leading-[18px] text-neutral-500">following</span>
                    </button>
                  </div>
                  <div className="flex">
                    <div className="pb-5 leading-4 font-semibold text-sm">even qian</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoProfile;
