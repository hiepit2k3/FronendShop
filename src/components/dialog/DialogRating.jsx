import {
  Dialog,
  DialogBody,
  DialogHeader,
  Rating,
  Textarea,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import Button from "../button/Button";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "../../config/axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/authSlice";

const DialogRating = ({ show, handleClose, productId, orderDetailId }) => {
  const token = useSelector(selectCurrentToken);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleRatingChange = (value) => {
    setRatingValue(value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleDialogClose = () => {
    setRatingValue(0);
    setReviewText("");
    handleClose();
  };

  const handleSubmitReview = async () => {
    const data = {
      productId: productId,
      comment: reviewText,
      rate: ratingValue,
    };
    try {
      await axios.post(
        `/evaluate/create?orderDetailId=${orderDetailId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    setRatingValue(0);
    setReviewText("");
    handleClose();
  };
  return (
    <Dialog open={show}>
      <DialogHeader className="flex justify-between">
        <span>Please leave your review below.</span>
        <span className="cursor-pointer" onClick={handleDialogClose}>
          <IoMdClose />
        </span>
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-col items-center justify-center gap-5">
          <Rating value={ratingValue} onChange={handleRatingChange} />
          <Textarea value={reviewText} onChange={handleReviewTextChange} />
        </div>
        <div className="flex justify-end mt-5">
          <Button variant="filled" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};
DialogRating.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  productId: PropTypes.string,
  orderDetailId: PropTypes.string,
};
export default DialogRating;
