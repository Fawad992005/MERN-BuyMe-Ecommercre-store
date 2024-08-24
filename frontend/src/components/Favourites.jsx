import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Deliverybar from "./Deliverybar";
import { useFavourites } from "../context/favouritescontext";
import rectnagle from "../assets/Images/rectangle1.jpg";
import logo from "../assets/Images/meubelhouse_logos_05-removebg-preview.png";
import { Link } from "react-router-dom"; // Correct import for React Router's Link
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Favourites = () => {
  const { favourites, removefromfavourites } = useFavourites();

  const handleremove = (id) => {
    removefromfavourites(id);
    toast("Removed from favourites", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
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
          <img src={logo} alt="Meubelhouse Logo" className="relative" width={100} />
        </div>
        <div className="flex flex-col justify-center items-center gap-4 md:gap-8">
          <h1 className="relative font-bold text-xl md:text-6xl font-serif">
            Favourites
          </h1>
          <p className="relative font-bold text-sm md:text-xl font-serif">
            Home &gt; Favourites
          </p>
        </div>
      </section>
      <section className="my-20 flex justify-center">
        <div className="flex flex-col gap-10 w-full max-w-7xl px-4 md:px-8">
          <h1 className="text-3xl text-center font-bold md:text-6xl">My Favourites</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {favourites.length === 0 ? (
              <p className="text-xl md:text-3xl font-medium text-center">Favourites is empty</p>
            ) : (
              favourites.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col justify-center items-center"
                >
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={`https://mern-buyme-ecommercre-store.onrender.com${item.imageUrl}`}
                      alt={item.name}
                      className="object-cover"
                      style={{ width: "100%", maxWidth: "300px" }}
                    />
                  </Link>
                  <div className="flex flex-col gap-2 items-center">
                    <h2 className="text-black text-lg md:text-xl font-bold">
                      {item.name}
                    </h2>
                    <p className="font-medium text-lg md:text-2xl text-center">
                      Rs.{item.price}
                    </p>
                    <button
                      className="text-lg md:text-xl font-medium text-red-500"
                      onClick={() => {
                        handleremove(item._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <Deliverybar />
      <Footer />
    </>
  );
};

export default Favourites;
