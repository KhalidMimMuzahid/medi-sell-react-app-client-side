import React from "react";
import { Link, Outlet } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import useRole from "../../useHooks/useRole/useRole";

const DashBoard = () => {
  const { role, isRoleLoading } = useRole();
  if (isRoleLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center ">
        <Loader />
      </div>
    );
  }
  const dashboardLink = {
    adminDashboard: (
      <>
        <li>
          <Link
            className="btn btn-primary text-white my-1 focus:text-black"
            to="members"
          >
            manage members
          </Link>
        </li>
        {/* <li>
          <Link to="approvals">approvals</Link>
        </li> */}
        <li>
          <Link
            className="btn btn-primary text-white my-1 focus:text-black"
            to="reportedmedicines"
          >
            reported medicines
          </Link>
        </li>
      </>
    ),
    ngoDashboard: (
      <>
        <li>
          <Link
            className="btn btn-primary text-white my-1 focus:text-black"
            to="donatedstocks"
          >
            donated Stocks
          </Link>
        </li>
        <li>
          <Link
            className="btn btn-primary text-white my-1 focus:text-black"
            to="assignvolunteers"
          >
            assign volunteers
          </Link>
        </li>
        <li>
          <Link
            className="btn btn-primary text-white my-1 focus:text-black"
            to="ourvolunteers"
          >
            our volunteers
          </Link>
        </li>
      </>
    ),
    userDashboard: (
      <>
        <li>
          <Link
            className="btn btn-primary text-white my-1 focus:text-black"
            to="resellmedicine"
          >
            resell Medicine
          </Link>
        </li>
        <li>
          <Link
            className="btn btn-primary text-white my-1 focus:text-black"
            to="donatemedicine"
          >
            donate Medicine
          </Link>
        </li>
        <li>
          <Link to="soldmedicine">sold Medicine</Link>
        </li>
        <li>
          <Link
            className="btn btn-primary text-white my-1 focus:text-black"
            to="donatedmedicine"
          >
            donated Medicine
          </Link>
        </li>
        <li>
          <Link
            className="btn btn-primary text-white my-1 focus:text-black"
            to="mymedicines"
          >
            my medicines
          </Link>
        </li>
        <li>
          <Link
            className="btn btn-primary text-white my-1 focus:text-black"
            to="mybuyer"
          >
            my buyer
          </Link>
        </li>
      </>
    ),
  };
  return (
    <div className="drawer drawer-end drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        {/* Page content here  */}
        <Outlet />
      </div>
      <div className="drawer-side border-l-4">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80  text-base-content">
          {/* Sidebar content here  */}
          {role === "user" && dashboardLink?.userDashboard}
          {role === "NGO" && dashboardLink?.ngoDashboard}
          {role === "admin" && dashboardLink?.adminDashboard}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
