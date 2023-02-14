import React from "react";
import { toast } from "react-toastify";

const EachMyPurchased = ({
  setPayingMedicine,
  setPayingMedicineInfoModalIsOpen,
  refetch,
  eachMyPurchased,
}) => {
  const {
    _id,
    medicineName,
    newPrice,
    offerPrice,
    quantity,
    expiredDate,
    postDate,
    type,
    sellingStatus,
    payingStatus,
    prescriptionReport,
  } = eachMyPurchased;
  const handleMedicineDelete = () => {
    fetch(
      `https://medi-sell.vercel.app/deletemypurchasedmedicine?_id=${eachMyPurchased?._id}`,
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
          <p>postDate: {offerPrice}</p>
          {/* <p>postDate: {postDate}</p> */}
          <p>expiredDate: {expiredDate}</p>
          {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
      {eachVolunteer.volunteerEmail}
    </p> */}
        </div>
        <div class="flex flex-col gap-1 items-center text-base font-semibold text-gray-900 dark:text-white">
          <label
            disabled={eachMyPurchased?.payingStatus === "paid"}
            onClick={() => {
              setPayingMedicineInfoModalIsOpen(true);
              console.log(eachMyPurchased);
              setPayingMedicine(eachMyPurchased);
            }}
            className="btn btn-primary btn-xs "
            htmlFor="buyer-info"
          >
            {eachMyPurchased?.payingStatus === "unpaid" ? "pay now" : "paid"}
          </label>
          <label
            htmlFor="confirm-deletion-modal"
            disabled={eachMyPurchased?.payingStatus === "paid"}
            className="btn btn-primary btn-xs"
          >
            {/* {eachMyPurchased?.payingStatus === "paid" ? "sold Out" : "drop"} */}
            remove
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

export default EachMyPurchased;
