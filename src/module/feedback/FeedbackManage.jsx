import { useEffect, useRef, useState } from "react";
import axios from "../../config/axios.js";
import { toast } from "react-toastify";
import DialogCEFeedback from "./DialogCEFeedback.jsx";
import { CiEdit } from "react-icons/ci";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/authSlice.jsx";
import { useSelector } from "react-redux";
import DialogAlert from "../../components/dialog/DialogAlert";
import Pagination from "../../components/pagination/Pagination.jsx";

const FeedbackManage = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [showAlert, setShowAlert] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Thêm state trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Thêm state tổng số trang
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
    feedbackDataToEdit: {},
  });
  const showDialogCERef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(`/feedback?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedbackData(response.data);
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

  const handleUpdateTrue = (id) => {
    if (user.path === 0) {
      const dataEdit = feedbackData.find((item) => item.id === id);
      setShowDialogCE({
        show: true,
        id: id,
        isUpdate: true,
        action: handleUpdate,
        feedbackDataToEdit: dataEdit,
      });
    } else {
      setShowAlert(true);
    }
  };
  const handleUpdate = async (FeedbackDto) => {
    try {
      setLoading(true);
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        await axios.put(
          `/feedback/set-status/${showDialogCERef.current.id}/${FeedbackDto.status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
fetchData();
        handleCloseDialogCE();
        toast.success("Update Feedback successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchData();
        handleCloseDialogCE();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCloseDialogCE = () => {
    setShowDialogCE({
      show: false,
      id: null,
      isUpdate: false,
      action: null,
      feedbackDataToEdit: {},
    });
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">
              Phone Number
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">Email</th>
            <th className="px-6 py-4 font-medium text-gray-900">Date</th>
            <th className="px-6 py-4 font-medium text-gray-900">Problem</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Status</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {feedbackData.length > 0 &&
            feedbackData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">
                  {item.phoneNumber}
                </td>
                <td className="p-2 font-medium text-gray-800">{item.email}</td>
                <td className="p-2 font-medium text-gray-800">{item.date}</td>
                <td className="p-2 font-medium text-gray-800">
                  {item.problemId}
                </td>
                <td className="p-2 w-[350px]">
                  <p className="text-justify">{item.description}</p>
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.status === true ? "Đã được xử lý" : "Chưa được xử lý"}
                </td>
                <td className="p-2">
                  <span className="flex items-center justify-center gap-3">
                    <a
                      className="p-3 text-2xl cursor-pointer hover:text-blue-500"
                      onClick={() => handleUpdateTrue(item.id)}
                    >
                      <CiEdit />
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
      <DialogCEFeedback
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitFeedback={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Feedback"
        feedbackDataToEdit={showDialogCE.feedbackDataToEdit}
        loading={loading}
      />
      <DialogAlert show={showAlert} cancel={handleCloseAlert} />
    </>
  );
};

export default FeedbackManage;
