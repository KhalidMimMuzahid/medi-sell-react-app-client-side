import React, { useContext } from "react";

const uploadProfileToMongoDB = (userInfoForDB) => {
  return fetch("https://medi-sell.vercel.app/insertusertodb", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userInfoForDB),
  });
};

export default uploadProfileToMongoDB;
