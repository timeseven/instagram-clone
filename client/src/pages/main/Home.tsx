import React from "react";
import Helmet from "../../components/Helmet";
import PostList from "../../components/home/PostList";
import StoryList from "../../components/home/StoryList";
import SuggesstionUser from "../../components/home/SuggesstionUser";

const Home: React.FC = () => {
  return (
    <Helmet title="Instagram">
      <div
        className="w-full h-screen pt-1 mx-auto flex justify-center
                   tablet:mt-0 tablet:pt-0 tablet:w-[calc(100vw-72px)] tablet:mr-0"
      >
        <div
          className="w-full flex flex-col items-center max-w-[630px] h-[585px]
                        desktop-sm:mr-16"
        >
          <div
            className="w-full py-4 mt-5 flex 
                       tablet:h-[101px] tablet:mt-10 tablet:items-center tablet:justify-start"
          >
            <StoryList />
          </div>
          <div className="w-full mt-2 h-fit">
            <PostList />
          </div>
        </div>
        <div
          className="w-full max-w-[319px] hidden 
                     desktop-sm:inline-block"
        >
          <SuggesstionUser />
        </div>
      </div>
    </Helmet>
  );
};
export default Home;
