import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="  min-h-full px-8 lg:px-0" id="about">
      <div className="z-0 flex items-center justify-center w-auto gap-12 p-4 px-0 flex-col lg:flex-row ">
        <img
          alt=""
          // src={bullet2}
          src=""
          className="max-w-md rounded-lg shadow-2xl hidden lg:block"
        />
        <div className="">
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="py-6 text-justify">
            <span className="font-bold">Introduction:</span>
            At present, the demand for the resale market in our country is
            increasing day by day. We often find that most people after buying a
            product, want to exchange that product after using it for some time,
            exchange their old product with a new product, so the resale market
            is a good way. on the other hand, a resale market is also a good
            option for those who cannot buy new products due to money problems.
            Because they get the product of their choice at a relatively low
            price
          </p>
          <div>
            <h1 className="font-bold">Objective:</h1>
            <ul className="list-disc list-inside">
              <li>
                Using this web-based application seller can make resale-product
                business easy and effective
              </li>
              <li>
                Buyer may get a opportunity to chose their product at home and
                they can pay easily
              </li>
              <li>
                All the business process will be very fast and quick with our
                services
              </li>
            </ul>
          </div>
          <Link to="dashboard" className="btn btn-primary my-8">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
