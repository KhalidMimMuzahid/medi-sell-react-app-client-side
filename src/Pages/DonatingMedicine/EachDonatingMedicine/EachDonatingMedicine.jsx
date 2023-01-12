import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { useForm } from "react-hook-form";
import { MyContext } from "../../../contexts/MyProvider/MyProvider";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
const EachDonatingMedicine = ({
  eachMedicine,
  setAllMedicines,
  setReportModalIsOpen,
  setReportingMedicineInfo,
}) => {
  const { currentUser } = useContext(MyContext);
  const {
    medicineName,
    expiredDate,
    postDate,
    prescriptionReport,
    quantity,
    sellerEmail,
    sellerImage,
    sellerName,
    donatingStatus,
    type,
    _id,
  } = eachMedicine;
  const handleTakeDonatedMedicine = () => {
    const { displayName, email, photoURL } = currentUser;
    const medicineTakerNGOInfo = {
      ngoName: displayName,
      ngoEmail: email,
      ngoPhotoURL: photoURL,
    };
    fetch(`https://medi-sell.vercel.app/takedonatedmedicine?_id=${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicineTakerNGOInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.modifiedCount) {
          toast.success(`${medicineName} token successfully`);
          setAllMedicines((prevAllMedicine) => {
            const newAllMedicine = prevAllMedicine.map((eachStateMedicine) => {
              if (eachStateMedicine._id === _id) {
                eachStateMedicine.donatingStatus = "donated";
                // console.log("id match");
              }
              return eachStateMedicine;
            });
            return newAllMedicine;
          });
        } else {
          toast.error(`something went wrong, please try again later`);
        }
      });
  };
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

                {/* <div className="flex justify-start">
                  <h1 className=" bg-primary px-2 py-1 w-auto min-w-12">
                    <del className="font-bold text-white text-center">
                      newPrice
                    </del>
                    <span className="text-white font-bold text-xl"> ৳</span>
                  </h1>
                  <h1 className="ml-2 bg-primary px-2 py-1 w-auto min-w-12 font-bold text-white">
                    offerPrice
                    <span className="text-white font-bold text-xl"> ৳</span>
                  </h1>
                </div> */}
                <div>
                  <h1>
                    Post Date: <span className="font-bold">{postDate}</span>
                  </h1>
                </div>
                <div>
                  <h1>
                    expired in, <span className="font-bold">{expiredDate}</span>
                  </h1>
                </div>
                <div>
                  {donatingStatus === "donated" ? (
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
              to={`/donatingmedicine/medicinedetails/${_id}`}
              className="btn btn-sm btn-primary grow"
            >
              <button> details</button>
            </Link>
            <button
              onClick={handleTakeDonatedMedicine}
              disabled={donatingStatus === "donated"}
              className="btn btn-sm btn-primary grow"
            >
              {donatingStatus === "donated" ? "donated" : "Take"}
            </button>
            <label
              htmlFor="report-modal"
              onClick={() => {
                setReportModalIsOpen(true);
                setReportingMedicineInfo(eachMedicine);
                const reportingField =
                  document.getElementById("reporting-reason");
                reportingField.value = null;
              }}
              disabled={eachMedicine?.reportingStatus}
              className="btn btn-sm btn-primary grow"
            >
              {eachMedicine?.reportingStatus ? "reported" : "report"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachDonatingMedicine;
