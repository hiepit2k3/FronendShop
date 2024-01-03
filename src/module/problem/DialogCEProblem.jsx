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
import Input from "../../components/input/Input";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const DialogCEProblem = ({
  show,
  isUpdate,
  handleSubmitProblem,
  cancel,
  title,
  dataToEdit,
  loading,
}) => {
  const schema = yup
    .object({
      name: yup.string().required("Please enter problem name"),
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
        name: "",
      });
    } else {
      reset(dataToEdit);
    }
  }, [dataToEdit, show, reset]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitProblem(data);
    reset({
      name: "",
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
            <div className="flex flex-col items-center justify-center">
              <Input
                name="name"
                label="Name"
                placeholder="Enter name problem"
                className="w-full"
                control={control}
                errors={errors}
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

DialogCEProblem.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitProblem: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  dataToEdit: PropTypes.object,
  loading: PropTypes.bool,
};

export default DialogCEProblem;
