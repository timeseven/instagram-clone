import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import PostListSkeleton from "../skeleton/PostListSkeleton";
import Post from "./Post";
import { getPost } from "../../redux/features/postSlice";
import { getImgPost } from "../../redux/features/uploadImgSlice";
import { getComments } from "../../redux/features/commentSlice";

type Props = {};

const PostList = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { message, data } = useSelector((state: RootState) => state.post);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log("here", message);
    dispatch(getPost()).then((response: any) => {
      let imagesData: string[] = [];
      response.payload.forEach((item: any) => {
        imagesData.push(...item.images);
      });
      dispatch(getImgPost(imagesData));
    });
    dispatch(getComments());
  }, [user, dispatch]);

  return (
    <div className="max-w-[470px] flex flex-col mx-auto">
      {isLoading ? (
        <PostListSkeleton />
      ) : data.length > 0 ? (
        data!.map((value) => <Post post={value} key={value._id} />)
      ) : (
        <div className="mt-10 mx-auto">no post</div>
      )}
    </div>
  );
};

export default PostList;
