import axios from "../../config/axios";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import DialogDelete from "../../components/dialog/DialogDelete";
import { toast } from "react-toastify";
import DialogCEColor from "./DialogCEColor";
import { BsTrash3 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/authSlice";
import DialogAlert from "../../components/dialog/DialogAlert";

const ColorManage = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [showAlert, setShowAlert] = useState(false);

  const [colorData, setColorData] = useState([]);
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
      const response = await axios.get("/color", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setColorData(response.data);
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
        dataToEdit: {},
      });
    } else {
      setShowAlert(true);
    }
  };

  const handleCreate = async (colorDto) => {
    try {
      setLoading(true);
      if (showDialogCERef.current.show) {
        await axios.post("/color/create", colorDto, {
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
      const dataEdit = colorData.find((item) => item.id === id);
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
  const handleUpdate = async (colorDto) => {
    try {
      setLoading(true);
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        const endcodeId = showDialogCERef.current.id.replace(/^#/, "%23");
        await axios.put(`/color/update/${endcodeId}`, colorDto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        const endcodeId = showDialog.id.replace(/^#/, "%23");
        await axios.delete(`/color/delete/${endcodeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setColorData(colorData.filter((item) => item.id !== showDialog.id));
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
        Add new color
      </Button>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Code</th>
            <th className="px-6 py-4 font-medium text-gray-900">Color</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {colorData.length > 0 &&
            colorData.map((item) => (
              <tr key={item.id}>
                <td className="flex items-center justify-center p-2 font-medium text-gray-800">
                  <div
                    className="w-12 h-12 rounded-full"
                    style={{
                      backgroundColor: item.id,
                      boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
                    }}
                  ></div>
                </td>
                <td className="p-2">{item.name}</td>
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
        title="color"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DialogCEColor
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitColor={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Color"
        dataToEdit={showDialogCE.dataToEdit}
        loading={loading}
      />
      <DialogAlert show={showAlert} cancel={handleCloseAlert} />
    </>
  );
};

export default ColorManage;
