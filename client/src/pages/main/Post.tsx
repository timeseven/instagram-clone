import React, { useEffect } from "react";
import Helmet from "../../components/Helmet";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import PostBox from "../../components/home/Post";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getAPost } from "../../redux/features/postSlice";

const Post: React.FC = () => {
  const { pData } = useSelector((state: RootState) => state.post);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams() as {
    id: string;
  };

  useEffect(() => {
    dispatch(getAPost(id));
  }, [id]);
  return (
    <Helmet title="Comments">
      <div className="fixed w-full h-screen top-0 left-0 bg-white z-50 overflow-auto tablet:left-[72px] desktop:left-[245px] desktop-lg:left-[335px]">
        <div className="w-full h-[60px] fixed items-center justify-center top-0 flex z-30 bg-white">
          <div onClick={() => navigate(-1)} className="flex mx-3">
            <AiOutlineLeft className="w-7 h-7" />
          </div>
          <div className="w-full flex justify-center text-lg font-semibold tablet:justify-start">Post</div>
        </div>
        <div
          className={
            "top-[120px] h-[calc(100vh-120px)] flex flex-col w-full left-0 fixed p-2 overflow-y-scroll tablet:left-[72px] tablet:max-w-[calc(100vw-72px)] desktop:left-[245px] desktop:max-w-[calc(100vw-245px)] desktop-lg:left-[335px] desktop-lg:max-w-[calc(100vw-335px)]"
          }
        >
          {pData!.map((value) => (
            <div className="w-full max-w-[500px] mx-auto">
              <PostBox post={value} key={value._id} />
            </div>
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Post;
