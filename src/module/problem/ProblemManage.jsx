import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import axios from "../../config/axios.js";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import DialogCEProblem from "./DialogCEProblem.jsx";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/authSlice.jsx";
import DialogAlert from "../../components/dialog/DialogAlert";

const ProblemManage = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [showAlert, setShowAlert] = useState(false);
  const [problemData, setProblemData] = useState([]);
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
    problemDataToEdit: {},
  });
  const showDialogCERef = useRef(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    id: null,
  });
  const fetchData = async () => {
    try {
      const response = await axios.get("/problem", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProblemData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]);
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
        problemDataToEdit: {},
      });
    } else {
      setShowAlert(true);
    }
  };
  const handleCreate = async (paymentDto) => {
    try {
      setLoading(true);
      if (showDialogCERef.current.show) {
        await axios.post("/problem/create", paymentDto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchData();
        handleCloseDialogCE();
        toast.success("Create problem successfully!", {
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
      console.log(error);
    }
  };
  const handleUpdateTrue = (id) => {
    if (user.path === 0) {
      const dataEdit = problemData.find((item) => item.id === id);
      setShowDialogCE({
        show: true,
        id: id,
        isUpdate: true,
        action: handleUpdate,
        problemDataToEdit: dataEdit,
      });
    } else {
      setShowAlert(true);
    }
  };
  const handleUpdate = async (problemDto) => {
    try {
      setLoading(true);
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        await axios.put(
          `/problem/update/${showDialogCERef.current.id}`,
          problemDto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchData();
        handleCloseDialogCE();
        toast.success("Update problem successfully!", {
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
        await axios.delete(`/problem/delete/${showDialog.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProblemData(problemData.filter((item) => item.id !== showDialog.id));
        handleCloseDialog();
        toast.success("Delete problem successfully!", {
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
      problemDataToEdit: {},
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
        Add new problem
      </Button>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {problemData.length > 0 &&
            problemData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">{item.name}</td>
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
      <DialogDelete
        show={showDialog.show}
        title="problem"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DialogCEProblem
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitProblem={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Problem"
        dataToEdit={showDialogCE.dataToEdit}
        loading={loading}
      />
      <DialogAlert show={showAlert} cancel={handleCloseAlert} />
    </>
  );
};

export default ProblemManage;
