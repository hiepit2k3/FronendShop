import PropTypes from "prop-types";
import { Checkbox as CheckButton } from "@material-tailwind/react";
import { useController } from "react-hook-form";
const Checkbox = ({ label, ripple, className, control, errors, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: false,
  });
  return (
    <>
      <CheckButton
        label={label}
        ripple={ripple}
        name={props.name}
        className={className}
        value={props.value}
        checked={field.value}
        {...field}
      />
      {errors[props.name] && (
        <p className="mt-2 ml-1 text-xs text-red-500">
          {errors[props.name].message}
        </p>
      )}
    </>
  );
};
Checkbox.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  ripple: PropTypes.bool,
  control: PropTypes.any.isRequired,
  value: PropTypes.bool,
  name: PropTypes.string,
  errors: PropTypes.object,
};
export default Checkbox;
