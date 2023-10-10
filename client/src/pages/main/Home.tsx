import React from "react";
import Helmet from "../../components/Helmet";
import PostList from "../../components/home/PostList";
import StoryList from "../../components/home/StoryList";
import SuggesstionUser from "../../components/home/SuggesstionUser";

const Home: React.FC = () => {
  return (
    <Helmet title="Instagram">
      <div
        className="w-full h-[calc(100vh-108px)] top-[60px] pt-1 mx-auto flex justify-center 
                   tablet:mt-0 tablet:w-[calc(100vw-72px)] tablet:h-screen tablet:mr-0
                   desktop:w-[calc(100vw-245px)] desktop-lg:w-[calc(100vw-335px)]"
      >
        <div
          className="w-full flex flex-col items-center max-w-[630px]
                        desktop-sm:mr-16"
        >
          <div
            className="w-full py-4 mt-5 flex 
                       tablet:h-[101px] tablet:mt-10 tablet:items-center tablet:justify-start"
          >
            <StoryList />
          </div>
          <div className="w-full mt-2">
            <PostList />
          </div>
        </div>
        <div
          className="w-full max-w-[319px] pt-[30px] hidden 
                     desktop-sm:inline-block"
        >
          <SuggesstionUser />
        </div>
      </div>
    </Helmet>
  );
};
export default Home;
