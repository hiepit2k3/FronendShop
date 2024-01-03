import { Option, Select } from "@material-tailwind/react";
import axios from "../../config/axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/authSlice";
import Pagination from "../../components/pagination/Pagination";
import { CiEdit, CiLock } from "react-icons/ci";
import DialogCEAccount from "./DialogCEAccount";
import { toast } from "react-toastify";
import { useRef } from "react";
import Button from "../../components/button/Button";
import DialogEditTypeAccount from "./DialogEditTypeAccount";
import DialogAlert from "../../components/dialog/DialogAlert";

const AccountManage = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [accountData, setAccountData] = useState([]);
  const [selectRole, setSelectRole] = useState("STAFF");
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
    dataToEdit: {},
  });
  const showDialogCERef = useRef(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    dataToEdit: {},
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const statusAccountColor = {
    ACTIVE: "green",
    UNVERIFIED: "blue",
    LOCKED: "red",
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/account/${selectRole}?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const totalPage = Math.ceil(response["all-item"] / response.size);
      setTotalPages(totalPage);
      setAccountData(response.data);
    } catch (error) {
      setAccountData([]);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, selectRole, token]);
  useEffect(() => {
    showDialogCERef.current = showDialogCE;
  }, [showDialogCE]);
  const handleChangeRole = (value) => {
    setSelectRole(value);
  };
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  const handleCreateTrue = () => {
    if (user.path === 0) {
      setShowDialogCE({
        show: true,
        id: null,
        isUpdate: false,
        action: handleCreate,
        dataToEdit: {},
      });
    } else {
      setShowAlert(true);
    }
  };
  const handleUpdateTrue = (data) => {
    if (user.path === 0) {
      setShowDialogCE({
        show: true,
        id: data.id,
        isUpdate: true,
        action: handleUpdate,
        dataToEdit: data,
      });
    } else {
      setShowAlert(true);
    }
  };
  const handleCreate = async (data) => {
    const formData = new FormData();
    typeof data.image === "string"
      ? formData.append("image", data.image)
      : formData.append("imageFile", data.image);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("fullName", data.fullName);
    formData.append("sex", data.sex);
    formData.append("birthday", data.birthday);
    formData.append("address", data.address);
    formData.append("phoneNumber", data.phoneNumber);
    try {
      setLoading(true);
      if (showDialogCERef.current.show) {
        await axios.post("/account/create", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handleCloseDialogCE();
        fetchData();
        toast.success("Create account successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setLoading(false);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setLoading(false);
      console.log(error);
    }
  };

  const handleUpdate = async (data) => {
    const formData = new FormData();
    typeof data.image === "string"
      ? formData.append("image", data.image)
      : formData.append("imageFile", data.image);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("fullName", data.fullName);
    formData.append("sex", data.sex);
    formData.append("birthday", data.birthday);
    formData.append("address", data.address);
    formData.append("phoneNumber", data.phoneNumber);
    try {
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        await axios.put(
          `/account/update-profile?accountId=${data.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        handleCloseDialogCE();
        fetchData();
        toast.success("Update account successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLockTrue = (item) => {
    if (user.path === 0) {
      setShowDialog({
        show: true,
        dataToEdit: item,
      });
    } else {
      setShowAlert(true);
    }
  };
  const handleLock = async ({ typeAccount, id }) => {
    try {
      if (showDialog.show) {
        await axios.put(`/account/lock/${typeAccount}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handleCloseDialog();
        fetchData();
        toast.success("Change type account successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseDialogCE = () => {
    setShowDialogCE({
      show: false,
      id: null,
      isUpdate: false,
      action: null,
      dataToEdit: {},
    });
  };

  const handleCloseDialog = () => {
    setShowDialog({
      show: false,
      dataToEdit: {},
    });
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-end justify-center gap-3">
          <div className="flex gap-3 mr-10">
            <Select
              label="Select Type Order"
              value={selectRole}
              onChange={handleChangeRole}
            >
              <Option value="CUSTOMER">CUSTOMER</Option>
              <Option value="STAFF">STAFF</Option>
            </Select>
            <Button
              className="w-full px-10 bg-light-green-500"
              onClick={handleCreateTrue}
            >
              Add new account
            </Button>
          </div>
          <table className="w-full table-auto">
            <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">
                  Information
                </th>
                <th className="px-6 py-4 font-medium text-gray-900">
                  Birth Day
                </th>
                <th className="px-6 py-4 font-medium text-gray-900">
                  Phone Number
                </th>
                <th className="px-6 py-4 font-medium text-gray-900">Sex</th>
                <th className="px-6 py-4 font-medium text-gray-900">
                  Type Account
                </th>
                <th className="px-6 py-4 font-medium text-gray-900"></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {accountData.map((item) => (
                <tr key={item.id}>
                  <td className="rc-table-cell">
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={`data:image/png;base64,${item.image}`}
                        alt="avatar"
                        className="object-cover w-10 h-10 rounded-full "
                        loading="lazy"
                      />
                      <div className="grid gap-0.5">
                        <p className="text-sm font-medium text-gray-900 font-lexend dark:text-gray-700">
                          {item.fullName}
                        </p>
                        <p className="text-[13px] text-gray-500">
                          {item.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <p className="flex items-center justify-center font-medium text-gray-700">
                      {item.birthday}
                    </p>
                  </td>
                  <td className="p-3">
                    <p className="flex items-center justify-center font-medium text-gray-700">
                      {item.phoneNumber}
                    </p>
                  </td>
                  <td className="p-3">
                    <p className="flex items-center justify-center font-medium text-gray-700">
                      {item.sex === true ? "Male" : "Female"}
                    </p>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center">
                      <span
                        className={`inline-flex items-center justify-center w-2 h-2 font-semibold leading-none text-white bg-${statusAccountColor[item.typeAccount]
                          }-500 rounded-full rizzui-badge color`}
                      ></span>
                      <p
                        className={`font-medium text-${statusAccountColor[item.typeAccount]
                          }-500 ms-2`}
                      >
                        {item.typeAccount}
                      </p>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-3">
                      <span
                        className="text-2xl cursor-pointer hover:text-blue-500"
                        onClick={() => handleUpdateTrue(item)}
                      >
                        <CiEdit className="w-8" />
                      </span>
                      <span
                        className="text-2xl cursor-pointer hover:text-blue-500"
                        onClick={() => handleLockTrue(item)}
                      >
                        <CiLock className="w-8 h-5" />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {accountData.length > 0 && (
          <div className="flex items-center justify-center gap-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={handleChangePage}
            ></Pagination>
          </div>
        )}
      </div>
      <DialogEditTypeAccount
        show={showDialog.show}
        dataToEdit={showDialog.dataToEdit}
        handleCancelClick={handleCloseDialog}
        handleChangeTypeAccount={handleLock}
        loading={loading}
      />
      <DialogAlert show={showAlert} cancel={handleCloseAlert} />
      <DialogCEAccount
        show={showDialogCE.show}
        handleSubmitData={showDialogCE.action}
        isUpdate={showDialogCE.isUpdate}
        dataToEdit={showDialogCE.dataToEdit}
        cancel={handleCloseDialogCE}
        loading={loading}
      />
    </>
  );
};

export default AccountManage;
