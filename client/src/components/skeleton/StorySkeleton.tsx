import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StorySkeleton: React.FC = () => {
  const arrayCount = Array(6).fill(1);
  return (
    <div className="w-full flex items-center">
      {arrayCount.map((val, index) => (
        <div className="w-fit h-fit text-center ml-1 mr-5 flex flex-col items-center" key={index}>
          <div className="w-full">
            <Skeleton circle={true} height={60} width={60} />
          </div>
          <div className="w-full">
            <Skeleton />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StorySkeleton;
