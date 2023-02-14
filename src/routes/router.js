import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Approvals from "../Pages/DashBoard/Approvals/Approvals";
import AssignVolunteers from "../Pages/DashBoard/AssignVolunteers/AssignVolunteers";
import BarScanner from "../Pages/DashBoard/CodeScanner/BarScanner/BarScanner";
import CodeScanner from "../Pages/DashBoard/CodeScanner/CodeScanner";
import QRScanner from "../Pages/DashBoard/CodeScanner/QRScanner/QRScanner";
import DashBoard from "../Pages/DashBoard/DashBoard";
// import DonatedMedicine from "../Pages/DashBoard/DonatedMedicine/DonatedMedicine";
import DonatedStocks from "../Pages/DashBoard/DonatedStocks/DonatedStocks";
import DonateMedicine from "../Pages/DashBoard/DonateMedicine/DonateMedicine";
import Members from "../Pages/DashBoard/Members/Members";
import MyBuyer from "../Pages/DashBoard/MyBuyer/MyBuyer";
import MyMedicines from "../Pages/DashBoard/MyMedicines/MyMedicines";
import ForDonate from "../Pages/DashBoard/MyStocks/ForDonate/ForDonate";
import ForSale from "../Pages/DashBoard/MyStocks/ForSale/ForSale";
import MyStocks from "../Pages/DashBoard/MyStocks/MyStocks";
import OurVolunteers from "../Pages/DashBoard/OurVolunteers/OurVolunteers";
import ReportedMedicines from "../Pages/DashBoard/ReportedMedicines/ReportedMedicines";
import ResellMedicine from "../Pages/DashBoard/ResellMedicine/ResellMedicine";
import DonatingMedicine from "../Pages/DonatingMedicine/DonatingMedicine";
import DonatingMedicineDetails from "../Pages/DonatingMedicine/DonatingMedicineDetails/DonatingMedicineDetails";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import About from "../Pages/Home/About/About";
import Contact from "../Pages/Home/Contact/Contact";
import Home from "../Pages/Home/Home";
import SellingMedicine from "../Pages/SellingMedicine/SellingMedicine";
import SellingMedicineDetails from "../Pages/SellingMedicine/SellingMedicineDetails/SellingMedicineDetails";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivetRoute from "./PrivetRoute/PrivetRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/dashboard",
        element: (
          <PrivetRoute>
            <DashBoard />
          </PrivetRoute>
        ),
        children: [
          { path: "/dashboard/members", element: <Members /> },
          { path: "/dashboard/approvals", element: <Approvals /> },
          {
            path: "/dashboard/reportedmedicines",
            element: <ReportedMedicines />,
          },
          { path: "/dashboard/donatedstocks", element: <DonatedStocks /> },
          {
            path: "/dashboard/assignvolunteers",
            element: <AssignVolunteers />,
          },

          { path: "/dashboard/resellmedicine", element: <ResellMedicine /> },

          { path: "/dashboard/mymedicines", element: <MyMedicines /> },
          { path: "/dashboard/mybuyer", element: <MyBuyer /> },

          {
            path: "/dashboard//mystock",
            element: <MyStocks />,
            children: [
              { path: "/dashboard/mystock/for-sale", element: <ForSale /> },
              { path: "/dashboard/mystock/for-donate", element: <ForDonate /> },
            ],
          },
          { path: "/dashboard/donatemedicine", element: <DonateMedicine /> },

          { path: "/dashboard/ourvolunteers", element: <OurVolunteers /> },
          {
            path: "/dashboard/code-scanner",
            element: <CodeScanner />,
            children: [
              {
                path: "/dashboard/code-scanner/qr-code",
                element: <QRScanner />,
              },
              {
                path: "/dashboard/code-scanner/bar-code",
                element: <BarScanner />,
              },
            ],
          },
        ],
      },
      {
        path: "/sellingmedicine",
        element: (
          <PrivetRoute>
            <SellingMedicine />
          </PrivetRoute>
        ),
      },
      {
        path: "/sellingmedicine/medicinedetails/:_id",
        loader: async ({ params }) => params._id,
        element: (
          <PrivetRoute>
            {" "}
            <SellingMedicineDetails />
          </PrivetRoute>
        ),
      },
      {
        path: "/donatingmedicine",
        element: (
          <PrivetRoute>
            <DonatingMedicine />
          </PrivetRoute>
        ),
      },
      {
        path: "/donatingmedicine/medicinedetails/:_id",
        loader: async ({ params }) => params._id,
        element: (
          <PrivetRoute>
            <DonatingMedicineDetails />
          </PrivetRoute>
        ),
      },

      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },

      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },
]);
