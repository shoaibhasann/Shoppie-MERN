import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import {
  updateProfile,
  clearErrors,
  resetProfile,
} from "../../redux/ProfileSlice";
import { toast } from "react-toastify";
import { getUserProfile } from "../../redux/Userslice";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const { userInfo } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatar, setAvatar] = useState();

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
          setAvatarPreview(e.target.result);    
          setAvatar(selectedFile);    
    };
      reader.readAsDataURL(selectedFile);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(clearErrors()); // clear previous errors

    const formData = new FormData(); // Create a FormData object
    formData.append("name", name);
    formData.append("email", email);

    if(avatar){
        formData.append("avatar", avatar);
    }
    // Dispatch the updateProfile action with the formData
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (userInfo && userInfo.avatar && userInfo.name && userInfo.email) {
      setAvatarPreview(userInfo.avatar.secure_url);
      setName(userInfo.name);
      setEmail(userInfo.email);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully!");
      dispatch(getUserProfile());
      navigate("/account");
      dispatch(resetProfile());
    }
  }, [userInfo, error, dispatch, isUpdated]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {userInfo ? (
        <div className="flex justify-center items-center mt-14">
          <div className="p-8 shadow-2xl w-80 lg:w-[400px]">
            <h1 className="text-2xl font-bold text-center">Update Profile</h1>
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full mt-1 p-2 border border-slate-900 "
                  name="name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full mt-1 p-2 border border-slate-900 "
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex mb-4 items-center justify-center gap-5 border-b pb-3 border-slate-900">
                <img
                  className="h-12 w-12 rounded-full"
                  src={avatarPreview}
                  alt="avatar"
                />
                <label className="cursor-pointer bg-[#e50010] text-white p-2 border border-transparent  hover:bg-white hover:border hover:border-[#e50010] hover:text-[#e50010]">
                  Choose Profile Image
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-4 text-lg bg-slate-950 px-6 py-2 text-white font-semibold mt-6 w-full border-2 border-transparent hover:text-slate-950 hover:bg-white hover:border-slate-950"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default UpdateProfile;
