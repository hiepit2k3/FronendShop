import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import axios from "../../config/axios.js";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import DialogCEDiscount from "./DialogCEDiscount.jsx";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/authSlice.jsx";
import DialogAlert from "../../components/dialog/DialogAlert";
import Pagination from "../../components/pagination/Pagination.jsx";

const DiscountManage = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [showAlert, setShowAlert] = useState(false);

  const [discountData, setDiscountData] = useState([]);
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
      const response = await axios.get(`/discount?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setDiscountData(response.data);
      const totalPages = Math.ceil(response["all-item"] / response.size);
      setTotalPages(totalPages); // Cập nhật tổng số trang
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
  const handleCreate = async (data) => {
    try {
      setLoading(true);
      if (showDialogCERef.current.show) {
        const formData = new FormData();
        typeof data.image === "string"
          ? formData.append("image", data.image)
          : formData.append("imageFile", data.image);
        formData.append("discount", data.discount);
        formData.append("registerDate", data.registerDate);
        formData.append("expirationDate", data.expirationDate);
        formData.append("categoryId", data.categoryId);
        formData.append("description", data.description);
        await axios.post("/discount/create", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchData();
        handleCloseDialogCE();
        toast.success("Create discount successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleUpdateTrue = (id) => {
    if (user.path === 0) {
      const dataEdit = discountData.find((item) => item.id === id);
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
      const formData = new FormData();
      typeof data.image === "string"
        ? formData.append("image", data.image)
        : formData.append("imageFile", data.image);
      formData.append("discount", data.discount);
      formData.append("registerDate", data.registerDate);
      formData.append("expirationDate", data.expirationDate);
      formData.append("categoryId", data.categoryId);
      formData.append("description", data.description);
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        await axios.put(
          `/discount/update/${showDialogCERef.current.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchData();
        handleCloseDialogCE();
        toast.success("Update discount successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      }
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
        await axios.delete(`/discount/delete/${showDialog.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDiscountData(
          discountData.filter((item) => item.id !== showDialog.id)
        );
        handleCloseDialog();
        toast.success("Delete discount successfully!", {
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
        Add new discount
      </Button>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Discount</th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Register Date
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Expiration Date
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">Image</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Category</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {discountData.length > 0 &&
            discountData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">
                  {item.discount}
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.registerDate}
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.expirationDate}
                </td>
                <td className="p-2 font-medium text-gray-800">
                  <img
                    src={`data:image/png;base64,${item.image}`}
                    alt={item.name}
                    style={{ width: "70px" }}
                  />
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.description}
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.categoryId}
                </td>
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
        title="discount"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DialogCEDiscount
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitDiscount={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Discount"
        dataToEdit={showDialogCE.dataToEdit}
        loading={loading}
      />
      <DialogAlert show={showAlert} cancel={handleCloseAlert} />
    </>
  );
};

export default DiscountManage;
