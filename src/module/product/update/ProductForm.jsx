// ProductForm.jsx
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Input from "../../../components/input/Input";
import SelectDefault from "../../../components/select/SelectDefault";
import Button from "../../../components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUpload from "../../../components/imageUpload/ImageUpload";
import Select from "../../../components/select/Select";
import axios from "../../../config/axios";
import Textarea from "../../../components/textarea/Textarea.jsx";
import DialogHashtag from "../../../components/dialog/DialogHashtag.jsx";
import PropTypes from "prop-types";

const ProductForm = ({ onSubmitCallback, initialData, hashtags, isUpdate }) => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectHashTag, setSelectHashtag] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [openDialogHashtag, setDialogHashtag] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("/brand");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchCategory();
  }, []);

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
      name: yup.string().required("Please enter product name"),
      season: yup.string().required("Please enter product season"),
      gender: yup.string().required("Please enter product gender"),
      categoryId: yup.string().required("Please enter product category"),
      brandId: yup.string().required("Please enter product brand"),
    })
    .required();

  const {
    formState: { errors, isValid: dynamicForm },
    control,
    handleSubmit: handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const typeGender = [
    {
      id: 1,
      name: "MALE",
      value: "MALE",
    },
    {
      id: 2,
      name: "FEMALE",
      value: "FEMALE",
    },
    {
      id: 3,
      name: "OTHER",
      value: "OTHER",
    },
  ];

  const typeSeason = [
    {
      id: 1,
      name: "SUMMER",
      value: "SUMMER",
    },
    {
      id: 2,
      name: "WINTER",
      value: "WINTER",
    },
  ];

  const handleFormSubmit = (data, e) => {
    e.preventDefault();
    const extractedData = selectHashTag.map((item) => ({
      hashtagId: item.id,
    }));
    const finalData = {
      ...data,
      hashtags: extractedData,
    };
    onSubmitCallback(finalData);
  };

  const handleChangeSave = () => {
    if (!dynamicForm) return;
    setIsSaved(!isSaved);
  };

  const handleOpenDialogHashtag = () => {
    setDialogHashtag(true);
  };

  const handleCloseDialogHashtag = () => {
    setDialogHashtag(false);
  };

  const handleUseHashtag = (useHashtag) => {
    // Thêm hashtag vào trạng thái của component
    setSelectHashtag([...selectHashTag, useHashtag]);
    setSelectedHashtags([...selectedHashtags, useHashtag]);
  };

  const handleDeleteHashtag = (useHashtag) => {
    // Loại bỏ hashtag khỏi trạng thái của component
    setSelectHashtag((prevSelectHashtag) =>
      prevSelectHashtag.filter((item) => item.id !== useHashtag.id)
    );
    setSelectedHashtags((prevSelectedHashtags) =>
      prevSelectedHashtags.filter((item) => item.id !== useHashtag.id)
    );
  };

  useEffect(() => {
    if (initialData) {
      // Đặt dữ liệu vào các trường form tương ứng
      reset(initialData);
      // Đặt các trạng thái khác nếu cần
      if (hashtags && hashtags.length > 0) {
        // Chèn các hashtag từ props vào trạng thái của component
        setSelectHashtag([...selectHashTag, ...hashtags]);
      }
    }
  }, [initialData, reset]);

  return (
    <div className="flex rounded w-full p-10">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-row gap-3">
          <div className="flex-col p-2">
            <ImageUpload
              isUpdate={isUpdate}
              name="image"
              className="w-[200px]"
              control={control}
              errors={errors}
              disabled={isSaved}
              size="w-[500px] h-[300px]"
            />
          </div>
          <div className="flex flex-col min-w-[635px] max-w-[635px]">
            <Input
              label="Name"
              name="name"
              placeholder="Enter name product"
              className="w-full p-2"
              control={control}
              errors={errors}
              disabled={isSaved}
            />
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center p-2">
                <SelectDefault
                  mainClassName="flex flex-col m-1"
                  className2="text-sm ml-1 font-normal"
                  className="p-2 rounded-lg border-blue-gray-300 w-full"
                  selectDefault="Select season"
                  title="Season"
                  name="season"
                  options={typeSeason}
                  control={control}
                  errors={errors}
                  disabled={isSaved}
                />
                <SelectDefault
                  mainClassName="flex flex-col"
                  className2="text-sm ml-1 font-normal"
                  className="p-2 rounded-lg border-blue-gray-300 w-full"
                  selectDefault="Select gender"
                  title="Gender"
                  name="gender"
                  options={typeGender}
                  control={control}
                  errors={errors}
                  disabled={isSaved}
                />
              </div>
              <div className="flex items-center justify-center p-2">
                <Select
                  mainClassName="flex flex-col m-1"
                  className2="text-sm ml-1 font-normal"
                  className="p-2 rounded-lg border-blue-gray-300 w-full"
                  selectDefault="Select category"
                  title="Category"
                  name="categoryId"
                  control={control}
                  errors={errors}
                  options={categories}
                  disabled={isSaved}
                />
                <Select
                  mainClassName="flex flex-col"
                  className2="text-sm ml-1 font-normal"
                  className="p-2 rounded-lg border-blue-gray-300 w-[170px]"
                  selectDefault="Select brand"
                  title="Brands"
                  name="brandId"
                  control={control}
                  errors={errors}
                  options={brands}
                  disabled={isSaved}
                />
              </div>
            </div>
            <div className="">
              <div className="pl-[15px] text-sm font-normal">Hashtag:</div>
              <div className="flex flex-wrap p-2">
                {selectHashTag.map((item) => (
                  <Button
                    className="w-auto rounded-full"
                    onClick={() => handleDeleteHashtag(item)}
                    key={item.id}
                    variant="outlined"
                    disabled={isSaved}
                  >
                    {item.name}
                  </Button>
                ))}
                <Button
                  className="w-[100px] rounded-full"
                  variant="outlined"
                  onClick={handleOpenDialogHashtag}
                  disabled={isSaved}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="mt-2 w-full">
              <Textarea
                label="Description"
                name="description"
                control={control}
                errors={errors}
                disabled={isSaved}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button
            className="w-[100px]"
            type="submit"
            onClick={handleChangeSave}
          >
            {!isSaved ? "Save" : "Edit"}
          </Button>
        </div>
      </form>
      <DialogHashtag
        show={openDialogHashtag}
        handleCloseDialogHashtag={handleCloseDialogHashtag}
        onUseDialogHashtag={handleOpenDialogHashtag}
        onSelectHashtag={handleUseHashtag}
        selectedHashtag={selectHashTag}
      />
    </div>
  );
};

ProductForm.propTypes = {
  isUpdate: PropTypes.bool,
  onSubmitCallback: PropTypes.func,
  onResetForm: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  initialData: PropTypes.object,
  hashtags: PropTypes.array,
};
export default ProductForm;
