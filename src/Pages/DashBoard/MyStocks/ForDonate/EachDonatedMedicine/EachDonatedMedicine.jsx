import React from "react";
import { toast } from "react-toastify";

const EachDonatedMedicine = ({
  refetch,
  setRecipientNGO,
  eachDonatedMedicine,
  setRecipientNGOInfoModalIsOpen,
}) => {
  const {
    donatingStatus,
    expiredDate,
    medicineName,
    postDate,
    prescriptionReport,
    quantity,

    type,
    _id,
  } = eachDonatedMedicine;
  const handleMedicineDelete = () => {
    fetch(
      `https://medi-sell.vercel.app/deletdonatingmedicine?_id=${eachDonatedMedicine?._id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.deletedCount === 1) {
          toast.success(`${medicineName} was successfully retrieved`);
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
          <img class="w-16 " src={prescriptionReport} alt="Neil image" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-lg font-bold font-medium text-gray-900 truncate dark:text-white">
            {medicineName}
            {` (${quantity})`}
          </p>
          <p>postDate: {postDate}</p>
          <p>expiredDate: {expiredDate}</p>
          {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
          {eachVolunteer.volunteerEmail}
        </p> */}
        </div>
        <div class="flex flex-col gap-1 items-center text-base font-semibold text-gray-900 dark:text-white">
          <label
            disabled={!eachDonatedMedicine?.recipientNGO}
            onClick={() => {
              setRecipientNGOInfoModalIsOpen(true);
              setRecipientNGO(eachDonatedMedicine?.recipientNGO);
            }}
            className="btn btn-primary btn-xs "
            htmlFor="recipientNGO-info"
          >
            {eachDonatedMedicine?.recipientNGO
              ? "recipient NGO"
              : "not sold yet"}
          </label>
          <label
            htmlFor="confirm-deletion-modal"
            disabled={eachDonatedMedicine?.recipientNGO}
            // onClick={handleMedicineDelete}
            className="btn btn-primary btn-xs"
          >
            {eachDonatedMedicine?.recipientNGO ? "Donated" : "get back"}
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
              {`Are you sure you want to retrieve ${medicineName} ?`}
            </h3>
            <div className="modal-action flex justify-between gap-2">
              <label
                htmlFor="confirm-deletion-modal"
                className="btn grow btn-primary"
                onClick={handleMedicineDelete}
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

export default EachDonatedMedicine;
