import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import Deliverybar from "./Deliverybar";
import rectnagle from "../assets/Images/rectangle1.jpg";
import logo from "../assets/Images/meubelhouse_logos_05-removebg-preview.png";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button,Tooltip } from '@mui/material';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITEBACKEND_URL}/signin`, {
        username,
        email,
        password
      });

      toast('User Signed Up', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
      });
      navigate("/login")
      // Redirect to login or another page
      
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="w-full md:h-[49vh] relative h-[45vh]">
        <div
          className="absolute bg-cover bg-center h-full w-full"
          style={{ backgroundImage: `url(${rectnagle})` }}
        ></div>
        <div className="flex justify-center items-center pt-9">
          <img src={logo} alt="" className="relative" width={100} />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <h1 className="relative font-bold text-xl md:text-6xl font-serif">Sign Up</h1>
          <p className="relative font-bold text-xl font serif">Home &gt; Sign Up</p>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center gap-10 my-20 px-5">
        <h1 className="text-4xl font-bold">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 ">
          <div className="flex flex-col gap-4">
            <p className="font-medium">Username</p>
            <input
              type="text"
              className="w-full border border-gray-400 rounded-md py-5 pl-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-medium">Email Address</p>
            <input
              type="email"
              className="w-full border border-gray-400 rounded-md py-5 pl-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-medium">Password</p>
            <input
              type="password"
              className="w-full border border-gray-400 rounded-md py-5 pl-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4 items-center justify-start">
            <input type="checkbox" name="rememberMe" id="rememberMe" />
            <p>Remember Me</p>
          </div>
          <div className="flex gap-9 items-center">
            <Tooltip title="Submit Form">
          <Button
                variant="outlined"
                type="submit"
                sx={{
                  color: "black",
                  borderColor: "black", // Change border color
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  py:"20px",
                  px:"40px",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  
                  }, // Change border radius
                }}
              >
                Sign Up
              </Button>
              </Tooltip>
            <Link to="/login">
              <p className="underline text-blue-400">Already Have An account?</p>
            </Link>
          </div>
        </form>
      </section>
      <Deliverybar />
      <Footer />
    </>
  );
};

export default Signin;
