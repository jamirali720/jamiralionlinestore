import { Fragment, useEffect, useState } from "react";

import { useGetSportsQuery } from "../../redux/api/productsApi";
import ProductCard from "../products/ProductCard";
import { toast } from "sonner";

import { setBrand, setCategory } from "../../redux/features/filterSlice";
import { categories } from "../../utils/categories";
import { Link } from "react-router-dom";
import Spinner from "../../utils/Spinner";
import Pagination from "../pagination/Pagination";
import Contact from "../contact/Contact";
import LatestProducts from "./LatestProducts";
import { Button } from "antd";
import MetaData from "../MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();
  const { category, brand } = useSelector((state) => state.filter);
  const { data, isError, isLoading, error } = useGetSportsQuery();
  const [itemPerPage, setItemPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages =
    data?.data.length && Math.ceil(data?.data.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const lastIndex = startIndex + itemPerPage;
  const renderData = data?.data.slice(startIndex, lastIndex);

  // show error message
  let message = "";
  if (error) {
    message = error.data?.message || error.error;
  }
  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-center",
        duration: 3000,
      });
    }
  }, [message, data, isError]);

  return (
    <Fragment>
      <MetaData title="Home page" />
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="bg-[#ffffff]  px-2  mx-auto  ">
          <section className="">
            <h1 className="text-3xl font-bold text-center">Latest Features Products</h1>
            <LatestProducts />
          </section>
          <div className="w-full  p-3 mx-auto my-4">
            <div className="w-full  space-x-3">
              <h1 className="text-center text-2xl my-4 text-red-500 ">
                Shop by Category
              </h1>
              <div className="space-y-3 space-x-4">
                {categories.map((button, index) => {
                  return (
                    <Link to="/products" key={index}>
                      <Button
                        className={`border border-slate-200 p-5 my-2 font-semibold  rounded ${
                          button === category ? "bg-red-500 text-white" : ""
                        }`}
                        onClick={() => {
                          dispatch(setCategory(button));
                          {
                            brand !== "All" && dispatch(setBrand("All"));
                          } // initial brand is all selected
                        }}
                      >
                        {button}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* // products display part */}
          <section>
            <div className="grid md:grid-cols-4 gap-4 p-2 ">
              {renderData &&
                renderData.map((product, index) => (
                  <ProductCard key={index} product={product}></ProductCard>
                ))}
            </div>
            <section className="md:w-full w-screen h-auto p-4 mx-1">
              {data?.data && (
                <Pagination
                  products={data?.data}
                  startIndex={startIndex}
                  lastIndex={lastIndex}
                  itemPerPage={itemPerPage}
                  currentPage={currentPage}
                  setItemPerPage={setItemPerPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </section>
          </section>
          {/* contact section */}
          <section>
            <Contact />
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
