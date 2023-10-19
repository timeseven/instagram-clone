import React, { useEffect, useState } from "react";
import { ReplyCommentProps } from "../../utils/interface";
import { LikeCommentIcon, UnlikeCommentIcon } from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { likeComment, unLikeComment } from "../../redux/features/commentSlice";

const ReplyComment: React.FC<ReplyCommentProps> = ({ reply, setReplyComment, deleteComment }) => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [likeCmt, setLikeCmt] = useState<boolean>(false);
  // handle like comment
  const handleLikeComment = (id: string) => {
    if (likeCmt === false) {
      dispatch(likeComment(id));
    } else {
      dispatch(unLikeComment(id));
    }
    setLikeCmt(!likeCmt);
  };

  // show comment likes
  useEffect(() => {
    if (reply?.likes.find((_id) => _id === user?._id)) {
      setLikeCmt(true);
    }
    return () => setLikeCmt(false);
  }, [reply]);

  useEffect(() => {
    console.log("comment reply", reply);
  }, []);
  return (
    <div className="flex w-full h-fit mt-3">
      <div className="w-[50px]">
        <img src={""} alt="user-profile" height={40} width={40} />
      </div>
      <div className="flex flex-col items-center ml-5 mr-auto">
        <div className="flex mb-1">
          <span className="mr-2 text-sm font-semibold">{reply.user.username}</span>
          <span className="text-sm flex-wrap">{reply.content}</span>
        </div>
        <div className="flex w-full mt-1">
          <p className="text-sm mr-4">1 day</p>
          <p className="text-sm font-semibold mr-4 cursor-pointer" onClick={() => setReplyComment(reply)}>
            Reply
          </p>
          {user?._id === reply.user._id && (
            <p className="text-sm font-semibold" onClick={() => deleteComment(reply._id)}>
              Delete
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center px-2" onClick={() => handleLikeComment(reply._id)}>
        {likeCmt ? <UnlikeCommentIcon className="" /> : <LikeCommentIcon className="" />}
      </div>
    </div>
  );
};

export default ReplyComment;
