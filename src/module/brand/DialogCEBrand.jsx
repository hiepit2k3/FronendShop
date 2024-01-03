import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/button/Button";
import Textarea from "../../components/textarea/Textarea";
import Input from "../../components/input/Input";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const DialogCEBrand = ({
  show,
  isUpdate,
  handleSubmitBrand,
  cancel,
  title,
  brandDataToEdit,
  loading,
}) => {
  const schema = yup
    .object({
      ...(!isUpdate && {
        image: yup.mixed().test("file", "Please choose a image file", (value) => {
          if (value instanceof File) {
            const acceptedExtensions = [".jpg", ".jpeg", ".png"];
            const fileExtension = value.name.split(".").pop().toLowerCase();
            return acceptedExtensions.includes(`.${fileExtension}`);
          } else if (typeof value === "string") {
            const imageExtensions = [".jpg", ".jpeg", ".png"];
            return imageExtensions.some((extension) =>
              value.toLowerCase().endsWith(extension)
            );
          }
          return false; // Trường hợp khác không hợp lệ
        })
      }),
      name: yup.string().required("Please enter brand name"),
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
      reset(brandDataToEdit);
    }
  }, [brandDataToEdit, reset, show]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitBrand(data);
    reset({
      image: "",
      name: "",
      description: "",
    });
  };
  return (
    <>
      <Dialog open={show} size="sm">
        {isUpdate ? (
          <DialogHeader className="text-lg">Edit {title}</DialogHeader>
        ) : (
          <DialogHeader className="text-lg">Add New {title}</DialogHeader>
        )}
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="grid items-center justify-center grid-cols-2 gap-4">
              <div className="grid gap-1">
                <ImageUpload
                  name="image"
                  className="w-full"
                  control={control}
                  isUpdate={isUpdate}
                  errors={errors}
                ></ImageUpload>
              </div>
              <div className="grid gap-2">
                <Input
                  label="Name"
                  name="name"
                  placeholder="Enter name brand"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <div className="w-full mt-2">
                  <Textarea
                    label="Description"
                    name="description"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-red-500" onClick={cancel}>
                Cancle
              </Button>
              <Button
                className="ml-2 bg-green-500"
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
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

DialogCEBrand.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitBrand: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  brandDataToEdit: PropTypes.object,
  loading: PropTypes.bool,
};

export default DialogCEBrand;
