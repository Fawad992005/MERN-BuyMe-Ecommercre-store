import { React, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/cartcontext";
import axios from "axios";
import { Link } from "react-router-dom";
import rectnagle from "../assets/Images/rectangle1.jpg";
import logo from "../assets/Images/meubelhouse_logos_05-removebg-preview.png";
import { Button } from "@mui/material";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearcart } = useCart();
  const [user, setUser] = useState(null);
  const [TotalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const calculateTotalAmount = () => {
      return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };

    setTotalAmount(calculateTotalAmount());
  }, [cart]);

  useEffect(() => {
    // Fetch current user information (if authenticated)
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/currentuser`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <section className="w-full h-[49vh] relative">
        <div
          className="absolute bg-cover h-full w-full"
          style={{ backgroundImage: `url(${rectnagle})` }}
        ></div>
        <div className="flex justify-center items-center pt-9">
          <img src={logo} alt="" className="relative" width={100} />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <h1 className="relative font-bold text-xl md:text-6xl font-serif">
            Cart
          </h1>
          <p className="relative font-bold text-xl font-serif">
            Home &gt; Cart
          </p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Cart</h1>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={`${item._id}-${item.size}`}
                className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${item.imageUrl}`}
                  alt={item.name}
                  className="w-full md:w-1/3 h-56 object-cover"
                />
                <div className="flex-1 flex flex-col justify-center text-center items-center p-4">
                  <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-xl text-gray-500 mb-1">
                    Size: {item.size}
                  </p>
                  <p className="text-xl text-gray-500 mb-2">
                    Price: Rs.{item.price}
                  </p>
                  <div className="flex items-center justify-center mb-2">
                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      onClick={() => updateQuantity(item.id, item.size, -1)}
                    >
                      -
                    </button>
                    <span className="mx-4 text-lg">{item.quantity}</span>
                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      onClick={() => updateQuantity(item.id, item.size, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 border-t md:border-t-0 md:border-l border-gray-200">
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col items-center md:flex-row justify-center my-10 gap-5">
        <Button
                variant="Outlined"
                sx={{
                  border:"1px solid",
                  color: "black",
                  fontSize:"15px",
                  fontWeight:"bold",
                  borderColor: "black", // Change border color
                  borderRadius: "14px",
                  py:"20px",
                  px:"50px",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  }, // Change border radius
                }}
                onClick={clearcart}
              >
                Clear cart
              </Button>
          {user ? (
            <Link to={"/checkout"}>
              <Button
                variant="Outlined"
                sx={{
                  border:"1px solid",
                  color: "black",
                  fontSize:"15px",
                  fontWeight:"bold",
                  borderColor: "black", // Change border color
                  borderRadius: "14px",
                  py:"20px",
                  px:"50px",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  }, // Change border radius
                }}
              >
                Checkout
              </Button>
            </Link>
          ) : (
            <p className="underline text-blue-500 text-lg">
              <Link to={"/login"}>Login to checkout</Link>
            </p>
          )}
          <p className="font-medium text-lg md:text-xl">
            Total Amount Rs. {TotalAmount}
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
