import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import EachMember from "./EachMember/EachMember";

const Members = () => {
  const [userType, setUserType] = useState("user");
  const {
    data: users = [],
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [userType],
    queryFn: async () => {
      const res = await fetch(
        `https://medi-sell.vercel.app/allusers?userType=${userType}`
      );
      const data = await res.json();
      // console.log("all users: ", data);
      return data;
    },
  });
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full ">
      <form action="">
        <div className="flex gap-6  mx-auto justify-center my-4">
          <label
            onClick={() => setUserType("user")}
            htmlFor="user"
            className="flex gap-2 justify-center items-center hover:cursor-pointer"
          >
            Users
            <input
              value="user"
              id="user"
              type="radio"
              name="radio-2"
              className="radio radio-primary"
              checked={userType === "user"}
            />
          </label>
          <label
            onClick={() => setUserType("NGO")}
            htmlFor="ngo"
            className="flex gap-2 justify-center items-center  hover:cursor-pointer"
          >
            NGO
            <input
              id="ngo"
              value="NGO"
              type="radio"
              name="radio-2"
              className="radio radio-primary"
              checked={userType === "NGO"}
            />
          </label>
        </div>
      </form>

      <div className="w-full mx-auto">
        <div class="w-full mx-auto max-w-2xl border p-4 bg-white rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Total {userType}: {users?.length}
            </h5>
            <a
              href="#"
              class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View all
            </a>
          </div>

          <div class="flow-root">
            <ul
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {users?.map((eachUser) => (
                <EachMember
                  refetch={refetch}
                  key={eachUser?._id}
                  eachUser={eachUser}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
