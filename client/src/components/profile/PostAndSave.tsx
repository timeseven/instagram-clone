import React from "react";
import { PostsIcon, SavedIcon } from "../Icons";

const PostAndSave = () => {
  return (
    <div className="flex justify-around items-center border-t border-solid border-neutral-300">
      <div className="w-1/2 h-[44px] flex items-center justify-center cursor-pointer">
        <PostsIcon className="w-[24px] h-[24px] tablet-sm:w-[12px] tablet-sm:h-[12px]" />
        <span className="text-[#8e8e8e] text-xs letter ml-2 tracking-widest leading-4 uppercase hidden tablet-sm:inline-block">
          Posts
        </span>
      </div>
      <div className="w-1/2 h-[44px] flex items-center justify-center cursor-pointer">
        <SavedIcon className="w-[24px] h-[24px] tablet-sm:w-[12px] tablet-sm:h-[12px]" />
        <span className="text-[#8e8e8e] text-xs ml-2 tracking-widest leading-4 uppercase hidden tablet-sm:inline-block">
          Saved
        </span>
      </div>
    </div>
  );
};

export default PostAndSave;
