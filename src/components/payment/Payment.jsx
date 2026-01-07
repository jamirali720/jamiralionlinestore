  import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import { Fragment, useEffect, useState } from "react";


import Spinner from "../../utils/Spinner";
import MetaData from "../MetaData/MetaData";
import { useSelector } from "react-redux";

const initStripe = async () => {
  // Retrieve the publishable key from backend
  const publishableKey = await fetch(
    "https://assignment-4-server-bice.vercel.app/api/sports/publishable-key"
  );
  const response = await publishableKey.json();
  return loadStripe(response.publishableKey);
};

const Payment = () => {
  const [clientSecretSetting, setClientSecretSetting] = useState({
    clientSecret: "",
    loading: true,
  });
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const stripePromise = initStripe();

  useEffect(() => {
    const getClientSecret = async () => {
      const clientSecret = await fetch(
        "https://assignment-4-server-bice.vercel.app/api/sports/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount * 100,
          }),
        }
      );
      const response = await clientSecret.json();

      if (response.clientSecret) {
        setClientSecretSetting({
          clientSecret: response.clientSecret,
          loading: false,
        });
      }
    };
    getClientSecret();
  }, [totalAmount]);

  if (!clientSecretSetting.clientSecret) {
    return;
  }

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret: clientSecretSetting.clientSecret,
    appearance,
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      {clientSecretSetting.loading ? (
        <div className="w-full h-screen flex justify-center justify-items-center">
          <div className="flex justify-center justify-items-center">
            <Spinner />
          </div>
        </div>
      ) : (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Fragment>
  );
};

export default Payment;
