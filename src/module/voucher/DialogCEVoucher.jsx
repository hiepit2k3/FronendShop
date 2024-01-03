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
import ImageUpload from "../../components/imageUpload/ImageUpload";
import SelectDefault from "../../components/select/SelectDefault";
import ClipLoader from "react-spinners/ClipLoader";
const DialogCEVoucher = ({
  show,
  isUpdate,
  handleSubmitVoucher,
  cancel,
  title,
  dataToEdit,
  loading,
}) => {
  const typeDiscount = [
    {
      id: 1,
      name: "PERCENT",
    },
    {
      id: 2,
      name: "FIXED",
    },
  ];
  const schema = yup
    .object({
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
      }),
      name: yup.string().required("Please enter voucher name"),
      discount: yup
        .number()
        .transform((originalValue) => {
          return isNaN(parseFloat(originalValue)) ? undefined : originalValue;
        })
        .typeError("Please enter a valid number for discount")
        .required("Please enter discount"),
      registerDate: yup
        .date()
        .transform((originalValue) => {
          return isNaN(Date.parse(originalValue)) ? undefined : originalValue;
        })
        .typeError("Please enter a valid date for Register Date")
        .required("Please enter Register Date"),
      expirationDate: yup
        .date()
        .transform((originalValue) => {
          return isNaN(Date.parse(originalValue)) ? undefined : originalValue;
        })
        .typeError("Please enter a valid date for Expiration Date")
        .required("Please enter Expiration Date"),
      quantity: yup
        .number()
        .transform((originalValue) => {
          return isNaN(parseFloat(originalValue)) ? undefined : originalValue;
        })
        .typeError("Please enter a valid number for quantity")
        .required("Please enter quantity"),
      minTotal: yup
        .number()
        .transform((originalValue) => {
          return isNaN(parseFloat(originalValue)) ? undefined : originalValue;
        })
        .typeError("Please enter a valid number for min total")
        .required("Please enter min total"),
      maxDiscount: yup
        .number()
        .transform((originalValue) => {
          return isNaN(parseFloat(originalValue)) ? undefined : originalValue;
        })
        .typeError("Please enter a valid number for max discount")
        .required("Please enter max discount"),
      typeDiscount: yup
        .string()
        .oneOf(["PERCENT", "FIXED"])
        .required("Please choose type discount"),
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
        image: "",
        name: "",
        quantity: "",
        typeDiscount: "PERCENT",
        discount: "",
        registerDate: "",
        expirationDate: "",
        minTotal: "",
        maxDiscount: "",
        description: "",
      });
    } else {
      reset(dataToEdit);
    }
  }, [dataToEdit, show, reset]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitVoucher(data);
    reset({
      image: "",
      name: "",
      quantity: "",
      typeDiscount: "PERCENT",
      discount: "",
      registerDate: "",
      expirationDate: "",
      minTotal: "",
      maxDiscount: "",
      description: "",
    });
  };

  return (
    <>
      <Dialog open={show}>
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
            <div className="grid items-center justify-center grid-cols-2 gap-3">
              <div className="grid gap-2">
                <ImageUpload
                  name="image"
                  control={control}
                  isUpdate={isUpdate}
                  errors={errors}
                ></ImageUpload>
                <Input
                  name="name"
                  label="Name"
                  className="w-full"
                  control={control}
                  errors={errors}
                />

                <Input
                  type="number"
                  name="quantity"
                  label="Quantity"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <SelectDefault
                  className2="text-sm ml-1 font-normal"
                  className="p-2 rounded-lg border-blue-gray-300"
                  title="Type Voucher :"
                  name="typeDiscount"
                  options={typeDiscount}
                  control={control}
                  errors={errors}
                />
              </div>
              <div className="grid gap-3">
                <Input
                  type="number"
                  name="discount"
                  label="Discount"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <Input
                  type="datetime-local"
                  name="registerDate"
                  label="Register Date"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <Input
                  type="datetime-local"
                  name="expirationDate"
                  label="Expiration Date"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <Input
                  type="number"
                  name="minTotal"
                  label="Min Total"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <Input
                  type="number"
                  name="maxDiscount"
                  label="Max Discount"
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

DialogCEVoucher.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitVoucher: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  dataToEdit: PropTypes.object,
  loading: PropTypes.bool,
};

export default DialogCEVoucher;
