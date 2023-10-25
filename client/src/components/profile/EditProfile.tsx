import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AiOutlineLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { editUser } from "../../redux/features/authSlice";
import { getUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import avatar from "../../images/avatar-default.jpg";
import UploadAvatar from "./UploadAvatar";
import { setIsAvatarEditGlobalFalse, setIsAvatarEditGlobalTrue } from "../../redux/features/globalStateSlice";
type EditProfileProps = {
  setOnEdit: (value: boolean) => void;
};
let schema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  fullname: yup.string().required("Fullname is Required"),
  mobile: yup.string(),
  address: yup.string(),
  website: yup.string(),
  story: yup.string(),
  gender: yup.string().required("Gender is Required"),
});

const EditProfile: React.FC<EditProfileProps> = ({ setOnEdit }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { isAvatarEditGlobal } = useSelector((state: RootState) => state.globalState);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [avatarPre, setAvatarPre] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleBack = () => {
    setOnEdit(false);
  };
  const formik = useFormik({
    initialValues: {
      avatar: user?.avatar || avatar,
      username: user?.username || "",
      fullname: user?.fullname || "",
      mobile: user?.mobile || "",
      address: user?.address || "",
      website: user?.website || "",
      story: user?.story || "",
      gender: user?.gender || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("edit profile", values);
      dispatch(editUser({ ...values })).then(() => {
        dispatch(getUser(values.username));
        navigate(`/${values.username}`);
        setOnEdit(false);
      });
    },
  });

  const confirmAvatar = (avatar: string) => {
    dispatch(setIsAvatarEditGlobalFalse());
    formik.setFieldValue("avatar", avatar);
    console.log(avatar, "xxx");
  };

  useEffect(() => {
    if (formik.values.username.length > 0 && formik.values.fullname.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [formik.values.username.length, formik.values.fullname.length]);
  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-white z-40 overflow-auto tablet:left-[72px] desktop:left-[245px] desktop-lg:left-[335px]">
      <div className="w-full h-[60px] fixed items-center justify-center top-0 flex  bg-white">
        <div className="flex mx-3" onClick={() => handleBack()}>
          <AiOutlineLeft className="w-7 h-7" />
        </div>
        <div className="w-full flex justify-center text-lg font-semibold tablet:justify-start">Edit Profile</div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full max-w-[600px] left-[calc((100vw-600px)/2] fixed top-[60px] p-10
      tablet:left-[calc(72px+(100vw-72px-600px)/2)]
      desktop:left-[calc(245px+(100vw-245px-600px)/2)]
      desktop-lg:left-[calc(335px+(100vw-335px-600px)/2)]"
      >
        <div className="flex w-full">
          <div className="w-16 h-16 border rounded-[50%] cursor-pointer overflow-hidden">
            <img src={formik.values.avatar} alt="avatar" title="Change profile photo" />
          </div>
          <div className="ml-4 flex flex-col items-center justify-center">
            <div className="w-full h-full flex items-center">username</div>
            <span className="h-full flex bg-white text-blue-600 text-sm font-semibold grow">
              <p onClick={() => dispatch(setIsAvatarEditGlobalTrue())} role="button" className="flex items-center">
                Change profile photo
              </p>
              {isAvatarEditGlobal && <UploadAvatar confirmAvatar={confirmAvatar} />}
              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                className="hidden"
                // ref={ref}
                // onChange={changeAvatar}
              />
            </span>
          </div>
        </div>
        <div className="flex h-[40px] items-center my-4">
          <label className="w-[100px] font-semibold" htmlFor="username">
            Username
          </label>
          <div className="w-[200px]">
            <input
              type="text"
              name="username"
              maxLength={25}
              className="p-1 mx-2 border rounded-md"
              onChange={formik.handleChange("username")}
              value={formik.values.username}
            />
          </div>
          <span className="flex justify-center grow">{formik.values.username.length}/25</span>
          {/* <div className="mt-2" style={{ color: "red" }}>
            {formik.touched.username && formik.errors.username}
          </div> */}
        </div>
        <div className="flex h-[40px] items-center my-4">
          <label className="w-[100px] font-semibold" htmlFor="fullname">
            Fullname
          </label>
          <div className="w-[200px]">
            <input
              type="text"
              name="fullname"
              maxLength={25}
              className="p-1 mx-2 border rounded-md"
              onChange={formik.handleChange("fullname")}
              value={formik.values.fullname}
            />
          </div>
          <span className="flex justify-center grow">{formik.values.fullname.length}/25</span>
          {/* <div className="mt-2" style={{ color: "red" }}>
            {formik.touched.username && formik.errors.username}
          </div> */}
        </div>
        <div className="flex h-[40px] items-center my-4">
          <label className="w-[100px] font-semibold" htmlFor="mobile">
            Mobile
          </label>
          <div className="w-[250px] p-2 grow">
            <input
              type="text"
              name="mobile"
              className="w-full p-1 border rounded-md"
              onChange={formik.handleChange("mobile")}
              value={formik.values.mobile}
            />
          </div>
        </div>
        <div className="flex h-[40px] items-center my-4">
          <label className="w-[100px] font-semibold" htmlFor="address">
            Address
          </label>
          <div className="w-[250px] p-2 grow">
            <input
              type="text"
              name="address"
              className="w-full p-1 border rounded-md"
              onChange={formik.handleChange("address")}
              value={formik.values.address}
            />
          </div>
        </div>
        <div className="flex h-[40px] items-center my-4">
          <label className="w-[100px] font-semibold" htmlFor="website">
            Website
          </label>
          <div className="w-[250px] p-2 grow">
            <input
              type="text"
              name="website"
              className="w-full p-1 border rounded-md"
              onChange={formik.handleChange("website")}
              value={formik.values.website}
            />
          </div>
        </div>
        <div className="flex h-[150px] items-center my-4">
          <label className="w-[100px] font-semibold" htmlFor="story">
            Story
          </label>
          <div className="w-[250px] p-2 grow">
            <textarea
              name="story"
              cols={30}
              rows={4}
              maxLength={200}
              className="w-full border rounded-md"
              onChange={formik.handleChange("story")}
              value={formik.values.story}
            />
          </div>
          <span className="flex justify-center grow">{formik.values.story.length}/200</span>
        </div>

        <div className="flex h-[40px] items-center my-4">
          <label className="w-[100px] font-semibold" htmlFor="gender">
            Gender
          </label>
          <div className="w-[200px]">
            <select
              className="border w-full h-[34px] rounded-md"
              aria-label="Default select example"
              name="gender"
              id="gender"
              onChange={formik.handleChange("gender")}
              value={formik.values.gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button
          className={`${
            isActive ? "bg-sky-500" : "bg-sky-300"
          } w-full h-[40px] mx-auto max-w-[200px] text-white font-semibold rounded-lg`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
