import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { IoIosHeartEmpty } from "react-icons/io";
import { useCart } from "../context/cartcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFavourites } from "../context/favouritescontext";
import { Button,Tooltip } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

const Productpage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const { addtofavourites } = useFavourites();
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/shop`);
      setproducts(response.data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError("Product not found");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlefavourites = () => {
    if (product) {
      addtofavourites(product);
      toast("Added to Favourites", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size); // Set the selected size
  };

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product, selectedSize);
      toast("Added to Cart", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      alert("Please select a size.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <section className="container mx-auto p-4 flex flex-col lg:flex-row w-full justify-center items-center gap-10 h-auto lg:h-[60vh]" data-aos="fade-down">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${product.imageUrl}`}
          className="w-full lg:w-[400px]"
          alt={product.name}
        />
        <div className="flex flex-col gap-5 w-full lg:w-auto">
          <h1 className="text-2xl lg:text-3xl font-medium">{product.name}</h1>
          <p className="text-xl lg:text-2xl text-gray-500 font-medium">
            Rs.{product.price}
          </p>
          <p className="text-lg lg:text-xl text-gray-500">Size</p>
          <div className="flex gap-2 lg:gap-5">
            {["L", "XL", "XS"].map((size) => (
              <span
                key={size}
                className={`px-3 border cursor-pointer py-1 rounded-sm ${
                  selectedSize === size ? "bg-yellow-100" : "bg-gray-200"
                }`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </span>
            ))}
          </div>
          <div className="flex gap-2 lg:gap-5 mt-4">
            <Tooltip title="Add to Cart">
          <Button
                variant="outlined"
                onClick={handleAddToCart}
                sx={{
                  color: "black",
                  borderColor: "black", // Change border color
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  py:"15px",
                  px:"30px",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  
                  }, // Change border radius
                }}
              >
                Add To Cart
              </Button>
              </Tooltip>
              <Tooltip title="Add To Favourites">
            <button onClick={handlefavourites}>
              <IoIosHeartEmpty className="w-6 lg:w-8 h-6 lg:h-8" />
            </button>
            </Tooltip>
          </div>
        </div>
      </section>
      <hr className="my-8" />
      <section className="flex flex-col justify-center items-center my-10 gap-10 w-full" data-aos="slide-up">
        <h2 className="text-2xl lg:text-3xl font-medium">Description</h2>
        <p className="text-gray-500 text-center w-full lg:w-3/4">
          {product.description}
        </p>
      </section>
      <hr className="my-8" />
      <section className="flex flex-col justify-center items-center font-medium text-2xl lg:text-4xl my-10" data-aos="slide-up">
        <h1>Related Products</h1>
        <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-center items-center"
            >
              <Link to={`/product/${item._id}`}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${item.imageUrl}`}
                  className="w-32 md:w-48 lg:w-[300px]"
                  alt={item.name}
                />
              </Link>
              <div className="flex flex-col justify-center items-center mt-2">
                <h2 className="text-lg font-bold text-center">
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </h2>
                <p className="font-medium text-xl md:text-2xl">
                  Rs.{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Tooltip title="Go To Shop " placement="right">
        <Link to={"/shop"}>
          <button className="hover:underline my-20">View More</button>
        </Link>
        </Tooltip>
      </section>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Productpage;
