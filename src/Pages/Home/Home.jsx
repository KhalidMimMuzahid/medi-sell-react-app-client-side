import React from "react";
import About from "./About/About";
import Carosel from "./Carosel/Carosel";
import Contact from "./Contact/Contact";

const Home = () => {
  return (
    <div>
      <Carosel />
      <About />
      <Contact />
      <div>
        <h1 id="contact">xxxxxxxxxxxxxxxxxxxxx</h1>
      </div>
    </div>
  );
};

export default Home;
