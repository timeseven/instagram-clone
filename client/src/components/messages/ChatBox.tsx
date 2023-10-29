import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  CallActiveIcon,
  CallIcon,
  EmojiIcon,
  SettingsMessagesIcon,
  UpdateIcon,
  VideoCallActiveIcon,
  VideoCallIcon,
} from "../Icons";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { AiOutlineLeft } from "react-icons/ai";
import { ChatBoxProps, IMessage } from "../../utils/interface";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getMessages } from "../../redux/features/messagesSlice";
import { setConversationModalId, setIsDeleteConversationGlobalTrue } from "../../redux/features/globalStateSlice";
import { Link, useNavigate } from "react-router-dom";
import { getTimesMessagesString } from "../../utils/Times";
import Load from "../../images/loading.gif";

let schema = yup.object().shape({
  text: yup.string(),
});

const ChatBox: React.FC<ChatBoxProps> = ({ id }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { csData } = useSelector((state: RootState) => state.conversation);
  const { mData } = useSelector((state: RootState) => state.messages);
  const { sData } = useSelector((state: RootState) => state.socket);
  const [emoji, setEmoji] = useState<boolean>(false);
  const [messageConversation, setMessageConversation] = useState<IMessage[]>([]);
  const [csRecipient, setCsRecipient] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  /** handle Message Start */
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setEmoji(false);
      if (values.text !== "") {
        dispatch(
          createMessage({
            conversation: id,
            sender: user!._id,
            recipient: csRecipient[0]!.recipients._id,
            text: values.text,
          })
        ).then((response) => {
          sData!.emit("createMessage", response.payload);
          scrollBot();
        });
      }
      formik.setFieldValue("text", "");
    },
  });

  useEffect(() => {
    const CsRecipient: any = [];
    csData!.forEach((item) => {
      if (item._id === id) {
        item.recipients.forEach((cv) => {
          if (cv._id !== user!._id) {
            CsRecipient.push({
              recipients: cv,
              _id: item._id,
            });
          }
        });
      }
    });
    setCsRecipient(CsRecipient);
  }, [csData, id]);

  useEffect(() => {
    const MessageConversation: IMessage[] = [];
    mData!.map((msg) => {
      if (msg.conversation === id) {
        MessageConversation.push(msg);
      }
    });
    setMessageConversation(MessageConversation);
    setTimeout(() => {
      scrollBot();
    }, 100);
  }, [mData]);

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    formik.values.text = formik.values.text + emojiData.emoji;
    formik.setFieldValue("text", formik.values.text);
  };
  const handleSettingConversation = (id: string) => {
    dispatch(setIsDeleteConversationGlobalTrue());
    dispatch(setConversationModalId(id));
  };

  const scrollBot = () => {
    const containerDiv = document.getElementById("conversationContainer");
    if (containerDiv) {
      containerDiv.scrollTop = containerDiv.scrollHeight;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getMessages(id)).then(() => setIsLoading(false));
  }, [dispatch, id]);

  return (
    <>
      {csRecipient.length > 0 && (
        <>
          <div className="fixed w-[inherit] top-0 flex items-center justify-between h-[60px] px-4 border">
            <div className="flex">
              <div onClick={() => navigate(-1)} className="flex items-center mr-4 cursor-pointer tablet:hidden">
                <AiOutlineLeft className="w-7 h-7" />
              </div>
              <div className="max-w-[44px] max-h-[44px] rounded-full">
                <img
                  src={csRecipient[0]!.recipients.avatar}
                  alt={csRecipient[0]!.recipients.avatar}
                  height={44}
                  width={44}
                />
              </div>
              <div className="flex items-center w-full ml-1">{csRecipient[0]!.recipients.fullname}</div>
            </div>
            <div className="relative flex items-center justify-center gap-3">
              <div className="">
                <CallIcon />
              </div>
              <div className="">
                <VideoCallIcon />
              </div>
              <div onClick={() => handleSettingConversation(id)} className="cursor-pointer">
                <SettingsMessagesIcon />
              </div>
            </div>
          </div>
          <div
            id="conversationContainer"
            className="fixed flex flex-col w-[inherit] top-[60px] h-[calc(100vh-138px)] border-l overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-center p-7">
              <span className="max-w-[100px] max-h-[100px]">
                <img
                  src={csRecipient[0]!.recipients.avatar}
                  alt={csRecipient[0]!.recipients.avatar}
                  height={100}
                  width={100}
                />
              </span>
              <span className="font-semibold my-2">{csRecipient[0]!.recipients.fullname}</span>
              <Link
                to={`/${csRecipient[0]!.recipients.username}`}
                className="border rounded-lg py-1 px-2 font-semibold bg-slate-200"
              >
                View Profile
              </Link>
            </div>
            <div className="flex flex-col-reverse">
              {isLoading ? (
                <img className="mx-auto" src={Load} alt={Load} width={20} height={20} />
              ) : (
                messageConversation!.map((msg, idx) =>
                  msg.sender._id === user!._id ? (
                    <div className="relative flex flex-col items-end justify-end" key={msg._id}>
                      <div className="flex flex-col items-end justify-end">
                        <div className="flex w-screen items-center justify-center grow tablet:w-[calc(100vw-104px-72px)] desktop:w-[calc(100vw-397px-245px)] desktop-lg:w-[calc(100vw-397px-335px)]">
                          {idx < messageConversation.length - 1 &&
                          getTimesMessagesString(messageConversation[idx].createdAt) ===
                            getTimesMessagesString(messageConversation[idx + 1].createdAt)
                            ? ""
                            : getTimesMessagesString(msg.createdAt)}
                        </div>
                        {msg.call ? null : (
                          <>
                            {msg.media && !msg.text ? (
                              <div className="max-w-[16rem] mt-2">
                                <img src={msg.media} alt={msg.media} />
                              </div>
                            ) : (
                              <div className="max-w-[20rem] py-1 px-3 mt-2 mr-2 break-words rounded-md bg-sky-400">
                                {msg.text}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-start justify-start" key={msg._id}>
                      <div className="flex items-start justify-start">
                        <div className="relative mt-2 w-10 h-10 mx-4">
                          <img src={csRecipient[0]!.recipients.avatar} alt={csRecipient[0]!.recipients.avatar} />
                        </div>
                        <div className="flex flex-col items-start justify-start">
                          <div className="flex w-[calc(100vw-9rem)] items-center justify-center grow tablet:w-[calc(100vw-104px-72px-9rem)] desktop:w-[calc(100vw-397px-245px-9rem)] desktop-lg:w-[calc(100vw-397px-335px-9rem)]">
                            {idx < messageConversation.length - 1 &&
                            getTimesMessagesString(messageConversation[idx].createdAt) ===
                              getTimesMessagesString(messageConversation[idx + 1].createdAt)
                              ? ""
                              : getTimesMessagesString(msg.createdAt)}
                          </div>
                          {msg.call ? null : (
                            <>
                              {msg.media && !msg.text ? (
                                <div className="max-w-[16rem] mt-2">
                                  <img src={msg.media} alt={msg.media} />
                                </div>
                              ) : (
                                <div className="max-w-[18rem] py-1 px-3 mt-2 break-words rounded-md bg-slate-200">
                                  {msg.text}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
          <div className="fixed flex items-center w-[inherit] bottom-0 h-[78px] border">
            <form onSubmit={formik.handleSubmit} className="relative w-[inherit] px-4">
              <input
                autoComplete="off"
                placeholder="Send a message..."
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange("text")}
                onFocus={() => setEmoji(false)}
                className="h-[40px] w-full p-4 rounded-full pl-9 pr-12 border"
              />
              <div className="absolute top-3 left-6">
                <span>
                  <span className="cursor-pointer" onClick={() => setEmoji(!emoji)}>
                    <EmojiIcon />
                  </span>
                  {emoji ? (
                    <div className="fixed bottom-14">
                      <EmojiPicker height={500} onEmojiClick={handleEmojiClick} />
                    </div>
                  ) : null}
                </span>
              </div>
              {formik.values.text !== "" && (
                <button type="submit" className="absolute text-sky-500 font-semibold right-7 top-2 cursor-pointer">
                  Send
                </button>
              )}
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ChatBox;
