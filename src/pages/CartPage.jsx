import Button from "../components/button/Button";
import SiteLayout from "../layout/SiteLayout";
import CartList from "../components/list/CartList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CarouselTransition } from "../components/carousel/Carousel";
const CartPage = () => {
  const cartData = useSelector((state) => state.cart.products);
  const navigate = useNavigate();
  const totalAmount = cartData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const shippingFee = 0;
  const taxes = 0.2;
  const total = totalAmount + shippingFee + taxes;
  return (
    <>
      <SiteLayout>
        <CarouselTransition></CarouselTransition>
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-20">
            <div className="flex flex-col items-center justify-center">
              <CartList></CartList>
            </div>
            {cartData.length > 0 && (
              <div className="flex flex-col gap-5">
                <div className="flex gap-20 bg-[#F3F4F6] px-5 py-5">
                  <div className="flex flex-col">
                    <p>Total Amount:</p>
                    <p>Shipping Fee:</p>
                    <p>Taxes:</p>
                  </div>
                  <div className="flex flex-col not-italic font-bold font-eculid">
                    <span>${totalAmount}</span>
                    <span>${shippingFee}</span>
                    <span>${taxes}</span>
                  </div>
                </div>

                <div className="flex gap-36 bg-[#F3F4F6] px-5 py-3 font-bold">
                  <p>Total:</p>
                  <span>${total}</span>
                </div>

                <Button
                  className="w-[462px] shadow-none bg-[#1F2937] text-[#FFF] hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  onClick={() => navigate("/checkout")}
                >
                  Purchase
                </Button>
              </div>
            )}
          </div>
        </div>
      </SiteLayout>
    </>
  );
};

export default CartPage;
