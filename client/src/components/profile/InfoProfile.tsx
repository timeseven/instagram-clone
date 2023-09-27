import React from "react";
import InfoProfileSkeleton from "../skeleton/InfoProfileSkeleton";
import EditProfile from "./EditProfile";

import avatar from "../../images/avatar-default.jpg";

const InfoProfile = () => {
  return (
    <div className="flex flex-col ml-24 mb-12">
      {false ? (
        <InfoProfileSkeleton />
      ) : (
        <div className="flex">
          <div className="w-36 h-36 mr-24">
            <img src={avatar} alt="user-profile" />
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div className="text-xl">timeseven</div>
              <div>
                <button
                  type="button"
                  className="bg-[#efefef] w-[6.25rem] h-8 ml-4 font-semibold text-sm  rounded-md"
                  title="Edit profile"
                >
                  Edit profile
                </button>
                {/* <EditProfile /> */}
              </div>
            </div>
            <div className="flex my-5">
              <div className="flex items-center justify-center mr-10">
                <span className="font-medium pr-1">3</span>
                Post
              </div>
              <button className="flex items-center justify-center mr-10">
                <span className="font-medium pr-1">10</span>
                followers
              </button>
              <button className="flex items-center justify-center mr-10">
                <span className="font-medium pr-1">34</span>
                following
              </button>
            </div>
            <div className="leading-4 font-semibold text-sm">even qian</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoProfile;
