import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Loader from "../../../Components/Loader/Loader";
import { MyContext } from "../../../contexts/MyProvider/MyProvider";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import EachMyPurchased from "./EachMyPurchased/EachMyPurchased";

const MyMedicines = () => {
  const { currentUser } = useContext(MyContext);
  const [payingMedicine, setPayingMedicine] = useState(null);
  const [payingMedicineInfoModalIsOpen, setPayingMedicineInfoModalIsOpen] =
    useState(false);
  const {
    data: myPurchased = [],
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch(
        `https://medi-sell.vercel.app/mypurchasedmedicines?buyerEmail=${currentUser?.email}`
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
  const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLICATION_KEY}`
  );

  console.log("PK: ", process.env.REACT_APP_STRIPE_PUBLICATION_KEY);
  return (
    <div>
      <div class="w-full mx-auto max-w-2xl border p-4 bg-white rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Total purchased : {myPurchased?.length}
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
            {myPurchased?.map((eachMyPurchased) => (
              <EachMyPurchased
                refetch={refetch}
                key={eachMyPurchased?._id}
                eachMyPurchased={eachMyPurchased}
                setPayingMedicineInfoModalIsOpen={
                  setPayingMedicineInfoModalIsOpen
                }
                setPayingMedicine={setPayingMedicine}
              />
            ))}
          </ul>
        </div>

        {payingMedicineInfoModalIsOpen && payingMedicine && (
          <>
            <input type="checkbox" id="buyer-info" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle z-50 mx-auto text-center justify-self-center">
              <div className="modal-box pb-4">
                <label
                  onClick={() => {
                    setPayingMedicine(null);
                    payingMedicineInfoModalIsOpen(false);
                  }}
                  htmlFor="buyer-info"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <div>
                  <div className="">
                    <h1 className="text-2xl font-bold">Paying Info:</h1>
                    <h1 className="text-lg font-bold">
                      {payingMedicine?.medicineName}
                    </h1>
                    <div>
                      <p>
                        price for each medicine = {payingMedicine?.offerPrice} ৳
                      </p>
                      <p>
                        total medicine quantity = {payingMedicine?.quantity} ৳
                      </p>
                      <hr class="h-px my-1 px-2 border-1 border-black bg-gray-900 dark:bg-gray-700" />
                      <p>
                        total = ({payingMedicine?.offerPrice} *{" "}
                        {payingMedicine?.quantity}) ={" "}
                        {payingMedicine?.offerPrice * payingMedicine?.quantity}{" "}
                        ৳
                      </p>
                    </div>
                    <div className="">
                      <Elements stripe={stripePromise}>
                        <CheckoutForm
                          refetch={refetch}
                          payingMedicine={payingMedicine}
                        />
                      </Elements>
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

export default MyMedicines;
