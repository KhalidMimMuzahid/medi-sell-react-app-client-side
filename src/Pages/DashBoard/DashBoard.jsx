import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashBoard = () => {
  const dashboardLink = {
    adminDashboard: (
      <>
        <li>
          <Link to="members">members</Link>
        </li>
        <li>
          <Link to="approvals">approvals</Link>
        </li>
      </>
    ),
    ngoDashboard: (
      <>
        <li>
          <Link to="donatedstocks">donated Stocks</Link>
        </li>
        <li>
          <Link to="assignvolunteers">assign volunteers</Link>
        </li>
      </>
    ),
    userDashboard: (
      <>
        <li>
          <Link to="donatedmedicine">donated Medicine</Link>
        </li>
        <li>
          <Link to="resellmedicine">resell Medicine</Link>
        </li>
      </>
    ),
  };
  return (
    <div className="drawer drawer-end drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here  */}
        <Outlet />
      </div>
      <div className="drawer-side border-l-4">
        <label htmlFor="my-drawer-2" className="drawer-overlay">
          xxxxxxxxx
        </label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          {/* Sidebar content here  */}
          {dashboardLink?.adminDashboard}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
