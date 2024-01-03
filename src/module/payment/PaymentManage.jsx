import axios from "../../config/axios.js";
import { useEffect, useRef, useState } from "react";
import DialogDelete from "../../components/dialog/DialogDelete";
import Button from "../../components/button/Button";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import DiaLogCEPayment from "./DiaLogCEPayment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/authSlice.jsx";
import DialogAlert from "../../components/dialog/DialogAlert";

const PaymentManage = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [showAlert, setShowAlert] = useState(false);
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
    paymentDataToEdit: {},
  });

  const showDialogCERef = useRef(null);

  const [showDialog, setShowDialog] = useState({
    show: false,
    id: null,
  });

  const [paymentData, setPaymentData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/payment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPaymentData(response.data);
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
        paymentDataToEdit: {},
      });
    } else {
      setShowAlert(true);
    }
  };
  const handleCreate = async (data) => {
    if (!showDialogCERef.current.show) return;
    const formData = new FormData();
    formData.append("imageFile", data.image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    try {
      setLoading(true);
      await axios.post("/payment/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      handleCloseDialogCE();
      toast.success("🦄 Add new payment successfully", {
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
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleUpdateTrue = (id) => {
    if (user.path === 0) {
      const dataEdit = paymentData.find((item) => item.id === id);
      setShowDialogCE({
        show: true,
        id: id,
        isUpdate: true,
        action: handleUpdate,
        paymentDataToEdit: dataEdit,
      });
    } else {
      setShowAlert(true);
    }
  };

  const handleUpdate = async (data) => {
    if (!showDialogCERef.current.show && !showDialogCERef.current.id) return;
    const formData = new FormData();
    typeof data.image === "string"
      ? formData.append("image", data.image)
      : formData.append("imageFile", data.image);
    formData.append("id", showDialogCERef.current.id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    try {
      setLoading(true);
      await axios.put(
        `/payment/update/${showDialogCERef.current.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      handleCloseDialogCE();
      toast.success("🦄 Edit payment successfully", {
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
    } catch (err) {
      setLoading(false);
      console.log(err);
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
        await axios.delete(`/payment/delete/${showDialog.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPaymentData(paymentData.filter((item) => item.id !== showDialog.id));
        fetchData();
        handleCloseDialog();
        toast.success("🦄 Delete payment successfully!", {
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
      paymentDataToEdit: {},
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
        Add new Payment
      </Button>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th className="px-6 py-4 font-medium text-gray-900">Image</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {paymentData.map((item) => (
            <tr key={item.id} className="">
              <td className="p-2 font-medium text-gray-800">{item.name}</td>
              <td className="flex items-center justify-center p-2">
                <div></div>
                <img
                  src={`data:image/png;base64,${item.image}`}
                  alt={item.name}
                  style={{ width: "100px" }}
                />
              </td>
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
      <DialogDelete
        show={showDialog.show}
        title="payment"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DiaLogCEPayment
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitPayment={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Payment"
        paymentDataToEdit={showDialogCE.paymentDataToEdit}
        loading={loading}
      />
      <DialogAlert show={showAlert} cancel={handleCloseAlert} />
    </>
  );
};

export default PaymentManage;
