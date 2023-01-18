import React from "react";

const Contact = () => {
  return (
    <div className="  min-h-full px-8 lg:px-0 my-8" id="contact-us">
      <div className="z-0 flex items-center justify-center w-auto gap-12 p-4 px-0 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="py-6">
            We are waiting for our customer 24/7. We have 50+ customer services
            employee. For any reason or any time you are invited in our Office.
            And for any information contact our call center. we are always ready
            for you. Thank You.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                disabled
                type="text"
                defaultValue="usedbikes@resell.com"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mobile</span>
              </label>
              <input
                disabled
                type="text"
                defaultValue="028447366"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <textarea
                disabled
                type="text"
                value="Khagan, Birulia,
                Dhaka, Bangladesh"
                placeholder="email"
                className="input input-bordered h-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
