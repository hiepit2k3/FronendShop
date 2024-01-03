import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

const initialState = {
  userInfo: [],
  products: loadCartFromLocalStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item.productVariantId === action.payload.productVariantId
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.productVariantId === action.payload.productVariantId
      );
      if (item) {
        item.quantity++;
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.productVariantId === action.payload.productVariantId
      );
      if (item && item.quantity > 1) {
        item.quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.productVariantId !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    resetCart: (state) => {
      state.products = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
