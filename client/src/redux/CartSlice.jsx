import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo : localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {} ,
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

      // remove item from cart 
      state.cartItems = state.cartItems.filter(
        (item) => {
          return item.productId !== action.payload;
        }
      );

      // remove cart item from local storage
      const updatedCartItems = state.cartItems;
      
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    },

    clearCart(state, action) {
      state.cartItems = [];
    },

    saveShippingInfo(state,action){

      state.shippingInfo = action.payload;

      const info = state.shippingInfo;

      localStorage.setItem('shippingInfo', JSON.stringify(info))
    }
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


export const { addToCart, removeFromCart, clearCart, saveShippingInfo } = cartSlice.actions;

export default cartSlice.reducer;
