import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Realm from "realm-web";
// import EachSellingMedicine from "./EachSellingMedicine/EachSellingMedicine";
import styles from "../../externalcss/sellingMedicinesResponsive.module.css";
import EachDonatingMedicine from "./EachDonatingMedicine/EachDonatingMedicine";
import { MyContext } from "../../contexts/MyProvider/MyProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
const DonatingMedicine = () => {
  const { currentUser } = useContext(MyContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [reportModalIsOpen, setReportModalIsOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportingMedicineInfo, setReportingMedicineInfo] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchKeyResults, setSearchKeyResults] = useState([]);
  const [queryKey, setQueryKey] = useState("");
  const [allMedicines, setAllMedicines] = useState([]);

  //   console.log("allMedicines: ", allMedicines);
  useEffect(() => {
    if (searchKey.length) {
      const REALM_APP_ID = "medicines-dujph";
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      const runFunc = async () => {
        try {
          const user = await app.logIn(credentials);
          //   console.log("user: ", user);
          const allSellingMedicine =
            await user.functions.autoCompleteDonatingMedicineName(searchKey);
          //   console.log("allSellingMedicine:-", allSellingMedicine);
          setSearchKeyResults(allSellingMedicine);
        } catch (err) {
          console.error("Failed to log in", err);
        }
      };
      runFunc();
    } else {
      // TODO: if there have no searchkey then i should take all medicienes form database
      setSearchKeyResults([]);
    }
  }, [searchKey]);
  // useEffect(() => {
  //   if (queryKey.length) {
  //     const REALM_APP_ID = "medicines-dujph";
  //     const app = new Realm.App({ id: REALM_APP_ID });
  //     const credentials = Realm.Credentials.anonymous();
  //     const runFunc = async () => {
  //       try {
  //         const user = await app.logIn(credentials);
  //         //   console.log("user: ", user);
  //         const allSellingMedicine =
  //           await user.functions.searchSellingMedicineName(queryKey);
  //         console.log("allSellingMedicine:-", allSellingMedicine);
  //         setAllMedicines(allSellingMedicine);
  //       } catch (err) {
  //         console.error("Failed to log in", err);
  //       }
  //     };
  //     runFunc();
  //   } else {
  //     // TODO: if there have no searchkey then i should take all medicienes form database
  //     // console.log("oh fuck !");
  //     setAllMedicines([]);
  //   }
  // }, [queryKey]);
  useEffect(() => {
    if (queryKey.length) {
      fetch(
        `https://medi-sell.vercel.app/searchdonatingmedicine?queryKey=${queryKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          // all searching medicine is here
          console.log("allMedicines: ", data);
          setAllMedicines(data);
        });
    } else {
      // TODO: if there have no searchkey then i should take all medicienes form database
      setAllMedicines([]);
    }
  }, [queryKey]);

  //   useEffect(() => {  //     const REALM_APP_ID = "medicines-dujph";
  //     const app = new Realm.App({ id: REALM_APP_ID });
  //     const credentials = Realm.Credentials.anonymous();
  //     const runFunc = async () => {
  //       try {
  //         const user = await app.logIn(credentials);
  //         console.log("user: ", user);
  //         const allSellingMedicine = await user.functions.getAllSellingMedicine();
  //         console.log("allSellingMedicine:", allSellingMedicine);
  //         // setAllMedicines(allSellingMedicine);
  //       } catch (err) {
  //         console.error("Failed to log in", err);
  //       }
  //     };
  //     runFunc();
  //   }, []);

  //   const {
  //     isLoading,
  //     isError,
  //     data: searchResult = [],
  //     error,
  //   } = useQuery({
  //     queryKey: [searchKey],
  //     queryFn: async () => {
  //       const res = await fetch(
  //         `https://medi-sell.vercel.app/searchsellingmedicine?medicineName=${searchKey}`
  //       );
  //       const data = await res.json();
  //       console.log(data);
  //       return data;
  //     },
  //   });
  const handleFormSubmit = (data) => {
    data.preventDefault();
    setSearchKeyResults([]);
    setQueryKey(data.target.queryKey.value);
  };
  const handleMedicineClick = (medicineName) => {
    const searchField = document.getElementById("search-box");
    searchField.value = medicineName;
    setSearchKeyResults([]);
    setQueryKey(medicineName);
    // console.log("xxxxxxxxxxxxxxxxxxxx");
  };
  const handleOnBlur = () => {
    setTimeout(function () {
      setSearchKeyResults([]);
      setSearchKey("");
    }, 200);
  };
  const handleReportFormSubmit = (data) => {
    setIsReporting(true);
    const { reportingReason } = data;
    const { email, displayName } = currentUser;
    const reportingStatus = {
      _id: reportingMedicineInfo?._id,
      reportingReason,
      reportingUserEmail: email,
      reportingUserName: displayName,
    };
    fetch("https://medi-sell.vercel.app/reportdonatingmedicine", {
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
          setAllMedicines((prevAllMedicine) => {
            const newAllMedicine = prevAllMedicine.map((eachMedicine) => {
              if (eachMedicine._id === reportingMedicineInfo?._id) {
                eachMedicine.reportingStatus = reportingStatus;
                // console.log("id match");
              }
              return eachMedicine;
            });
            return newAllMedicine;
          });
          //   refetch();
        } else {
          toast.error("something went wrong. please try again later");
          setIsReporting(false);
        }
      });
  };
  return (
    <div className="w-full flex flex-col items-center px-6 md:mt-8">
      <h1>Medicine For Take</h1>
      <div className="w-full max-w-md  md:max-w-md lg:max-w-lg mb-4">
        <form onSubmit={handleFormSubmit}>
          <label
            for="search-box"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              onChange={(e) => setSearchKey(e.target.value)}
              onBlur={handleOnBlur}
              onFocus={(e) => setSearchKey(e.target.value)}
              name="queryKey"
              type="search"
              id="search-box"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        {searchKeyResults && (
          <div className="w-full flex flex-col items-center  ">
            {/* px should be zero after 450 width  */}
            <ul
              className={`absolute  z-20  w-full   md:max-w-md lg:max-w-lg ${styles.textsearchresponsive}`}
            >
              {searchKeyResults.map((eachResult) => (
                <li
                  onClick={() => handleMedicineClick(eachResult?.medicineName)}
                  // onClick={() => console.log("xxxxxxxxxx")}
                  key={eachResult._id}
                  className="block w-full bg-primary text-white font-bold px-4 py-1 hover:bg-blue-800 hover:cursor-pointer"
                >
                  {eachResult?.medicineName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {allMedicines && (
        <div className=" w-full">
          <h1>
            search Result Found:{" "}
            <span className="font-bold">{allMedicines.length}</span> medicines
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mx-0 md:mx-14 lg:mx-0 mb-4">
            {allMedicines &&
              allMedicines.map((eachMedicine) => (
                <EachDonatingMedicine
                  setAllMedicines={setAllMedicines}
                  key={eachMedicine?._id}
                  eachMedicine={eachMedicine}
                  setReportModalIsOpen={setReportModalIsOpen}
                  setReportingMedicineInfo={setReportingMedicineInfo}
                />
              ))}
          </div>
        </div>
      )}
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
                  placeholder={`${reportingMedicineInfo?.medicineName} should be reported because of ...`}
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
  );
};

export default DonatingMedicine;
