import React from "react";
import { toast } from "react-toastify";

const EachSoldMedicine = ({
  refetch,
  setBuyer,
  eachSoldMedicine,
  setBuyerInfoModalIsOpen,
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
  } = eachSoldMedicine;
  const handleMedicineDelete = () => {
    const isAgree = window.confirm(
      `Are you sure you want to retrieve ${medicineName} ?`
    );
    if (isAgree) {
      fetch(
        `https://medi-sell.vercel.app/deletsellingmedicine?_id=${eachSoldMedicine?._id}`,
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
    }
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
            disabled={!eachSoldMedicine?.buyer}
            onClick={() => {
              setBuyerInfoModalIsOpen(true);
              setBuyer(eachSoldMedicine?.buyer);
            }}
            className="btn btn-primary btn-xs "
            htmlFor="buyer-info"
          >
            {eachSoldMedicine?.buyer ? "buyer info" : "not sold yet"}
          </label>
          <button
            disabled={eachSoldMedicine?.buyer}
            onClick={handleMedicineDelete}
            className="btn btn-primary btn-xs"
          >
            {eachSoldMedicine?.buyer ? "sold Out" : "get back"}
          </button>
        </div>
      </div>
    </li>
  );
};

export default EachSoldMedicine;
