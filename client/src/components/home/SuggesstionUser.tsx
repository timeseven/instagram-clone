import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SuggestionUserSkeleton from "../skeleton/SuggestionUserSkeleton";
import Footer from "../../layouts/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getSuggestionUser } from "../../redux/features/suggestionUserSlice";
import { follow, unFollow } from "../../redux/features/authSlice";

const SuggesstionUser: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { sUser, message } = useSelector((state: RootState) => state.suggestionUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();

  // follow user
  const handleFollow = (id: string) => {
    dispatch(follow(id));
  };

  // unfollow user
  const handleUnFollow = (id: string) => {
    dispatch(unFollow(id));
  };

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(getSuggestionUser());
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (message === "user/get-suggestion-user success") {
      setIsLoading(false);
    }
  }, [message]);

  return (
    <div>
      <div className="h-[66px] mt-[16px] mb-[10px] flex items-center justify-between">
        <Link to={`/`} className="w-full mr-1 flex items-center justify-between overflow-y-visible">
          <div>
            <img src={user!.avatar} height={56} width={56} alt={user!.username} />
          </div>
          <div className="flex flex-col grow">
            <span className="ml-3 leading-[18px] font-semibold">{user!.username}</span>
            <span className="ml-3 leading-[18px] text-neutral-500">{user!.fullname}</span>
          </div>
          {/* <button className="text-blue-400 font-semibold">Switch</button> */}
        </Link>
      </div>
      <div className="mb-3 -ml-4 w-[calc(100%+32px)] flex flex-col">
        <div className="px-[16px] flex justify-between">
          <div className="text-neutral-500 font-semibold text-sm">Suggestions for you</div>
          <button className="font-semibold text-sm">See All</button>
        </div>
        {isLoading ? (
          <div className="ml-1 mb-1">
            <SuggestionUserSkeleton />
          </div>
        ) : sUser !== null ? (
          sUser.map((suggestion) => (
            <div className="flex ml-1 mb-1 py-2" key={suggestion._id}>
              <Link to={`/${suggestion.username}`} className="py-2 px-4 flex items-center mr-auto">
                <div className="">
                  <img src={suggestion.avatar} alt={suggestion.username} height={32} width={32} />
                </div>
                <div className="grow flex flex-col">
                  <span className="ml-3 text-[15px] leading-[18px] font-semibold">{suggestion.username}</span>
                  <span className="ml-3 text-[15px] leading-[18px] text-neutral-500">{suggestion.fullname}</span>
                </div>
              </Link>
              {user!.following.find((obj) => obj._id === suggestion._id) ? (
                <button onClick={() => handleUnFollow(suggestion._id)} className="text-blue-400 font-semibold">
                  unFollow
                </button>
              ) : (
                <button onClick={() => handleFollow(suggestion._id)} className="text-blue-400 font-semibold">
                  Follow
                </button>
              )}
            </div>
          ))
        ) : null}
      </div>
      <div className="mb-3 -ml-4 w-[calc(100%+32px)]">
        <Footer />
      </div>
    </div>
  );
};

export default SuggesstionUser;
