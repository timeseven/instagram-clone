import React from "react";
import { YourMessagesIcon } from "../Icons";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setIsCreateConversationGlobalTrue } from "../../redux/features/globalStateSlice";

const RightSide: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <div className="flex w-[inherit] h-full flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <YourMessagesIcon />
        </div>
        <div className="flex items-center justify-center font-semibold">Your Message</div>
        <div className="flex items-center justify-center text-neutral-400 mb-4">
          Send private photos and messages to a friend or group.
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => dispatch(setIsCreateConversationGlobalTrue())}
            className="bg-sky-500 h-9 text-sm px-5 font-semibold text-white border border-none rounded-lg"
          >
            Send Messages
          </button>
        </div>
      </div>
    </>
  );
};

export default RightSide;
