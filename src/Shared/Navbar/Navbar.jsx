import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiMenu2Fill, RiMenu3Line } from "react-icons/ri";
import mediSell from "../../assets/logos/mediSell.png";
import { MyContext } from "../../contexts/MyProvider/MyProvider";
import profileDemo from "../../assets/images/profileDemo.jpg";
import useRole from "../../useHooks/useRole/useRole";
import Loader from "../../Components/Loader/Loader";
import { NavHashLink } from "react-router-hash-link";
const Navbar = ({ setThemeIsDark, themeIsDark }) => {
  const { currentUser, logOut } = useContext(MyContext);
  const location = useLocation().pathname;
  console.log("current user", currentUser);
  const { role, isRoleLoading } = useRole();
  console.log("rolexx :", role);
  if (isRoleLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center ">
        <Loader />
      </div>
    );
  }
  const navElements = [
    { navElement: "Home", link: "/" },
    { navElement: "About Us", link: "/about" },
    { navElement: "Contact Us", link: "/contact" },
    { navElement: "DashBoard", link: "/dashboard" },
  ];
  const roleElements = (
    <>
      {role === "user" && (
        <li>
          <Link to="/sellingmedicine" className="font-bold">
            Medicine
          </Link>
        </li>
      )}
      {role === "NGO" && (
        <li>
          <Link to="/donatingmedicine" className="font-bold">
            Medicine
          </Link>
        </li>
      )}
      {/* {role === "admin" && (
        <li>
          <Link to="/donatingmedicine">Medicine</Link>
        </li>
      )} */}
    </>
  );
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
            <label tabIndex={0} className="md:btn btn-ghost lg:hidden">
              {/* <svg
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
              </svg> */}
              <RiMenu2Fill className="text-3xl" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* <NavHashLink
  to="/some/path#with-hash-fragment"
  activeClassName="selected"
  activeStyle={{ color: 'red' }}
  // etc...
>Link to Hash Fragment</NavHashLink> */}

              {navElements?.map((eachElement) => (
                <li>
                  <Link to={eachElement?.link} className="font-bold">
                    {eachElement?.navElement}
                  </Link>
                </li>
              ))}
              {roleElements}
            </ul>
          </div>
          <Link
            className="w-20 lg:hover:shadow-lg lg:hover:shadow-black lg:hover:opacity-100 lg:hover:bg-blend-darken rounded-3xl"
            to="/"
          >
            <img src={mediSell} alt="" className="w-16 md:w-full" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">
            {navElements?.map((eachElement) => (
              <li className="">
                <Link to={eachElement?.link} className="font-bold">
                  {eachElement?.navElement}
                </Link>
              </li>
            ))}
            {roleElements}
          </ul>
        </div>
        <div className="navbar-end">
          <input
            onChange={() =>
              setThemeIsDark((prev) => {
                localStorage.setItem("themeIsDark", !prev);
                return !prev;
              })
            }
            type="checkbox"
            className="toggle  md:toggle-lg  mx-2"
            checked={themeIsDark}
          />
          {location.startsWith("/dashboard") && (
            <label
              tabIndex={0}
              htmlFor="my-drawer-2"
              className=" md:btn btn-ghost lg:hidden mr-0"
            >
              <RiMenu3Line className="  text-3xl " />
            </label>
          )}
          {currentUser && currentUser?.uid ? (
            <>
              <div>
                <button
                  onClick={handleSignOut}
                  className=" btn btn-primary btn-sm md:btn-md"
                >
                  sign Out
                </button>
              </div>
              <div className="avatar ml-2">
                <div to="" className="block w-12 md:w-16 rounded-full">
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
