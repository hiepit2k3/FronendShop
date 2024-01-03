import axios from "../../config/axios.js";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/authSlice.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";


const EvalueateManage = () => {
  const token = useSelector(selectCurrentToken);
  const [evaluateData, setEvaluateData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Thêm state trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Thêm state tổng số trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/evaluate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvaluateData(response.data);
        const totalPages = Math.ceil(response["all-item"] / response.size);
        setTotalPages(totalPages); // Cập nhật tổng số trang
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Product</th>
            <th className="px-6 py-4 font-medium text-gray-900">Account</th>
            <th className="px-6 py-4 font-medium text-gray-900">Rate</th>
            <th className="px-6 py-4 font-medium text-gray-900">Comment</th>
            <th className="px-6 py-4 font-medium text-gray-900">Date</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {evaluateData.length > 0 &&
            evaluateData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">
                  {item.product}
                </td>
                <td className="p-2">{item.account}</td>
                <td className="p-2">{item.rate}</td>
                <td className="p-2">{item.comment}</td>
                <td className="p-2">{item.date}</td>
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
    </>
  );
};

export default EvalueateManage;
