import { Link } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";


import { cartItems } from "../redux/features/cartSlice";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItemsProducts = useSelector(cartItems);

  const cartQuantity = cartItemsProducts.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="bg-[#EEEEEE] w-screen md:w-full h-auto md:h-[80px] flex justify-center  justify-items-center px-5 mb-1">
      <div className="flex w-full h-full justify-between items-center">
        <div className="bg-[#FFFFFF] rounded-md  hidden md:block">
          {/* <img src={image} alt="sports" className="size-16 rounded-full" /> */}
          <Link
            to="/"
            className="block text-2xl text-[#434343] font-bold cursor-pointer  p-3 mb-1 hover:text-[#F45634] duration-300 ease-in-out"
          >
           Sporting Store
          </Link>
        </div>

        <div>
          <nav>
            <ul className="md:flex justify-center justify-items-center ml-10 md:ml-0 md:space-x-5 ">
              <li>
                <Link
                  to="/products"
                  className="font-semibold text-[#434343] text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                >
                  All products
                </Link>
              </li>
              <li>
                <Link
                  to="/manage-products"
                  className="font-semibold text-[#434343] text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                >
                  Manage Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-semibold text-[#434343] text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                >
                  About Us
                </Link>
              </li>             
              <li>
                <Link
                  to="/cart"
                  className="font-semibold text-[#434343] text-lg flex justify-center justify-items-center hover:text-[#F45634] duration-300 ease-in-out"
                >
                  <span className="text-red-500">
                    <FaShoppingCart />
                  </span>
                  <span className="w-6 h-6 relative -top-4 bg-white rounded-full text-center text-sm text-[#F45634] pt-1">
                    {cartQuantity}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
