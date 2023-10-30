import React, { useEffect } from "react";
import Helmet from "../../components/Helmet";
import InfoProfile from "../../components/profile/InfoProfile";
import PostAndSave from "../../components/profile/PostAndSave";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useParams } from "react-router-dom";
import { getUser } from "../../redux/features/userSlice";

const Profile: React.FC = () => {
  const { username } = useParams() as {
    username: string;
  };
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(username));
  }, [dispatch, username]);
  return (
    <Helmet title={`Profile • Instagram photos and videos`}>
      <div
        className="w-full h-full flex flex-col mx-auto mb-8 grow                      
                   tablet:w-[calc(100vw-72px)] tablet:mr-0
                   desktop:w-[calc(100vw-245px)] 
                   desktop-lg:w-[calc(100vw-335px)]"
      >
        <div className="w-full max-w-[936px] mx-auto">
          <InfoProfile />
          <PostAndSave />
        </div>
      </div>
    </Helmet>
  );
};

export default Profile;
