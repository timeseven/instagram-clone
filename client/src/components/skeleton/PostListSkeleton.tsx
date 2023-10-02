import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import loading from "../../images/loading.gif";
const PostListSkeleton: React.FC = () => {
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <img src={loading} alt={loading} height={30} width={30} />
      </div>
      <div className="w-full flex justify-start">
        <Skeleton circle={true} height={50} width={50} />
        <Skeleton height={20} width={100} className="ms-3 mt-3" />
      </div>
      <Skeleton height={360} width={480} className="mt-3" />
    </>
  );
};

export default PostListSkeleton;
