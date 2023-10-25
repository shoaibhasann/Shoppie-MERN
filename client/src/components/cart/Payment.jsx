import axios from "axios";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm.jsx";
import { server } from "../../main.jsx";

function Payment() {
  const [stripeKey, setStripeKey] = useState("");

  async function getStripeKey() {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    try {
      const { data } = await axios.get(
        `${server}/payment/stripeapikey`,
        config
      );
      setStripeKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }

  useEffect(() => {
    getStripeKey();
  }, []);

  return (
    <>
      {stripeKey && (
        <Elements stripe={loadStripe(stripeKey)}>
          <PaymentForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
