import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Approvals from "../Pages/DashBoard/Approvals/Approvals";
import AssignVolunteers from "../Pages/DashBoard/AssignVolunteers/AssignVolunteers";
import DashBoard from "../Pages/DashBoard/DashBoard";
import DonatedMedicine from "../Pages/DashBoard/DonatedMedicine/DonatedMedicine";
import DonatedStocks from "../Pages/DashBoard/DonatedStocks/DonatedStocks";
import DonateMedicine from "../Pages/DashBoard/DonateMedicine/DonateMedicine";
import Members from "../Pages/DashBoard/Members/Members";
import MyBuyer from "../Pages/DashBoard/MyBuyer/MyBuyer";
import OurVolunteers from "../Pages/DashBoard/OurVolunteers/OurVolunteers";
import ResellMedicine from "../Pages/DashBoard/ResellMedicine/ResellMedicine";
import SoldMedicine from "../Pages/DashBoard/SoldMedicine/SoldMedicine";
import DonatingMedicine from "../Pages/DonatingMedicine/DonatingMedicine";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import SellingMedicine from "../Pages/SellingMedicine/SellingMedicine";
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
          { path: "/dashboard/donatedstocks", element: <DonatedStocks /> },
          {
            path: "/dashboard/assignvolunteers",
            element: <AssignVolunteers />,
          },
          { path: "/dashboard/donatedmedicine", element: <DonatedMedicine /> },
          { path: "/dashboard/resellmedicine", element: <ResellMedicine /> },

          { path: "/dashboard/mybuyer", element: <MyBuyer /> },

          { path: "/dashboard/soldmedicine", element: <SoldMedicine /> },
          { path: "/dashboard/donatemedicine", element: <DonateMedicine /> },
          { path: "/dashboard/ourvolunteers", element: <OurVolunteers /> },
        ],
      },
      { path: "/sellingmedicine", element: <SellingMedicine /> },
      { path: "/donatingmedicine", element: <DonatingMedicine /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },
]);
