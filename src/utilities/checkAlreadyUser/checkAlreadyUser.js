import React, { useContext } from "react";

const checkAlreadyUser = (uid) => {
  return fetch(
    `https://medi-sell.vercel.app/checkuseralreadyindatabase?uid=${uid}`
  );
};

export default checkAlreadyUser;
