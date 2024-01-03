import SideBar from "../module/dashboard/SideBar";
import Header from "../module/dashboard/Header";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <>
      <div className="grid grid-cols-5 gap-0">
        <SideBar></SideBar>
        <div className="h-screen col-span-4">
          <Header></Header>
          <div className="my-10">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
