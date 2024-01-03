import PropTypes from "prop-types";
const Heading = ({ className = "", children }) => {
  return (
    <h2
      className={`font-eculid text-[#374151] font-semibold uppercase text-[24px] ${className}`}
    >
      {children}
    </h2>
  );
};

Heading.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};
export default Heading;
