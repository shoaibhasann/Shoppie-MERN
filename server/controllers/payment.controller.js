import * as dotenv from "dotenv";
import Stripe from "stripe";

// loding enviroment variables
dotenv.config();

const stripeApiKey = process.env.STRIPE_API_KEY;

if (!stripeApiKey) {
  console.error(
    "Error: Stripe API key is not defined in environment variables."
  );
  process.exit(1); // Exit the application if the API key is missing.
}

const stripe = new Stripe(stripeApiKey);

const createPaymentIntent = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Shoppie",
      },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Payment failed. Please try again later.",
    });
  }
};

const sendStripeKey = (req,res,next) => {
    try {
        res.status(200).json({
            success: true,
            stripeApiKey
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}

export { createPaymentIntent, sendStripeKey };
