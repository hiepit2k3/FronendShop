import PropTypes from "prop-types";
import { Radio } from "@material-tailwind/react";
import { useController } from "react-hook-form";
const RadioButton = ({
  color = "blue-gray",
  label,
  labelRadio,
  className,
  name,
  ripple,
  value,
  errors,
  control,
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: value,
  });
  return (
    <div className={className}>
      <div>{labelRadio}</div>
      <Radio
        color={color}
        label={label}
        name={name}
        ripple={ripple}
        checked={field.value === value} // Sử dụng checked thay vì defaultChecked
        onChange={() => field.onChange(value)} // Cập nhật giá trị của trường thủ công
      ></Radio>
      {errors.name && (
        <p className="mt-2 ml-1 text-xs text-red-500">{errors.name.message}</p>
      )}
    </div>
  );
};
RadioButton.propTypes = {
  errors: PropTypes.object,
  color: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.bool,
  name: PropTypes.string,
  ripple: PropTypes.bool,
  label: PropTypes.string,
  labelRadio: PropTypes.string,
  control: PropTypes.any.isRequired,
};

export default RadioButton;
