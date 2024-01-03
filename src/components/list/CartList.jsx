import { useSelector } from "react-redux";
import CartCard from "../card/CartCard";
import orderImage from "../../assets/images/order.png";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const CartList = () => {
  const cartData = useSelector((state) => state.cart.products);
  const navigate = useNavigate();
  return (
    <>
      {cartData?.length > 0 &&
        cartData.map((item) => (
          <CartCard key={item.productVariantId} cartData={item}></CartCard>
        ))}
      {cartData?.length === 0 && (
        <div className="w-[702px] h-[420px] flex flex-col items-center justify-center gap-5">
          <img src={orderImage} alt="" className="object-fill w-64 h-56" />
          <span className="text-xl font-eculid">There is no cart item.</span>
          <Button
            variant="outlined"
            className="w-46"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center gap-5">
              <span className="text-xs font-eculid">View Product</span>
              <FaArrowRightLong className="w-4 h-6" />
            </div>
          </Button>
        </div>
      )}
    </>
  );
};

export default CartList;
