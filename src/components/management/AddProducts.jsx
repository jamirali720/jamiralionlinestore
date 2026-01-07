import { Fragment, useEffect } from "react";

import { useForm } from "react-hook-form";


import { FaCloudUploadAlt } from "react-icons/fa";

import { toast } from "sonner";
import { useCreateSportsMutation } from "../../redux/api/productsApi";
import { categories } from "../../utils/categories";
import { productsBrands } from "../../utils/brands";
import Spinner from "../../utils/Spinner";
import { Button, Card } from "antd";
import MetaData from "../MetaData/MetaData";

const AddProducts = () => {
  const [createSports, { isLoading, isError, error, isSuccess }] =
    useCreateSportsMutation();

  console.log("fetching error", error);
  // show error message
  let message = "";
  if (error) {
    const { data } = (error.message = data?.message);
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("brand", data.brand);
    formData.append("image", data.image[0]);

    try {
      const result = await createSports(formData).unwrap();

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-center",
      });
    }
    if (isSuccess) {
      toast.success("You have successfully created sports", {
        position: "top-center",
      });
      reset();
    }
  }, [isSuccess, isError, message, reset]);

  return (
    <Fragment>
      <MetaData title="Add Product" />
      {isLoading ? (
        <div className="w-full h-screen flex justify-center justify-items-center">
          <Spinner />
        </div>
      ) : (
        <div className="bg-[#FFFFFF] w-full h-max-screen rounded-md ">
          <Card
            title="Add New Product"
            className="bg-[#F9F9F9] w-screen  md:mx-auto  md:w-1/2 max-h-full  rounded-md px-4"
          >
            <div className="bg-[#F9F9F9] w-full max-w-full h-auto ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=""
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
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("category", { required: true })}
                  >
                    <option value="">select category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
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
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  <Button
                    type="default"
                    htmlType="submit"
                    className="p-5 w-full text-md font-medium uppercase"
                  >
                    Add Product
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </Fragment>
  );
};

export default AddProducts;
