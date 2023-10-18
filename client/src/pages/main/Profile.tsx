import React, { useEffect, useState } from "react";
import Helmet from "../../components/Helmet";
import InfoProfile from "../../components/profile/InfoProfile";
import PostAndSave from "../../components/profile/PostAndSave";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { getUser } from "../../redux/features/userSlice";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userData } = useSelector((state: RootState) => state.user);
  const { username } = useParams() as {
    username: string;
  };
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log("profile", username);
    dispatch(getUser(username));
    console.log(userData);
  }, [username]);
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
