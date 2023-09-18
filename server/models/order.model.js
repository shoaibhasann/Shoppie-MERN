import {Schema, model} from 'mongoose';

const orderSchema = new Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        public_id: {
          type: String,
          required: true
        },
        secure_url: {
          type: String, 
          required: true
        },
        _id: {
          type: String,
          required: true
        }
      },
      productId: {
        type: Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      stock: {
        type: Number,
        required: true
      },
      discount: {
        type: Number,
        required: true,
      }
    },
  ],
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paidAt: {
      type: Date,
      required: true,
    },
    itemPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    taxPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    shippingPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
        "Refunded",
        "On Hold",
        "Payment Pending",
        "Payment Failed",
        "Out of Stock",
      ],
      default: 'Processing'
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    }
  },
});

const orderModel = model('Order', orderSchema);

export default orderModel;