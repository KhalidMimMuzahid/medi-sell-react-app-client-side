import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import EachVolunteer from "./EachVolunteer/EachVolunteer";

const OurVolunteers = () => {
  const [volunteerInfo, setVolunteerInfo] = useState(null);
  const [volunteerInfoModalIsOpen, setVolunteerInfoModalIsOpen] =
    useState(false);
  const {
    data: ourVolunteers = [],
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch("https://medi-sell.vercel.app/ourvolunteers");
      const data = await res.json();
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
    <div className="w-full mx-auto">
      <div class="w-full mx-auto max-w-2xl border p-4 bg-white rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Our Volunteers : {ourVolunteers?.length}
          </h5>
          <a
            href="#"
            class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            {ourVolunteers?.map((eachVolunteer) => (
              <EachVolunteer
                refetch={refetch}
                setVolunteerInfo={setVolunteerInfo}
                key={eachVolunteer._id}
                eachVolunteer={eachVolunteer}
                setVolunteerInfoModalIsOpen={setVolunteerInfoModalIsOpen}
              />
            ))}
          </ul>
        </div>
        {volunteerInfoModalIsOpen && volunteerInfo && (
          <>
            <input
              type="checkbox"
              id="volunteer-info"
              className="modal-toggle"
            />
            <div className="modal modal-bottom sm:modal-middle z-50">
              <div className="modal-box pb-4">
                <label
                  htmlFor="volunteer-info"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <div className="flex justify-center ">
                  {/* NGOEmail, assigningDate, volunteerAddress, volunteerEmail, volunteerName, volunteerPhoneNo, volunteerPhoto, _id   */}
                  <div className=" flex justify-center items-center">
                    <div>
                      <img
                        className="img-fluid max-w-full "
                        src={volunteerInfo?.volunteerPhoto}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <h1 className="font-bold">
                        name: {volunteerInfo?.volunteerName}
                      </h1>
                      <h1 className="font-bold">
                        Email: {volunteerInfo?.volunteerEmail}
                      </h1>
                      <h1 className="font-bold">
                        Contact: {volunteerInfo?.volunteerPhoneNo}
                      </h1>
                      <h1 className="font-bold">
                        Address: {volunteerInfo?.volunteerAddress}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OurVolunteers;
