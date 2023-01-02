import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import mediSell from "../../assets/logos/mediSell.png";
import { MyContext } from "../../contexts/MyProvider/MyProvider";
import profileDemo from "../../assets/images/profileDemo.png";
const Navbar = () => {
  const { currentUser, logOut } = useContext(MyContext);
  console.log("current user", currentUser);
  const navElements = [
    { navElement: "Home", link: "/" },
    { navElement: "DashBoard", link: "/dashboard" },
    { navElement: "SignIn", link: "/signin" },
    { navElement: "SignUp", link: "/signup" },
  ];
  const location = useLocation().pathname;
  const handleSignOut = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navElements?.map((eachElement) => (
                <li>
                  <Link to={eachElement?.link}>{eachElement?.navElement}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
          <Link className="w-20" to="/">
            <img src={mediSell} alt="" className="w-full" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navElements?.map((eachElement) => (
              <li>
                <Link to={eachElement?.link}>{eachElement?.navElement}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          {location === "/dashboard" && (
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden mr-2"
            >
              Open drawer
            </label>
          )}
          {currentUser && currentUser?.uid ? (
            <>
              <div>
                <button onClick={handleSignOut} className=" btn btn-primary">
                  sign Out
                </button>
              </div>
              <div className="avatar ml-2">
                <div to="" className="block w-16 rounded-full">
                  <Link>
                    <img
                      src={
                        currentUser?.photoURL
                          ? currentUser.photoURL
                          : profileDemo
                      }
                      alt={currentUser?.displayName}
                      title={currentUser?.displayName}
                    />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to="/signin" className=" btn btn-primary">
                  Join
                </Link>
              </div>
            </>
          )}

          {/* <button className="btn">profile</button> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
