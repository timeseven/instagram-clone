import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SuggestionUserSkeleton: React.FC = () => {
  const arrayCount = Array(5).fill(1);

  return (
    <>
      {arrayCount.map((val, index) => (
        <div className="py-2 px-4 flex items-center" key={index}>
          <Skeleton circle={true} height={32} width={32} />
          <div className="ml-2">
            <Skeleton height={8} width={100} />
            <Skeleton height={8} width={100} />
          </div>
        </div>
      ))}
    </>
  );
};

export default SuggestionUserSkeleton;
