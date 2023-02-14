import React from "react";
import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";

const BarScanner = () => {
  const [scannerIsOpen, setScannerIsOpen] = useState(false);
  const [data, setData] = useState("could not detect");
  let mediaDevices = navigator.mediaDevices;
  return (
    <div>
      <div>
        <div className="w-full flex justify-center">
          <button
            className="btn btn-primary text-lg font-bold"
            onClick={() => {
              setData("could not detect");
              setScannerIsOpen((prev) => {
                console.log(scannerIsOpen);
                if (scannerIsOpen) {
                  mediaDevices.getUserMedia({
                    video: false,
                  });
                }
                return !prev;
              });
            }}
          >
            {scannerIsOpen ? "Close Scanner" : "Start Scanner"}
          </button>
        </div>
        {scannerIsOpen && (
          <>
            <div className="max-w-[400px] flex justify-center overflow-hidden my-4">
              <BarcodeScannerComponent
                //   constraints={{ facingMode: "user" }}

                facingMode="user"
                width={500}
                height={500}
                onUpdate={(err, result) => {
                  console.log("err: ", err);
                  console.log("result: ", result);
                  if (result) {
                    setData(result.text);
                  }
                }}
              />
            </div>
            <div>
              <h5 className="text-lg font-semibold"> Output:</h5>
              <div>
                <textarea
                  readOnly
                  value={data}
                  className={`${
                    data === "could not detect"
                      ? "text-red-700"
                      : "text-green-700"
                  } w-[400px] h-40 border border-black p-2`}
                ></textarea>
              </div>
              {/* <span
                className={`${
                  data === "could not detect"
                    ? "text-red-700"
                    : "text-green-700"
                }`}
              >
                {data}
              </span> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BarScanner;
