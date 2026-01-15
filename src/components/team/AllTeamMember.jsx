import { Card } from "antd";
import React, {  Fragment, useState } from "react";

import Spinner from "../../utils/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useDeletedSingleTeamMemberMutation,
  useGetAllTeamMembersQuery,
} from "../../redux/api/teamApi";

import MetaData from "../MetaData/MetaData";

const AllTeamMember = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllTeamMembersQuery(searchText, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  // filter products by name
  const handleChangeSearch = (event) => {
    const searchQuery = event.target.value;
    setSearchText(searchQuery);
  };

  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedSingleTeamMember] = useDeletedSingleTeamMemberMutation();

  const totalPages =
    data?.data.length && Math.ceil(data?.data.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const lastIndex = startIndex + itemPerPage;
  const renderData = data?.data.slice(startIndex, lastIndex);

  const handleEditTeam = (id) => {
    navigate(`/manage-products/update-team/${id}`);
  };
  const handleDeleteTeam = async (id) => {
    try {
      const res = await deletedSingleTeamMember(id);
      if (res.data?.success) {
        toast.success(res.data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <MetaData title="All Team Members" />
      <div className="w-screen md:w-full">
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <Card>
            <div className="max-w-full md:w-full">
              <div className="w-screen md:w-1/2 mx-auto  flex justify-center justify-items-center">
                <input
                  type="text"
                  onChange={handleChangeSearch}
                  id="search"
                  className="rounded-sm  text-start text-1xl pl-3 min-w-full md:w-full mr-14 md:mr-0   h-10 my-4 outline-none ring-1  focus:ring-2"
                  placeholder="Search here"
                />
              </div>
              <div className="w-full h-10 text-center text-2xl font-semibold mb-3">
                {data?.data.length ? (
                  <span> {data?.data.length} Teams Available </span>
                ) : (
                  <span> No Team Member available</span>
                )}
              </div>
            </div>
            <div className="overflow-x-scroll w-full max-w-full">
              <table className="w-full max-w-full ">
                <thead className="w-full">
                  <tr className="border border-slate-200 w-full ">
                    <th className="border border-slate-200 py-2">Image</th>
                    <th className="border border-slate-200">Name</th>
                    <th className="border border-slate-200">Role</th>
                    <th className="border border-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderData &&
                    renderData.map((team ,index) => {
                      return (
                        <tr
                          key={index}
                          className="border border-slate-200 text-center  h-16"
                        >
                          <td className="border border-slate-200 ">
                            <div className="w-20 h-20 mx-auto ">
                              <img
                                src={team.image.url}
                                alt={team.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </td>
                          <td className="border border-slate-200">
                            <p>{team.name}</p>
                          </td>

                          <td className="border border-slate-200">
                            <p>{team.role}</p>
                          </td>

                          <td className="border border-slate-200">
                            <button
                              className="w-12 h-10 rounded-sm font-semibold text-1xl text-green-500 hover:text-green-600  bg-slate-50 hover:bg-slate-100 ease-in-out duration-300 border border-slate-200 mr-1"
                              onClick={() => handleEditTeam(team._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="w-14 h-10 rounded-sm font-semibold text-1xl text-red-400 hover:text-red-500  bg-slate-50 hover:bg-slate-100 ease-in-out duration-300 border border-slate-200 ml-1"
                              onClick={() => handleDeleteTeam(team._id)}
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
            <div className=" w-full h-14 flex justify-end justify-items-center my-5 gap-x-2">
              <div className="text-end px-4  h-10 flex justify-center justify-items-center gap-x-2 mx-4">
                <span className="my-auto"> Show : </span>
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
              <div className="text-end px-4 mb-2 w-18 h-10 flex justify-center justify-items-center gap-x-2 mx-8">
                <button
                  onClick={() => {
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className="mx-1 border border-slate-200 px-4 py-2 rounded"
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    if (totalPages && totalPages > currentPage)
                      setCurrentPage(currentPage + 1);
                  }}
                  className="mx-1 border border-slate-200 px-4 py-2 rounded"
                >
                  next
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Fragment>
  );
};

export default AllTeamMember;
