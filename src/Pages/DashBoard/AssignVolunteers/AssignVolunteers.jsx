import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { MyContext } from "../../../contexts/MyProvider/MyProvider";
import uploadImageToImageBB from "../../../utilities/uploadImageToImageBB/uploadImageToImageBB";
import { toast } from "react-toastify";
const AssignVolunteers = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { currentUser } = useContext(MyContext);

  const handleFormSubmit = (data) => {
    console.log(data);
    const { email } = currentUser;
    const today = new Date();
    const assigningDate = format(today, "PP");
    const {
      volunteerName,
      volunteerEmail,
      volunteerPhoneNo,
      volunteerAddress,
      volunteerPhoto,
    } = data;
    const image = volunteerPhoto[0];
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
          const volunteerInfo = {
            volunteerName,
            volunteerEmail,
            volunteerPhoneNo,
            volunteerAddress,
            assigningDate,
            volunteerPhoto: imageLink,
            NGOEmail: email,
          };

          fetch("https://medi-sell.vercel.app/assignvolunteer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(volunteerInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.acknowledged) {
                toast.success("medicine updated successfully");
              }
              // console.log(data);
              reset();
            });
        } else {
          toast.error("something went wrong. Please try again later");
          reset();
          return;
        }
      });
  };
  return (
    <div className="w-full flex flex-col items-center px-6 md:mt-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-primary my-4">
          Assign Volunteer
        </h1>
      </div>
      <div className="w-full max-w-md  md:max-w-md lg:max-w-lg">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-6">
            <label
              for="volunteerName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
            >
              Volunteer Name
            </label>
            <input
              {...register("volunteerName", {
                required: {
                  value: true,
                  message: "you have to provide Volunteer Name",
                },
              })}
              type="text"
              id="volunteerName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="type volunteer name"
            />
            {errors?.volunteerName && (
              <p role="alert" className="text-red-500 font-bold">
                {errors?.volunteerName?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="volunteerPhoneNo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
            >
              Volunteer Phone No
            </label>
            <input
              {...register("volunteerPhoneNo", {
                required: {
                  value: true,
                  message: "you have to provide Volunteer Phone No",
                },
              })}
              type="text"
              id="volunteerPhoneNo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="type volunteer phone no"
            />
            {errors?.volunteerPhoneNo && (
              <p role="alert" className="text-red-500 font-bold">
                {errors?.volunteerPhoneNo?.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              for="volunteerEmail"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
            >
              Volunteer Email
            </label>
            <input
              {...register("volunteerEmail", {
                required: {
                  value: true,
                  message: "you have to provide Volunteer Email",
                },
              })}
              type="email"
              id="volunteerEmail"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="type volunteer phone no"
            />
            {errors?.volunteerEmail && (
              <p role="alert" className="text-red-500 font-bold">
                {errors?.volunteerEmail?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="volunteerAddress"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
            >
              Volunteer Address
            </label>
            <input
              {...register("volunteerAddress", {
                required: {
                  value: true,
                  message: "you have to provide Volunteer Address",
                },
              })}
              type="text"
              id="volunteerAddress"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="type volunteer phone no"
            />
            {errors?.volunteerAddress && (
              <p role="alert" className="text-red-500 font-bold">
                {errors?.volunteerAddress?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="volunteerPhoto"
            >
              Volunteer photo
            </label>
            <input
              {...register("volunteerPhoto", {
                required: {
                  value: true,
                  message: "you have to provide your prescription",
                },
              })}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="volunteerPhoto"
              type="file"
              required
            />
            {errors?.volunteerPhoto && (
              <p role="alert" className="text-red-500 font-bold">
                {errors?.volunteerPhoto?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignVolunteers;
