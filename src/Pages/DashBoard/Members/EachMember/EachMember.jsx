import React from "react";
import profileDemo from "../../../../assets/images/profileDemo.jpg";
import { MdVerified } from "react-icons/md";
import { toast } from "react-toastify";
const EachMember = ({ refetch, eachUser }) => {
  const { _id, name, email, role, profilePhoto, uid } = eachUser;
  const verifyUser = () => {
    console.log("url: ", profilePhoto);
    const userInfo = { email, _id, role };
    fetch(`https://medi-sell.vercel.app/verifyuser`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          toast.success(`${name} verified successfully`);
          refetch();
        } else {
          toast.error("something went wrong, please try again");
        }
      });
  };
  return (
    <li class="py-3 sm:py-4">
      <div class="flex flex-col sm:flex-row items-center space-x-4">
        <>
          <div className="flex flex-col   relative top-[15px]">
            <div className="w-[82px] h-[82px]  ">
              <img
                className="rounded-full"
                src={profilePhoto ? profilePhoto : profileDemo}
                alt={name}
                title={name}
              />
            </div>
            <div
              className={`${
                eachUser?.isVerified ? "visible" : "invisible"
              }   relative left-[50px] top-[-85px]  text-green-800 mx-0  p-0`}
            >
              <MdVerified className="text-3xl" />
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <p class="text-lg font-bold font-medium text-gray-900 truncate dark:text-white">
              {name}
            </p>
            <p>email: {email}</p>
          </div>
        </>

        <div class="flex flex-col gap-1 items-center text-base font-semibold text-gray-900 dark:text-white w-full sm:w-auto">
          <button
            onClick={verifyUser}
            className="btn btn-primary btn-xs w-full"
            disabled={eachUser?.isVerified}
          >
            {eachUser?.isVerified ? "verified" : "verify user"}
          </button>
          <button className="btn btn-primary btn-xs w-full">mute user</button>
          <button className="btn btn-primary btn-xs w-full">delete user</button>
        </div>
      </div>
    </li>
  );
};

export default EachMember;
