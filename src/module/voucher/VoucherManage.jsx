import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import { toast } from "react-toastify";
import axios from "../../config/axios.js";
import DialogCEVoucher from "./DialogCEVoucher";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/authSlice.jsx";
import DialogAlert from "../../components/dialog/DialogAlert";
import Pagination from "../../components/pagination/Pagination.jsx";

const VoucherManage = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [showAlert, setShowAlert] = useState(false);
  const [voucherData, setVoucherData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Thêm state trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Thêm state tổng số trang
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
    id: null,
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(`/voucher?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVoucherData(response.data);
      const totalPages = Math.ceil(response["all-item"] / response.size);
      setTotalPages(totalPages); // Cập nhật tổng số <trang></trang>
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token, currentPage]);
  useEffect(() => {
    showDialogCERef.current = showDialogCE;
  }, [showDialogCE]);
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

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      if (showDialogCERef.current.show) {
        const formData = new FormData();
        typeof data.image === "string"
          ? formData.append("image", data.image)
          : formData.append("imageFile", data.image);
        formData.append("name", data.name);
        formData.append("discount", data.discount);
        formData.append("registerDate", data.registerDate);
        formData.append("expirationDate", data.expirationDate);
        formData.append("quantity", data.quantity);
        formData.append("typeDiscount", data.typeDiscount);
        formData.append("minTotal", data.minTotal);
        formData.append("maxDiscount", data.maxDiscount);
        formData.append("description", data.description);
        await axios.post("/voucher/create", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchData();
        handleCloseDialogCE();
        toast.success("Create category successfully!", {
          position: "top-right",
          autoClose: 3000,
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
      setLoading(false);
      console.log(error);
    }
  };

  const handleUpdateTrue = (id) => {
    if (user.path === 0) {
      const dataEdit = voucherData.find((item) => item.id === id);
      setShowDialogCE({
        show: true,
        id: id,
        isUpdate: true,
        action: handleUpdate,
        dataToEdit: dataEdit,
      });
    } else {
      setShowAlert(true);
    }
  };
  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        const formData = new FormData();
        typeof data.image === "string"
          ? formData.append("image", data.image)
          : formData.append("imageFile", data.image);
        formData.append("name", data.name);
        formData.append("discount", data.discount);
        formData.append("registerDate", data.registerDate);
        formData.append("expirationDate", data.expirationDate);
        formData.append("quantity", data.quantity);
        formData.append("typeDiscount", data.typeDiscount);
        formData.append("minTotal", data.minTotal);
        formData.append("maxDiscount", data.maxDiscount);
        formData.append("description", data.description);
        await axios.put(
          `/voucher/update/${showDialogCERef.current.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchData();
        handleCloseDialogCE();
        toast.success("Update category successfully!", {
          position: "top-right",
          autoClose: 3000,
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
      setLoading(false);
      console.log(error);
    }
  };

  const handleDeleteTrue = (id) => {
    if (user.path === 0) {
      setShowDialog({
        show: true,
        id: id,
      });
    } else {
      setShowAlert(true);
    }
  };
  const handleDelete = async () => {
    try {
      if (showDialog.show && showDialog.id) {
        await axios.delete(`/voucher/delete/${showDialog.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVoucherData(voucherData.filter((item) => item.id !== showDialog.id));
        handleCloseDialog();
        toast.success("Delete category successfully!", {
          position: "top-right",
          autoClose: 3000,
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
      id: null,
    });
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
      <Button
        className="float-right mb-2 mr-2 cursor-pointer bg-light-green-500"
        onClick={handleCreateTrue}
      >
        Add new voucher
      </Button>
      <table className="w-full table-auto text-start">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Image</th>
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th className="px-6 py-4 font-medium text-gray-900">Discount</th>
            <th className="px-6 py-4 font-medium text-gray-900">Quantity</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Min Total</th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Max Discount
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Register Date
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Expiration Date
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Type Discount
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {voucherData.length > 0 &&
            voucherData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">
                  <img src={`data:image/png;base64,${item.image}`} alt={item.name} className="h-24 w-96" />
                </td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.discount}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2">{item.minTotal}</td>
                <td className="p-2">{item.maxDiscount}</td>
                <td className="p-2">{item.registerDate}</td>
                <td className="p-2">{item.expirationDate}</td>
                <td className="p-2">{item.typeDiscount}</td>
                <td className="p-2">
                  <span className="flex items-center justify-center gap-3">
                    <a
                      className="p-3 text-2xl cursor-pointer hover:text-blue-500"
                      onClick={() => handleUpdateTrue(item.id)}
                    >
                      <CiEdit />
                    </a>
                    <a
                      className="p-2 ml-2 text-2xl cursor-pointer hover:text-blue-500"
                      onClick={() => handleDeleteTrue(item.id)}
                    >
                      <BsTrash3 />
                    </a>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handleChangePage}
        ></Pagination>
      </div>
      <DialogDelete
        show={showDialog.show}
        title="voucher"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DialogCEVoucher
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitVoucher={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Voucher"
        dataToEdit={showDialogCE.dataToEdit}
        loading={loading}
      />
      <DialogAlert show={showAlert} cancel={handleCloseAlert} />
    </>
  );
};

export default VoucherManage;
