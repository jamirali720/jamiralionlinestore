import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/features/cartSlice";

import { Button, Card, Rate } from "antd";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddProductToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Card className="w-full max-w-full h-[600px] rounded-sm mx-auto border  border-[#E7E7E7]">
      <div className="flex justify-center justify-items-center">
        <div className="w-full h-full p-1 ">
          <div className="w-full h-96 overflow-hidden">
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
              className="p-5"
              disabled={product.stock === 0}
              onClick={() => handleAddProductToCart(product)}
            >
              Add to Cart
            </Button>
            <Button className="p-5" type="default">
              <Link to={`/product-details/${product._id}`}> View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
