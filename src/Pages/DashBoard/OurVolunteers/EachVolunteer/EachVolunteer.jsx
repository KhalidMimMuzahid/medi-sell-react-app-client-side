import React from "react";
import { toast } from "react-toastify";

const EachVolunteer = ({
  refetch,
  eachVolunteer,
  setVolunteerInfo,
  setVolunteerInfoModalIsOpen,
}) => {
  const handleVolunteerDelete = () => {
    fetch(
      `https://medi-sell.vercel.app/volunteerdelet?_id=${eachVolunteer?._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.deletedCount === 1) {
          toast.success("volunteer deleted successfully");
          refetch();
        } else {
          toast.error("something went wrong, please try again");
        }
      });
  };
  return (
    <li class="py-3 sm:py-4">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img
            title=""
            class="w-8 h-8 rounded-full"
            src={eachVolunteer?.volunteerPhoto}
            alt="Neil image"
          />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            {eachVolunteer?.volunteerName}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            {eachVolunteer?.volunteerEmail}
          </p>
        </div>
        <div class="flex flex-col gap-1 items-center text-base font-semibold text-gray-900 dark:text-white">
          <label
            onClick={() => {
              setVolunteerInfoModalIsOpen(true);
              setVolunteerInfo(eachVolunteer);
            }}
            className="btn btn-primary btn-xs "
            htmlFor="volunteer-info"
          >
            details
          </label>
          <label
            htmlFor="confirm-deletion-modal"
            className="btn btn-primary btn-xs"
          >
            delete
          </label>
        </div>
      </div>
      <>
        <input
          type="checkbox"
          id="confirm-deletion-modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {`Are you sure you want to delete ${eachVolunteer?.volunteerName} ?`}
            </h3>
            <div className="modal-action flex justify-between gap-2">
              <label
                htmlFor="confirm-deletion-modal"
                className="btn grow btn-primary"
                onClick={handleVolunteerDelete}
              >
                Confirm
              </label>
              <label
                htmlFor="confirm-deletion-modal"
                className="btn grow btn-primary"
              >
                Cancel
              </label>
            </div>
          </div>
        </div>
      </>
    </li>
  );
};

export default EachVolunteer;
