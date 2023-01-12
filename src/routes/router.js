import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Approvals from "../Pages/DashBoard/Approvals/Approvals";
import AssignVolunteers from "../Pages/DashBoard/AssignVolunteers/AssignVolunteers";
import DashBoard from "../Pages/DashBoard/DashBoard";
import DonatedMedicine from "../Pages/DashBoard/DonatedMedicine/DonatedMedicine";
import DonatedStocks from "../Pages/DashBoard/DonatedStocks/DonatedStocks";
import DonateMedicine from "../Pages/DashBoard/DonateMedicine/DonateMedicine";
import Members from "../Pages/DashBoard/Members/Members";
import MyBuyer from "../Pages/DashBoard/MyBuyer/MyBuyer";
import MyMedicines from "../Pages/DashBoard/MyMedicines/MyMedicines";
import OurVolunteers from "../Pages/DashBoard/OurVolunteers/OurVolunteers";
import ReportedMedicines from "../Pages/DashBoard/ReportedMedicines/ReportedMedicines";
import ResellMedicine from "../Pages/DashBoard/ResellMedicine/ResellMedicine";
import SoldMedicine from "../Pages/DashBoard/SoldMedicine/SoldMedicine";
import DonatingMedicine from "../Pages/DonatingMedicine/DonatingMedicine";
import DonatingMedicineDetails from "../Pages/DonatingMedicine/DonatingMedicineDetails/DonatingMedicineDetails";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import SellingMedicine from "../Pages/SellingMedicine/SellingMedicine";
import SellingMedicineDetails from "../Pages/SellingMedicine/SellingMedicineDetails/SellingMedicineDetails";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/dashboard",
        element: <DashBoard />,
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
          { path: "/dashboard/donatedmedicine", element: <DonatedMedicine /> },
          { path: "/dashboard/resellmedicine", element: <ResellMedicine /> },

          { path: "/dashboard/mymedicines", element: <MyMedicines /> },
          { path: "/dashboard/mybuyer", element: <MyBuyer /> },

          { path: "/dashboard/soldmedicine", element: <SoldMedicine /> },
          { path: "/dashboard/donatemedicine", element: <DonateMedicine /> },

          { path: "/dashboard/ourvolunteers", element: <OurVolunteers /> },
        ],
      },
      { path: "/sellingmedicine", element: <SellingMedicine /> },
      {
        path: "/sellingmedicine/medicinedetails/:_id",
        loader: async ({ params }) => params._id,
        element: <SellingMedicineDetails />,
      },
      { path: "/donatingmedicine", element: <DonatingMedicine /> },
      {
        path: "/donatingmedicine/medicinedetails/:_id",
        loader: async ({ params }) => params._id,
        element: <DonatingMedicineDetails />,
      },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },
]);
