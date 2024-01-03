import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../redux/features/authSlice";
import avatar from "../../assets/images/avatar.jpg";
import PropTypes from "prop-types";

const Dropdown = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <Menu>
        <MenuHandler>
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            className="border border-gray-900 p-0.5 cursor-pointer"
            src={user && user.image ? `data:image/png;base64,${user.image}` : avatar}
          />
        </MenuHandler>
        <MenuList>
          {user && user?.path === 2 ? (
            <Link to="/user">
              <MenuItem>
                <span>My Profile</span>
              </MenuItem>
            </Link>
          ) : (
            <Link to="/admin/profile">
              <MenuItem>
                <span>My Profile</span>
              </MenuItem>
            </Link>
          )}

          <Link to="/contact">
            <MenuItem>
              <span>Help</span>
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>
            <span>Log out</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

Dropdown.propTypes = {
  user: PropTypes.object,
};

export default Dropdown;
