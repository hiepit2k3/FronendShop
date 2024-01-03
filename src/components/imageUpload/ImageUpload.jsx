import Label from "../label/Label";
import imageAvail from "../../assets/images/imageAvail.jpg";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { useRef } from "react";

const ImageUpload = ({
  control,
  name,
  errors,
  isUpdate,
  disabled,
  size = "w-[200px] h-[150px]",
}) => {
  const inputRef = useRef(null);
  const {
    field: { onChange, value, ...fieldProps },
  } = useController({
    control,
    name,
  });
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };
  const handleChoosePhoto = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="">
        {value ? (
          <img
            src={
              isUpdate && typeof value === "string"
                ? `data:image/png;base64,${value}`
                : typeof value === "object" && value !== null
                  ? URL.createObjectURL(value)
                  : null
            }
            alt=""
            className={`object-cover rounded-md ${size}`}
          />
        ) : (
          <img
            src={imageAvail}
            alt="Image available"
            className={`object-cover ${size} rounded-md`}
          />
        )}
      </div>
      <Label
        className="mt-4 text-base font-medium cursor-pointer"
        onClick={handleChoosePhoto}
      >
        Choose the photo
      </Label>
      <input
        disabled={disabled}
        type="file"
        className="max-w-[100px] hidden"
        onChange={handleImage}
        {...fieldProps}
        ref={inputRef}
      />
      {errors.image && (
        <p className="mt-1 ml-1 text-xs text-red-500">{errors.image.message}</p>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any.isRequired,
  errors: PropTypes.object,
  isUpdate: PropTypes.bool,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ImageUpload;
