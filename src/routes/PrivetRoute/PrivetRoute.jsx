import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { MyContext } from "../../contexts/MyProvider/MyProvider";

const PrivetRoute = ({ children }) => {
  const { isLoading, currentUser } = useContext(MyContext);
  console.log("currentUser: ", currentUser, ", \nisLoading: ", isLoading);
  const location = useLocation();
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (!currentUser) {
    return (
      <Navigate to="/signin" state={{ from: location }} replace></Navigate>
    );
  } else {
    return children;
  }
};

export default PrivetRoute;
