import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { Textarea as TestArea } from "@material-tailwind/react";

const Textarea = ({ label, control, errors, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <>
      <TestArea label={label} {...field} {...props}></TestArea>
      {errors[props.name] && (
        <p className="mt-2 ml-1 text-xs text-red-500">
          {errors[props.name].message}
        </p>
      )}
    </>
  );
};

Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  errors: PropTypes.object,
};
export default Textarea;
