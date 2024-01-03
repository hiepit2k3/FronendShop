import PropTypes from "prop-types";

const Label = ({ children, onClick, className }) => {
  return (
    <label htmlFor="htmlFor" className={className} onClick={onClick}>
      {children}
    </label>
  );
};
Label.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Label;
