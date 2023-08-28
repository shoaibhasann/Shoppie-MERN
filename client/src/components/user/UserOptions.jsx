import {
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
  ShoppingBagIcon,
  Square3Stack3DIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function UserOptions({ user }) {
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-lg text-lg pr-4",
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <div className="absolute top-7 right-28 lg:right-8 ">
      <SpeedDial>
        <SpeedDialHandler>
          <img
            src={user.avatar.secure_url}
            className="h-9 w-9 rounded-full object-cover cursor-pointer"
          />
        </SpeedDialHandler>
        <SpeedDialContent className="rounded-full  border border-blue-gray-50 bg-white shadow-xl shadow-black/10">
          {user.role === "Admin" && (
            <SpeedDialAction className="relative my-2 bg-blue-gray-50">
              <Square3Stack3DIcon
                className="h-6 w-6"
                onClick={() => navigate("/dashboard")}
              />
              <Typography {...labelProps}>Dashboard</Typography>
            </SpeedDialAction>
          )}
          <SpeedDialAction className="relative my-2 bg-blue-gray-50">
            <UserIcon
              className="h-6 w-6"
              onClick={() => navigate("/account")}
            />
            <Typography {...labelProps}>Account</Typography>
          </SpeedDialAction>
          <SpeedDialAction className="relative my-2 bg-blue-gray-50">
            <ShoppingBagIcon
              className="h-6 w-6"
              onClick={() => navigate("/orders")}
            />
            <Typography {...labelProps}>Orders</Typography>
          </SpeedDialAction>
          <SpeedDialAction className="relative my-2 bg-blue-gray-50">
            <ArrowLeftOnRectangleIcon
              className="h-6 w-6"
              conClick={logoutUser}
            />
            <Typography {...labelProps}>Logout</Typography>
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}

export default UserOptions;
