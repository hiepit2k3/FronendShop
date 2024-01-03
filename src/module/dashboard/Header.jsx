import { BsBell, BsGear } from "react-icons/bs";
import InputSearch from "../../components/input/InputSearch";
import Dropdown from "../../components/select/Dropdown";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice";

const Header = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="flex items-center justify-around">
      <div>
        <h1 className="text-2xl font-semibold font-eculid text-blue-gray-700">
          The Trendy Fashionista
        </h1>
      </div>
      <div className="flex items-center justify-center w-[500px]">
        <InputSearch maxWidth="max-w-[500px]" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3">
          <BsGear />
          <BsBell />
        </div>
        <p>|</p>
        <div className="flex items-center justify-center gap-3">
          {user && (
            <>
              <p className="text-base font-medium text-blue-gray-600 font-eculid">
                {user.fullName}
              </p>
              <Dropdown />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
