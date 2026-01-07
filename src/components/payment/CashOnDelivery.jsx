import { AiFillCheckCircle } from "react-icons/ai";

import { cartItems, clearCartItems } from "../../redux/features/cartSlice";
import { useUpdatedStockWithCashOnDeliveryMutation } from "../../redux/api/productsApi";


import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CheckoutSteps from "../../utils/CheckoutSteps";
import MetaData from "../MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";

const CashOnDelivery = () => {
  const [updatedStockWithCashOnDelivery, { isSuccess }] =
    useUpdatedStockWithCashOnDeliveryMutation();
  const dispatch = useDispatch();
  const cartOrders = useSelector(cartItems);
  const navigate = useNavigate();
  const orders = cartOrders?.map((item) => {
    return { id: item._id, quantity: item.quantity };
  });

  const handleBackToHome = async () => {
    try {
      await updatedStockWithCashOnDelivery({ orders }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      toast.success(
        "Success! You have successfully Updated stock with cash on delivery",
        { position: "top-center", duration: 5000 }
      );
      dispatch(clearCartItems());
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <Fragment>
      <MetaData title="Cash On Delivery" />
      <div className="w-full max-w-full h-screen">
        <CheckoutSteps currentIndex={3} />
        <div className="w-screen h-full flex justify-center justify-items-center">
          <div className="flex items-center">
            <div className="border p-6 ">
              <AiFillCheckCircle
                className="my-5  mx-auto"
                color="green"
                size={70}
              />
              <h3 className="my-3 text-3xl font-semibold text-center">
                Thank you for your order!
              </h3>
              <p className="my-2 text-center">
                Your order is being processed and will be delivered as fast as
                possible.
              </p>
              <div className="text-center">
                <button
                  className="w-64 h-10 rounded-sm bg-red-400 hover:bg-red-500 transition-all duration-300 ease-linear text-white font-semibold"
                  onClick={handleBackToHome}
                >
                  Back To Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CashOnDelivery;
