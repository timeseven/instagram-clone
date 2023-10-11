import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { PostProps } from "../../utils/interface";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Post: React.FC<PostProps> = ({ post }) => {
  const [like, setLike] = useState<boolean>(false);
  const [likeCmt, setLikeCmt] = useState<boolean>(false);
  const [savedPost, setSavedPost] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<boolean>(false);
  return (
    <div className="h-fit last:pb-16 mt-2 pb-2 border-b">
      <div className="relative flex items-center">
        <Link to={`/`} className="flex items-center">
          <div className="mr-4">
            <img className="rounded-[50%]" height={40} width={40} src={post.user.avatar} alt={post.user.username} />
          </div>
          <span className="font-semibold">{post.user.username}</span>
        </Link>
        <div className="flex items-center ml-4">
          <div className="text-neutral-500 mr-1">•</div>
          <div className="text-neutral-500">14 hours ago</div>
        </div>
        <div className="absolute right-0">
          <span data-bs-toggle="dropdown" aria-expanded="false">
            <UpdateIcon />
          </span>
        </div>
      </div>
      <div className="mt-2">
        <Swiper navigation={true} modules={[Navigation]} className="flex items-center justify-center mySwiper">
          {post.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img className="w-full rounded-sm" src={image} alt={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex">
        <span>{like ? <UnlikeIcon className="mx-3" /> : <LikeIcon className="mx-3" />}</span>
        <div>
          <CommentIcon className="mr-3" />
        </div>
        <ShareIcon className="mr-3" />
        <div>
          {savedPost ? (
            <div>
              <SaveActiveIcon />
            </div>
          ) : (
            <div>
              <SaveIcon />
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 ml-3">{post.likes.length}likes</div>

      <div className="mt-2 ml-3">
        <Link to={`/`} className="">
          {post.user.username}
        </Link>{" "}
        {post.content}
      </div>
      {true && (
        <div className="mt-2 ml-3">
          {true ? (
            <div className="mb-1">
              View all <span>222</span> comments
            </div>
          ) : null}
          <div className="mt-2 flex items-center">
            <Link to={`/`} className="mr-2">
              last comment user even
            </Link>
            <span>last comment content</span>
            <span className="ml-2">
              {likeCmt ? <UnlikeCommentIcon className="" /> : <LikeCommentIcon className="" />}
            </span>
          </div>
        </div>
      )}

      <form className="w-full relative flex ml-3 mt-2">
        <div className="absolute z-10">
          <span onClick={() => setEmoji(!emoji)}>
            <EmojiIcon />
            {emoji ? <EmojiPicker height={500} /> : null}
          </span>
        </div>
        <textarea className="w-full mx-6 text-sm" placeholder="Add a comment..." />
      </form>
    </div>
  );
};

export default Post;
