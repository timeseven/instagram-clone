import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setIsCreatePostGlobal } from "../../redux/features/globalStateSlice";

import { AiOutlineClose } from "react-icons/ai";

const CreatePost: React.FC = () => {
  const { isCreatePostGlobal } = useSelector((state: RootState) => state.globalState);
  const dispatch: AppDispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(setIsCreatePostGlobal());
  };
  return (
    <>
      {isCreatePostGlobal && (
        <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black bg-opacity-50 z-30">
          <button onClick={handleCloseModal} title="close" className="absolute top-4 right-4">
            <AiOutlineClose className="w-6 h-6 fill-white" />
          </button>
        </div>
      )}
    </>
  );
};

export default CreatePost;
