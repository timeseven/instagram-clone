import React from "react";
import Helmet from "../../components/Helmet";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import LeftSide from "../../components/messages/LeftSide";
import RightSide from "../../components/messages/RightSide";
import { CreateMessagesIcon } from "../../components/Icons";

const MessagesDirect: React.FC = () => {
  return (
    <Helmet title={`Message • Direct`}>
      <div className="fixed w-full h-screen top-0 left-0 bg-white z-30 overflow-auto tablet:left-[72px] desktop:left-[245px] desktop-lg:left-[335px]">
        <div
          className="flex w-full h-full items-center left-0 fixed
      tablet:left-[72px] tablet:max-w-[calc(100vw-72px)] tablet:top-0
      desktop:left-[245px] desktop:max-w-[calc(100vw-245px)]
      desktop-lg:left-[335px] desktop-lg:max-w-[calc(100vw-335px)]"
        >
          <div className="flex flex-col w-full h-full tablet:w-[104px] desktop:w-[397px] grow">
            <LeftSide />
          </div>
          <div className="hidden fixed h-full border-l tablet:flex tablet:left-[176px] tablet:w-[calc(100vw-176px)] desktop:left-[642px] desktop:w-[calc(100vw-642px)] desktop-lg:left-[732px] desktop-lg:w-[calc(100vw-732px)]">
            <RightSide />
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default MessagesDirect;
