import { BsTrash } from "react-icons/bs";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from "../../redux/features/cartSlice";
import { toast } from "react-toastify";

const CartCard = ({ cartData }) => {
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(deleteItem(cartData.productVariantId));
    toast.success("🦄 Delete successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity({ productVariantId: cartData.productVariantId }));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity({ productVariantId: cartData.productVariantId }));
  };
  return (
    <>
      <div className="flex gap-5 my-5 w-[750px] h-52">
        <img
          src={cartData.image}
          alt=""
          className="object-cover w-[200px] h-full"
        />
        <div className="flex flex-col w-[400px] gap-5">
          <div className="flex flex-col items-start gap-3">
            <p className="text-lg font-medium not-italic font-eculid text-[#374151]">
              {cartData.name}
            </p>
            <span className="font-eculid font-bold text-[16px] text-[#1F2937] not-italic">
              ${cartData.price}
            </span>
          </div>
          <div className="flex flex-col items-start gap-3">
            <h5 className="text-sm not-italic font-semibold font-eculid">
              Color:
            </h5>
            <div className="flex gap-2">
              <span
                className={`w-8 h-8 border-none rounded-full outline-none cursor-pointer hover:opacity-100`}
                style={{ backgroundColor: cartData.color }}
              ></span>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="flex gap-2 p-2 py-2 rounded-md shadow-3xl">
              <h5 className="text-base not-italic font-semibold font-eculid">
                Size:{" "}
              </h5>
              <span className="text-base not-italic font-normal font-eculid">
                {cartData.size}
              </span>
            </div>
            <div className="flex items-center h-10 gap-2 p-3 rounded-md shadow-3xl outline-2 w-28">
              <button
                className="flex items-center justify-center"
                onClick={handleDecreaseQuantity}
              >
                <FaMinusCircle />
              </button>
              <span
                type="number"
                min="0"
                className="flex items-center justify-center w-20 text-base"
              >
                {cartData.quantity}
              </span>
              <button
                className="flex items-center justify-center"
                onClick={handleIncreaseQuantity}
              >
                <FaPlusCircle />
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex w-[150px] gap-2 items-center justify-center cursor-pointer"
          onClick={handleRemove}
        >
          <BsTrash className="w-5 h-5" size={"100px"} />
          <p className="text-sm not-italic font-normal font-eculid">
            Remove Item
          </p>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1072 2"
        fill="none"
        className="w-[750px] h-1"
      >
        <path d="M0 1L1072 0.999887" stroke="#D1D5DB" />
      </svg>
    </>
  );
};

CartCard.propTypes = {
  cartData: PropTypes.object.isRequired,
};

export default CartCard;
