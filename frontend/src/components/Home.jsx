import { React, useEffect } from "react";
import Navbar from "./Navbar";
import rocketsingleseater from "../assets/Images/rocketsingleseater1-removebg-preview.png";
import sidetable from "../assets/Images/granitesquaresidetable1-removebg-preview.png";
import seater from "../assets/Images/cloudsofathreeseater+ottoman_31-removebg-preview (1).png";
import sofa from "../assets/Images/trentonmodularsofa_31.jpg";
import mirror from "../assets/Images/plainconsolewithteakmirror1.jpg";
import stool from "../assets/Images/outdoorbartableandstool1.jpg";
import dining from "../assets/Images/granitediningtablewithdiningchair1.jpg";
import asgradsofa from "../assets/Images/asgaardsofa1.jpg";
import rectangle from "../assets/Images/rectangle17.jpg";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      <section
        className="background bg-yellow-100 h-screen relative"
        data-aos="fade-down"
      >
        <Navbar />
        <section className="flex flex-col md:flex-row justify-center items-center gap-10 px-4 md:px-0">
          <section className="flex flex-col mt-20 md:mt-52 gap-10 text-xl">
            <h1 className="text-3xl md:text-5xl font-bold">
              Rocket Single Seater
            </h1>
            <p className="text-xl md:text-2xl font-semibold inline-block relative">
              Shop Now
              <span className="absolute left-15 bottom-0 top-9 md:top-11 w-28 h-1  bg-black block"></span>
            </p>
          </section>
          <img
            src={rocketsingleseater}
            alt="Rocket Single Seater"
            className=" max-w-xs md:max-w-md"
          />
        </section>
      </section>

      <section
        className="flex flex-col md:flex-row gap-20 w-full md:justify-around mx-auto bg-slate-50 px-4 md:px-0 justify-center items-center"
        data-aos="fade-down"
      >
        <section className="flex flex-col justify-center items-center my-10">
          <img
            src={sidetable}
            alt="Side Table"
            className="max-w-xs md:max-w-sm"
          />
          <h1 className="text-3xl md:text-4xl font-bold">Side Table</h1>
        </section>
        <section className="flex flex-col justify-center items-center my-10">
          <img src={seater} alt="Seater" className="max-w-xs md:max-w-sm" />

          <h1 className="text-3xl md:text-4xl font-bold">Seater</h1>
        </section>
      </section>

      <section className="my-10" data-aos="fade-down">
        <div className="flex flex-col justify-center items-center gap-6 text-center">
          <h1 className="text-4xl font-bold">Top Picks For You</h1>
          <p className="text-gray-600 px-4 md:px-0">
            Find a bright ideal to suit your taste with our great selection of
            suspension
          </p>
        </div>
        <section className="flex flex-col md:flex-row mt-20 md:mt-32 justify-center items-center gap-20 mb-20">
          <div className="flex flex-col justify-center items-center">
            <img
              src={sofa}
              alt="Tremendous Sofa"
              className="w-full max-w-xs md:max-w-sm"
            />
            <p className="text-gray-900 font-medium">Tremendous Sofa</p>
            <h2 className="text-2xl font-bold">Rs. 10000.00</h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={dining}
              alt="Granite Dining Table with Dining Chair"
              className="w-full max-w-xs md:max-w-sm"
            />
            <p className="text-gray-900 font-medium">
              Granite dining table with dining chair
            </p>
            <h2 className="text-2xl font-bold">Rs. 20000.00</h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={stool}
              alt="Outdoor Bar Table and Stool"
              className="w-full max-w-xs md:max-w-sm"
            />
            <p className="text-gray-900 font-medium mt-9">
              Outdoor Bar table and stool
            </p>
            <h2 className="text-2xl font-bold">Rs. 15000.00</h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src={mirror}
              alt="Plain Console with Teak Mirror"
              className="w-full max-w-xs md:max-w-sm"
            />
            <p className="text-gray-900 font-medium">
              Plain console with teak mirror
            </p>
            <h2 className="text-2xl font-bold">Rs. 18000.00</h2>
          </div>
        </section>
        <div className="text-center">
          <Link to={"/shop"}>
            <p className="text-xl md:text-2xl font-semibold inline-block relative">
              View More
              <span className="absolute left-0 bottom-0 top-9 md:top-11 w-28 h-1 bg-black block"></span>
            </p>
          </Link>
        </div>
      </section>

      <section className="flex flex-col md:flex-row w-full bg-yellow-50 gap-20 md:gap-96 lg:justify-evenly px-4 md:px-0 justify-center items-center pb-5" data-aos="fade-down">
        <img
          src={asgradsofa}
          alt="Asgaard Sofa"
          className="mix-blend-multiply max-w-xs md:max-w-96"
        />
        <div className="flex flex-col justify-center items-center gap-8 text-center">
          <p className="font-semibold text-xl">New Arrivals</p>
          <h1 className="font-bold text-3xl md:text-4xl">Asgaard Sofa</h1>
          <button className="border px-10 md:px-20 py-2 md:py-5 border-black">
            Order Now
          </button>
        </div>
      </section>

      <section className="w-full flex flex-col justify-center items-center bg-slate-300 relative h-[500px] md:h-[600px] gap-10 md:gap-20" data-aos="slide-up">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${rectangle})` }}
        ></div>
        <h1 className="relative text-5xl md:text-6xl font-bold">
          Our Instagram
        </h1>
        <p className="relative text-lg md:text-xl font-semibold">
          Follow Our Store on Instagram
        </p>
        <button className="relative bg-slate-50 border rounded-full px-10 md:px-20 py-2 mt-4 shadow-bottom font-medium">
          Follow Us
        </button>
      </section>
      <Footer />
    </>
  );
};

export default Home;
