import React from "react";
import { Link } from "react-router-dom";
import aboutMedicine from "../../../assets/images/aboutMedicine.jpg";
const About = () => {
  return (
    <div className="min-h-full px-8 lg:px-2" id="about">
      <div className="z-0 flex items-center justify-center w-auto gap-12 p-4 px-0 flex-col lg:flex-row ">
        <img
          alt=""
          src={aboutMedicine}
          className="max-w-md rounded-lg shadow-2xl hidden lg:block"
        />
        <div className="">
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="py-6 text-justify">
            <span className="font-bold">Introduction:</span>
            To meet the increasing demand for improvements in the health care
            facilities & services we can utilize the power of internet
            technology & its wide network, by which people can help each other
            with just one click from their phone. The Medicine Donation system
            proposed here aims at providing an online platform for donating
            medicines or unused medicines to needy people. Users can register
            themselves on this system by submitting their necessary details.
            Once registered the users can donate and resell the medicines by
            providing accurate medicine details to NGOs and hospitals. The
            system has the authority to block the users if they raise a request
            to donate improper or expired medicines. The system will maintain a
            record of donated & available medicines.
          </p>
          <div>
            <h1 className="font-bold">Objective:</h1>
            <ul className="list-disc list-inside">
              <li>To help the needy people by donating unused medicines.</li>
              <li>
                We can also resell medicines to the hospitals and NGOs with
                discount according to their expired date.
              </li>
              <li>
                To provide comprehensive care that reaches the needs of
                underdeveloped communities through people and technology.
              </li>
              <li>
                To dispose the expired medicine so that they cannot be misused.
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
