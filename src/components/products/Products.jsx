import ProductCard from "./ProductCard";

import {
  
  Fragment,
  useEffect,
  useState,
} from "react";


import { Slider, Radio,  Rate, Button } from "antd";

import {
  // allProducts,
  clearFilters,
  setBrand,
  setLimit,
  setPage,
  setPrice,
  setRating,
  setSearchTerm,
  setSorting,
} from "../../redux/features/filterSlice";
import {
  useGetAllSportsQuery,
  useGetSportsQuery,
} from "../../redux/api/productsApi";

import { toast } from "sonner";

import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "../../utils/Spinner";
import MetaData from "../MetaData/MetaData";
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const filterOptions = useSelector((state) => state.filter);

  const [currentPage, setCurrentPage] = useState(1);

  // called all products use hooks
  const { data: allProducts } = useGetSportsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  // remove duplicates values from brand array;
  const uniqueBrands = [
    ...new Set(
      allProducts?.data.map((prod) => {
        if (filterOptions.category === "All") {
          return prod.brand;
        } else {
          return prod.category === filterOptions.category && prod.brand;
        }
      })
    ),
  ].filter(Boolean); // remove false values

  // filter products options
  const queryOptions = {
    name: filterOptions.searchTerm,
    category: filterOptions.category,
    minPrice: filterOptions.minPrice,
    maxPrice: filterOptions.maxPrice,
    limit: filterOptions.limit,
    page: filterOptions.page,
    sort: filterOptions.sort,
    brand: filterOptions.brand,
    ratings: filterOptions.ratings,
  };

  const {
    data: filterProducts,
    isLoading,
    isError,
    error,
  } = useGetAllSportsQuery(queryOptions, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  // get max and min price from all products
  const initialPrices = { min: Infinity, max: -Infinity };
  const minMaxPrice = allProducts?.data.reduce((acc, item) => {
    return {
      min: Math.min(acc.min, item.price),
      max: Math.max(acc.max, item.price),
    };
  }, initialPrices);

  // filter products by name
  const handleChangeSearch = (event) => {
    const searchQuery = event.target.value;
    setSearchText(searchQuery);
  };

  // enter key handler for search
  const handleKeyDown = (event) => {
    const searchQuery = (event.target).value;
    if (event.key === "Enter") {
      dispatch(setSearchTerm(searchQuery));
    }
  };

  // set search term to filter slice
  const handleChangeSearchProducts = () => {
    dispatch(setSearchTerm(searchText));
  };

  // set filter price value to filter slice
  const handleChangePrice = (event) => {
    dispatch(setPrice({ minPrice: event[0], maxPrice: event[1] }));
  };

  // set filter brand value to filter slice
  const handleChangeBrand = (event) => {
    dispatch(setBrand(event.target.value));
  };

  // set filter sorting value to filter slice
  const handleSortingValue = (event) => {
    dispatch(setSorting(event.target.value));
  };

  // handle clear filter items from filter slice;
  const handleClearFilter = () => {
    dispatch(clearFilters());
  };

  // handle limit filter
  const handleChangeLimit = (event) => {
    dispatch(setLimit(event.target.value));
  };

  let message = "";
  if (error) {
    message = error.data.message;
  }

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-center",
        duration: 3000,
      });
    }
  }, [isError, message]);

  // Pagination
  useEffect(() => {
    dispatch(setPage(currentPage));
  }, [dispatch, currentPage]);

  if (isLoading) {
    return (
      <div>
        <Spinner />{" "}
      </div>
    );
  }

  return (
    <Fragment>
      <MetaData title="All Products" />
      <div className="bg-[#FFFFFF]">
        <section>
          <div className="w-screen md:w-1/2 mx-auto px-3 flex justify-center justify-items-center">
            <input
              type="text"
              onChange={handleChangeSearch}
              onKeyDown={handleKeyDown}
              id="search"
              className="rounded-sm  text-start text-1xl w-full h-10 pl-3 my-4 outline-none ring-1  focus:ring-2"
              placeholder="Search here"
            />
            <span className="w-12 ring-1 rounded-sm h-10 my-4 border border-slate-100 flex justify-center justify-items-center p-2 cursor-pointer">
              <AiOutlineSearch
                onClick={handleChangeSearchProducts}
                size={28}
                color="gray"
                className="hover:scale-105 ease-in-out"
              />
            </span>
          </div>
          <section className="w-screen md:w-full">
            <div className="my-3 py-5 md:flex justify-between justify-items-center px-6 space-y-2">
              <div className="">
                <h1 className="text-center  text-3xl font-bold text-slate-600">
                  Feature Products
                </h1>
              </div>
              <div className="px-4 py-2 flex justify-center justify-items-center gap-2">
                <p className="font-semibold uppercase py-2"> Show Items :</p>
                <select
                  name="limit"
                  onChange={handleChangeLimit}
                  id="limit"
                  value={filterOptions.limit}
                  className="px-4 py-2 border-0 ring-1 focus:ring-2 outline-none rounded"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div className="px-4 py-2 flex justify-center justify-items-center gap-2">
                <p className="font-semibold uppercase py-2">sorting :</p>
                <select
                  name="sorting"
                  onChange={handleSortingValue}
                  id="sorting"
                  value={filterOptions.sort}
                  className="px-4 py-2 border-0 ring-1 focus:ring-2 outline-none rounded"
                >
                  <option value="asc">Price(ascending)</option>
                  <option value="desc">Price(descending)</option>
                </select>
              </div>
            </div>
            <div className="md:flex justify-center justify-items-center">
              <div className="sm:w-1/5 border border-slate-100 px-2">
                <div className="md:flex-col justify-center justify-items-center ">
                  {/* filter price section */}
                  <div className="shadow-sm h-auto py-4 border border-slate-100 mb-4 w-screen md:w-full">
                    <h3 className="pl-3 uppercase py-3 text-red-500 font-bold">
                      Filter by price :
                    </h3>
                    <div className="px-5">
                      <Slider
                        range={{ draggableTrack: true }}
                        min={minMaxPrice?.min}
                        max={minMaxPrice?.max}
                        defaultValue={[0, 250000]}
                        onChange={handleChangePrice}
                      />
                    </div>
                  </div>
                  {/* filter brand section */}
                  <div className="border border-slate-100 w-screen md:w-full px-5 py-2 ">
                    <ul className="md:mr-auto">
                      <h3 className="uppercase py-3 text-red-500 font-bold">
                        Filter by Brand Name :
                      </h3>
                      <Radio.Group
                        onChange={handleChangeBrand}
                        defaultValue={filterOptions.brand}
                      >
                        <Radio value="All">All</Radio>
                        {uniqueBrands &&
                          uniqueBrands.map((brand, index) => (
                            <li key={index}>
                              <Radio value={brand}>{brand}</Radio>
                            </li>
                          ))}
                      </Radio.Group>
                    </ul>
                  </div>
                  {/* rating filter */}
                  <div className="border border-slate-100 px-5 py-2 my-3 w-screen md:w-full">
                    <h3 className="uppercase py-3 text-red-500 font-bold">
                      Filter by rating :
                    </h3>
                    <Rate
                      count={5}
                      style={{ fontSize: 22 }}
                      value={6}
                      tooltips={["1", "2", "3", "4", "5"]}
                      onChange={(event) => dispatch(setRating(event))}
                    />
                  </div>
                  <div className="border border-slate-100 px-5 py-2 w-screen md:w-full">
                    <div className="w-full h-10 bg-red-400 hover:bg-red-500 ease-in-out  rounded-sm flex justify-center justify-items-center">
                      <button
                        className="w-full h-full hover:scale-105 text-white font-medium "
                        onClick={handleClearFilter}
                      >
                        Clear Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* product display section  */}
              <section className="md:w-4/5 ">
                <div
                  className={
                    filterProducts?.data.length &&
                    filterProducts?.data.length > 0
                      ? "grid md:grid-cols-3 sm:grid-cols-2 gap-5"
                      : "w-full"
                  }
                >
                  {filterProducts?.data.length === 0 ? (
                    <div className="w-full h-full my-36">
                      <h1 className="text-3xl font-bold text-center">
                        No products were found matching your selection
                      </h1>
                    </div>
                  ) : (
                    filterProducts?.data.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  )}
                </div>
                {filterProducts?.data &&
                  filterProducts?.data.length >= filterOptions.limit && (
                    <div className="text-end px-4 mb-2 w-18 h-10 my-3 flex justify-center justify-items-center">
                      <Button
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage((current) => current - 1);
                          }
                        }}
                        disabled={currentPage === 1}
                        className="p-5 mx-2"
                      >
                        Prev
                      </Button>
                      <Button
                        onClick={() => {
                          if (filterProducts?.data.length > currentPage) {
                            setCurrentPage((current) => current + 1);
                          }
                        }}
                        disabled={filterProducts?.data.length === currentPage}
                        className="p-5 mx-2"
                      >
                        Next
                      </Button>
                    </div>
                  )}
              </section>
            </div>
          </section>
        </section>
      </div>
    </Fragment>
  );
};

export default Products;
