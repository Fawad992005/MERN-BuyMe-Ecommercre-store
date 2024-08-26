import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Deliverybar from "./Deliverybar";
import rectangle from "../assets/Images/rectangle1.jpg";
import logo from "../assets/Images/meubelhouse_logos_05-removebg-preview.png";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORM_SPREE_KEY);
  const [showThankYou, setShowThankYou] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (state.succeeded) {
      setShowThankYou(true);

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      const timer = setTimeout(() => {
        setShowThankYou(false);
      }, 4000); // 4 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [state.succeeded]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar />
      <section className="w-full md:h-[49vh] relative h-[45vh]">
        <div
          className="absolute bg-cover bg-center h-full w-full"
          style={{ backgroundImage: `url(${rectangle})` }}
        ></div>
        <div className="flex justify-center items-center pt-9">
          <img
            src={logo}
            alt="Meubelhouse Logo"
            className="relative"
            width={100}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <h1 className="relative font-bold text-xl md:text-6xl font-serif">Contact Us</h1>
          <p className="relative font-bold text-xl">Home &gt; Contact Us</p>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-5 my-5">
        <h1 className="text-4xl font-bold">Get in touch with Us</h1>
        <p className="text-gray-500 md:w-1/3 text-center w-1/2">
          For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. 
          Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>
      </section>
      <section className="flex justify-center items-center flex-col my-10">
        {showThankYou && (
          <p className="text-green-500 text-xl font-semibold">
            Thanks for contacting us!
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 md:w-2/5 w-10/12"
        >
          <label htmlFor="name" className="font-medium text-lg">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-400 rounded-md py-5 pl-3"
            required
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />

          <label htmlFor="email" className="font-medium text-lg">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-400 rounded-md py-5 pl-3"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <label htmlFor="message" className="font-medium text-lg">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full border border-gray-400 rounded-md py-5 pl-3"
            required
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />

          <button
            type="submit"
            disabled={state.submitting}
            className="px-16 py-5 b rounded-xl border-gray-900 border text-xl font-medium"
          >
            Submit
          </button>
        </form>
      </section>
      <Deliverybar />
      <Footer />
    </>
  );
};

export default Contact;
