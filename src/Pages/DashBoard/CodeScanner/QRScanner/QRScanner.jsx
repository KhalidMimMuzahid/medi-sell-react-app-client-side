import React, { useEffect } from "react";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
  const [scannerIsOpen, setScannerIsOpen] = useState(false);
  const [data, setData] = useState("could not detect");
  let mediaDevices = navigator.mediaDevices;
  return (
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
          <div className="max-w-[400px] flex justify-center overflow-hidden">
            <QrReader
              className="min-w-[350px]  overflow-hidden flex flex-col justify-start"
              onResult={(result, error) => {
                if (!!result) {
                  setData(result?.text);
                }

                if (!!error) {
                  // console.info(error);
                }
              }}
              constraints={{ facingMode: "user" }}
              videoContainerStyle={{ width: "400px" }}
              containerStyle={{ width: "400px" }}
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
  );
};

export default QRScanner;
