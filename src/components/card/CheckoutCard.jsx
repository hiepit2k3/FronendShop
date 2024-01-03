import PropTypes from "prop-types";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteItem } from "../../redux/features/cartSlice";

const CheckoutCard = ({ cartData }) => {
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
  return (
    <div className="flex gap-4">
      <img src={cartData.image} alt="image" className="w-48 h-48" />
      <div className="flex flex-col w-[220px] gap-3">
        <p className="text-lg font-medium font-eculid">{cartData.name}</p>
        <p className="text-lg font-semibold font-eculid">${cartData.price}</p>
        <p className="flex gap-2 text-lg font-medium font-eculid">
          Color:
          <span
            className="w-5 h-5 mt-1 border-none rounded-full outline-none cursor-pointer hover:opacity-100"
            style={{ backgroundColor: cartData.color }}
          ></span>
        </p>

        <p className="flex gap-2 text-lg font-medium font-eculid">
          Size: {cartData.size}
        </p>
        <p className="flex gap-2 text-lg font-medium font-eculid">
          Quantity: {cartData.quantity}
        </p>
      </div>
      <div
        className="flex w-[150px] gap-2 items-center justify-center hover:cursor-pointer"
        onClick={handleRemove}
      >
        <BsTrash className="w-5 h-5" size={"100px"} />
        <p className="text-sm not-italic font-normal font-eculid">
          Remove Item
        </p>
      </div>
    </div>
  );
};
CheckoutCard.propTypes = {
  cartData: PropTypes.object.isRequired,
};
export default CheckoutCard;
