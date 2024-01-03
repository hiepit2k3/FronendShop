import PropTypes from "prop-types";

const Color = ({ availableColors = [], onColorChange, selectedColor }) => {
  const classNames = `w-8 h-8 border rounded-full outline-none cursor-pointer hover:opacity-100 relative flex items-center justify-center`;
  const borderStyle = `text-sm font-bold border-2 border-gray-300`;
  const selectedStyle = `scale-125`;

  const sortedColors = [...availableColors].sort((colorA, colorB) => {
    const rgbToInt = (color) => parseInt(color.substring(1), 16);
    return rgbToInt(colorA) - rgbToInt(colorB);
  });

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        {sortedColors.map((uniqueColor) => {
          const isWhite = uniqueColor.toUpperCase() === "#FFFFFF";
          const isSelected = uniqueColor === selectedColor;
          const colorStyle = {
            backgroundColor: uniqueColor,
            ...(isWhite && { boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)" }),
          };

          return (
            <span
              key={uniqueColor}
              className={`${classNames} ${isWhite ? borderStyle : ""} ${
                isSelected ? selectedStyle : ""
              }`}
              style={colorStyle}
              onClick={() => onColorChange(uniqueColor)}
            ></span>
          );
        })}
      </div>
    </>
  );
};

Color.propTypes = {
  color: PropTypes.array.isRequired,
  selectedColor: PropTypes.string,
  onColorChange: PropTypes.func.isRequired,
  availableColors: PropTypes.array.isRequired, // Thêm prop mới
};

export default Color;
