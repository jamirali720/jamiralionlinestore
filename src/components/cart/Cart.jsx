
import { Link } from "react-router-dom";
import {
  cartItems,
  setTotalAmount,
  decrementItem,
  incrementItem,
  removeItem,
  clearCartItems,
} from "../../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "antd";
import { Fragment } from "react/jsx-runtime";
import MetaData from "../MetaData/MetaData";

const Cart = () => {
  const cartItemsProducts = useSelector(cartItems);
  const subtotal = cartItemsProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // const totalAmount = useAppSelector(state => state.cart.totalAmount);
  const shippingCharge = subtotal === 0 ? 0 : subtotal >= 5000 ? 100 : 200;
  const texCharge = subtotal * 0.1;
  const totalCharge = subtotal + shippingCharge + texCharge;
  const dispatch = useDispatch();

  const handleRemoveCartItems = (id) => {
    dispatch(removeItem(id));
  };
  const handleIncrement = (id) => {
    dispatch(incrementItem(id));
  };
  const handleDecrement = (id) => {
    dispatch(decrementItem(id));
  };
  const handleCartTotal = () => {
    dispatch(setTotalAmount({ totalAmount: totalCharge, subtotal }));
  };
  return (
    <Fragment>
      <MetaData title="Shopping Cart" />
      <div className="md:flex justify-between justify-items-center">
        <Card
          className="w-screen md:w-2/3 h-full shadow-lg md:m-2"
          title="Your Cart"
        >
          {cartItemsProducts.length === 0 ? (
            <div className="w-screen md:w-full max-w-full text-center">
              <p className="my-3 text-1xl pt-2 text-slate-500 font-bold">
                Your shopping cart is empty.
              </p>
              <div className="my-3">
                <button className="bg-slate-100 hover:bg-slate-200 px-5 py-2 rounded-full ">
                  <Link
                    to="/products"
                    className="inline-block text-[#F45634] font-bold text-2xl "
                  >
                    Continue Shopping
                  </Link>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-screen md:w-full max-w-full my-4 overflow-auto">
              <table className="w-full max-w-full">
                <thead className="w-full">
                  <tr className="border border-slate-200 w-full ">
                    <th className="border border-slate-200 py-2">Image</th>
                    <th className="border border-slate-200">Name</th>
                    <th className="border border-slate-200">Quantity</th>
                    <th className="border border-slate-200">Subtotal</th>
                    <th className="border border-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItemsProducts &&
                    cartItemsProducts.map((product, index) => {
                      return (
                        <tr
                          key={index}
                          className="border border-slate-200 text-center  h-16"
                        >
                          <td className="border border-slate-200 ">
                            <div className="w-20 h-20 mx-auto ">
                              <img
                                src={product.image.url}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </td>
                          <td className="border border-slate-200">
                            <p>{product.name}</p>
                          </td>
                          <td className="flex justify-center justify-items-center my-4">
                            <button
                              onClick={() => handleDecrement(product._id)}
                              disabled={product && product?.quantity === 1}
                              className="w-10 h-10 rounded-sm font-semibold text-2xl  text-slate-500 hover:bg-slate-100 ease-in-out duration-300 border border-slate-200"
                            >
                              -
                            </button>
                            <p className="w-10 h-10 rounded-sm font-semibold text-1xl pt-2 text-slate-500 hover:bg-slate-100 ease-in-out duration-300 border border-slate-200">
                              {product.quantity}{" "}
                            </p>
                            <button
                              onClick={() => handleIncrement(product._id)}
                              disabled={
                                (product && product.stock === 0) ||
                                product?.quantity === product?.stock
                              }
                              className="w-10 h-10 rounded-sm font-semibold text-2xl text-slate-500 hover:bg-slate-100 ease-in-out duration-300 border border-slate-200"
                            >
                              +
                            </button>
                          </td>
                          <td className="border border-slate-200">
                            <span>$ {product.quantity * product.price}</span>
                          </td>
                          <td className="border border-slate-200">
                            <button
                              className="w-32 h-10 rounded-sm font-semibold text-1xl text-red-400 hover:text-red-500  bg-slate-50 hover:bg-slate-100 ease-in-out duration-300 border border-slate-200"
                              onClick={() =>
                                handleRemoveCartItems(product._id)
                              }
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="my-3 flex justify-between">
                <Button type="default" className="p-5">
                  <Link
                    to="/products"
                    className="block text-[#F45634] font-semibold text-1xl "
                  >
                    Continue Shopping
                  </Link>
                </Button>
                <Button
                  type="default"
                  onClick={() => dispatch(clearCartItems())}
                  className="p-5"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </Card>
        {cartItemsProducts.length > 0 && (
          <Card
            className="w-screen md:w-1/3 h-full shadow-lg md:m-2 "
            title="Shopping Cart"
          >
            <div className="my-2 flex justify-between justify-items-center px-4">
              <span> Subtotal </span>
              <span>$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="my-2 flex justify-between justify-items-center px-4">
              <span> Shipping </span>
              <span>$ {shippingCharge.toFixed(2)}</span>
            </div>
            <div className="my-2 flex justify-between justify-items-center px-4">
              <span> Tex </span>
              <span>$ {texCharge.toFixed(2)}</span>
            </div>
            <div className="my-3 px-4">
              <hr />
            </div>

            <div className="my-2 flex justify-between justify-items-center px-4 mb-5">
              <span>Total</span>$ {totalCharge.toFixed(2)}
            </div>
            <div className="bg-red-200">
              <Button
                type="primary"
                onClick={() => handleCartTotal()}
                className="float-end  hover:bg-slate-200  ease-in-out duration-300 p-5 w-full"
              >
                <Link
                  to="/shipment"
                  className="block text-[#F45634] font-semibold text-1xl w-full "
                >
                  Checkout
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
