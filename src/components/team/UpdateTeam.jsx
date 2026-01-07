import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";

import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "sonner";

import Spinner from "../../utils/Spinner";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import {
  useGetSingleTeamMemberQuery,
  useUpdatedSingleTeamMutation,
} from "../../redux/api/teamApi";
import MetaData from "../MetaData/MetaData";

const UpdateTeam = () => {
  const { teamId } = useParams();
  const [updatedSingleTeam, { isLoading, isError, error, isSuccess }] =
    useUpdatedSingleTeamMutation();
  const { data: teamData, isLoading: loading } = useGetSingleTeamMemberQuery(
    teamId
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("id", teamId);
    formData.append("name", data.name);
    formData.append("role", data.role);
    formData.append("image", data.image[0]);
    console.log(data);
    try {
      await updatedSingleTeam(formData );
    } catch (error) {
      console.log(error);
    }
  };

  let message = "";

  if (error) {
    message = (error ).data.message;
  }
  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-center",
      });
    }
    if (isSuccess) {
      toast.success("You have successfully updated team", {
        position: "top-center",
      });
      reset();
    }
  }, [isSuccess, message, isError, reset]);

  return (
    <Fragment>
      <MetaData title="Update Team Member" />
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
                    Name
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={teamData?.data.name}
                    {...register("name", { required: true })}
                    placeholder="Enter Team Name"
                  ></input>
                  {errors.name && (
                    <span className="text-red-500">Name is required</span>
                  )}
                </div>
                <div className="flex flex-col space-y-2 mb-2">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Role
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inappend ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inappend focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={teamData?.data.role}
                    {...register("role", { required: true })}
                    placeholder="Enter Team Role"
                  ></input>
                  {errors.role && (
                    <span className="text-red-500">Role is required</span>
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
                    value="Update Team"
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

export default UpdateTeam;
