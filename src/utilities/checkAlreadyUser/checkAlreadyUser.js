import React, { useContext } from "react";

const checkAlreadyUser = (uid) => {
  return fetch(`http://localhost:5000/checkuseralreadyindatabase?uid=${uid}`);
};

export default checkAlreadyUser;
