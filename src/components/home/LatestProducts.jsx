import React from "react";
import { Link } from "react-router-dom";
import { useGetLatestSportsQuery } from "../../redux/api/productsApi";
import Spinner from "../../utils/Spinner";
import { Button, Card, Rate } from "antd";
import { useEffect } from "react";
import { toast } from "sonner";
import  {motion} from "framer-motion"
import { addToCart } from "../../redux/features/cartSlice";
import { useDispatch } from "react-redux";


const LatestProducts = () => {
  const { data, isError, isLoading, error } = useGetLatestSportsQuery(
    undefined,
    { pollingInterval: 30000, skip: false }
  );

  const dispatch = useDispatch();

  const handleAddProductToCart = (product) => {
    dispatch(addToCart(product));
  };
  let message = "";
  if (error) {
    message = error.data?.message;
  }
  useEffect(() => {
    if (isError) {
      toast.error(message, { position: "top-center", duration: 3000, id: 1 });
    }
  }, [isError, message]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center justify-items-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:my-6">
          {data?.data.map((product, index) => {
            return (
              <motion.div
                animate={{ rotate: [0, 90, 90, 0], scale: [1, 0.5, 0.75, 1] }}
                key={index}
              >
                <Card className="w-full max-w-full h-[450px] rounded-sm mx-auto border  border-[#E7E7E7]">
                  <div className="flex justify-center justify-items-center">
                    <div className="w-full h-full p-1 ">
                      <div className="w-full h-56 overflow-hidden">
                        <img
                          src={product?.image?.url}
                          alt={product.name}
                          className="object-fill w-full h-full hover:scale-110 ease-in-out duration-300 "
                        />
                      </div>
                      <div className="p-3">
                        <h1 className="text-start text-1xl font-semibold">
                          {product.name}
                        </h1>
                        <h3 className="text-start font-bold text-green-700">
                          $ {product.price}
                        </h3>
                        <div className="md:flex justify-between justify-items-center gap-1 my-2">
                          <Rate
                            allowHalf
                            count={5}
                            disabled
                            style={{ fontSize: 16 }}
                            value={product.ratings}
                          />
                          <span>(Reviews {product.reviews?.length} ) </span>
                        </div>
                      </div>
                      <div className="p-3 flex justify-between">
                        <Button
                          type="default"
                          disabled={product.stock === 0}
                          onClick={() => handleAddProductToCart(product)}
                          className="p-5"
                        >
                          Add to Cart
                        </Button>
                        <Button type="default" className="p-5">
                          <Link to={`/product-details/${product._id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default LatestProducts;
