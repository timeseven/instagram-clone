import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setIsDeleteConversationGlobalFalse } from "../../redux/features/globalStateSlice";
import { useNavigate } from "react-router-dom";
import { deleteConversation } from "../../redux/features/conversationSlice";

const DeleteConversation = () => {
  const { isDeleteConversationGlobal, conversationModalId } = useSelector((state: RootState) => state.globalState);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteConversation(conversationModalId!)).then(() => {
      dispatch(setIsDeleteConversationGlobalFalse());
      navigate("/direct/inbox");
    });
  };
  return (
    <>
      {isDeleteConversationGlobal && (
        <div className="fixed flex top-0 left-0 w-full h-screen overflow-auto bg-black bg-opacity-50 z-30">
          <div className="flex flex-col items-center justify-start w-[80vw] h-[472px] m-auto min-w-[300px] max-w-[440px] bg-white rounded-md">
            <div className="w-full leading-10 py-1 px-2 flex items-center justify-center cursor-pointer">
              <button onClick={() => handleDelete()} className="font-semibold text-red-500">
                Delete
              </button>
            </div>
            {/* <div className="w-full leading-10 py-1 px-2 flex items-center justify-center cursor-pointer">
              <button>Edit</button>
            </div> */}
            <div
              onClick={() => dispatch(setIsDeleteConversationGlobalFalse())}
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

export default DeleteConversation;
