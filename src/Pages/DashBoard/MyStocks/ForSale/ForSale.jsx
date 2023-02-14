import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../Components/Loader/Loader";
import { MyContext } from "../../../../contexts/MyProvider/MyProvider";
import EachSoldMedicine from "./EachSoldMedicine/EachSoldMedicine";

const ForSale = () => {
  const { currentUser } = useContext(MyContext);
  const [buyer, setBuyer] = useState(null);
  const [buyerInfoModalIsOpen, setBuyerInfoModalIsOpen] = useState(false);
  const {
    data: soldMedicines = [],
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch(
        `https://medi-sell.vercel.app/mysellingmedicines?sellerEmail=${currentUser?.email}`
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
    <div class="w-full mx-auto max-w-2xl border p-4 bg-white rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Total Sold Medicines : {soldMedicines?.length}
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
          {soldMedicines?.map((eachSoldMedicine) => (
            <EachSoldMedicine
              refetch={refetch}
              setBuyer={setBuyer}
              key={eachSoldMedicine?._id}
              eachSoldMedicine={eachSoldMedicine}
              setBuyerInfoModalIsOpen={setBuyerInfoModalIsOpen}
            />
          ))}
        </ul>
      </div>

      {buyerInfoModalIsOpen && buyer && (
        <>
          <input type="checkbox" id="buyer-info" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle z-50 mx-auto text-center justify-self-center">
            <div className="modal-box pb-4">
              <label
                htmlFor="buyer-info"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <div>
                {/* NGOEmail, assigningDate, volunteerAddress, volunteerEmail, volunteerName, volunteerPhoneNo, volunteerPhoto, _id   */}
                <div className="">
                  <h1>Buyer Info:</h1>
                  <div>
                    <img
                      className="img-fluid max-w-full mx-auto"
                      src={buyer?.buyerPhotoURL}
                      alt=""
                    />
                  </div>

                  <div>
                    <h1 className="font-bold">name: {buyer?.buyerName}</h1>
                    <h1 className="font-bold">Email: {buyer?.buyerEmail}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ForSale;
