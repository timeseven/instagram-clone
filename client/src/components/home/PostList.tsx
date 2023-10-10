import React, { useState } from "react";
import PostListSkeleton from "../skeleton/PostListSkeleton";
import Post from "./Post";

type Props = {};

const PostList = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const postData = [
    {
      user: {
        _id: "",
        fullname: "",
        username: "timeseven",
        email: "",
        password: "",
        avatar: require("../../images/avatar-default.jpg"),
        role: "",
        gender: "",
        mobile: "",
        address: "",
        story: "",
        website: "",
        followers: [
          {
            _id: "",
            fullname: "",
            username: "",
            avatar: "",
            followers: [""],
            following: [""],
          },
        ],
        following: [],
        post: [""],
        saved: [""],
        token: "",
      },
      content: "I have a dream",
      images: [require("../../images/universe.jpg"), require("../../images/beach.jpeg")],
      likes: [""],
      comments: [""],
      _id: "1",
      createdAt: "",
    },
    {
      user: {
        _id: "",
        fullname: "",
        username: "timeseven",
        email: "",
        password: "",
        avatar: require("../../images/avatar-default.jpg"),
        role: "",
        gender: "",
        mobile: "",
        address: "",
        story: "",
        website: "",
        followers: [
          {
            _id: "",
            fullname: "",
            username: "",
            avatar: "",
            followers: [""],
            following: [""],
          },
        ],
        following: [],
        post: [""],
        saved: [""],
        token: "",
      },
      content: "I have a dream",
      images: [require("../../images/universe.jpg"), require("../../images/beach.jpeg")],
      likes: [""],
      comments: [""],
      _id: "2",
      createdAt: "",
    },
  ];
  return (
    <div className="max-w-[470px] flex flex-col mx-auto">
      {isLoading ? (
        <PostListSkeleton />
      ) : postData.length > 0 ? (
        postData!.map((value) => <Post post={value} key={value._id} />)
      ) : (
        <div className="">no post</div>
      )}
    </div>
  );
};

export default PostList;
