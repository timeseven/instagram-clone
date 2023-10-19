import React, { useEffect, useState } from "react";
import { LikeCommentIcon, UnlikeCommentIcon } from "../Icons";
import { CommentProps } from "../../utils/interface";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import ReplyComment from "./ReplyComment";
import { likeComment, unLikeComment } from "../../redux/features/commentSlice";

const Comment: React.FC<CommentProps> = ({ cmt, setReplyComment, deleteComment }) => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { cData } = useSelector((state: RootState) => state.comment);
  const [onReply, setOnReply] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>(cmt._id);
  const [likeCmt, setLikeCmt] = useState<boolean>(false);

  const commentReply = cData.filter((value) => value.reply === cmt._id);

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
    if (cmt?.likes.find((_id) => _id === user?._id)) {
      setLikeCmt(true);
    }
    return () => setLikeCmt(false);
  }, [cmt]);
  return (
    <>
      {!cmt.reply && (
        <div className="h-fit flex flex-col p-4 cursor-point">
          <div className="flex w-full">
            <div className="w-[50px]">
              <img src={""} alt="user-profile" height={40} width={40} />
            </div>
            <div className="flex flex-col items-center ml-5 mr-auto">
              <div className="w-full flex mb-1 justify-start">
                <span className="min-w-[100px] mr-2 text-sm font-semibold">{cmt.user.username}</span>
                <span className="text-sm flex-wrap">{cmt.content}</span>
              </div>
              <div className="flex w-full mt-1">
                <p className="text-sm mr-4">1 day</p>
                <p className="text-sm font-semibold mr-4 cursor-pointer" onClick={() => setReplyComment(cmt)}>
                  Reply
                </p>
                {user?._id === cmt.user._id && (
                  <p className="text-sm font-semibold" onClick={() => deleteComment(cmt._id)}>
                    Delete
                  </p>
                )}
              </div>
            </div>
            <div onClick={() => handleLikeComment(cmt._id)} className="flex items-center px-2">
              {likeCmt ? <UnlikeCommentIcon className="" /> : <LikeCommentIcon className="" />}
            </div>
          </div>
          <div className="flex w-full">
            {commentReply.length > 0 && (
              <div className="flex w-full">
                {onReply ? (
                  <div className="flex flex-col w-full">
                    <div onClick={() => setOnReply(!onReply)} className="text-center relative cursor-pointer">
                      <div className="absolute w-[25px] top-3 left-[72px] border-b border-black"></div>
                      <span className="absolute left-[100px] text-sm ml-2 font-medium text-neutral-600">
                        Hide replies
                      </span>
                    </div>
                    <div className="mt-5 ml-16">
                      {commentReply.map((reply) => (
                        <ReplyComment
                          key={reply._id}
                          reply={reply}
                          setReplyComment={setReplyComment}
                          deleteComment={deleteComment}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col w-full">
                    <div onClick={() => setOnReply(!onReply)} className="text-center relative cursor-pointer">
                      <div className="absolute w-[25px] top-3 left-[72px] border-b border-black"></div>
                      <span className="absolute left-[100px] text-sm ml-2 font-medium text-neutral-600">
                        View replies({commentReply.length})
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
