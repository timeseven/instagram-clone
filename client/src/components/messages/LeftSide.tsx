import React, { useEffect } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CreateMessagesIcon } from "../../components/Icons";
import { getConversations, isReadConversation } from "../../redux/features/conversationSlice";
import { IConversation } from "../../utils/interface";

const LeftSide = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { csData } = useSelector((state: RootState) => state.conversation);
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const handleIsRead = (csdata: IConversation) => {
    console.log("isread", csdata.recipients[1]._id);
    if (csdata.recipients[0]._id === user!._id && !csdata.isRead) {
      dispatch(isReadConversation(csdata._id));
    }
  };

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);
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
        {csData &&
          csData.map((csdata) => (
            <Link
              key={csdata._id}
              to={`/direct/${csdata._id}`}
              onClick={() => handleIsRead(csdata)}
              className="flex w-full h-[72px] py-2 px-6"
            >
              {csdata.recipients.map((recip) =>
                recip._id !== user!._id ? (
                  <div key={recip._id} className="flex">
                    <div className="max-w-[56px] max-h-[56px] rounded-full">
                      <img src={recip.avatar} alt={recip.avatar} height={56} width={56} />
                    </div>
                    <div className="flex flex-col items-start ml-5 tablet:hidden desktop:flex">
                      <span className="flex items-center mr-2 text-sm font-semibold grow">{recip.fullname}</span>
                      <span className="flex items-center text-sm text-neutral-400 grow">
                        {csdata.lastMessages && csdata.lastMessages !== "" ? (
                          <span>
                            {csdata.lastMessages.length > 20
                              ? csdata.lastMessages.slice(0, 20) + "..."
                              : csdata.lastMessages}
                          </span>
                        ) : (
                          <span>Send you a message</span>
                        )}
                        ·14 hours ago
                      </span>
                    </div>
                  </div>
                ) : null
              )}
            </Link>
          ))}
      </div>
    </>
  );
};

export default LeftSide;
