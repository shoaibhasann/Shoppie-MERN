import React from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { formatDate } from "../app/ReviewCard";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

function Profile() {
  const { userInfo, loading } = useSelector(
    (state) => state.user
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <MetaData title='Profile - Shoppie'/>
      {userInfo && (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-36 mt-20">
          <div>
            <img
              className="rounded-full border-2 border-black p-1"
              src={userInfo.avatar.secure_url}
              alt="avatar"
            />
            <Link to={'/update'} className="flex items-center justify-center gap-4 text-lg bg-[#ed0010] px-4 py-2 text-white font-semibold mt-5 w-full border-2 border-transparent hover:text-[#ed0010] hover:bg-white hover:border-[#e50010]">
              Edit Profile
            </Link>
          </div>
          <div>
            <div className="mb-2">
              <h1 className="text-xl lg:text-2xl font-semibold">Full Name</h1>
              <p className="text-lg lg:text-xl">{userInfo.name}</p>
            </div>
            <div className="mb-2">
              <h1 className="text-xl lg:text-2xl font-semibold">Email</h1>
              <p className="text-lg lg:text-xl">{userInfo.email}</p>
            </div>
            <div className="mb-2">
              <h1 className="text-xl lg:text-2xl font-semibold">Joined On</h1>
              <p className="text-lg lg:text-xl">
                {formatDate(userInfo.createdAt)}
              </p>
            </div>
            <div className="flex flex-col items-start">
              <Link
                className="flex items-center justify-center gap-4 text-lg bg-slate-950 px-6 py-2 text-white font-semibold mt-6 w-full border-2 border-transparent hover:text-slate-950 hover:bg-white hover:border-slate-950"
                to={"/orders"}
              >
                My Orders
              </Link>
              <Link
                className="flex items-center justify-center gap-4 text-lg bg-slate-950 px-6 py-2 text-white font-semibold mt-6 w-full border-2 border-transparent hover:text-slate-950 hover:bg-white hover:border-slate-950"
                to={"/password/update"}
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
