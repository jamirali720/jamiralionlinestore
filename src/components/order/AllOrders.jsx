import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { Button, Space, Tag, Table, Pagination } from "antd";

import {
  useDeletedSingleOderMutation,
  useGetAllOrdersQuery,
} from "../../redux/api/orderApi";


import { Link } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "../../utils/Spinner";
import { BiEdit } from "react-icons/bi";
import MetaData from "../MetaData/MetaData";
import { useSelector } from "react-redux";


const AllOrders= () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetAllOrdersQuery(shippingInfo.email);

  const total = orderData?.data.length;
  const startIndex = (currentPage - 1) * pageSize;
  const lastIndex = startIndex + pageSize;

  const renderData = orderData?.data.slice(startIndex, lastIndex);

  const [deletedSingleOder, { isLoading: loading }] =
    useDeletedSingleOderMutation();

  const handleDeleteOrder = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }
    try {
      const result = await deletedSingleOder(productId);
      if (result.data.success) {
        toast.success("Order deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete order: ", error);
    }
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },

    {
      title: "Product Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, record) => {
        const color =
          record.status === "Delivered"
            ? "green"
            : record.status === "Shipped"
            ? "indigo"
            : "red";
        return (
          <Tag style={{ color, padding: "4px 10px" }}>{record.status}</Tag>
        );
      },
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="large">
          <Button type="default" className="px-6 py-4">
            <Link to={`/manage-products/order/${record.orderId}`}>
              <BiEdit size={30} color="#D073E5" />
            </Link>
          </Button>
          <Button
            onClick={() => handleDeleteOrder(record.orderId)}
            type="default"
            className="bg-red-600 text-white"
          >
            {loading ? "Deleting" : "Delete"}
          </Button>
        </Space>
      ),
    },
  ];

  const data = [] ;

  renderData?.forEach((item) => {
    item.orderItems.forEach((order, index) => {
      data.push({
        key: `${index}-${order.productId}`,
        image: <img src={order.image} alt="" className="w-24 h-20" />,
        productName: order.productName,
        orderId: item._id,
        quantity: order.quantity,
        status: item.orderStatus,
        price: Number(order.price),
      });
    });
  });

  useEffect(() => {
    if (isError) {
      toast.error("Order not found");
    }
  }, [isError]);

  if (isLoading)
    return (
      <div className="flex justify-center justify-items-center">
        <Spinner />
      </div>
    );

  return (
    <Fragment>
      <MetaData title="All Orders" />
      <div className="overflow-scroll">
        <Table
          className="max-h-full"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <Pagination
          className="float-right my-5 p-10"
          current={currentPage}
          pageSize={pageSize}
          showSizeChanger
          pageSizeOptions={[1, 5, 10, 20]}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          total={total}
        />
      </div>
    </Fragment>
  );
};

export default AllOrders;
