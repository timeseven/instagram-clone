import React from "react";
import Helmet from "../../components/Helmet";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Comment from "../../components/comment/Comment";
type Props = {};

const Comments = (props: Props) => {
  const navigate = useNavigate();
  const comment = {
    _id: "",
    postId: "string",
    content: "string",
    tag: [],
    reply: "",
    likes: [],
    user: {
      _id: "",
      fullname: "",
      username: "",
      email: "",
      password: "",
      avatar: "",
      role: "",
      gender: "",
      mobile: "",
      address: "",
      story: "",
      website: "",
      followers: [],
      following: [],
      post: [],
      saved: [],
      token: "",
    },
    createdAt: "",
  };
  return (
    <Helmet title="Comments">
      <div
        className="w-full h-[calc(100vh-108px)] top-[60px] pt-1 mx-auto flex justify-center 
                   tablet:mt-0 tablet:w-[calc(100vw-72px)] tablet:h-screen tablet:mr-0
                   desktop:w-[calc(100vw-245px)] desktop-lg:w-[calc(100vw-335px)]"
      >
        <div className="w-full h-[60px] fixed items-center justify-center top-0 right-0 flex z-30 bg-white tablet:hidden">
          <div className="flex mx-3" onClick={() => navigate(-1)}>
            <AiOutlineLeft className="w-7 h-7" />
          </div>
          <div className="flex grow justify-center text-lg font-semibold mr-6">Comments</div>
        </div>
        <div>
          <div>search</div>
          <div>post</div>
          <Comment cmt={comment} />
        </div>
      </div>
    </Helmet>
  );
};

export default Comments;
