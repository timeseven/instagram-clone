import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Loading skeleton for profile info
const InfoProfileSkeleton: React.FC = () => {
  return (
    <>
      <div className="flex mt-4 mx-4 mb-6 flex-col tablet-sm:hidden">
        <div className="flex">
          <Skeleton circle={true} height={77} width={77} className="mr-7" />
          <div className="flex flex-col justify-between">
            <div className="flex">
              <Skeleton height={30} width={250} className="me-3" />
            </div>
            <div className="flex">
              <Skeleton height={30} width={250} className="me-3" />
            </div>
          </div>
        </div>
        <div className="py-5">
          <Skeleton height={30} width={250} className="me-3" />
        </div>
      </div>
      <div className="w-full hidden tablet-sm:inline-block">
        <div className="w-full flex px-[30px] pt-[32px] mb-[44px] flex-col ">
          <div className="w-full flex">
            <div className="flex mr-[30px]">
              <Skeleton circle={true} height={150} width={150} className="mx-[31px]" />
            </div>
            <div className="flex flex-col justify-between grow">
              <div className="flex grow">
                <Skeleton height={30} width={250} className="me-3" />
              </div>
              <div className="flex grow">
                <Skeleton height={30} width={250} className="me-3" />
              </div>
              <div className="flex grow">
                <Skeleton height={30} width={250} className="me-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoProfileSkeleton;
