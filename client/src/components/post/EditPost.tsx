import React, { useState, useEffect, createRef, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setIsEditPostGlobal } from "../../redux/features/globalStateSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { AiOutlineClose } from "react-icons/ai";
import { EmojiIcon } from "../Icons";
import { updatePost } from "../../redux/features/postSlice";

let schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});

const EditPost: React.FC = () => {
  const { isEditPostGlobal, postModalId } = useSelector((state: RootState) => state.globalState);
  const { user } = useSelector((state: RootState) => state.auth);
  const { pData } = useSelector((state: RootState) => state.post);
  const dispatch: AppDispatch = useDispatch();

  const filteredPost = pData.filter((value) => value._id === postModalId)[0];

  const [images, setImages] = useState<string[]>([]);
  const [postId, setPostId] = useState<string>("");
  const [emoji, setEmoji] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(updatePost({ ...values, postId })).then(() => {
        handleCloseModal();
      });
    },
  });

  const handleCloseModal = () => {
    dispatch(setIsEditPostGlobal());
  };

  // add emoji
  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    formik.setFieldValue("content", formik.values.content + emojiData.emoji);
  };

  useEffect(() => {
    if (isEditPostGlobal) {
      setImages(filteredPost.medias);
      setPostId(filteredPost._id);
      formik.setFieldValue("content", filteredPost.content);
    }
  }, [isEditPostGlobal]);

  return (
    <>
      {isEditPostGlobal && (
        <div className="fixed flex top-0 left-0 w-full h-screen overflow-auto bg-black bg-opacity-50 z-30">
          <button onClick={handleCloseModal} title="close" className="absolute top-4 right-4">
            <AiOutlineClose className="w-6 h-6 fill-white" />
          </button>
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col w-full h-screen m-auto max-w-[90vw] max-h-[70vh] bg-white rounded-md tablet-lg:max-w-[60vw]"
          >
            <div className="flex items-center justify-center px-4 py-2 border rounded-t-md">
              <span className="w-full flex items-center justify-center font-semibold">Edit Content</span>
              <button
                type="submit"
                className={`${
                  images.length > 0 && formik.values.content ? "text-sky-500" : "text-sky-300"
                } font-semibold leading-5 flex items-center`}
                disabled={images.length > 0 && formik.values.content ? false : true}
              >
                Finish
              </button>
            </div>
            <div className="w-full h-full max-h-[calc(70vh-42px)] flex flex-col justify-center tablet-lg:flex-row">
              <div className="w-full flex h-2/3 items-center justify-center tablet-lg:h-full tablet-lg:w-[40vw]">
                {images.length > 0 && (
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img width={468} height={468} src={image} alt={image} className="mx-auto" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              <div className="flex flex-col w-full h-1/3 justify-center px-3 py-3 bg-white tablet-lg:h-full tablet-lg:w-[20vw] tablet-lg:justify-start">
                <div className="flex">
                  <div className="flex items-center justify-center cursor-pointer">
                    <img src={user?.avatar} alt={user?.username} width={20} height={20} />
                  </div>
                  <span className="ml-3 font-medium">{user?.username}</span>
                </div>
                <textarea
                  maxLength={2200}
                  className="w-full h-14 p-1"
                  name="content"
                  placeholder="Write a caption..."
                  value={formik.values.content}
                  onChange={formik.handleChange("content")}
                />

                <div className="relative w-full mt-1">
                  <div className="absolute z-10">
                    <span>
                      <span onClick={() => setEmoji(!emoji)}>
                        <EmojiIcon />
                      </span>
                      {emoji ? <EmojiPicker width={300} height={500} onEmojiClick={handleEmojiClick} /> : null}
                    </span>
                  </div>
                  <span className="absolute right-0">{formik.values.content.length}/2200</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPost;
