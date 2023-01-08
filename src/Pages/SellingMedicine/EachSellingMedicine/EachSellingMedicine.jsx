import React from "react";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
const EachSellingMedicine = ({ eachMedicine }) => {
  const {
    medicineName,
    expiredDate,
    newPrice,
    offerPrice,
    payingStatus,
    postDate,
    prescriptionReport,
    quantity,
    sellerEmail,
    sellerImage,
    sellerName,
    sellingStatus,
    type,
    _id,
  } = eachMedicine;
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body px-2">
        <div className="flex flex-col md:flex-row justify-between ">
          <div className="flex justify-between   p-0 grow">
            <div className="flex flex-col   relative top-[15px]">
              <div className="w-[82px] h-[82px]  ">
                <img className="rounded-full" src={sellerImage} />
              </div>
              <div
                className={`${
                  eachMedicine?.userVerified ? "visible" : "invisible"
                }   relative left-[50px] top-[-85px]  text-green-800 mx-0  p-0`}
              >
                <MdVerified className="text-3xl" />
              </div>
            </div>

            <div className=" w-full ml-2 ">
              <div className="flex flex-col">
                <div>
                  <h1 className="">
                    <span className="font-bold">{medicineName}</span>{" "}
                    {`(${quantity})`}
                  </h1>
                </div>

                <div className="flex justify-start">
                  <h1 className=" bg-primary px-2 py-1 w-auto min-w-12">
                    <del className="font-bold text-white text-center">
                      {newPrice}
                    </del>
                    <span className="text-white font-bold text-xl"> ৳</span>
                  </h1>
                  <h1 className="ml-2 bg-primary px-2 py-1 w-auto min-w-12 font-bold text-white">
                    {offerPrice}{" "}
                    <span className="text-white font-bold text-xl"> ৳</span>
                  </h1>
                </div>

                <div>
                  <h1>
                    expired in, <span className="font-bold">{expiredDate}</span>
                  </h1>
                </div>
                <div>
                  {sellingStatus === "sold" ? (
                    <h1>Stock Out</h1>
                  ) : (
                    <h1>Available</h1>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col justify-between gap-2  p-0">
            <Link
              to={`/sellingmedicine/medicinedetails/${_id}`}
              className="btn btn-sm btn-primary grow"
            >
              <button> details</button>
            </Link>
            <button
              disabled={sellingStatus === "sold"}
              className="btn btn-sm btn-primary grow"
            >
              {sellingStatus === "sold" ? "Sold Out" : "buy"}
            </button>
            <button
              disabled={eachMedicine?.reportingStatus}
              className="btn btn-sm btn-primary grow"
            >
              {eachMedicine?.reportingStatus ? "reported" : "report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachSellingMedicine;
