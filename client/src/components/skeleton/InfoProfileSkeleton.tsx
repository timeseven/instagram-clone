import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Loading skeleton for profile info
const InfoProfileSkeleton: React.FC = () => {
  return (
    <>
      <div className="flex">
        <Skeleton circle={true} height={144} width={144} className="mr-24" />
        <div>
          <div className="flex mb-5">
            <Skeleton height={30} width={100} className="me-3" />
            <Skeleton height={30} width={100} className="me-3" />
          </div>
          <div className="flex mb-5">
            <Skeleton height={20} width={100} className="me-3" />
            <Skeleton height={20} width={100} className="me-3" />
            <Skeleton height={20} width={100} className="me-3" />
          </div>
          <div className="flex">
            <Skeleton height={20} width={100} className="me-3" />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoProfileSkeleton;
