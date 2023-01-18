import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
import { MyContext } from "../../../contexts/MyProvider/MyProvider";
const EachSellingMedicine = ({
  setAllMedicines,
  eachMedicine,
  setReportModalIsOpen,
  setReportingMedicineInfo,
}) => {
  const { currentUser } = useContext(MyContext);
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   reset,
  //   formState: { errors },
  // } = useForm();
  // const [reportModalIsOpen, setReportModalIsOpen] = useState(false);
  // const [isReporting, setIsReporting] = useState(false);
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
  // const handleReportFormSubmit = (data) => {
  //   setIsReporting(true);
  //   const { reportingReason } = data;
  //   const { email, displayName } = currentUser;
  //   const reportingStatus = {
  //     _id,
  //     reportingReason,
  //     reportingUserEmail: email,
  //     reportingUserName: displayName,
  //   };
  //   fetch("https://medi-sell.vercel.app/reportsellingmedicine", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ reportingStatus }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data?.modifiedCount) {
  //         toast.success("this medicine has been reported successfully");
  //         setIsReporting(false);
  //         setReportModalIsOpen(false);
  //         setAllMedicines((prevAllMedicine) => {
  //           const newAllMedicine = prevAllMedicine.map((eachMedicine) => {
  //             if (eachMedicine._id === _id) {
  //               eachMedicine.reportingStatus = reportingStatus;
  //               console.log("id match");
  //             }
  //             return eachMedicine;
  //           });
  //           return newAllMedicine;
  //         });
  //         //   refetch();
  //       } else {
  //         toast.error("something went wrong. please try again laterxxxxxxxx");
  //         setIsReporting(false);
  //       }
  //     });
  // };

  const handleMedicineBuy = () => {
    if (eachMedicine?.reportingStatus) {
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

          setAllMedicines((allMedicines) => {
            const newAllMedicine = allMedicines.map((eachStateallMedicines) => {
              if (eachStateallMedicines._id === eachMedicine._id) {
                eachStateallMedicines.sellingStatus = "sold";
                console.log("id match: ", eachStateallMedicines);
              }
              return eachStateallMedicines;
            });
            return newAllMedicine;
          });
        } else {
          toast.error("something went wrong, please try again");
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
              onClick={handleMedicineBuy}
              disabled={sellingStatus === "sold"}
              className="btn btn-sm btn-primary grow"
            >
              {sellingStatus === "sold" ? "Sold Out" : "buy"}
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

export default EachSellingMedicine;
