import { Fragment, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSportsQuery,
  useGetSingleSportsQuery,
} from "../../redux/api/productsApi";
import {
  addToCart,
  decrementItem,
  incrementItem,
} from "../../redux/features/cartSlice";

import { cartItems } from "../../redux/features/cartSlice";
import { toast } from "sonner";
import Description from "./Description";
import ReviewsCard from "../Reviews/ReviewsCard";
import ProductCard from "./ProductCard";
import ReviewModal from "../Reviews/ReviewModal";
import Spinner from "../../utils/Spinner";
import { Button } from "antd";
import MetaData from "../MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = () => {
  const { productId } = useParams();
  const [show, setShow] = useState(true);

  const { data, isLoading, isError, isSuccess, error } =
    useGetSingleSportsQuery(productId);
  const { data: relatedData } = useGetSportsQuery();

  const relProducts = relatedData?.data.filter(
    (item) => item.category === data?.data.category
  );

  const dispatch = useDispatch();
  const cartItemsProducts = useSelector(cartItems);

  const cartItem = cartItemsProducts.find((p) => p._id === productId);

  const handleAddToCart = () => {
    dispatch(addToCart(data?.data));
  };
  const handleIncrement = () => {
    dispatch(incrementItem(productId));
  };
  const handleDecrement = () => {
    dispatch(decrementItem(productId));
  };

  useEffect(() => {
    if (isError) {
      toast.error(error, { position: "top-center" });
    }
    if (isSuccess) {
      toast.success("Sports details retrieved successfully", {
        position: "top-center",
        duration: 1000,
      });
    }
  }, [isError, isSuccess, error]);

  console.log(data);
  return (
    <Fragment>
      <MetaData title="Product details" />
      {isLoading ? (
        <div className=" w-full h-screen ">
          <Spinner />
        </div>
      ) : (
        <main className="bg-[#FFFFFF]">
          <div className="w-full h-full grid md:grid-cols-2 bg-[#FFFFFF] sm: grid-cols-1 ">
            <section className=" w-full max-h-full max-w-full md:h-full shadow-md">
              <div className="h-full">
                <img
                  src={data?.data.image.url}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </div>
            </section>
            <section className="p-10 md:h-full shadow-md">
              <div className="py-2 text-slate-700 text-3xl">
                <h1 className="text-red-500">
                  <strong> Product Name :</strong> {data?.data.name}
                </h1>
              </div>
              <div className="py-2 text-slate-700 text-lg">
                <p>
                  <strong> Category :</strong> {data?.data.category}
                </p>
              </div>
              <div className="py-2 text-slate-700 text-lg">
                <p>
                  <strong>Product Brand :</strong> {data?.data.brand}
                </p>
              </div>
              <div className="py-2 text-slate-700 text-lg">
                <p>
                  <strong> Product Ratings : </strong>
                  {data?.data.ratings ? (
                    <span>
                      {data?.data.ratings.toFixed(2)}
                      <span className="ml-3">
                        Reviews (
                        {data?.data.reviews && data?.data.reviews.length})
                      </span>
                    </span>
                  ) : (
                    <span> No reviews</span>
                  )}
                </p>
              </div>
              <div className="py-2 text-slate-700 text-lg">
                <p>
                  <strong>Price :</strong> {data?.data.price}
                </p>
              </div>
              <div className="py-2 text-slate-700 text-lg">
                <p>
                  <strong>Status :</strong>
                  {data && data?.data.stock > 0 ? (
                    <span className="text-green-600"> InStock</span>
                  ) : (
                    <span className="text-red-600"> Out Of Stock</span>
                  )}
                  : {data?.data.stock}
                </p>
              </div>
              <div className="flex justify-center justify-items-center w-32 my-2">
                <Button
                  type="default"
                  onClick={handleDecrement}
                  disabled={cartItem && cartItem?.quantity === 1}
                  className="w-10 h-10 rounded-sm font-semibold text-2xl hover:bg-slate-100 ease-in-out duration-300 border border-slate-200"
                >
                  -
                </Button>
                <p className="w-10 h-10 rounded-sm font-semibold text-md  hover:bg-slate-100 ease-in-out duration-300 border border-slate-200 text-center m-auto pt-2">
                  {cartItem?.quantity ? cartItem.quantity : 0}
                </p>
                <Button
                  type="default"
                  onClick={handleIncrement}
                  disabled={
                    data?.data.stock === 0 ||
                    cartItem?.quantity === data?.data.stock
                  }
                  className="w-10 h-10 rounded-sm font-semibold text-2xl hover:bg-slate-100 ease-in-out duration-300 border border-slate-200"
                >
                  +
                </Button>
              </div>
              <div className="md:w-2/5 py-2">
                <Button
                  type="default"
                  disabled={
                    data?.data.stock === 0 ||
                    cartItem?.quantity === data?.data.stock
                  }
                  onClick={handleAddToCart}
                  className="uppercase p-5"
                >
                  Add to Cart
                </Button>
              </div>
              <div className="w-2/5 h-10 my-10">
                {productId && <ReviewModal id={productId} />}
              </div>
            </section>
          </div>

          {/* description section */}
          <section className="w-full h-auto shadow-md my-5 ">
            <div className="max-w-full md:w-11/12 mx-auto max-h-screen p-6">
              <div className=" flex justify-start mb-8 space-x-4 ">
                <Button
                  type="default"
                  className="text-xl uppercase font-semibold p-5"
                  onClick={() => setShow(true)}
                >
                  Description
                </Button>
                <Button
                  className="text-xl uppercase font-semibold p-5"
                  onClick={() => setShow(false)}
                >
                  Review ({data?.data.reviews && data?.data.reviews.length})
                </Button>
              </div>
              <div className=" w-full h-full">
                {show ? (
                  <Description description={data?.data.description} />
                ) : (
                  <div className="">
                    {data?.data.reviews && data.data.reviews?.length > 0 ? (
                      <div className="overflow-x-scroll overflow-hidden md:flex justify-center justify-items-center ">
                        {data?.data.reviews?.map((review) => {
                          return <ReviewsCard review={review} />;
                        })}
                      </div>
                    ) : (
                      <div> No Review yet</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
          {/* Related product section */}
          <section>
            <div>
              <h1 className="text-center text-3xl font-bold uppercase text-red-500 my-4">
                Related products
              </h1>
            </div>
            <div className="grid md:grid-cols-4 gap-5 sm:grid-cols-3">
              {relProducts &&
                relProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </section>
        </main>
      )}
    </Fragment>
  );
};

export default ProductDetails;
