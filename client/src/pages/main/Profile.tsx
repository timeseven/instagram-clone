import React from "react";
import Helmet from "../../components/Helmet";
import InfoProfile from "../../components/profile/InfoProfile";
import { PostsIcon, SavedIcon } from "../../components/Icons";

const Profile: React.FC = () => {
  return (
    <Helmet title={`Profile • Instagram photos and videos`}>
      {
        <div className="w-[935px] mobile:w-[calc(100vw-40px)] pt-10 mb-8  mx-auto">
          <InfoProfile />
          <div className="flex flex-col items-center border-t border-solid border-neutral-300">
            <div className="flex mb-4">
              <div className="pt-3 mr-16 cursor-pointer">
                <PostsIcon className="inline-block" />
                <span className="text-[#8e8e8e] text-xs letter ml-2 tracking-widest leading-4 uppercase">Posts</span>
              </div>
              <div className="pt-3 mr-16 cursor-pointer">
                <SavedIcon className="inline-block" />
                <span className="text-[#8e8e8e] text-xs ml-2 tracking-widest leading-4 uppercase">Saved</span>
              </div>
            </div>
          </div>
        </div>
      }
    </Helmet>
  );
};

export default Profile;
