import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { EmojiIcon } from "../Icons";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { AiOutlineLeft } from "react-icons/ai";

let schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});

const ChatBox: React.FC = () => {
  const [emoji, setEmoji] = useState<boolean>(false);
  const [inputContent, setInputContent] = useState<string>("");
  /** handle Message Start */
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {},
  });

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    formik.values.content = formik.values.content + emojiData.emoji;
    formik.setFieldValue("content", formik.values.content);
  };

  return (
    <>
      <div className="fixed w-[inherit] top-0 flex items-center justify-between h-[60px] px-4 border">
        <div className="flex">
          <div className="flex items-center mr-4 cursor-pointer tablet:hidden">
            <AiOutlineLeft className="w-7 h-7" />
          </div>
          <div className="max-w-[44px] max-h-[44px] rounded-full">
            <img src={""} alt="user-profile" height={44} width={44} />
          </div>
          <div className="flex items-center w-full">talk to username</div>
        </div>
        <div className="">4444</div>
      </div>
      <div className="fixed w-[inherit] top-[60px] h-[calc(100vh-138px)] border-l overflow-y-scroll"></div>
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
  );
};

export default ChatBox;
