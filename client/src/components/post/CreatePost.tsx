import React, { useState, useEffect, createRef, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setIsCreatePostGlobal } from "../../redux/features/globalStateSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { AiOutlineCamera, AiOutlineClose } from "react-icons/ai";
import { EmojiIcon, UploadImg } from "../Icons";
import Load from "../../images/loading.gif";
import { createPost } from "../../redux/features/postSlice";
import { createNotification } from "../../redux/features/notificationSlice";
import { UpLoadContent } from "../../utils/interface";
let schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});

const CreatePost: React.FC = () => {
  const { isCreatePostGlobal } = useSelector((state: RootState) => state.globalState);
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();

  const ref = createRef<HTMLInputElement>();
  // upload content
  const [content, setContent] = useState<UpLoadContent[]>([]); // blob url shown on frontend
  const [contentUpload, setContentUpload] = useState<File[]>([]); // file saved on backend

  const [loading, setLoading] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("upload", values, content, contentUpload);
      dispatch(createPost({ ...values, medias: contentUpload })).then((response) => {
        const newPost = response.payload;
        dispatch(
          createNotification({
            id: newPost._id,
            recipients: [...newPost.user.followers],
            images: newPost.images[0],
            url: `/${newPost.user.username}/${newPost._id}`,
            content: `posted: "${newPost.content}"`,
            user: newPost.user._id,
          })
        );
        setContent([]);
        formik.resetForm();
        dispatch(setIsCreatePostGlobal());
      });
    },
  });

  const handleCloseModal = () => {
    setContent([]);
    setContentUpload([]);
    formik.resetForm();
    dispatch(setIsCreatePostGlobal());
  };

  // select from computer
  const handleClick = () => {
    ref.current?.click();
  };

  // show upload image in fronend using URL.createObjectURL
  const uploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList = e.target.files!;
    const filesArray: File[] = Array.from(fileList);
    let images: UpLoadContent[] = [];
    filesArray.forEach((item) => {
      images.push({ url: URL.createObjectURL(item), type: item.type });
    });
    setContent(images);
    setContentUpload(filesArray); // used to save images to aws cloud
  };

  // handle Slide change on Video
  const handleSlideChange = (change: any) => {
    let activeSlide = document.getElementById("createContent")!.getElementsByClassName("swiper-slide")[
      change.activeIndex
    ];
    let prevSlide = document.getElementById("createContent")!.getElementsByClassName("swiper-slide")[
      change.previousIndex
    ];
    let activeSlideVideo = activeSlide.getElementsByTagName("video");
    let prevSlideVideo = prevSlide.getElementsByTagName("video");
    if (activeSlideVideo.length > 0) {
      activeSlideVideo[0].play();
    }
    if (prevSlideVideo.length > 0) {
      prevSlideVideo[0].pause();
    }
  };

  // handle Swiper
  const handleSwiper = (swiper: any) => {
    let activeSlide = document.getElementById("createContent")!.getElementsByClassName("swiper-slide")[
      swiper.activeIndex
    ];
    let activeSlideVideo = activeSlide.getElementsByTagName("video");
    if (activeSlideVideo.length > 0) {
      activeSlideVideo[0].play();
    }
  };

  // add emoji
  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    formik.values.content = formik.values.content + emojiData.emoji;
    formik.setFieldValue("content", formik.values.content);
  };

  return (
    <>
      {isCreatePostGlobal && (
        <div className="fixed flex top-0 left-0 w-full h-screen overflow-auto bg-black bg-opacity-50 z-30">
          <button onClick={handleCloseModal} title="close" className="absolute top-4 right-4">
            <AiOutlineClose className="w-6 h-6 fill-white" />
          </button>
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col w-full h-screen m-auto max-w-[468px] max-h-[70vh] bg-white rounded-md tablet-lg:max-w-[60vw] tablet-lg:h-[510px]"
          >
            <div className="flex items-center justify-center px-4 py-2 border rounded-t-md">
              <span className="w-full flex items-center justify-center font-semibold">Create new post</span>
              <button
                type="submit"
                className={`${
                  content.length > 0 && formik.values.content ? "text-sky-500" : "text-sky-300"
                } font-semibold leading-5 flex items-center`}
                disabled={content.length > 0 && formik.values.content ? false : true}
              >
                Share
              </button>
            </div>
            <div className="w-full h-full max-h-[calc(70vh-42px)] flex flex-col justify-center tablet-lg:flex-row">
              <div
                id="createContent"
                className="flex h-2/3 max-h-[468px] items-center justify-center tablet-lg:h-[468px] tablet-lg:w-[468px]"
              >
                {content.length > 0 ? (
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    onSwiper={(swiper: any) => handleSwiper(swiper)}
                    onSlideChange={(change: any) => handleSlideChange(change)}
                    className="w-[468px] h-[468px] flex items-center justify-center"
                  >
                    {content.map((item, index) => (
                      <SwiperSlide key={index}>
                        <button title="close" className="absolute top-4 right-4">
                          <AiOutlineClose className="w-6 h-6 fill-white" />
                        </button>
                        {item.type.startsWith("image") ? (
                          <img className="object-fill" width={468} height={468} src={item.url} alt={item.url} />
                        ) : (
                          <video width="468" height="468">
                            <source className="object-fill" src={item.url} type={item.type} />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border-r">
                    <UploadImg className="grow tablet:h-2/3" />
                    <div className="tablet:h-1/3">
                      <button
                        type="button"
                        onClick={handleClick}
                        className="h-9 p-1 m-auto bg-sky-500 text-sm font-semibold text-white border rounded-md "
                      >
                        Select from computer
                      </button>
                    </div>
                    <input
                      className="hidden"
                      type="file"
                      name="file"
                      id="file_up"
                      multiple
                      // accept="image/*"
                      ref={ref}
                      onChange={uploadImages}
                    />
                    {loading ? <img src={Load} alt="" width={20} height={20} /> : null}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full h-1/3 justify-center px-3 py-3 bg-white tablet-lg:h-[468px] tablet-lg:w-[20vw] tablet-lg:justify-start">
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
                  onFocus={() => setEmoji(false)}
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

export default CreatePost;
