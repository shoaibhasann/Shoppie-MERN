import {
  productsRequest,
  productsSuccess,
  productsFail,
  newProductRequest,
  newProductSuccess,
  newProductFail,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
} from "./AdminSlice";
import axios from "axios";
import { server } from "../../main";
import {
  allOrdersRequest,
  allOrdersFail,
  allOrdersSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
} from "./AdminOrderSlice";


// function to fetch all products with their details -- (Admin)
export function fetchAllProudcts() {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  return async function fetchAllProductsThunk(dispatch, getState) {
    dispatch(productsRequest());

    try {
      const { data } = await axios.get(`${server}/products/admin`, config);
      dispatch(productsSuccess(data.products));
    } catch (error) {
      dispatch(productsFail(error.response.data.message));
    }
  };
}

// function to create a new product -- (Admin)
export function createProduct(productData) {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  };

  return async function createProductThunk(dispatch, getState) {
    dispatch(newProductRequest());
    try {
      const { data } = await axios.post(
        `${server}/products/admin`,
        productData,
        config
      );

      dispatch(newProductSuccess(data));
    } catch (error) {
      dispatch(newProductFail(error.response.data.message));
    }
  };
}

// function to delete product -- (Admin)
export function deleteProduct(id) {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  return async function deleteProductThunk(dispatch, getState) {
    dispatch(deleteProductRequest());
    try {
      const { data } = await axios.delete(
        `${server}/products/admin/${id}`,
        config
      );

      dispatch(deleteProductSuccess());
    } catch (error) {
      dispatch(deleteProductFail(error.response.data.message));
    }
  };
}

// function to update product details -- (Admin)
export function updateProductDetails(id, productData) {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  };

  return async function updateProductDetailsThunk(dispatch, getState) {
    dispatch(updateProductRequest());
    try {
      const { data } = await axios.put(
        `${server}/products/admin/${id}`,
        productData,
        config
      );

      dispatch(updateProductSuccess(data.success));
    } catch (error) {
      dispatch(updateProductFail(error.response.data.message));
    }
  };
}

// function to get all orders -- (Admin)
export function fetchOrders() {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  return async function fetchOrdersThunk(dispatch, getState) {
    dispatch(allOrdersRequest);
    try {
      const { data } = await axios.get(`${server}/orders/all-orders`, config);

      dispatch(allOrdersSuccess(data.orders));
    } catch (error) {
      dispatch(allOrdersFail(error.response.data.message));
    }
  };
}

// function to update order -- (Admin)
export function updateOrderStatus(id, orderData) {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  return async function updateOrderStatusThunk(dispatch, getState) {
    dispatch(updateOrderRequest());
    try {
      const { data } = await axios.put(
        `${server}/orders/${id}`,
        orderData,
        config
      );

      dispatch(updateOrderSuccess(data));
    } catch (error) {
      dispatch(updateOrderFail(error.response.data.message));
    }
  };
}

// function to delete order -- (Admin)
export function deleteOrder(id) {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  return async function deleteOrderThunk(dispatch, getState) {
    dispatch(deleteOrderRequest(data));
    try {
      const { data } = await axios.delete(`${server}/orders/${id}`, config);

      dispatch(deleteOrderSuccess());
    } catch (error) {
      dispatch(deleteOrderFail(error.response.data.message));
    }
  };
}
