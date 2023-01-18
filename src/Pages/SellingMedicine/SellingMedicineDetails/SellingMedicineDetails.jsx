import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import { MdVerified } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import { useForm } from "react-hook-form";
import { MyContext } from "../../../contexts/MyProvider/MyProvider";
import { toast } from "react-toastify";
const SellingMedicineDetails = () => {
  const medicine_id = useLoaderData();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { currentUser } = useContext(MyContext);
  const [reportModalIsOpen, setReportModalIsOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const {
    isLoading,
    isError,
    data: medicine,
    error,
    refetch,
  } = useQuery({
    queryKey: [medicine_id],
    queryFn: async () => {
      const res = await fetch(
        `https://medi-sell.vercel.app/sellingMedicineDetails?_id=${medicine_id}`
      );
      const data = await res.json();
      // console.log(data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full mx-auto h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
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
  } = medicine;
  const handleReportFormSubmit = (data) => {
    setIsReporting(true);
    const { reportingReason } = data;
    const { email, displayName } = currentUser;
    const reportingStatus = {
      _id,
      reportingReason,
      reportingUserEmail: email,
      reportingUserName: displayName,
    };
    fetch("https://medi-sell.vercel.app/reportsellingmedicine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reportingStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.modifiedCount) {
          toast.success("this medicine has been reported successfully");
          setIsReporting(false);
          setReportModalIsOpen(false);
          refetch();
        } else {
          toast.error("something went wrong. please try again later");
          setIsReporting(false);
        }
      });
  };

  const handleMedicineBuy = () => {
    if (medicine?.reportingStatus) {
      return toast.error("this medicine is reported.\nyou can't buy anymore");
    }
    // currentUser
    const { displayName, email, photoURL } = currentUser;
    // console.log(displayName, "\n", email, "\n", photoURL);
    const buyer = {
      buyerName: displayName,
      buyerEmail: email,
      buyerPhotoURL: photoURL,
    };
    fetch(`https://medi-sell.vercel.app/buymedicine?_id=${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buyer),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.modifiedCount) {
          toast.success("medicine purchased successfully");
          refetch();
        } else {
          toast.error("something went wrong, please try again");
        }
      });
  };
  return (
    <div className="max-w-4xl mx-auto my-12 px-2 sm:px-12 md:px-24 ">
      <div className="card w-full bg-base-100 shadow-xl py-4">
        <div className="card-body px-2">
          <div className="flex flex-col md:flex-row justify-between ">
            <div className="flex justify-between   p-0 grow">
              <div className="flex flex-col   relative top-[15px]">
                <div className="w-[82px] h-[82px]  ">
                  <img className="rounded-full" src={sellerImage} />
                </div>
                <div
                  className={`${
                    medicine?.userVerified ? "visible" : "invisible"
                  }   relative left-[50px] top-[-85px]  text-green-800 mx-0  p-0`}
                >
                  <MdVerified className="text-3xl" />
                </div>
              </div>

              {/* <div className="h-full flex flex-col justify-center">
                <div className="">
                  <div>
                    <h1 className="text-lg font-bold">{sellerName}</h1>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">{sellerEmail}</h1>
                  </div>
                </div>
              </div> */}

              <div className=" w-full ml-4 sm:ml-8">
                <div className="flex flex-col ">
                  <div>
                    <h1 className="">
                      <span className="font-bold text-lg">{medicineName}</span>{" "}
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
                      Post Date: <span className="font-bold">{postDate}</span>
                    </h1>
                  </div>
                  <div>
                    <h1>
                      expired on,{" "}
                      <span className="font-bold">{expiredDate}</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex md:flex-col justify-between gap-2  p-0">
              <label
                className="btn btn-sm btn-primary grow"
                htmlFor="prescription-modal"
              >
                prescription
              </label>
              <button
                onClick={handleMedicineBuy}
                disabled={sellingStatus === "sold"}
                className="btn btn-sm btn-primary grow"
              >
                {sellingStatus === "sold" ? "Stock Out" : "Buy"}
              </button>
              <label
                onClick={() => setReportModalIsOpen(true)}
                htmlFor="report-modal"
                disabled={medicine?.reportingStatus}
                className="btn btn-sm btn-primary grow"
              >
                {medicine?.reportingStatus ? "reported" : "report"}
              </label>
            </div>
          </div>
        </div>

        <>
          <input
            type="checkbox"
            id="prescription-modal"
            className="modal-toggle"
          />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <label
                htmlFor="prescription-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg ">
                posted by <span className="font-bold">{sellerName}</span> <br />
                email: <span className="font-bold">{sellerEmail}</span>
              </h3>
              <div className="py-4">
                <img src={prescriptionReport} alt="" />
              </div>
            </div>
          </div>
        </>

        {reportModalIsOpen && (
          <>
            <input type="checkbox" id="report-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle ">
              <div className="modal-box pb-32">
                <label
                  htmlFor="report-modal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <form onSubmit={handleSubmit(handleReportFormSubmit)}>
                  <label
                    htmlFor="reporting-reason"
                    className=" block sm:text-lg font-bold my-2"
                  >
                    why this medicine should be reported?
                  </label>

                  <textarea
                    {...register("reportingReason", {
                      required: {
                        value: true,
                        message:
                          "you must provide the reason for reporting this medicine",
                      },
                    })}
                    id="reporting-reason"
                    className="w-full h-24 border px-2 py-2 text-black"
                    placeholder={`${medicineName} should be reported because of ...`}
                  ></textarea>
                  {errors?.reportingReason && (
                    <p role="alert" className="text-red-500 font-bold">
                      {errors?.reportingReason?.message}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="btn w-full my-2"
                    disabled={isReporting}
                  >
                    report
                  </button>
                </form>
                {isReporting && <Loader type="progressor" />}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellingMedicineDetails;
