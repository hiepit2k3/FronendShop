import PropTypes from "prop-types";

const LoadingSkeleton = ({ className, height, width, radius }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        height: height,
        width: width || "100%",
        borderRadius: radius,
      }}
    ></div>
  );
};

LoadingSkeleton.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  radius: PropTypes.string,
};

export default LoadingSkeleton;
