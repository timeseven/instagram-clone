import React, { useState } from "react";
import StorySkeleton from "../skeleton/StorySkeleton";
import { FaUserAlt } from "react-icons/fa";

type Props = {};

const StoryList = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const allUsers = [
    {
      media: "",
      user: {
        avatar: require("../../images/story-avatar1.png"),
        username: "hanah",
      },
    },
    {
      media: "",
      user: {
        avatar: require("../../images/story-avatar2.png"),
        username: "victoria",
      },
    },
    {
      media: "",
      user: {
        avatar: require("../../images/story-avatar3.png"),
        username: "brad",
      },
    },
  ];
  return (
    <div className="w-full h-fit flex">
      {false ? (
        <StorySkeleton />
      ) : (
        allUsers.map((users, index) => (
          <div className="w-fit h-fit text-center ml-1 mr-4 flex flex-col items-center" key={index}>
            <div className="w-[60px] h-[60px] rounded-[50%]">
              <img src={users.user.avatar} alt={`user-avatar=${users.user.username}`} />
            </div>
            <div className="w-full">{users.user.username}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default StoryList;
