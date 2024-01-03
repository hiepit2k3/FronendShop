import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import axios from "../../config/axios.js";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { selectCurrentToken } from "../../redux/features/authSlice.jsx";
import { useSelector } from "react-redux";
import Pagination from "../../components/pagination/Pagination.jsx";

const ProductManage = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectCurrentToken);
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // Thêm state trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Thêm state tổng số trang
  const [showDialog, setShowDialog] = useState({
    show: false,
    id: null,
  });

  //Call api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/product?page=${currentPage}`);
        setProductData(response.data || response.content);
        const totalPages = Math.ceil(response["all-item"] / response.size);
        setTotalPages(totalPages); // Cập nhật tổng số trang
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Đặt loading về false sau khi dữ liệu đã được xử lý
      }
    };

    fetchData();
  }, [currentPage, /* productData (nếu bạn muốn có thể bao gồm) */]);


  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleCloseDialog = () => {
    setShowDialog({
      show: false,
      id: null,
    });
  };

  const handleDeleteTrue = (id) => {
    setShowDialog({
      show: true,
      id: id,
    });
  };

  const handleDelete = async () => {
    try {
      if (showDialog.show && showDialog.id) {
        await axios.delete(`/product/delete/${showDialog.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductData(productData.filter((item) => item.id !== showDialog.id));
        handleCloseDialog();
        toast.success("Delete product successfully!", {
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
    } catch (response) {
      handleCloseDialog();
      toast.error(response.response.data.message, {
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
  };

  return (
    <>
      <Link to="/admin/product/add">
        <Button
          className="cursor-pointer float-right mr-2 mb-2 bg-light-green-500"
        // onClick={handleCreateTrue}
        >
          Add new product
        </Button>
      </Link>
      <table className="w-full">
        <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-400">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Image</th>
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th className="px-6 py-4 font-medium text-gray-900">Min Price</th>
            <th className="px-6 py-4 font-medium text-gray-900">Max Price</th>
            <th className="px-6 py-4 font-medium text-gray-900">Quantity</th>
            <th className="px-6 py-4 font-medium text-gray-900">Discount</th>
            <th className="px-6 py-4 font-medium text-gray-900">Order Count</th>
            <th className="px-6 py-4 font-medium text-gray-900">Rate</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        {loading && (
          <tr>
            <td colSpan="6" className="flex p-3 text-center">
              <button
                disabled
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                Loading...
              </button>
            </td>
          </tr>
        )}
        {!loading && (
          <tbody className="divide-y divide-gray-100 text-sm">
            {productData.length > 0 &&
              productData.map((item) => (
                <tr key={item.id}>
                  <td className="w-12">
                    <img src={`data:image/png;base64,${item.image}`} alt="" />
                  </td>
                  <td className="w-1/4 font-medium text-gray-800">{item.name}</td>
                  <td className="">{item.min_price}</td>
                  <td className="">{item.max_price}</td>
                  <td className="">{item.quantity}</td>
                  <td className="">{item.discount}</td>
                  <td className="">{item.order_count}</td>
                  <td className="">{item.rate}</td>
                  <td className="p-2">
                    <span className="flex items-center justify-center gap-3">
                      <a
                        className="p-3 text-2xl hover:text-blue-500 cursor-pointer"
                        onClick={() => navigate(`/admin/product/edit/${item.id}`)}
                      >
                        <CiEdit />
                      </a>
                      <a
                        className="ml-2 p-2 text-2xl  hover:text-blue-500 cursor-pointer"
                        onClick={() => handleDeleteTrue(item.id)}
                      >
                        <BsTrash3 />
                      </a>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
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
        title="Product"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
    </>
  );
};

export default ProductManage;
