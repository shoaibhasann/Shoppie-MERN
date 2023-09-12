import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },

  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.productId === newItem.productId
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.productId
      );
    },

    clearCart(state, action) {
      state.cartItems = [];
    },
  },
});

export function addItemsToCart(id, quantity) {
  const server = "http://localhost:8080/api/v1/products/product";
  return async function addItemsToCartThunk(dispatch, getState) {
    const { data } = await axios.get(`${server}/${id}`);

    dispatch(
      addToCart({
        productId: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        image: data.product.images, 
        discount: data.product.discount,
        quantity,
      })
    );

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
}

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
