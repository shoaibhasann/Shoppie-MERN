import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetProfile, updatePassword } from "../../redux/ProfileSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader.jsx";
import { getUserProfile } from "../../redux/UserSlice.js";
import MetaData from "../layout/MetaData.jsx";

function UpdateProfile() {

  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const handlePasswordChange = (field, value) => {
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [field]: value,
    }));
  };

const submitHandler = async (e) => {
  e.preventDefault();
  dispatch(clearErrors());

  if (passwords.new !== passwords.confirm) {
    setPasswordMatch(false);
    setErrorMessage("* new and confirm password must match.");
    return;
  }

  // Passwords match, reset validation and proceed with submission
  setPasswordMatch(true);
  setErrorMessage("");

  const formData = new FormData();
  formData.append("oldPassword", passwords.old);
  formData.append("newPassword", passwords.new);
  formData.append("confirmPassword", passwords.confirm);

  dispatch(updatePassword(formData));
};


    useEffect(() => {
      if (error) {
        toast.error(error.message);
        dispatch(clearErrors());
      }

      if (isUpdated) {
        toast.success("Password Updated Successfully!");
        dispatch(getUserProfile());
        navigate("/account");
        dispatch(resetProfile());
      }
    }, [error, dispatch, isUpdated]);

  return (
    <>
      <MetaData title="Change Password - Shoppie" />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center mt-10">
          <div className="p-8 shadow-2xl w-80 lg:w-[400px] rounded-sm border border-slate-300">
            <h1 className="text-2xl font-bold text-center mb-4">
              Update Password
            </h1>
            <form onSubmit={submitHandler}>
              {Object.keys(passwords).map((field) => (
                <div key={field} className="mb-4 relative">
                  <label className="block font-medium" htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)} Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full mt-1 p-2 pr-10 border border-slate-900"
                      name={field}
                      id={field}
                      type={showPassword ? "text" : "password"}
                      value={passwords[field]}
                      onChange={(e) =>
                        handlePasswordChange(field, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 top-0 bottom-0 px-2 flex items-center bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
              {!passwordMatch && (
                <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="flex items-center justify-center gap-4 text-lg bg-slate-950 px-6 py-2 text-white font-semibold mt-6 w-full border-2 border-transparent hover:text-slate-950 hover:bg-white hover:border-slate-950"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateProfile;
