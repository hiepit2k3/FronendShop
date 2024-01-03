import PropTypes from "prop-types";
import { Button as ButtonTailWind } from "@material-tailwind/react";
const Button = ({
  className = "w-[120px]",
  children,
  outline,
  onClick = () => {},
  type,
  ...props
}) => {
  return (
    <ButtonTailWind
      type={type}
      variant={outline}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonTailWind>
  );
};
Button.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  outline: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
