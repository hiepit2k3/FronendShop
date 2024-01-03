import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { BiSolidCartAdd } from "react-icons/bi";
import { MdOutlinePlace } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice";
import avatar from "../../assets/images/avatar.jpg";

const SideBarAccount = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <>
      <div className="w-full h-screen max-w-xs max-h-screen">
        <div className="flex items-center justify-center mt-10 mb-5">
          <img
            src={user && user.image ? `data:image/png;base64,${user.image}` : avatar}
            alt="avatar"
            className="object-cover rounded-full h-28 w-28"
          />
        </div>
        <div className="overflow-auto scrollbar scrollbar-thin scrollbar-thumb-blue-gray-100 max-h-[calc(100vh-72px">
          <List className="px-5">
            <Link to="/user">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="w-5 h-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </Link>
            <Link to="/user/order">
              <ListItem>
                <ListItemPrefix>
                  <BiSolidCartAdd className="w-5 h-5" />
                </ListItemPrefix>
                My Order
              </ListItem>
            </Link>
            <Link to="/user/changePassword">
              <ListItem>
                <ListItemPrefix>
                  <MdLockOutline className="w-5 h-5" />
                </ListItemPrefix>
                Change Password
              </ListItem>
            </Link>
            <Link to="/user/address">
              <ListItem>
                <ListItemPrefix>
                  <MdOutlinePlace className="w-5 h-5" />
                </ListItemPrefix>
                Address
              </ListItem>
            </Link>
          </List>
        </div>
      </div>
    </>
  );
};

export default SideBarAccount;
