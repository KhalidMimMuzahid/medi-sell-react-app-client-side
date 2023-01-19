import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import { MyContext } from "../../../contexts/MyProvider/MyProvider";
import EachDonatedStock from "./EachDonatedStock/EachDonatedStock";

const DonatedStocks = () => {
  const { currentUser } = useContext(MyContext);
  const [seller, setSeller] = useState(null);
  const [sellerInfoModalIsOpen, setSellerInfoModalIsOpen] = useState(false);

  const {
    data: donatedStocks = [],
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch(
        `https://medi-sell.vercel.app/ourdonatedstocks?ngoEmail=${currentUser?.email}`
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
            Total Donated Stocks : {donatedStocks?.length}
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
            {donatedStocks?.map((eachDonatedStock) => (
              <EachDonatedStock
                refetch={refetch}
                setSeller={setSeller}
                key={eachDonatedStock?._id}
                eachDonatedStock={eachDonatedStock}
                setSellerInfoModalIsOpen={setSellerInfoModalIsOpen}
              />
            ))}
          </ul>
        </div>

        {sellerInfoModalIsOpen && seller && (
          <>
            <input type="checkbox" id="seller-info" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle z-50 mx-auto text-center justify-self-center">
              <div className="modal-box pb-4">
                <label
                  htmlFor="seller-info"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <div>
                  {/* NGOEmail, assigningDate, volunteerAddress, volunteerEmail, volunteerName, volunteerPhoneNo, volunteerPhoto, _id   */}
                  <div className="">
                    <h1>Seller Info:</h1>
                    <div>
                      <img
                        className="img-fluid max-w-full mx-auto"
                        src={seller?.sellerImage}
                        alt=""
                      />
                    </div>

                    <div>
                      <h1 className="font-bold">name: {seller?.sellerName}</h1>
                      <h1 className="font-bold">
                        Email: {seller?.sellerEmail}
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

export default DonatedStocks;
