import axios from "../../config/axios";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/authSlice";
import { Option, Select } from "@material-tailwind/react";
import DialogEditTypeOrder from "./DialogEditTypeOrder";
import { toast } from "react-toastify";
import Pagination from "../../components/pagination/Pagination";

const OrderManage = () => {
  const [loading, setLoading] = useState(false); // Thêm state `loading` ở đây
  const [orderData, setOrderData] = useState([]);
  const [selectTypeOrder, setSelectTypeOrder] = useState("");
  const token = useSelector(selectCurrentToken);
  const [isEditTypeOrder, setIsEditTypeOrder] = useState({
    show: false,
    dataToEdit: {},
  });
  const [isOrderUpdated, setIsOrderUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        setLoading(true); // Bắt đầu fetch, set loading thành true
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const totalPages = Math.ceil(response["all-item"] / response.size);
        setTotalPages(totalPages);
        setOrderData(response.data);
        setIsOrderUpdated(false);
      } catch (error) {
        setOrderData([]);
      } finally {
        setLoading(false); // Kết thúc fetch, set loading thành false
      }
    };

    if (selectTypeOrder !== "") {
      fetchData(`/order?type=${selectTypeOrder}&page=${currentPage}`);
    } else {
      fetchData(`/order?page=${currentPage}`);
    }
  }, [selectTypeOrder, token, isOrderUpdated, currentPage]);
  const handleChangeSelect = (value) => {
    setSelectTypeOrder(value);
    setCurrentPage(0);
  };
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleOpenEdit = (data) => {
    setIsEditTypeOrder({
      show: true,
      dataToEdit: data,
    });
  };

  const handleChangeTypeOrder = async (data) => {
    try {
      setLoading(true);
      await axios.put(`/order/update/${data.id}?typeOrder=${data.typeOrder}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Order updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsOrderUpdated(true);
      setLoading(false);
    } catch (error) {
      if (error) {
        toast.error("Failed to update order. Please try again.", {
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
    }
  };

  const handleCancelEdit = () => {
    setIsEditTypeOrder({
      show: false,
      dataToEdit: {},
    });
  };
  const statusColorMap = {
    PENDING: "orange",
    WAIT_TO_PAY: "green",
    PROCESSING: "blue",
    DELIVERING: "blue",
    SUCCESSFUL: "green",
    CANCELLED: "red",
    RETURNED: "gray",
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-end justify-center gap-3">
          <div className="mr-10">
            <Select
              label="Select Type Order"
              value={selectTypeOrder}
              onChange={handleChangeSelect}
            >
              <Option value="PENDING">PENDING</Option>
              <Option value="WAIT_TO_PAY">TO PAY</Option>
              <Option value="PROCESSING">PROCESSING</Option>
              <Option value="DELIVERING">DELIVERING</Option>
              <Option value="SUCCESSFUL">SUCCESSFUL</Option>
              <Option value="CANCELLED">CANCELLED</Option>
              <Option value="RETURNED">RETURNED</Option>
            </Select>
          </div>

          <table className="w-full table-auto">
            <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">
                  Customer
                </th>
                <th className="px-6 py-4 font-medium text-gray-900">Items</th>
                <th className="px-6 py-4 font-medium text-gray-900">Price</th>
                <th className="px-6 py-4 font-medium text-gray-900">
                  Purchase Date
                </th>
                <th className="px-6 py-4 font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 font-medium text-gray-900"></th>
              </tr>
            </thead>{loading && (
              <tr>
                <td colSpan="6" className="p-3 text-center">
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
              <tbody className="text-sm divide-y divide-gray-100">
                {orderData &&
                  orderData?.map((item, index) => (
                    <tr key={index}>
                      <td className="rc-table-cell">
                        <div className="flex items-center justify-center gap-3">
                          <img
                            src={`data:image/png;base64,${item.accountDto.image}`}
                            alt="avatar"
                            className="object-cover w-10 h-10 rounded-full "
                            loading="lazy"
                          />
                          <div className="grid gap-0.5">
                            <p className="text-sm font-medium text-gray-900 font-lexend dark:text-gray-700">
                              {item.accountDto.fullName}
                            </p>
                            <p className="text-[13px] text-gray-500">
                              {item.accountDto.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <p className="flex items-center justify-center font-medium text-gray-700">
                          {item.orderDetailsDto.length}
                        </p>
                      </td>
                      <td className="p-3">
                        <p className="flex items-center justify-center font-medium text-gray-700">
                          {item.orderDto.total}
                        </p>
                      </td>
                      <td className="p-3">
                        <p className="flex items-center justify-center font-medium text-gray-700">
                          {item.orderDto.purchaseDate}
                        </p>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center">
                          <span
                            className={`inline-flex items-center justify-center w-2 h-2 font-semibold leading-none text-white bg-${statusColorMap[item.orderDto.typeOrder]
                              }-500 rounded-full rizzui-badge color`}
                          ></span>
                          <p
                            className={`font-medium text-${statusColorMap[item.orderDto.typeOrder]
                              }-500 ms-2`}
                          >
                            {item.orderDto.typeOrder}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-3">
                          <span
                            onClick={() => handleOpenEdit(item)}
                            className="p-3 text-2xl cursor-pointer hover:text-blue-500"
                          >
                            <CiEdit className="w-8" />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handleChangePage}
          ></Pagination>
        </div>
      </div>
      <DialogEditTypeOrder
        show={isEditTypeOrder.show}
        dataToEdit={isEditTypeOrder.dataToEdit}
        handleCancelClick={handleCancelEdit}
        handleChangeTypeOrder={handleChangeTypeOrder}
        loading={loading}
      />
    </>
  );
};

export default OrderManage;
