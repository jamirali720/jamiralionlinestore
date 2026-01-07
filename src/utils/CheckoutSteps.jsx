import { Steps } from "antd";




const CheckoutSteps = ({ currentIndex }) => {
  return (
    <Steps
      current={currentIndex}
      className="w-full h-auto md:max-h-14 px-4 my-3"
      items={[
        {
          title: "Shipping",
          description: "Shipping Details",
        },
        {
          title: "Confirm",
          description: "Confirm Order",
        },
        {
          title: "Payment",
          description: "Payment Success",
        },
      ]}
    />
  );
};

export default CheckoutSteps;