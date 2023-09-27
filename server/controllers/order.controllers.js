import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import AppError from "../utils/error.util.js";

// controller function to create new order
const createOrder = async (req, res, next) => {
  try {

    const { shippingInfo, paymentInfo, orderItems } = req.body;

    if (!shippingInfo || !paymentInfo || !orderItems) {
      return next(new AppError(400, "Please enter all order details"));
    }

    // Add the 'paidAt' field to the 'paymentInfo' object
    paymentInfo.paidAt = Date.now();

    const order = await orderModel.create({
      shippingInfo,
      paymentInfo,
      orderItems,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

export default createOrder;


// controller function to get single order
const getSingleOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await orderModel.findById(id).populate("user", "name email");

    if (!order) {
      return next(new AppError(404, "Order not found"));
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to get all orders for logged in user
const myOrders = async (req, res, next) => {
  try {
    const { id } = req.user;

    const orders = await orderModel.find({ user: id });

    if (!orders) {
      return next(new AppError(404, "Orders not found"));
    }

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to get all orders --(Admin)
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.paymentInfo.totalPrice;
    });

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      totalAmount,
      orders,
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to update status of order --(Admin)
const updateOrderStatus = async (req, res, next) => {
  try {

    const order = await orderModel.findById(req.params.id);


    if (!order) {
      return next(new AppError(404, "Order not found"));
    }

    if (order.paymentInfo.orderStatus === "Delivered") {
      return next(new AppError(400, "You have already delivered this order"));
    }

    order.orderItems.forEach(async (orderItem) => {
      await updateStock(orderItem.productId, orderItem.quantity);
    });

    order.paymentInfo.orderStatus = req.body.orderStatus;

    if (req.body.orderStatus === "Delivered") {
      order.paymentInfo.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    return next(new AppError(500, error.message || "Internal Server Error"));
  }
};


// function to update stock
async function updateStock(id, quantity) {
  const product = await productModel.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// controller function to delete order --(Admin)
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await orderModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};
export {
  createOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
