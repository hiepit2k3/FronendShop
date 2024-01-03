import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const SelectDefault = ({
  mainClassName,
  className,
  title,
  options,
  className2,
  control,
  name,
  errors,
  disabled,
  selectDefault,
}) => {
  const selectClasses = `border ${className}`;
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <>
      <div className={mainClassName}>
        {title && <label className={className2}>{title}</label>}
        <select disabled={disabled} className={selectClasses} {...field}>
          <option value="">{selectDefault}</option>
          {options &&
            options.map((item, index) => (
              <option value={item.value} key={index}>
                {item.name}
              </option>
            ))}
        </select>
        {errors?.[name] && (
          <p className="mt-2 ml-1 text-xs text-red-500">
            {errors?.[name]?.message}
          </p>
        )}
      </div>
    </>
  );
};

SelectDefault.propTypes = {
  mainClassName: PropTypes.string,
  className: PropTypes.string,
  className2: PropTypes.string,
  control: PropTypes.any.isRequired,
  name: PropTypes.string,
  value: PropTypes.bool,
  title: PropTypes.string,
  options: PropTypes.array,
  errors: PropTypes.object,
  disabled: PropTypes.bool,
  selectDefault: PropTypes.string,
};

export default SelectDefault;
