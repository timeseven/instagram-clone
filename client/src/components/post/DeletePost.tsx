import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setIsDeletePostGlobal, setIsEditPostGlobal } from "../../redux/features/globalStateSlice";
import { deletePost, getAPost } from "../../redux/features/postSlice";
import { deleteImgPost } from "../../redux/features/uploadImgSlice";
import { useNavigate } from "react-router-dom";

const DeletePost: React.FC = () => {
  const { isDeletePostGlobal, postModalId } = useSelector((state: RootState) => state.globalState);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    // delete images of post from aws first
    dispatch(getAPost(postModalId!)).then((response: any) => {
      console.log("get post id payload", response.payload);
      dispatch(deleteImgPost(response?.payload[0]?.images)).then(() => {
        // delete post from mongodb
        dispatch(deletePost(postModalId!)).then(() => {
          dispatch(setIsDeletePostGlobal());
          navigate("/");
        });
      });
    });
  };

  const handleEdit = () => {
    dispatch(setIsEditPostGlobal());
    dispatch(setIsDeletePostGlobal());
  };

  return (
    <>
      {isDeletePostGlobal && (
        <div className="fixed flex top-0 left-0 w-full h-screen overflow-auto bg-black bg-opacity-50 z-30">
          <div className="flex flex-col items-center justify-start w-[80vw] h-[472px] m-auto min-w-[300px] max-w-[440px] bg-white rounded-md">
            <div className="w-full leading-10 py-1 px-2 flex items-center justify-center cursor-pointer">
              <button onClick={() => handleDelete()} className="font-semibold text-red-500">
                Delete
              </button>
            </div>
            <div className="w-full leading-10 py-1 px-2 flex items-center justify-center cursor-pointer">
              <button onClick={() => handleEdit()}>Edit</button>
            </div>
            <div
              onClick={() => dispatch(setIsDeletePostGlobal())}
              className="w-full leading-10 py-1 px-2 mt-auto flex items-center justify-center cursor-pointer"
            >
              <button>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePost;
