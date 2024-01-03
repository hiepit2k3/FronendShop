import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import axios from "../../config/axios.js";
import { toast } from "react-toastify";
import DialogCECategory from "./DialogCECategory";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/authSlice.jsx";
import DialogAlert from "../../components/dialog/DialogAlert";
import Pagination from "../../components/pagination/Pagination.jsx";

const CategoryManage = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [showAlert, setShowAlert] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Thêm state trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Thêm state tổng số trang
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
    categoryDataToEdit: {},
  });
  const showDialogCERef = useRef(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    id: null,
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(`/category?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategoryData(response.data);
      const totalPages = Math.ceil(response["all-item"] / response.size);
      setTotalPages(totalPages); // Cập nhật tổng số trang
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token], [currentPage]);

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
        categoryDataToEdit: {},
      });
    } else {
      setShowAlert(true);
    }
  };

  const handleCreate = async (categoryDto) => {
    try {
      setLoading(true);
      if (showDialogCERef.current.show) {
        await axios.post("/category/create", categoryDto, {
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
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleUpdateTrue = (id) => {
    if (user.path === 0) {
      const dataEdit = categoryData.find((item) => item.id === id);
      setShowDialogCE({
        show: true,
        id: id,
        isUpdate: true,
        action: handleUpdate,
        categoryDataToEdit: dataEdit,
      });
    } else {
      setShowAlert(true);
    }
  };
  const handleUpdate = async (categoryDto) => {
    try {
      setLoading(true);
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        await axios.put(
          `/category/update/${showDialogCERef.current.id}`,
          categoryDto,
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
        await axios.delete(`/category/delete/${showDialog.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategoryData(
          categoryData.filter((item) => item.id !== showDialog.id)
        );
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
      categoryDataToEdit: {},
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
        Add new Category
      </Button>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {categoryData.length > 0 &&
            categoryData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">{item.name}</td>
                <td className="p-2">{item.description}</td>
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
        title="category"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DialogCECategory
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitCategory={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Category"
        loading={loading}
        categoryDataToEdit={showDialogCE.categoryDataToEdit}
      />
      <DialogAlert show={showAlert} cancel={handleCloseAlert} />
    </>
  );
};

export default CategoryManage;
