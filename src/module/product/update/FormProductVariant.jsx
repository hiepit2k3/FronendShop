// ProductVariantForm.jsx
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../../../components/input/Input";
import SelectDefault from "../../../components/select/SelectDefault";
import ImageUpload from "../../../components/imageUpload/ImageUpload";
import PropTypes from "prop-types";
import axios from "../../../config/axios.js";
import Color from "../../../components/color/Color.jsx";
import Button from "../../../components/button/Button.jsx";

const FormProductVariant = ({ onSubmitCallback, initialData, isUpdate }) => {
  const [colors, setColors] = useState([]);
  const [chooseColor, setChooseColor] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleColorChange = (color) => {
    setChooseColor(color);
  };

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get("/color");
        setColors(response.data.map((color) => color.id));
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    fetchColors();
  }, []);

  const schema = yup.object({
    ...(!isUpdate && {
      [`image`]: yup.mixed().test("file", "Please choose a image file", (value) => {
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
    [`size`]: yup.string().required("Please choose size"),
    [`colorId`]: yup.string().required("Please choose color"),
    [`quantity`]: yup.string().required("Please enter quantity"),
    [`price`]: yup.string().required("Please enter price"),
  });

  const {
    formState: { errors: dynamicFormErrors, isValid: dynamicForm },
    control: dynamicFormControl,
    handleSubmit: handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const productVariant = (data, index) => {
    if (isSaved === true) return;
    const lastData = {
      ...data,
      [`colorId`]: chooseColor,
    };
    onSubmitCallback(lastData, index);
    // Truyền dữ liệu về component gọi ProductVariantForm
  };

  const handleChangeSave = () => {
    if (!dynamicForm && !isSaved) return;
    setIsSaved(!isSaved);
  };

  const onSubmit = (data) => {
    if (!dynamicForm) return;
    setIsSaved(!isSaved);
    productVariant(data);
  };
  useEffect(() => {
    setChooseColor(initialData.colorId);
    if (initialData) {
      console.log(initialData);
      // Populate the form with initialData
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid items-center justify-center"
      >
        <div className="grid grid-row items-center justify-center gap-3">
          <div className="grip-col">
            <ImageUpload
              isUpdate={isUpdate}
              name={`image`}
              className="w-full"
              control={dynamicFormControl}
              errors={dynamicFormErrors}
              disabled={isSaved}
            />
          </div>
          <div className="grid grid-flow-col">
            <div className="flex flex-col gap-3 p-1">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <div className="grid grid-flow-col gap-3">
                    <Input
                      label="Quantity"
                      name={`quantity`}
                      placeholder="Enter quantity product variant"
                      className="w-full"
                      control={dynamicFormControl}
                      errors={dynamicFormErrors}
                      disabled={isSaved}
                    />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <Input
                      label="Price"
                      name={`price`}
                      placeholder="Enter price product variant"
                      className="w-full"
                      control={dynamicFormControl}
                      errors={dynamicFormErrors}
                      disabled={isSaved}
                    />
                    <SelectDefault
                      mainClassName="flex flex-col"
                      className2="text-sm ml-1 font-normal"
                      className="p-2 rounded-lg border-blue-gray-300 w-[200px]"
                      title="Size"
                      selectDefault="Select size"
                      name={`size`}
                      options={[
                        { id: 0, name: "S", value: "S" },
                        { id: 1, name: "M", value: "M" },
                        { id: 2, name: "L", value: "L" },
                        { id: 3, name: "XL", value: "XL" },
                        { id: 4, name: "XL", value: "XL" },
                      ]}
                      control={dynamicFormControl}
                      errors={dynamicFormErrors}
                      disabled={isSaved}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-normal">Color:</div>
                  <div className="flex">
                    <Color
                      color={[]}
                      name={`colorId}`}
                      selectedColor={chooseColor}
                      availableColors={colors}
                      onColorChange={handleColorChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 flex items-center justify-center">
            <Button
              className="w-[150px]"
              type="submit"
            // onClick={handleChangeSave}
            >
              {isSaved ? "Edit" : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
FormProductVariant.propTypes = {
  isUpdate: PropTypes.bool,
  onSubmitCallback: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default FormProductVariant;
