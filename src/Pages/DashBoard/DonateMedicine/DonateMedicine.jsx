import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { MyContext } from "../../../contexts/MyProvider/MyProvider";
import uploadImageToImageBB from "../../../utilities/uploadImageToImageBB/uploadImageToImageBB";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
const DonateMedicine = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { currentUser } = useContext(MyContext);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  let footer = selectedDay ? (
    <p>You selected {format(selectedDay, "PP")}.</p>
  ) : (
    <p>Please pick a day.</p>
  );
  const handleSelectedDate = (e) => {
    // console.log(e);
    setSelectedDay(e);
    setModalIsOpen(false);
  };
  const handleFormSubmit = (data) => {
    setIsPosting(true);
    // console.log(data);
    const { email, photoURL, displayName } = currentUser;
    const today = new Date();
    const postDate = format(today, "PP");
    const { medicineName, prescriptionReport, quantity: quantityString } = data;
    const expiredDate = format(selectedDay, "PP");
    const quantity = parseInt(quantityString);
    const image = prescriptionReport[0];
    // console.log(
    //   "expiredDate :",
    //   expiredDate,
    //   "\nmedicineName:",
    //   medicineName,
    //   "\nprescriptionReport:",
    //   image
    // );
    uploadImageToImageBB(image)
      .then((res) => res.json())
      .then((imageData) => {
        // console.log("image data", imageData);
        const imageLink = imageData?.data?.display_url;
        // console.log("imageLink", imageLink);
        // if image succesfully uploaded the image link have a link otherwise have a undefined value
        // if image succesfully uploaded , then ,
        if (imageLink) {
          // console.log("imageLink", imageLink);
          const donatingMedicineInfo = {
            medicineName,
            quantity,
            expiredDate,
            postDate,
            type: "for-donate",
            donatingStatus: "packaged",
            prescriptionReport: imageLink,
            sellerEmail: email,
            sellerImage: photoURL,
            sellerName: displayName,
          };

          fetch("https://medi-sell.vercel.app/donatemedicine", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(donatingMedicineInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.acknowledged) {
                toast.success("medicine updated successfully");
              }
              setIsPosting(false);
              // console.log(data);
              reset();
            });
        } else {
          toast.error("something went wrong. Please try again later");
          setIsPosting(false);
          reset();
          return;
        }
      });
  };
  return (
    <div className="w-full flex flex-col items-center px-6 md:mt-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-primary my-4">
          Donating Center
        </h1>
      </div>
      <div className="w-full max-w-md  md:max-w-md lg:max-w-lg">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-6">
            <label
              for="medicine-name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
            >
              Medicine Name
            </label>
            <input
              {...register("medicineName", {
                required: {
                  value: true,
                  message: "you have to provide medicine name",
                },
              })}
              type="text"
              id="medicine-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="type your medicine name"
            />
            {errors?.medicineName && (
              <p role="alert" className="text-red-500 font-bold">
                {errors?.medicineName?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="medicine-name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
            >
              Quantity
            </label>
            <input
              {...register("quantity", {
                required: {
                  value: true,
                  message: "you have to provide quantity",
                },
                min: { value: 1, message: "invalid input" },
                pattern: { value: /[0-9]/, message: "invalid input" },
              })}
              type="text"
              id="medicine-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="type your medicine name"
            />
            {errors?.quantity && (
              <p role="alert" className="text-red-500 font-bold">
                {errors?.quantity?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
            >
              Expired Date
            </label>
            <input
              {...register("expiredDate", {
                required: {
                  value: true,
                  message: "you have to the expired date",
                },
              })}
              onClick={() => setModalIsOpen(true)}
              value={format(selectedDay, "PP")}
              type="text"
              readOnly
              id="expired-date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="pick your date"
            />
            {modalIsOpen && (
              <div>
                <DayPicker
                  mode="single"
                  selected={selectedDay}
                  onSelect={handleSelectedDate}
                  footer={footer}
                />
              </div>
            )}
            {errors?.expiredDate && (
              <p role="alert" className="text-red-500 font-bold">
                {errors?.expiredDate?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="prescription-report"
            >
              prescription
            </label>
            <input
              {...register("prescriptionReport", {
                required: {
                  value: true,
                  message: "you have to provide your prescription",
                },
              })}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="prescription-report"
              type="file"
              required
            />
            {errors?.prescriptionReport && (
              <p role="alert" className="text-red-500 font-bold">
                {errors?.prescriptionReport?.message}
              </p>
            )}
          </div>
          <button
            disabled={isPosting}
            type="submit"
            className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        {isPosting && <Loader type="progressor" />}
      </div>
    </div>
  );
};

export default DonateMedicine;
