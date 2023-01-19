import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";

const Main = () => {
  const [themeIsDark, setThemeIsDark] = useState(false);
  useEffect(() => {
    const newThemeString = localStorage.getItem("themeIsDark");
    const newTheme = JSON.parse(newThemeString);
    if (newTheme) {
      setThemeIsDark(newTheme);
    }
  }, []);
  // data-theme={themeIsDark ? "dark" : "light"}
  return (
    <div data-theme="valentine">
      <Navbar setThemeIsDark={setThemeIsDark} themeIsDark={themeIsDark} />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
