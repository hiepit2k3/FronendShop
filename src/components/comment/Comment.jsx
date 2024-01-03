import PropTypes from "prop-types";
import { Rating } from "@material-tailwind/react";

const Comment = ({ items }) => {
  const { accountDto, date, comment, rate } = items;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1072 2"
        fill="none"
        className="w-full h-1 my-3"
      >
        <path d="M0 1L1072 0.999887" stroke="#D1D5DB" />
      </svg>
      <div className="grid grid-cols-12 mx-2 my-4">
        <div className="flex justify-center ">
          <img
            src={accountDto.image}
            alt="avatar"
            className="rounded-full w-14 h-14"
          />
        </div>

        <div className="flex flex-col col-span-11 gap-2 mx-2">
          <p>{accountDto.fullName}</p>
          <p>{date}</p>
          <Rating value={rate} readonly />
          <p>{comment}</p>
        </div>
      </div>
    </>
  );
};

Comment.propTypes = {
  items: PropTypes.object,
};

export default Comment;
