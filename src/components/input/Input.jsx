import PropTypes from "prop-types";
import { Input as InputTailWind } from "@material-tailwind/react";
import { useController } from "react-hook-form";

const Input = ({
  variant = "outlined",
  control,
  className,
  icon = "",
  color,
  label,
  type = "text",
  disabled = false,
  errors,
  ...props
}) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  const sanitizedValue =
    field.value !== null && field.value !== undefined ? field.value : "";
  return (
    <>
      <div className={className}>
        <InputTailWind
          type={type}
          color={color}
          label={label}
          icon={icon}
          variant={variant}
          disabled={disabled}
          {...field}
          value={
            type === "datetime-local"
              ? sanitizedValue.slice(0, 16)
              : sanitizedValue
          }
        />
        {errors[props.name] && (
          <p className="mt-2 ml-1 text-xs text-red-500">
            {errors[props.name].message}
          </p>
        )}
      </div>
    </>
  );
};
Input.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  className: PropTypes.string,
  icon: PropTypes.any,
  errors: PropTypes.object,
  disabled: PropTypes.bool,
};
export default Input;
