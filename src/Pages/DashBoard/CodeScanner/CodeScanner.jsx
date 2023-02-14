import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CodeScanner = () => {
  const [data, setData] = useState("No result");
  const [scannerTypeRoute, setScannerTypeRoute] = useState("qr-code");
  const navigate = useNavigate();
  useEffect(() => {
    navigate(scannerTypeRoute);
  }, [scannerTypeRoute]);
  return (
    <div>
      <div className=" flex justify-between justify-self-center items-center my-2 w-[400px]">
        <h1 className="text-3xl font-bold">Scan Here</h1>
        <select
          defaultValue="qr-code"
          className="grow ml-2 select select-primary select-md w-auto  my-2"
          onChange={(e) => setScannerTypeRoute(e.target.value)}
        >
          <option value="qr-code" disabled selected>
            Pick Scanner Type
          </option>
          <option value="qr-code">QR Code</option>
          <option value="bar-code">Bar Code</option>
        </select>
      </div>

      <div className="mx-w-[400px] flex justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default CodeScanner;
