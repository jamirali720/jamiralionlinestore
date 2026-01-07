
import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/api/orderApi";
import { toast } from "sonner";
import CheckoutSteps from "../../utils/CheckoutSteps";
import { AiFillCheckCircle } from "react-icons/ai";
import { clearCartItems } from "../../redux/features/cartSlice";
import { Button } from "antd";
import MetaData from "../MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";

const PaymentSuccess = () => {
  const location = useLocation();
  const paymentId = new URLSearchParams(location.search).get("payment_intent");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentStatus = new URLSearchParams(location.search).get(
    "redirect_status"
  );
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const { cartItems, shippingInfo, subtotal, shippingCharge, texCharge } =
    useSelector((state) => state.cart);
  const [createOrder] = useCreateOrderMutation();

  const orderItems = cartItems.map((cartItem) => {
    return {
      productName: cartItem.name,
      productId: cartItem._id,
      quantity: cartItem.quantity,
      price: cartItem.price,
      image: cartItem.image.url,
    };
  });

  const order = {
    shippingInfo,
    orderItems: orderItems,
    itemPrice: subtotal,
    shippingPrice: shippingCharge,
    texPrice: texCharge,
    totalAmount,
    paymentInfo: {
      id: paymentId,
      status: paymentStatus,
    },
  };

  const handleBackToHome = async () => {
    try {
      const result = await createOrder(order);
      console.log(result.data)
      if(result?.data?.success){
         toast.success("Success! You have successfully confirmed your order", {
           position: "top-center",
           duration: 5000,
         });
         dispatch(clearCartItems());
         navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Fragment>
      <MetaData title="Payment Success" />
      <div className="w-full max-w-full h-screen ">
        <CheckoutSteps currentIndex={3} />
        <div className="w-screen h-full flex justify-center justify-items-center">
          <div className="flex items-center">
            <div className="border p-6 shadow-lg ">
              <AiFillCheckCircle
                className="my-5  mx-auto"
                color="green"
                size={70}
              />
              <h3 className="my-3 text-3xl font-semibold text-center">
                Thank you for payment of your order!
              </h3>
              <p className="my-2 text-center">
                Your order is being processed and will be delivered as fast as
                possible.
              </p>
              <div className="text-center">
                <Button
                  type="primary"                  
                  className="p-5 font-bold text-lg "
                  onClick={handleBackToHome}
                >
                  {cartItems.length > 0 ? (
                    " Click To Complete Your Order"
                  ) : (
                    <Link to="/">Go Back To Home</Link>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentSuccess;
