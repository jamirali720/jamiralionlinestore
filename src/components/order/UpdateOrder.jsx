import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleOrderQuery,
  useUpdatedSingleOrderMutation,
} from "../../redux/api/orderApi";
import Spinner from "../../utils/Spinner";

import { Button, Select } from "antd";
import { toast } from "sonner";
import MetaData from "../MetaData/MetaData";

const UpdateOrder = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useGetSingleOrderQuery(orderId);
  const [status, setStatus] = useState();
  const [
    updatedSingleOrder,
    { isSuccess, isLoading: statusLoading, isError, error },
  ] = useUpdatedSingleOrderMutation();
  const handleSubmitStatus = () => {
    console.log(status);
    updatedSingleOrder({ orderId, status });
  };

  let message = "";
  if (error) {
    message = error.data.message;
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order status updated successfully", {
        position: "top-center",
        duration: 3000,
        id: 1,
      });
    }
    if (isError) {
      toast.error(message, { position: "top-center", duration: 3000, id: 2 });
    }
  }, [isSuccess, message, isError]);

  return (
    <Fragment>
      <MetaData title="Update Order" />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="w-full p-10 border">
              <h1 className="text-3xl font-bold"> Shipping Information :</h1>
              <div className="my-6">
                <p>
                  <strong>Name</strong> : {data.data.shippingInfo.name}{" "}
                </p>
                <p>
                  <strong>Email</strong> : {data.data.shippingInfo.email}{" "}
                </p>
                <p>
                  <strong>Phone</strong> : {data.data.shippingInfo.phoneNo}{" "}
                </p>
                <p>
                  <strong>Address</strong> : {data.data.shippingInfo.city},
                  {data.data.shippingInfo.state},
                  {data.data.shippingInfo.address},
                  {data.data.shippingInfo.country},
                </p>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Payment Details :</h1>
                <div className="my-6">
                  <p className="my-">
                    <strong>Transaction ID</strong> : {data.data.paymentInfo.id}{" "}
                  </p>
                  <p className="my-2">
                    <strong>Order Status</strong> :
                    <span
                      className={
                        data.data.orderStatus === "Delivered"
                          ? "text-green-600 mx-3"
                          : "text-red-500  mx-3"
                      }
                    >
                      {data.data.orderStatus}
                    </span>
                  </p>
                  <p className="my-2">
                    <strong>Payment Status</strong> :
                    <span
                      className={
                        data.data.paymentInfo.status === "succeeded"
                          ? "text-green-600 mx-3"
                          : "text-red-500  mx-3"
                      }
                    >
                      {data.data.paymentInfo.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="my-8">
                <h1 className="text-3xl font-bold"> Order Items Details :</h1>
                <div className="flex justify-center justify-items-center my-6">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2 text-left">
                          Product Image
                        </th>
                        <th className="border px-4 py-2 text-left">
                          Product Name
                        </th>
                        <th className="border px-4 py-2 text-left">Quantity</th>
                        <th className="border px-4 py-2 text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.orderItems.map((item) => (
                        <tr key={item._id}>
                          <td className="border px-4 py-2 text-center">
                            <img
                              className="w-20 h-24"
                              src={item.image}
                              alt=""
                            />
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {item.productName}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {item.quantity}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            ${item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="w-full p-10">
              <h1 className="text-3xl font-bold my-5 text-center">
                Update Order Status:
              </h1>
              <div className="flex-col justify-center justify-items-center">
                <div className="w-full h-full text-center ">
                  <Select
                    onChange={(val) => setStatus(val)}
                    className="w-72 h-10 my-5 placeholder:text-black"
                    placeholder="Select Status"
                    options={[
                      {
                        value:
                          data.data && data.data.orderStatus === "Processing"
                            ? "Shipped"
                            : "Delivered",
                        label:
                          data.data && data.data.orderStatus === "Processing"
                            ? "Shipped"
                            : "Delivered",
                      },
                    ]}
                  />
                </div>
                <div className=" w-full h-full text-center">
                  <Button
                    type="primary"
                    className="w-72 h-10 my-5 text-1xl"
                    onClick={handleSubmitStatus}
                  >
                    {statusLoading ? "Updating" : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateOrder;
