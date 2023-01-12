import React from "react";
import mediSell from "../../assets/logos/mediSell.png";
import { FaFacebookSquare } from "react-icons/fa";
const Footer = () => {
  const contactLinks = [
    {
      link: "https://www.facebook.com/mosammod.marjuka.1",
      logo: <FaFacebookSquare />,
    },
  ];
  return (
    <div className="mx-auto">
      <footer className="footer p-10 bg-neutral text-neutral-content flex flex-col md:flex-row md:justify-around items-center ">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className=" w-16 text-center mx-auto">
            <img className="w-full" src={mediSell} alt="" />
          </div>
          <p>
            medicine donation and reselling system
            <br />
            Provided by Medi_Sell Co. Ltd.
          </p>
        </div>
        <div>
          <p className="footer-title z-0  mx-auto">Social</p>
          {/* <div className="grid grid-flow-col gap-4">
        
        </div> */}
          <div className="flex md:justify-start ">
            {contactLinks.map((el) => (
              <a
                target="_blank"
                href={el.link}
                className="mr-5 cursor-pointer mt-8 hover:scale-125"
              >
                {/* <img alt="" src={el.url} /> */}
                {el.logo}

                {/* <p className="text-md mt-2 hover:hidden">{el.name}</p> */}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
