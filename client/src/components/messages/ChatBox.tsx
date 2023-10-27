import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { CallIcon, EmojiIcon, SettingsMessagesIcon, VideoCallIcon } from "../Icons";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { AiOutlineLeft } from "react-icons/ai";
import { ChatBoxProps } from "../../utils/interface";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../redux/features/messagesSlice";
import { setConversationModalId, setIsDeleteConversationGlobalTrue } from "../../redux/features/globalStateSlice";

let schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});

const ChatBox: React.FC<ChatBoxProps> = ({ id }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { csData } = useSelector((state: RootState) => state.conversation);
  const { mData } = useSelector((state: RootState) => state.messages);
  const [emoji, setEmoji] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  /** handle Message Start */
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {},
  });

  const csRecipient: any = [];
  csData!.forEach((item) => {
    if (item._id === id) {
      item.recipients.forEach((cv) => {
        if (cv._id !== user!._id) {
          csRecipient.push({
            recipients: cv,
            _id: item._id,
          });
        }
      });
    }
  });

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    formik.values.content = formik.values.content + emojiData.emoji;
    formik.setFieldValue("content", formik.values.content);
  };
  const handleSettingConversation = (id: string) => {
    dispatch(setIsDeleteConversationGlobalTrue());
    dispatch(setConversationModalId(id));
  };

  useEffect(() => {
    dispatch(getMessages(id));
  }, [dispatch, id]);

  return (
    <>
      {csRecipient.length > 0 && (
        <>
          <div className="fixed w-[inherit] top-0 flex items-center justify-between h-[60px] px-4 border">
            <div className="flex">
              <div className="flex items-center mr-4 cursor-pointer tablet:hidden">
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
          <div className="fixed w-[inherit] top-[60px] h-[calc(100vh-138px)] border-l overflow-y-auto"></div>
          <div className="fixed flex items-center w-[inherit] bottom-0 h-[78px] border overflow">
            <form className="relative w-[inherit] px-4">
              <input
                autoComplete="off"
                placeholder="Send a message..."
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange("content")}
                onFocus={() => setEmoji(false)}
                className="h-[40px] w-full p-4 rounded-full pl-7 pr-12 border"
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
              {formik.values.content !== "" && (
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
