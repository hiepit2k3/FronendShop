import { useSelector } from "react-redux";
import CheckoutCard from "../card/CheckoutCard";

const CheckoutList = () => {
  const cartData = useSelector((state) => state.cart.products);
  return (
    <>
      {cartData?.length > 0 &&
        cartData.map((item) => (
          <CheckoutCard
            key={item.productVariantId}
            cartData={item}
          ></CheckoutCard>
        ))}
    </>
  );
};

export default CheckoutList;
