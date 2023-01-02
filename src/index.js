import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MyProvider from "./contexts/MyProvider/MyProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyProvider>
    {" "}
    <ToastContainer position="top-center" />
    <App />
  </MyProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
