import { Radio } from "@material-tailwind/react";
import PropTypes from "prop-types";

const RadioFilter = ({
  color = "blue-gray",
  label,
  labelRadio,
  className,
  name,
  onChange,
  value,
  ripple,
}) => {
  return (
    <div className={className}>
      <div>{labelRadio}</div>
      <Radio
        color={color}
        label={label}
        name={name}
        ripple={ripple}
        value={value}
        onChange={onChange}
      ></Radio>
    </div>
  );
};
RadioFilter.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  ripple: PropTypes.bool,
  label: PropTypes.string,
  labelRadio: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default RadioFilter;
