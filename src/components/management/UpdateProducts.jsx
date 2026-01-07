import {
  useGetSingleSportsQuery,
  useUpdatedSingleSportsMutation,
} from "../../redux/api/productsApi";

import { Fragment, useEffect } from "react";

import { useForm } from "react-hook-form";


import { FaCloudUploadAlt } from "react-icons/fa";

import { toast } from "sonner";

import { categories } from "../../utils/categories";
import { productsBrands } from "../../utils/brands";
import Spinner from "../../utils/Spinner";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import MetaData from "../MetaData/MetaData";

const UpdateProducts = () => {
  const { productId } = useParams();
  const [updatedSingleSports, { isLoading, isError, isSuccess }] =
    useUpdatedSingleSportsMutation();
  const { data: product, isLoading: loading } = useGetSingleSportsQuery(
    productId
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id", productId);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("brand", data.brand);
    formData.append("image", data.image[0]);

    try {
      await updatedSingleSports(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Updated failed", {
        position: "top-center",
      });
    }
    if (isSuccess) {
      toast.success("You have successfully updated sports", {
        position: "top-center",
      });
      reset();
    }
  }, [isSuccess, isError, reset]);

  return (
    <Fragment>
      <MetaData title="Update Product" />
      {isLoading || loading ? (
        <div className="w-full h-screen flex justify-center justify-items-center">
          <Spinner />
        </div>
      ) : (
        <div className="bg-[#FFFFFF] w-full h-max-screen rounded-md mt-2 ">
          <Card
            title="Update Product"
            className="bg-[#F9F9F9] w-full max-w-full ml-10 md:mx-auto  md:w-1/2 max-h-full  rounded-md p-4"
          >
            <div className="bg-[#F9F9F9] w-full max-w-full h-auto ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6"
                encType="multipart/form-data"
              >
                <div className="flex flex-col space-y-2 mb-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Name
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={product?.data.name}
                    {...register("name", { required: true })}
                    placeholder="Enter Product Name"
                  ></input>
                  {errors.name && (
                    <span className="text-red-500">Name is required</span>
                  )}
                </div>
                <div className="flex flex-col space-y-2 mb-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    defaultValue={product?.data.category}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("category", { required: true })}
                  >
                    <option value="">select category</option>
                    {categories.map((category, index) => (
                      <option key={index} defaultValue={product?.data.category}>
                        {category}{" "}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-red-500">Category is required</span>
                  )}
                </div>
                <div className="flex flex-col space-y-2 mb-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    defaultValue={product?.data.description}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("description", { required: true })}
                    placeholder="Enter Product Description"
                  ></textarea>
                  {errors.description && (
                    <span className="text-red-500">
                      Description is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2 mb-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <input
                    defaultValue={product?.data.price}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("price", { required: true })}
                    placeholder="Enter Product Price"
                  ></input>
                  {errors.price && (
                    <span className="text-red-500">Price is required</span>
                  )}
                </div>
                <div className="flex flex-col space-y-2 mb-2">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stock
                  </label>
                  <input
                    defaultValue={product?.data.stock}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("stock", { required: true })}
                    placeholder="Enter Product Stock"
                  ></input>
                  {errors.stock && (
                    <span className="text-red-500">Stock is required</span>
                  )}
                </div>
                <div className="flex flex-col space-y-2 mb-2">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Brand
                  </label>
                  <select
                    defaultValue={product?.data.brand}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("brand", { required: true })}
                  >
                    {productsBrands.map((brand, index) => {
                      return (
                        <option key={index} value={brand}>
                          {brand}
                        </option>
                      );
                    })}
                  </select>
                  {errors.brand && (
                    <span className="text-red-500">Brand is required</span>
                  )}
                </div>
                <div className="flex flex-col space-y-2 mb-2 mt-5 border border-gray-300 rounded-md">
                  <label
                    htmlFor="file"
                    className="flex justify-evenly justify-items-center text-sm font-medium leading-6 text-gray-900"
                  >
                    <span className="text-lg">Upload Image : </span>
                    <span>
                      <FaCloudUploadAlt className="text-gray-500" size={36} />
                    </span>
                  </label>
                  <input
                    type="file"
                    id="file"
                    {...register("image", { required: true })}
                    hidden
                  ></input>
                  {errors.image && (
                    <span className="text-red-500">File is required</span>
                  )}
                </div>
                <div className="w-full flex justify-end mt-6">
                  <input
                    type="submit"
                    value="Update Product"
                    className="text-red-500  bg-slate-200 hover:bg-slate-300 hover:scale-105 px-8 py-2 rounded-full cursor-pointer"
                  />
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateProducts;
