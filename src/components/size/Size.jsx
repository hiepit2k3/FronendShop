import PropTypes from "prop-types";

const Size = ({ size = [], onSizeChange, selectedSize }) => {
  const classNames = `w-8 h-8 bg-gray-300 border-none rounded-full relative outline-none opacity-50 cursor-pointer hover:opacity-100 flex items-center justify-center`;
  const sizeOrder = ["S", "M", "L", "XL", "XXL"];
  const sortedSizes = [...new Set(size.map((item) => item.size))].sort(
    (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
  );
  return (
    <>
      <div className="flex gap-4">
        {sortedSizes.map((uniqueSize) => {
          const isSelected = selectedSize === uniqueSize;
          const selectedClass = isSelected ? 'scale-125 text-sm font-bold border-2 border-black' : '';
          const spanClassNames = `${classNames} ${selectedClass}`;
          return (
            <span
              key={uniqueSize}
              className={spanClassNames}
              onClick={() => onSizeChange(uniqueSize)}
            >
              {uniqueSize}
            </span>
          );
        })}
      </div>
    </>
  );
};

Size.propTypes = {
  size: PropTypes.array.isRequired,
  selectedSize: PropTypes.string,
  onSizeChange: PropTypes.func.isRequired,
};

export default Size;
