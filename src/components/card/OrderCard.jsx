import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState } from "react";
import DialogRating from "../dialog/DialogRating";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/authSlice";
import ClipLoader from "react-spinners/ClipLoader";

const OrderCard = ({ orders }) => {
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectCurrentToken);
  const { orderDto, orderDetailsDto } = orders;
  const { purchaseDate, total } = orderDto;
  const handlePayOrder = async () => {
    try {
      setLoading(true);
      const responseVNPay = await axios.get(
        `/order/payment?orderId=${orderDto.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (responseVNPay) {
        const paymentUrl = responseVNPay.data;
        // Mở URL trong trình duyệt mới
        window.open(paymentUrl, "_blank");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-start justify-center gap-5 p-5 border border-blue-gray-400">
        <div className="flex items-center justify-between w-full gap-5 p-3 border">
          <div className="flex items-start justify-center gap-20">
            <div className="flex flex-col items-start justify-center gap-2">
              <span className="font-semibold">Purchased Date</span>
              <span className="text-blue-gray-400">{purchaseDate}</span>
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <span className="font-semibold">Total Amount</span>
              <span className="text-blue-gray-400">${total}</span>
            </div>
          </div>

          <div className="mr-10">
            {orderDto.typeOrder === "WAIT_TO_PAY" && (
              <Button
                variant="outlined"
                className="w-28"
                onClick={handlePayOrder}
              >
                {loading ? (
                  <ClipLoader
                    color="#333"
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Pay"
                )}
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-[660px] gap-5 mr-5">
          {orderDetailsDto.map((item) => (
            <OrderItem key={item.id} orderItems={item} orderDto={orderDto} />
          ))}
        </div>
      </div>
    </>
  );
};
const OrderItem = ({ orderItems, orderDto }) => {
  const {
    color,
    size,
    quantity,
    name,
    image,
    price,
    productId,
    id,
    isEvaluate,
  } = orderItems;
  const [showRating, setShowRating] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center w-full gap-10">
        <div className="flex items-start justify-around w-2/3 gap-3">
          <img src={`data:image/png;base64,${image}`} alt="" className="w-40 h-32" />
          <div className="flex flex-col gap-5">
            <span className="text-xl font-medium font-eculid">{name}</span>
            <span className="text-lg font-eculid">{price}</span>
          </div>
          <div className="flex flex-col gap-5">
            <p className="flex gap-2 text-lg font-eculid">
              Color:
              <span
                className="w-5 h-5 mt-1 border-none rounded-full outline-none cursor-pointer hover:opacity-100"
                style={{ backgroundColor: color }}
              ></span>
            </p>
            <p className="text-lg font-eculid">Size: {size}</p>
            <p className="text-lg font-eculid">Quantity: {quantity}</p>
          </div>
        </div>
        {orderDto.typeOrder === "SUCCESSFUL" && !isEvaluate ? (
          <Button
            variant="outlined"
            className="w-28"
            onClick={() => setShowRating(true)}
          >
            Rating
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="w-28"
            onClick={() => navigate(`/product/${productId}`)}
          >
            Preview
          </Button>
        )}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1072 2"
        fill="none"
        className="w-[650px] h-1"
      >
        <path d="M0 1L1072 0.999887" stroke="#D1D5DB" />
      </svg>
      <DialogRating
        show={showRating}
        handleClose={() => setShowRating(false)}
        productId={productId}
        orderDetailId={id}
      />
    </>
  );
};

OrderCard.propTypes = {
  orders: PropTypes.object,
};
OrderItem.propTypes = {
  orderItems: PropTypes.object,
  orderDto: PropTypes.object,
};
export default OrderCard;
