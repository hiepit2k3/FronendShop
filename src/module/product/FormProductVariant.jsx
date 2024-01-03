import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import SelectDefault from "../../components/select/SelectDefault";
import Button from "../../components/button/Button";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import axios from "../../config/axios.js";
import Color from "../../components/color/Color.jsx";

const FormProductVariant = ({ index, onSubmitCallback }) => {
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

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
    [`image-${index}`]: yup
      .mixed()
      .test("file", "Please choose a image file", (value) => {
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
    [`size-${index}`]: yup.string().required("Please choose size"),
    // [`colorId-${index}`]: yup.string().required("Please choose color"),
    [`quantity-${index}`]: yup.number().required("Please enter quantity"),
    [`price-${index}`]: yup.number().required("Please enter price"),
  });

  const {
    formState: { errors: dynamicFormErrors, isValid: dynamicForm },
    control: dynamicFormControl,
    handleSubmit: handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const productVariant = (data, index) => {
    if (isSaved === true) return;
    const lastData = {
      ...data,
      [`colorId-${index}`]: color,
    };
    onSubmitCallback(lastData, index);
    // Truyền dữ liệu về component gọi ProductVariantForm
  };

  const onSubmit = (data) => {
    if (!dynamicForm) return;
    setIsSaved(!isSaved);
    productVariant(data, index);
  };

  const handleColorChange = (color) => {
    setColor(color);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid items-center justify-center"
      >
        <div className="grid grid-row items-center justify-center gap-3">
          <div className="grip-col">
            <ImageUpload
              name={`image-${index}`}
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
                      name={`quantity-${index}`}
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
                      name={`price-${index}`}
                      placeholder="Enter price product variant"
                      className=""
                      control={dynamicFormControl}
                      errors={dynamicFormErrors}
                      disabled={isSaved}
                    />
                    <SelectDefault
                      mainClassName=""
                      className2="text-sm ml-1 font-normal"
                      className="p-2 rounded-lg border-blue-gray-300 w-full"
                      title="Size"
                      selectDefault="Select size"
                      name={`size-${index}`}
                      options={[
                        { id: 0, name: "S", value: "S" },
                        { id: 1, name: "M", value: "M" },
                        { id: 2, name: "L", value: "L" },
                        { id: 3, name: "XL", value: "XL" },
                        { id: 4, name: "XXL", value: "XXL" },
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
                      name={`colorId-${index}`}
                      selectedColor={color}
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
              className="w-[100px] items-center justify-end"
              type="submit"
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
  index: PropTypes.number.isRequired,
  onSubmitCallback: PropTypes.func.isRequired,
};

export default FormProductVariant;
