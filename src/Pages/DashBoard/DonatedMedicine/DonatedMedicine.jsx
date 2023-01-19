import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import { MyContext } from "../../../contexts/MyProvider/MyProvider";
import EachDonatedMedicine from "./EachDonatedMedicine/EachDonatedMedicine";
import { MdVerified } from "react-icons/md";
const DonatedMedicine = () => {
  const { currentUser } = useContext(MyContext);
  const [recipientNGO, setRecipientNGO] = useState(null);
  const [recipientNGOInfoModalIsOpen, setRecipientNGOInfoModalIsOpen] =
    useState(false);
  // console.log(recipientNGO);
  const {
    data: donatedMedicines = [],
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch(
        `https://medi-sell.vercel.app/mydonatingmedicines?sellerEmail=${currentUser?.email}`
      );
      const data = await res.json();
      console.log(data);
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
            Total Donated Medicines : {donatedMedicines?.length}
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
            {donatedMedicines?.map((eachDonatedMedicine) => (
              <EachDonatedMedicine
                refetch={refetch}
                setRecipientNGO={setRecipientNGO}
                key={eachDonatedMedicine?._id}
                eachDonatedMedicine={eachDonatedMedicine}
                setRecipientNGOInfoModalIsOpen={setRecipientNGOInfoModalIsOpen}
              />
            ))}
          </ul>
        </div>
        {recipientNGOInfoModalIsOpen && recipientNGO && (
          <>
            <input
              type="checkbox"
              id="recipientNGO-info"
              className="modal-toggle"
            />
            <div className="modal modal-bottom sm:modal-middle z-50 mx-auto text-center justify-self-center">
              <div className="modal-box pb-4">
                <label
                  htmlFor="recipientNGO-info"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <div>
                  {/* NGOEmail, assigningDate, volunteerAddress, volunteerEmail, volunteerName, volunteerPhoneNo, volunteerPhoto, _id   */}
                  <div className="">
                    <h1>Recipient NGO Info:</h1>
                    <div>
                      <img
                        className="img-fluid max-w-full mx-auto"
                        src={recipientNGO?.ngoPhotoURL}
                        alt=""
                      />
                    </div>
                    <div>
                      <h1 className="font-bold">
                        name: {recipientNGO?.ngoName}{" "}
                        {recipientNGO?.NGOVerified && (
                          <MdVerified className="inline text-2xl text-green-700" />
                        )}
                      </h1>
                      <h1 className="font-bold">
                        Email: {recipientNGO?.ngoEmail}
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

export default DonatedMedicine;
