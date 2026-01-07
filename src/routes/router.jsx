import { createBrowserRouter } from "react-router-dom";
import React from 'react'
import Products from "../components/products/Products";
import ProductDetails from "../components/products/ProductDetails";
import Cart from "../components/cart/Cart";
import Payment from "../components/payment/Payment";

import App from "../App";

import AddProducts from "../components/management/AddProducts";
import Home from "../components/home/Home";
import ProductManagement from "../components/management/ProductManagement";
import Shipping from "../components/shipping/Shipping";
import ConfirmOrders from "../components/order/OrderSummary";
import AllProducts from "../components/management/AllProducts";
import UpdateProducts from "../components/management/UpdateProducts";
import AllOrders from "../components/order/AllOrders";

import UpdateOrder from "../components/order/UpdateOrder";
import CashOnDelivery from "../components/payment/CashOnDelivery";

import PaymentSuccess from "../components/payment/PaymentSuccess";
import About from "../components/about/About";
import Dashboard from "../components/management/Dashboard";
import AddTeamMember from "../components/team/AddTeamMember";
import AllTeamMember from "../components/team/AllTeamMember";
import UpdateTeam from "../components/team/UpdateTeam";
import NotFound from "../components/notFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },

      {
        path: "product-details/:productId",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "shipment",
        element: <Shipping />,
      },
      {
        path: "cash",
        element: <CashOnDelivery />,
      },
      {
        path: "order-summary",
        element: <ConfirmOrders />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "manage-products",
        element: <ProductManagement />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "add-product",
            element: <AddProducts />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "update-product/:productId",
            element: <UpdateProducts />,
          },
          {
            path: "orders",
            element: <AllOrders />,
          },
          {
            path: "order/:orderId",
            element: <UpdateOrder />,
          },
          {
            path: "add-team-member",
            element: <AddTeamMember />,
          },
          {
            path: "all-teams",
            element: <AllTeamMember />,
          },
          {
            path: "update-team/:teamId",
            element: <UpdateTeam />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
