import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const Select = ({
  mainClassName,
  className,
  title,
  options,
  className2 = "text-blue-gray-500 text-sm",
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
            options.map((item) => (
              <option value={item.id} key={item.id}>
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

Select.propTypes = {
  mainClassName: PropTypes.string,
  className: PropTypes.string,
  className2: PropTypes.string,
  control: PropTypes.any.isRequired,
  name: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  selectDefault: PropTypes.string,
  errors: PropTypes.object,
};

export default Select;