import * as dotenv from "dotenv";
import Stripe from "stripe";

// loding enviroment variables
dotenv.config();

const stripeSecretKey = process.env.STRIPE_API_SECRET;

if (!stripeSecretKey) {
  console.error(
    "Error: Stripe Secret key is not defined in environment variables."
  );
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey);


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

    console.log(error.message);
  }
};

const sendStripeKey = (req,res,next) => {

  const stripeApiKey = process.env.STRIPE_API_KEY

  if (!stripeApiKey) {
    console.error(
      "Error: Stripe Api key is not defined in environment variables."
    );
    process.exit(1);
  }

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
