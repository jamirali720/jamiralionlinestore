import { Button, Card } from "antd";
import React, { Fragment, useState } from "react";
import {
  useDeletedSingleSportsMutation,
  useGetSportsQuery,
} from "../../redux/api/productsApi";
import Spinner from "../../utils/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MetaData from "../MetaData/MetaData";

const AllProducts = () => {
  const { data, isLoading } = useGetSportsQuery();
  const navigate = useNavigate();
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedSingleSports] = useDeletedSingleSportsMutation();

  const totalPages =
    data?.data.length && Math.ceil(data?.data.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const lastIndex = startIndex + itemPerPage;
  const renderData = data?.data.slice(startIndex, lastIndex);

  const handleEditProduct = (id) => {
    navigate(`/manage-products/update-product/${id}`);
  };
  const handleDeleteProduct = async (id) => {
    try {
      const res = await deletedSingleSports(id);
      if (res.data?.success) {
        toast.success(res.data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <MetaData title="Manage-all-Products" />
      <div>
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <Card>
            <div className="w-full h-10 text-center text-2xl font-semibold mb-3">
              {data?.data.length ? (
                <span> {data?.data.length} Products Available </span>
              ) : (
                <span> No Products available</span>
              )}
            </div>
            <div className="overflow-x-scroll w-full max-w-full">
              <table className="w-full max-w-full ">
                <thead className="w-full">
                  <tr className="border border-slate-200 w-full ">
                    <th className="border border-slate-200 py-2">Image</th>
                    <th className="border border-slate-200">Name</th>
                    <th className="border border-slate-200">Brand</th>
                    <th className="border border-slate-200">Category</th>
                    <th className="border border-slate-200">Price</th>
                    <th className="border border-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderData &&
                    renderData.map((product, index) => {
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
                          <td className="border border-slate-200">
                            <p>{product.category}</p>
                          </td>
                          <td className="border border-slate-200">
                            <p>{product.price}</p>
                          </td>
                          <td className="border border-slate-200">
                            {product.brand}
                          </td>
                          <td className="border border-slate-200">
                            <button
                              className="w-12 h-10 rounded-sm font-semibold text-1xl text-green-500 hover:text-green-600  bg-slate-50 hover:bg-slate-100 ease-in-out duration-300 border border-slate-200 mr-1"
                              onClick={() => handleEditProduct(product._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="w-14 h-10 rounded-sm font-semibold text-1xl text-red-400 hover:text-red-500  bg-slate-50 hover:bg-slate-100 ease-in-out duration-300 border border-slate-200 ml-1"
                              onClick={() => handleDeleteProduct(product._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className=" w-full h-14 flex justify-end justify-items-center my-5">
              <div className="text-end px-4 w-18 h-10 ">
                <span> Show : </span>
                <select
                  value={itemPerPage}
                  onChange={(event) =>
                    setItemPerPage(Number(event.target.value))
                  }
                  className="border border-slate-200  px-4 py-2 rounded-sm"
                >
                  {[5, 10, 20, 50, 75, 100, 200].map((value, i) => (
                    <option className="" key={i} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-end px-4 mb-2 w-18 h-10">
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
                    if (totalPages && totalPages > currentPage) {
                      setCurrentPage((current) => current + 1);
                    }
                  }}
                  disabled={totalPages === currentPage}
                  className="p-5 mx-2"
                >
                  next
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Fragment>
  );
};

export default AllProducts;
