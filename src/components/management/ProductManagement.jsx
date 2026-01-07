import MetaData from "../MetaData/MetaData";
import { AiOutlineTeam } from "react-icons/ai";
import { MdAdd, MdDashboard, MdOutlineSportsKabaddi } from "react-icons/md";
import { PiInvoiceBold } from "react-icons/pi";
import { TbDashboard } from "react-icons/tb";
import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const ProductManagement = () => {
  return (
    <Fragment>
      <MetaData title="Dashboard Home" />
      <div className="md:flex justify-center justify-items-center">
        <div className="w-full md:w-2/12 h-screen bg-[#EEEEEE] rounded-sm">
          <ul className="w-full h-screen px-4">
            <li>
              <Link
                to="/manage-products"
                className="flex justify-between justify-items-center border border-transparent hover:border-white py-2 hover:text-[#F45634] px-2 font-semibold"
              >
                <TbDashboard size={28} className="text-[#F45634] w-18 h-18" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manage-products/add-product"
                className="flex justify-between justify-items-center border border-transparent hover:border-white py-2 hover:text-[#F45634] px-2 font-semibold"
              >
                <MdAdd size={28} className="text-[#F45634] w-18 h-18" />
                <span>Add Product</span>
              </Link>
            </li>

            <li>
              <Link
                to="/manage-products/all-products"
                className="flex justify-between justify-items-center border border-transparent hover:border-white py-2 hover:text-[#F45634] px-2 font-semibold"
              >
                <MdDashboard size={28} className="text-[#F45634] w-18 h-18" />
                <span>All Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manage-products/orders"
                className="flex justify-between justify-items-center border border-transparent hover:border-white py-2 hover:text-[#F45634] px-2 font-semibold"
              >
                <PiInvoiceBold size={28} className="text-[#F45634] w-18 h-18" />
                <span>All Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manage-products/add-team-member"
                className="flex justify-between justify-items-center border border-transparent hover:border-white py-2 hover:text-[#F45634] px-2 font-semibold"
              >
                <AiOutlineTeam size={28} className="text-[#F45634] w-18 h-18" />
                <span>Add Team</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manage-products/all-teams"
                className="flex justify-between justify-items-center border border-transparent hover:border-white py-2 hover:text-[#F45634] px-2 font-semibold"
              >
                <MdOutlineSportsKabaddi
                  size={28}
                  className="text-[#F45634] w-18 h-18"
                />
                <span>All Teams</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-10/12 md:mx-1">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductManagement;
