import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import { AiOutlineClose } from "react-icons/ai";
import { setIsAvatarEditGlobalFalse } from "../../redux/features/globalStateSlice";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { AvatarProps } from "../../utils/interface";

const UploadAvatar: React.FC<AvatarProps> = ({ confirmAvatar }) => {
  const [src, setSrc] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const handleClose = () => {
    dispatch(setIsAvatarEditGlobalFalse());
    setPreview("");
  };
  const onClose = () => {
    setPreview("");
  };

  const onCrop = (view: string) => {
    setPreview(view);
  };
  return (
    <div className="fixed flex top-0 left-0 w-full h-screen overflow-auto bg-black bg-opacity-50 z-50">
      <button onClick={() => handleClose()} title="close" className="absolute top-4 right-4">
        <AiOutlineClose className="w-6 h-6 fill-white" />
      </button>
      <div className="flex flex-col items-center justify-start w-[80vw] h-[80vh] m-auto min-w-[300px] max-w-[440px] bg-white rounded-md">
        <div>
          <Avatar width={390} height={295} onCrop={onCrop} onClose={onClose} src={src} />
        </div>

        <div className="flex flex-col grow m-auto my-1">
          {preview ? <img className="my-auto" src={preview} alt="Preview" /> : <div className="my-auto">No avatar</div>}
        </div>

        <div className="flex w-full mt-auto mx-auto grow">
          <button
            type="button"
            onClick={() => confirmAvatar(preview)}
            className="bg-sky-500 w-full h-[40px] max-w-[200px] m-auto font-semibold text-white border border-none rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadAvatar;
