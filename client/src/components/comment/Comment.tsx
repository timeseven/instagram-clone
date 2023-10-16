import React, { useState } from "react";
import { LikeCommentIcon, UnlikeCommentIcon } from "../Icons";
import { CommentProps } from "../../utils/interface";

const Comment: React.FC<CommentProps> = ({ cmt }) => {
  const [postId, setPostId] = useState<string>(cmt._id);
  const [likeCmt, setLikeCmt] = useState<boolean>(false);
  return (
    <>
      <div className="flex">
        <div></div>
        <div className="ml-2">{likeCmt ? <UnlikeCommentIcon className="" /> : <LikeCommentIcon className="" />}</div>
      </div>
    </>
  );
};

export default Comment;
