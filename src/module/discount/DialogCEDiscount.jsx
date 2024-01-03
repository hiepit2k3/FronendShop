import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import * as yup from "yup";
import axios from "../../config/axios.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useEffect, useState } from "react";
import Textarea from "../../components/textarea/Textarea";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import Select from "../../components/select/Select";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/authSlice.jsx";
import ClipLoader from "react-spinners/ClipLoader";

const DialogCEDiscount = ({
  show,
  isUpdate,
  handleSubmitDiscount,
  cancel,
  title,
  dataToEdit,
  loading,
}) => {
  //* Lấy dữ liệu từ category
  const [categories, setCategories] = useState([]);
  const token = useSelector(selectCurrentToken);
  useEffect(() => {
    // Gọi API để lấy danh sách category
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [token]);

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
      discount: yup
        .number()
        .transform((originalValue) => {
          const value = parseFloat(originalValue);
          return isNaN(value) || originalValue === "" ? undefined : value;
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
        .typeError("Please enter a valid date for Register Date")
        .required("Please enter Expiration Date"),
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
        discount: "",
        registerDate: "",
        expirationDate: "",
        description: "",
        categoryId: "",
      });
    } else {
      reset(dataToEdit);
    }
  }, [dataToEdit, show, reset]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitDiscount(data);
    reset({
      discount: "",
      registerDate: "",
      expirationDate: "",
      description: "",
      categoryId: "",
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
              <div className="grid gap-1">
                <ImageUpload
                  name="image"
                  control={control}
                  isUpdate={isUpdate}
                  errors={errors}
                ></ImageUpload>
                <Input
                  type="number"
                  name="discount"
                  label="Discount"
                  placeholder="Enter name discount"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <Input
                  type="date"
                  name="registerDate"
                  label="Register Date"
                  className="w-full mt-3"
                  control={control}
                  errors={errors}
                />
              </div>
              <div className="grid gap-3">
                <Input
                  type="date"
                  name="expirationDate"
                  label="Expiration Date"
                  className="w-full"
                  control={control}
                  errors={errors}
                />

                <Select
                  className2="text-sm ml-1 font-normal"
                  className="p-[10px] rounded-lg border-blue-gray-300"
                  title="Category :"
                  name="categoryId"
                  control={control}
                  errors={errors}
                  options={categories}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <Textarea
                  name="description"
                  label="Description"
                  className="w-full"
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

DialogCEDiscount.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitDiscount: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  dataToEdit: PropTypes.object,
  loading: PropTypes.bool,
};

export default DialogCEDiscount;
