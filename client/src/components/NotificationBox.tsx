import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { follow, unFollow } from "../redux/features/authSlice";
import {
  createNotification,
  deleteNotification,
  getNotification,
  isReadNotification,
} from "../redux/features/notificationSlice";
import { setIsNotificationGlobalFalse } from "../redux/features/globalStateSlice";

const NotificationBox: React.FC = () => {
  const { isNotificationGlobal } = useSelector((state: RootState) => state.globalState);
  const { nData } = useSelector((state: RootState) => state.notification);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  // follow user
  const handleFollow = (id: string) => {
    dispatch(follow(id)).then(() => {
      dispatch(
        createNotification({
          id: id,
          recipients: [id],
          images: "",
          url: "",
          content: `has started to follow you.`,
          user: user!._id,
        })
      );
    });
  };

  // unfollow user
  const handleUnFollow = (id: string) => {
    dispatch(unFollow(id)).then(() => {
      dispatch(deleteNotification(id));
    });
  };

  // handle is read
  const handleIsRead = (id: string) => {
    dispatch(setIsNotificationGlobalFalse());
    dispatch(isReadNotification(id));
  };

  useEffect(() => {
    if (isNotificationGlobal) {
      dispatch(getNotification());
    }
  }, [dispatch, isNotificationGlobal]);

  return (
    <>
      <div
        className={`fixed top-[58px] left-[calc(((100vw-375px)/2)+((100vw-375px)/3))] z-40 bg-white rounded-md 
                transition-[height] duration-300 tablet:transition-[width,left] tablet:duration-300
                ${
                  isNotificationGlobal
                    ? "w-[375px] h-[60vh] desktop:left-[72px] desktop-lg:left-[72px] shadow-[0_0_6px_4px_rgba(0,0,0,0.1)] tablet:shadow-[2px_0_4px_2px_rgba(0,0,0,0.1)] "
                    : "w-0 h-0 desktop:left-[245px] desktop-lg:left-[335px]"
                } tablet:h-screen tablet:left-[72px] tablet:top-0 tablet:rounded-none tablet:rounded-r-2xl`}
      >
        {isNotificationGlobal && (
          <div className="flex flex-col h-full">
            <div className="relative tablet:hidden">
              <span className="absolute right-0 -top-2 bg-white border w-[30px] h-[30px] search-input-angle px-4"></span>
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="ml-2 mt-3 text-2xl font-semibold">Notification</div>
              <div className="ml-2 py-2 font-semibold">Earlier</div>
              {nData.length !== 0 &&
                nData.map((notif) => (
                  <div key={notif._id} className="flex relative mb-3 ml-2">
                    <Link
                      to={`/${notif.user.username}`}
                      className="w-11 h-11 rounded-full mr-3"
                      onClick={() => handleIsRead(notif._id)}
                    >
                      <img src={notif.user.avatar} alt={notif.user.username} />
                    </Link>
                    <div className="w-56 inline break-words">
                      <Link onClick={() => handleIsRead(notif._id)} to={notif.url} className="font-medium mr-1">
                        {notif.user.username}
                      </Link>
                      <span>{notif.content}</span>
                    </div>
                    {notif.images === "" ? (
                      <>
                        {user!.following.find((obj) => obj._id === notif.user._id) ? (
                          <button
                            onClick={() => handleUnFollow(notif.user._id)}
                            className="text-blue-400 font-semibold"
                          >
                            unFollow
                          </button>
                        ) : (
                          <button onClick={() => handleFollow(notif.user._id)} className="text-blue-400 font-semibold">
                            Follow
                          </button>
                        )}
                      </>
                    ) : (
                      <Link
                        onClick={() => handleIsRead(notif._id)}
                        to={notif.url}
                        className="absolute right-6 w-11 h-11 mr-2"
                      >
                        {notif.images.includes(".mp4") ? (
                          <video muted>
                            <source className="object-fill" src={notif.images} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img src={notif.images} alt={notif.images} />
                        )}
                      </Link>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationBox;
