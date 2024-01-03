import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Textarea from "../../components/textarea/Textarea";
import Input from "../../components/input/Input";
import { useEffect, useState } from "react";
import Select from "../../components/select/Select";
import axios from "../../config/axios.js";
import SelectDefault from "../../components/select/SelectDefault.jsx";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/authSlice";
import ClipLoader from "react-spinners/ClipLoader";

const DialogCEFeedback = ({
  show,
  isUpdate,
  handleSubmitFeedback,
  cancel,
  title,
  feedbackDataToEdit,
  loading,
}) => {
  const feedbackEdit = [
    { id: 1, value: true, name: "Đã được xử lý" },
    { id: 2, value: false, name: "Chưa được xử lý" },
  ];
  const token = useSelector(selectCurrentToken);
  const [problem, setProblem] = useState([]);
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get("/problem", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProblem(response.data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    fetchProblem();
  }, [token]);

  const schema = yup
    .object({
      email: yup.string().required("Please enter your email"),
      phoneNumber: yup.string().required("Please enter your phone number"),
      problemId: yup.string().required("Please enter problem"),
      date: yup.string().required("Please enter date"),
      description: yup.string().required("Please enter description"),
      status: yup.string().required("Please enter status"),
    })
    .required();
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (!show) {
      reset({
        phoneNumber: "",
        email: "",
        problemId: "",
        date: "",
        description: "",
        status: "",
      });
    } else {
      reset(feedbackDataToEdit);
    }
  }, [feedbackDataToEdit, show, reset]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitFeedback(data);
    reset({
      phoneNumber: "",
      email: "",
      problemId: "",
      date: "",
      description: "",
      status: false,
    });
  };
  return (
    <>
      <Dialog open={show} size="xs">
        {isUpdate ? (
          <DialogHeader className="text-lg text-center">
            Edit {title}
          </DialogHeader>
        ) : (
          <DialogHeader className="text-lg text-center">
            Add New {title}
          </DialogHeader>
        )}
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-col justify-center gap-3">
              <Input
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter phone number"
                className="w-full"
                control={control}
                errors={errors}
                disabled={true}
              />
              <Input
                name="email"
                label="email"
                placeholder="Enter email"
                className="w-full"
                control={control}
                errors={errors}
                disabled={true}
              />
              <Input
                name="date"
                label="date"
                type="date"
                placeholder="Enter date"
                className="w-full"
                control={control}
                disabled={true}
                errors={errors}
              />
              <Select
                className2="text-sm ml-1 font-normal"
                className="p-[10px] rounded-lg border-blue-gray-300 w-full"
                title="Problem :"
                name="problemId"
                control={control}
                errors={errors}
                options={problem}
                disabled={true}
              >
                {problem.map((problem) => (
                  <option key={problem.id} value={problem.id}>
                    {problem.name}
                  </option>
                ))}
              </Select>
              <SelectDefault
                className2="text-sm ml-1 font-normal"
                className="p-[10px] rounded-lg border-blue-gray-300 w-full"
                title="Status :"
                name="status"
                control={control}
                errors={errors}
                options={feedbackEdit}
              />

              <Textarea
                name="description"
                label="Description"
                control={control}
                disabled={true}
              />
            </div>
            <DialogFooter className="float-right">
              <div className="flex items-center justify-center gap-2">
                <Button className="bg-red-500" onClick={cancel}>
                  Cancle
                </Button>
                <Button
                  className="bg-green-500"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {loading ? (
                    <ClipLoader
                      color="#fff"
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

DialogCEFeedback.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitFeedback: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  feedbackDataToEdit: PropTypes.object,
  loading: PropTypes.bool,
};

export default DialogCEFeedback;
