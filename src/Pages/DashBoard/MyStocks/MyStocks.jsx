import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MyStocks = () => {
  const [scannerTypeRoute, setScannerTypeRoute] = useState("for-sale");
  const navigate = useNavigate();
  useEffect(() => {
    navigate(scannerTypeRoute);
  }, [scannerTypeRoute]);
  return (
    <div className="w-full mx-auto">
      <div className=" flex flex-col md:flex-row  justify-between justify-self-center items-center my-2 w-[400px] md:w-[600px] mx-auto">
        <h1 className="text-3xl font-bold">Medicine you posted</h1>
        <select
          defaultValue="qr-code"
          className="grow ml-2 select select-primary select-md w-auto  my-2"
          onChange={(e) => setScannerTypeRoute(e.target.value)}
        >
          <option value="for-sale" disabled selected>
            choose your stock Type
          </option>
          <option value="for-sale">for-sale</option>
          <option value="for-donate">for-donate</option>
        </select>
      </div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default MyStocks;
