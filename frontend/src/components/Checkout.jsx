import { React, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Deliverybar from "./Deliverybar";
import rectnagle from "../assets/Images/rectangle1.jpg";
import logo from "../assets/Images/meubelhouse_logos_05-removebg-preview.png";
import { useCart } from "../context/cartcontext";
import { Button } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

const Checkout = () => {
  const { cart } = useCart();
  const [TotalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formdata, setformdata] = useState({
    firstName: "",
    lastName: "",
    country: "",
    streetAddress: "",
    townCity: "",
    zipCode: "",
    province: "",
    phone: "",
    emailAddress: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const calculateTotalAmount = () => {
      return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };

    setTotalAmount(calculateTotalAmount());
  }, [cart]);

  const handleplaceorder = () => {
    if (
      formdata.firstName === "" ||
      formdata.lastName === "" ||
      formdata.country === "" ||
      formdata.streetAddress === "" ||
      formdata.townCity === "" ||
      formdata.zipCode === "" ||
      formdata.province === "" ||
      formdata.phone === "" ||
      formdata.emailAddress === ""
    ) {
      alert("Fill all the fields");
    } else {
      setLoading(true);
      setTimeout(() => {
        console.log("Order placed:", formdata);
        setLoading(false);
        setSuccess(true);
        setformdata({
          firstName: "",
          lastName: "",
          country: "",
          streetAddress: "",
          townCity: "",
          zipCode: "",
          province: "",
          phone: "",
          emailAddress: "",
        });
      }, 2000); // Simulate an API call delay
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setformdata({
      ...formdata,
      [id]: value,
    });
  };

  return (
    <>
      <Navbar />
      <section className="w-full h-[49vh] relative" data-aos="fade-down">
        <div
          className="absolute bg-cover bg-center h-full w-full"
          style={{ backgroundImage: `url(${rectnagle})` }}
        ></div>
        <div className="flex justify-center items-center pt-9">
          <img src={logo} alt="" className="relative" width={100} />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <h1 className="relative font-bold text-xl md:text-6xl font-serif">
            Checkout
          </h1>
          <p className="relative font-bold text-xl font-serif">
            Home &gt; Checkout
          </p>
        </div>
      </section>
      <section className="flex flex-wrap justify-center py-12 px-4" data-aos="slide-up">
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <h1 className="text-2xl font-bold mb-6">Billing Details</h1>
          <form className="space-y-4">
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formdata.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formdata.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="country"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                value={formdata.country}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="streetAddress"
              >
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                value={formdata.streetAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="townCity"
              >
                Town/City
              </label>
              <input
                type="text"
                id="townCity"
                value={formdata.townCity}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="zipCode"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={formdata.zipCode}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="province"
              >
                Province
              </label>
              <input
                type="text"
                id="province"
                value={formdata.province}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={formdata.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                type="email"
                id="emailAddress"
                value={formdata.emailAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
          </form>
        </div>
        <section className="w-full md:w-1/2 lg:w-1/3 p-4">
          <h2 className="text-2xl font-bold mb-6">Your Order</h2>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between">
                <div className="flex gap-5">
                  <span className="text-gray-500">{item.name}</span>
                  <span className="font-bold">x{item.quantity}</span>
                </div>

                <span>Rs.{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold mt-6">
            <span className="text-2xl">Total</span>
            <span className="text-2xl">Rs.{TotalAmount}</span>
          </div>
          <h2>Cash on Delivery</h2>
          <div className="flex justify-center items-center my-10">
          <Button
                variant="outlined"
                disabled={loading}
                onClick={handleplaceorder}
                sx={{
                  color: "black",
                  borderColor: "black", // Change border color
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  py:"15px",
                  px:"20px",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  
                  }, // Change border radius
                }}
              >
                {loading ? "Placing Order..." : "Place Your Order"}
              </Button>
          </div>
          {success && (
            <div className="text-center mt-4 text-green-500">
              Your order has been placed successfully!
            </div>
          )}
        </section>
      </section>
      <Deliverybar />
      <Footer />
    </>
  );
};

export default Checkout;
