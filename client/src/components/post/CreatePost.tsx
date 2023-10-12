import React, { useState, useEffect, createRef, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setIsCreatePostGlobal } from "../../redux/features/globalStateSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { AiOutlineCamera, AiOutlineClose } from "react-icons/ai";
import { EmojiIcon, UploadImg } from "../Icons";
import Load from "../../images/loading.gif";
import { uploadImgPost } from "../../redux/features/uploadImgSlice";
let schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});

const CreatePost: React.FC = () => {
  const { isCreatePostGlobal } = useSelector((state: RootState) => state.globalState);
  const { user } = useSelector((state: RootState) => state.auth);
  const { message, imageList } = useSelector((state: RootState) => state.upload);

  const dispatch: AppDispatch = useDispatch();

  const ref = createRef<HTMLInputElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const refCanvas = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<string[]>([]);
  const [stream, setStream] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {},
  });

  const handleCloseModal = () => {
    dispatch(setIsCreatePostGlobal());
  };

  // select from computer
  const handleClick = () => {
    console.log("select from computer", ref.current);
    ref.current?.click();
  };

  const uploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList = e.target.files!;
    console.log("uploadImages", fileList);
    const filesArray: File[] = Array.from(fileList);
    console.log("uploadImages", filesArray);
    dispatch(uploadImgPost(filesArray)).then((response) => {
      if (response.payload) {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (message === "upload/upload-images-post pedding") {
      setLoading(true);
    }
  }, [message]);

  useEffect(() => {
    if (imageList[0] !== undefined && message === "upload/upload-images-post success") {
      console.log(imageList);
      const urls = imageList.map((image) => image.url);
      setImages(urls);
    }
  }, [imageList, message]);
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
            className="flex flex-col w-full h-screen m-auto max-w-[90vw] max-h-[70vh] bg-white rounded-md tablet-md:max-w-[60vw]"
          >
            <div className="flex items-center justify-center px-4 py-2 border rounded-t-md">
              <span className="w-full flex items-center justify-center font-semibold">Create new post</span>
              <button
                type="submit"
                className={`${
                  images.length > 0 && formik.values.content ? "text-sky-500" : "text-sky-300"
                } font-semibold leading-5 flex items-center`}
                disabled={images.length > 0 && formik.values.content ? false : true}
              >
                Share
              </button>
            </div>
            <div className="w-full h-full flex flex-col justify-center tablet-md:flex-row">
              <div className="w-full flex h-2/3 items-center justify-center grow tablet-md:w-[40vw]">
                {images.length > 0 && stream === false ? (
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <button title="close" className="absolute top-4 right-4">
                          <AiOutlineClose className="w-6 h-6 fill-white" />
                        </button>
                        <img src={image} alt={image} className="w-full h-full" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border-r">
                    <UploadImg className="grow" />
                    {stream && (
                      <div className="relative">
                        <span className="absolute top-2 right-2">
                          <button type="button" className="bg-white" aria-label="Close"></button>
                        </span>
                        <video autoPlay muted ref={videoRef} width="100%" height="100%" />
                        <canvas ref={refCanvas} className="hidden" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={handleClick}
                      className="h-9 p-1 m-auto bg-sky-500 text-sm font-semibold text-white border rounded-md"
                    >
                      Select from computer
                    </button>
                    <input
                      className="hidden"
                      type="file"
                      name="file"
                      id="file_up"
                      multiple
                      accept="image/*"
                      ref={ref}
                      onChange={uploadImages}
                    />
                    {loading ? <img src={Load} alt="" width={20} height={20} /> : null}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full h-1/3 justify-center grow px-3 py-3 bg-white tablet-md:w-[20vw] tablet-md:justify-start">
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
                    <span onClick={() => setEmoji(!emoji)}>
                      <EmojiIcon />
                      {emoji ? <EmojiPicker width={300} height={500} /> : null}
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
