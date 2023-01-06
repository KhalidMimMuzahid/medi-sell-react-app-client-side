import React from "react";

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
      <div className="card-body">
        <div className="flex justify-between">
          <div className="avatar">
            <div className="w-20 rounded-full">
              <img src={sellerImage} />
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <h1 className="">
                <span className="font-bold">{medicineName}</span>{" "}
                {`(${quantity})`}
              </h1>
            </div>
            <div className="flex">
              <h1 className="mx-2 bg-primary px-2 py-1 w-12">
                <del className="font-bold text-white text-center">
                  {newPrice}
                </del>
                <span className="text-white font-bold text-xl"> ৳</span>
              </h1>
              <h1 className="mx-2 bg-primary px-2 py-1 w-12 font-bold text-white">
                {offerPrice}৳
              </h1>
            </div>
            <h1>
              expired in, <span className="font-bold">{expiredDate}</span>
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="btn btn-sm">details</h1>
            <h1 className="btn btn-sm">buy</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachSellingMedicine;
