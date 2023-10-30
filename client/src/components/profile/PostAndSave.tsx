import React, { useEffect, useState } from "react";
import { PostsIcon, SavedIcon } from "../Icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getSavePost, getUserPost } from "../../redux/features/postSlice";

const PostAndSave = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { pData } = useSelector((state: RootState) => state.post);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);
    dispatch(getUserPost(username)).then(() => {
      setIsLoading(false);
    });
  };

  const getSaveData = () => {
    setIsLoading(true);
    dispatch(getSavePost(username)).then(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsEditEnabled(user?.username === username);
  }, [username, user?.username]);

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
      {!isLoading && pData.length > 0 ? (
        <div className="grow">
          <div className="grid grid-cols-3 grid-flow-row gap-1">
            {pData.map((item) => (
              <span
                className="cursor-pointer"
                key={item._id}
                onClick={() => {
                  navigate(`/${item.user.username}/${item._id}`);
                }}
              >
                {item.medias[0].includes(".mp4") ? (
                  <video className="aspect-square" width="468" height="468" key={item.medias[0]} autoPlay muted>
                    <source src={item.medias[0]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    className="aspect-square"
                    width={468}
                    height={468}
                    src={item.medias[0]}
                    alt={item.medias[0]}
                    key={item.medias[0]}
                  />
                )}
              </span>
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
