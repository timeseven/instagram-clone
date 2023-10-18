import React, { useEffect, useState } from "react";
import { PostsIcon, SavedIcon } from "../Icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getSavePost, getUserPost } from "../../redux/features/postSlice";
import { getImgPost } from "../../redux/features/uploadImgSlice";

const PostAndSave = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { pData } = useSelector((state: RootState) => state.post);
  const { imgObj } = useSelector((state: RootState) => state.upload);
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<number>(1);
  const { username } = useParams() as {
    username: string;
  };

  const profileItems = [
    {
      key: 1,
      name: "POSTS",
    },
    {
      key: 2,
      name: "SAVED",
    },
  ];

  const handleClick = (key: number) => {
    setIsSelected(key);
  };

  const getPostData = () => {
    dispatch(getUserPost(username)).then((response) => {
      let imagesData: string[] = [];
      response.payload.forEach((item: any) => {
        imagesData.push(...item.images);
      });
      dispatch(getImgPost(imagesData));
    });
  };

  const getSaveData = () => {
    dispatch(getSavePost(username)).then((response) => {
      let imagesData: string[] = [];
      response.payload.forEach((item: any) => {
        imagesData.push(...item.images);
      });
      dispatch(getImgPost(imagesData));
    });
  };

  useEffect(() => {
    setIsEditEnabled(user?.username === username);
  }, [username]);

  useEffect(() => {
    switch (isSelected) {
      case 1:
        getPostData();
        break;
      case 2:
        getSaveData();
        break;
      default:
        break;
    }
  }, [isSelected]);

  return (
    <div className="flex flex-col h-full justify-around items-center border-t border-solid border-neutral-300">
      <div className="flex">
        {profileItems.map((item) => (
          <div
            key={item.key}
            className={`${
              isEditEnabled
                ? ["w-1/2 justify-end", "w-1/2 justify-start"][item.key - 1]
                : ["w-full justify-center", "hidden"][item.key - 1]
            } h-[44px] flex items-center cursor-pointer mx-5 `}
          >
            <div
              onClick={() => handleClick(item.key)}
              className={`flex items-center h-[44px] ${
                isSelected === item.key ? "border-t" : "border-none"
              } border-black`}
            >
              {
                [
                  <PostsIcon className="w-[24px] h-[24px] tablet-sm:w-[12px] tablet-sm:h-[12px]" />,
                  <SavedIcon className="w-[24px] h-[24px] tablet-sm:w-[12px] tablet-sm:h-[12px]" />,
                ][item.key - 1]
              }
              <span className="text-[#8e8e8e] text-xs letter ml-2 tracking-widest leading-4 uppercase hidden tablet-sm:inline-block">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      {pData.length > 0 ? (
        <div className="grow">
          <div className="grid grid-cols-3 grid-flow-row gap-1">
            {pData.map((item) => (
              <img
                className="w-full h-full"
                src={`${imgObj[item.images[0] as keyof typeof imgObj]}`}
                key={item.images[0]}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center grow">No post</div>
      )}
    </div>
  );
};

export default PostAndSave;
