
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import PropTypes from 'prop-types';
const Pagination = ({ currentPage, totalPages, onChange }) => {
  // Tạo danh sách các nút giao diện cho trang
  const pages = [];
  for (let number = 0; number < totalPages; number++) {
    pages.push(
      <Button
        key={number}
        onClick={() => onChange(number)}
        className={number === currentPage ? 'bg-white text-black rounded-2xl border-2 border-black' : 'rounded-2xl border'}
        disabled={number === currentPage}
      >
        {number + 1}
      </Button>
    );
  }
  return (
    <div className="flex items-center gap-4">
      {/* Thêm nút quay lại, sử dụng IconButton */}
      <IconButton
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </IconButton>
      {/* Danh sách trang */}
      {pages}
      {/* Thêm nút tiến tới, sử dụng IconButton */}
      <IconButton
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === (totalPages - 1)}
      >
        <ArrowRightIcon className="w-5 h-5" />
      </IconButton>
    </div>
  );
};
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Pagination;
