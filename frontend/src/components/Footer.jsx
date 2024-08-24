import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white">
      <section className="flex flex-col lg:flex-row gap-10 lg:gap-32 w-full justify-center items-center my-10">
        <address className="flex flex-col gap-2 justify-center items-center text-center not-italic">
          <p className="font-medium">Gulshan-e-Maymar, Karachi</p>
          <p className="font-medium">Pakistan</p>
        </address>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="flex flex-col gap-6">
            <div className="text-gray-500 font-bold">Links</div>
            <Link to="/" className="font-medium">Home</Link> {/* Link to Home */}
            <Link to="/shop" className="font-medium">Shop</Link>
            <Link to={"/contact"} className="font-medium">Contact Us</Link>
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-gray-500 font-bold">Help</div>
            <a href="#" className="font-medium">Payment Options</a>
            <a href="#" className="font-medium">Returns</a>
            <a href="#" className="font-medium">Privacy Policies</a>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-gray-500 font-bold">Newsletter</div>
            <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
              <input
                type="email"
                className="border-b-2 outline-none border-black p-1"
                placeholder="Enter Your email"
              />
              <button className="border-b-2 outline-none font-bold border-black p-1">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="h-1 bg-slate-500"></div>
      <div className="flex flex-col justify-center items-center py-4">
        <p>© 2024 All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
