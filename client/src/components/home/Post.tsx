import React, { useEffect, useState, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useFormik } from "formik";
import * as yup from "yup";
import { setIsDeletePostGlobal, setPostModalId } from "../../redux/features/globalStateSlice";
import { createComment, likeComment, unLikeComment } from "../../redux/features/commentSlice";
import { likePost, unLikePost } from "../../redux/features/postSlice";
import { PostProps } from "../../utils/interface";
import {
  CommentIcon,
  EmojiIcon,
  LikeCommentIcon,
  LikeIcon,
  SaveActiveIcon,
  SaveIcon,
  ShareIcon,
  UnlikeCommentIcon,
  UnlikeIcon,
  UpdateIcon,
} from "../Icons";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { savePost, unSavePost } from "../../redux/features/userSlice";
import { getTimesToWeekAgoString } from "../../utils/Times";
import { AiOutlineClose } from "react-icons/ai";

let schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});

const Post: React.FC<PostProps> = ({ post }) => {
  const dispatch: AppDispatch = useDispatch();
  const { cData } = useSelector((state: RootState) => state.comment);
  const { user } = useSelector((state: RootState) => state.auth);
  const { userData } = useSelector((state: RootState) => state.user);

  const filteredComments = cData.filter((value) => value.postId === post._id);
  const lastComment = filteredComments.filter((value) => !value.reply).pop();

  const [postId, setPostId] = useState<string>(post._id);
  const [like, setLike] = useState<boolean>(false);
  const [likeCmt, setLikeCmt] = useState<boolean>(false);
  const [savedPost, setSavedPost] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<boolean>(false);

  const [isPreview, setIsPreview] = useState<boolean>(false);

  /**handle Post */
  const handlePost = () => {
    dispatch(setPostModalId(post._id));
    dispatch(setIsDeletePostGlobal());
  };

  /**handle Like Post */
  const handleLike = () => {
    if (like === false) {
      dispatch(likePost(post._id));
    } else {
      dispatch(unLikePost(post._id));
    }
    setLike(!like);
  };

  /**handle Save Post */
  const handleSave = () => {
    if (savedPost === false) {
      dispatch(savePost(post._id));
    } else {
      dispatch(unSavePost(post._id));
    }
    setSavedPost(!savedPost);
  };

  // handle Slide change on Video
  const handleSlideChange = (change: any) => {
    let activeSlide = document.getElementById(`postContent-${post._id}`)!.getElementsByClassName("swiper-slide")[
      change.activeIndex
    ];
    let prevSlide = document.getElementById(`postContent-${post._id}`)!.getElementsByClassName("swiper-slide")[
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
  // const handleSwiper = (swiper: any) => {
  //   console.log("fsdfsdf");
  //   let activeSlide = document.getElementById(`postContent-${post._id}`)!.getElementsByClassName("swiper-slide")[
  //     swiper.activeIndex
  //   ];
  //   let activeSlideVideo = activeSlide.getElementsByTagName("video");
  //   if (activeSlideVideo.length > 0) {
  //     activeSlideVideo[0].play();
  //   }
  // };

  /** handle Comment Start */
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(createComment({ ...values, postId })).then((response) => {
        formik.setFieldValue("content", "");
      });
    },
  });

  // handle comment keydown
  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  // handle like comment
  const handleLikeComment = (id: string) => {
    if (likeCmt === false) {
      dispatch(likeComment(id));
    } else {
      dispatch(unLikeComment(id));
    }
    setLikeCmt(!likeCmt);
  };

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    formik.values.content = formik.values.content + emojiData.emoji;
    formik.setFieldValue("content", formik.values.content);
  };

  /**useEffect */
  // show post likes
  useEffect(() => {
    if (post.likes.find((_id) => _id === user?._id)) {
      setLike(true);
    }
    return () => setLike(false);
  }, [post.likes, user?._id]);

  // show comment likes
  useEffect(() => {
    if (lastComment?.likes.find((_id) => _id === user?._id)) {
      setLikeCmt(true);
    }
    return () => setLikeCmt(false);
  }, [lastComment, user?._id]);

  useEffect(() => {
    if (userData?.saved.includes(post._id)) {
      setSavedPost(true);
    }
    return () => setSavedPost(false);
  }, [dispatch, post._id, userData?.saved]);

  return (
    <div className=" last:pb-16 mt-2 pb-2 border-b">
      <div className="relative flex items-center">
        <Link to={`/${post.user.username}`} className="flex items-center">
          <div className="mr-4">
            <img className="rounded-[50%]" height={40} width={40} src={post.user.avatar} alt={post.user.username} />
          </div>
          <span className="font-semibold">{post.user.username}</span>
        </Link>
        <div className="flex items-center ml-4">
          <div className="text-neutral-500 mr-1">•</div>
          <div className="text-neutral-500">{getTimesToWeekAgoString(post.createdAt)}</div>
        </div>
        {user?._id === post.user._id && (
          <div onClick={() => handlePost()} className="absolute right-0 cursor-pointer">
            <span>
              <UpdateIcon />
            </span>
          </div>
        )}
      </div>
      <div
        id={`postContent-${post._id}`}
        className={`${
          isPreview ? "fixed mt-0 flex top-0 left-0 w-full h-screen overflow-auto bg-black bg-opacity-90 z-50" : "mt-2"
        }`}
      >
        <button
          onClick={() => {
            setIsPreview(false);
          }}
          title="close"
          className={`${isPreview ? "inline-block" : "hidden"} absolute top-4 right-4 cursor-pointer`}
        >
          <AiOutlineClose className="w-6 h-6 fill-white" />
        </button>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          // onSwiper={(swiper: any) => handleSwiper(swiper)}
          onSlideChange={(change: any) => handleSlideChange(change)}
          className={`${
            isPreview ? "w-full h-[80vh] top-[10vh]" : "w-[468px] h-[468px] flex items-center justify-center"
          } `}
        >
          {post.medias.map((media, index) => (
            <SwiperSlide
              className={`cursor-pointer ${
                isPreview ? "w-[468px] h-[468px] left-0  mobile:left-[calc(50vw-234px)] top-[calc(50vh-350px)]" : ""
              }`}
              key={index}
              onClick={() => setIsPreview(!isPreview)}
            >
              {media.includes(".mp4") ? (
                <video width={468} height={468} autoPlay muted={!isPreview} controls={isPreview}>
                  <source src={media} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img className="rounded-sm" src={media} width={468} height={468} alt={media} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex mt-1">
        <span className="mx-1 cursor-pointer" onClick={handleLike}>
          {like ? <UnlikeIcon /> : <LikeIcon />}
        </span>
        <Link to={`/${post._id}/comments`}>
          <CommentIcon />
        </Link>
        <span className="mx-1 cursor-pointer grow">
          <ShareIcon />
        </span>
        <span className="mx-1 cursor-pointer" onClick={handleSave}>
          {savedPost ? <SaveActiveIcon /> : <SaveIcon />}
        </span>
      </div>
      <div className="mt-2 ml-3">{post.likes.length} likes</div>

      <div className="mt-2 ml-3">
        <Link to={`/`} className="">
          {post.user.username}
        </Link>{" "}
        {post.content}
      </div>
      {lastComment && (
        <div className="mt-2 ml-3">
          {filteredComments.length > 0 ? (
            <Link to={`/${post._id}/comments`} className="mb-1 cursor-pointer">
              View all <span>{filteredComments.length}</span> comments
            </Link>
          ) : null}
          <div className="mt-2 flex items-center">
            <Link to={`/`} className="mr-2">
              {lastComment.user.username}
            </Link>
            <span>{lastComment.content}</span>
            <span className="ml-2" onClick={() => handleLikeComment(lastComment._id)}>
              {likeCmt ? <UnlikeCommentIcon className="" /> : <LikeCommentIcon className="" />}
            </span>
          </div>
        </div>
      )}

      <form onKeyDown={handleKeyDown} className="w-full relative flex ml-3 mt-2">
        <div className="absolute z-10">
          <span>
            <span onClick={() => setEmoji(!emoji)}>
              <EmojiIcon />
            </span>
            {emoji ? <EmojiPicker height={500} onEmojiClick={handleEmojiClick} /> : null}
          </span>
        </div>
        <textarea
          className="w-full mx-6 text-sm"
          placeholder="Add a comment..."
          name="content"
          value={formik.values.content}
          onFocus={() => setEmoji(false)}
          onChange={formik.handleChange("content")}
        />
      </form>
    </div>
  );
};

export default Post;
