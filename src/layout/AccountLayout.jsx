import SideBarAccount from "../module/dashboard/SideBarAccount";
import { Outlet } from "react-router-dom";
import SiteLayout from "./SiteLayout";
const AccountLayout = () => {
  return (
    <>
      <SiteLayout>
        <div className="flex items-start justify-center gap-5 my-10">
          <SideBarAccount></SideBarAccount>
          <Outlet></Outlet>
        </div>
      </SiteLayout>
    </>
  );
};

export default AccountLayout;
