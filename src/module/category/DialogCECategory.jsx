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
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const DialogCECategory = ({
  show,
  isUpdate,
  handleSubmitCategory,
  cancel,
  title,
  categoryDataToEdit,
  loading,
}) => {
  const schema = yup
    .object({
      name: yup.string().required("Please enter category name"),
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
        description: "",
      });
    } else {
      reset(categoryDataToEdit);
    }
  }, [categoryDataToEdit, show, reset]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitCategory(data);
    reset({
      name: "",
      description: "",
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
            <div className="flex flex-col items-center justify-center gap-3">
              <Input
                name="name"
                label="Name"
                placeholder="Enter name category"
                className="w-full"
                control={control}
                errors={errors}
              />
              <Textarea
                name="description"
                label="Description"
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

DialogCECategory.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitCategory: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  categoryDataToEdit: PropTypes.object,
  loading: PropTypes.bool,
};

export default DialogCECategory;
