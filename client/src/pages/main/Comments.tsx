import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Helmet from "../../components/Helmet";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../components/comment/Comment";
import { LikeCommentIcon, UnlikeCommentIcon } from "../../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAPost } from "../../redux/features/postSlice";
import { IComment, IPost } from "../../utils/interface";
import { createComment, deleteComment, getCommentsByPost } from "../../redux/features/commentSlice";
import { getTimesToWeekAgoString } from "../../utils/Times";

let schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});

const Comments: React.FC = () => {
  const { cData } = useSelector((state: RootState) => state.comment);
  const { user } = useSelector((state: RootState) => state.auth);
  const [postData, setPostData] = useState<IPost>();
  const [commentData, setCommentData] = useState<IComment[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [reply, setReply] = useState("");
  const [replyId, setReplyId] = useState("");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams() as {
    id: string;
  };

  /** handle Comment Start */
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (replyId !== "") {
        await dispatch(createComment({ ...values, postId: id, reply: replyId })).then(() => {
          clearReply();
          dispatch(getCommentsByPost(id)).then((response: any) => {
            setCommentData(response.payload);
          });
        });
      } else {
        await dispatch(createComment({ ...values, postId: id })).then(() => {
          clearReply();
          dispatch(getCommentsByPost(id)).then((response: any) => {
            setCommentData(response.payload);
          });
        });
      }
    },
  });

  // handle reply comment
  const setReplyComment = (values: IComment) => {
    formik.setFieldValue("content", `@${values.user.username} `);
    setReply(values.user.username);
    setReplyId(values.reply || values._id); // set second layer or above reply comment under the parent comment id(the reply id of first layer reply comment).
  };

  // clear reply
  const clearReply = () => {
    formik.setFieldValue("content", "");
    setReply("");
    setReplyId("");
  };
  const handleDeleteComment = (cId: string) => {
    dispatch(deleteComment(cId));
    dispatch(getCommentsByPost(id)).then((response: any) => {
      setCommentData(response.payload);
    });
  };

  useEffect(() => {
    dispatch(getAPost(id)).then((response: any) => {
      setPostData(response?.payload[0]);
    });
    dispatch(getCommentsByPost(id)).then((response: any) => {
      setCommentData(response.payload);
    });
  }, []);

  useEffect(() => {
    if (formik.values.content !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [formik.values.content]);
  return (
    <Helmet title="Comments">
      <div className="fixed w-full h-screen top-0 left-0 bg-white z-40 overflow-auto tablet:left-[72px] desktop:left-[245px] desktop-lg:left-[335px]">
        <div className="w-full h-[60px] fixed items-center justify-center top-0 flex  bg-white">
          <div onClick={() => navigate(-1)} className="flex mx-3 cursor-pointer">
            <AiOutlineLeft className="w-7 h-7" />
          </div>
          <div className="w-full flex justify-center text-lg font-semibold tablet:justify-start">Comments</div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full h-[60px] fixed items-center justify-start top-[60px] flex z-30 bg-neutral-200"
        >
          <div
            className="flex w-full items-center left-0 fixed p-6
      tablet:left-[72px] tablet:max-w-[calc(100vw-72px)]
      desktop:left-[245px] desktop:max-w-[calc(100vw-245px)]
      desktop-lg:left-[335px] desktop-lg:max-w-[calc(100vw-335px)]"
          >
            <div className="w-[50px]">
              <img src={user?.avatar} alt="user-profile" height={40} width={40} />
            </div>
            <div className="relative w-full ml-5">
              <input
                value={formik.values.content}
                onChange={formik.handleChange("content")}
                placeholder="Add a comment..."
                className="w-full h-[40px] p-4 rounded-full pr-12"
              />
              <button
                type="submit"
                disabled={!isActive}
                className={`absolute ${
                  isActive ? "text-sky-500" : "text-sky-300"
                } font-semibold right-2 top-2 cursor-pointer`}
              >
                Send
              </button>
            </div>
          </div>
        </form>
        {reply !== "" && (
          <div className="w-full h-[40px] border border-neutral-300 fixed items-center justify-start top-[120px] flex z-30 bg-neutral-200">
            <div className="flex w-full items-center left-0 fixed p-6 tablet:left-[72px] tablet:max-w-[calc(100vw-72px)] desktop:left-[245px] desktop:max-w-[calc(100vw-245px)] desktop-lg:left-[335px] desktop-lg:max-w-[calc(100vw-335px)]">
              <div className="relative w-full">
                <p className=" text-neutral-500">Reply to {reply}</p>
                <AiOutlineClose
                  onClick={() => clearReply()}
                  className="w-6 h-6 fill-black absolute font-semibold right-2 top-[2px] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
        <div
          className={`${
            reply !== "" ? "top-[160px] h-[calc(100vh-160px)]" : "top-[120px] h-[calc(100vh-120px)]"
          } flex flex-col w-full h-full left-0 fixed p-2 overflow-y-scroll tablet:left-[72px] tablet:max-w-[calc(100vw-72px)] desktop:left-[245px] desktop:max-w-[calc(100vw-245px)] desktop-lg:left-[335px] desktop-lg:max-w-[calc(100vw-335px)]`}
        >
          <div className="h-fit flex p-4 cursor-point hover:bg-neutral-100">
            <div className="flex w-full">
              <div className="w-[50px]">
                <img src={postData?.user.avatar} alt="user-profile" height={40} width={40} />
              </div>
              <div className="flex flex-col items-center justify-start ml-5">
                <div className="flex w-full mb-1">
                  <span className="mr-2 text-sm font-semibold">{postData?.user.username}</span>
                  <span className="text-sm flex-wrap">{postData?.content}</span>
                </div>
                <div className="flex w-full mt-1">
                  <p className="text-sm mr-4">{getTimesToWeekAgoString(postData?.createdAt!)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t">
            {commentData &&
              commentData?.map((cmt) => (
                <Comment
                  key={cmt._id}
                  cmt={cmt}
                  setReplyComment={setReplyComment}
                  deleteComment={handleDeleteComment}
                />
              ))}
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Comments;
