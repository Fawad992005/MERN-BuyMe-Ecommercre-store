import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Deliverybar from "./Deliverybar";
import rectnagle from "../assets/Images/rectangle1.jpg";
import logo from "../assets/Images/meubelhouse_logos_05-removebg-preview.png";
import { MdOutlineFilterList } from "react-icons/md";
import { PiCirclesFourFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: "",
  });
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://mern-buyme-ecommercre-store.onrender.com/shop");
      console.log(response.data);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = products;

    if (filters.priceRange) {
      filtered = filtered.filter((product) => {
        const [min, max] = filters.priceRange.split("-");
        return product.price >= min && product.price <= max;
      });
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page whenever filters change
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    console.log(filters);
  };

  // Get current products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = (isFiltered ? filteredProducts : products).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalProducts = isFiltered ? filteredProducts.length : products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <>
      <Navbar />
      <section className="w-full h-[45vh] md:h-[49vh] relative">
        <div
          className="absolute bg-cover bg-center h-full w-full"
          style={{ backgroundImage: `url(${rectnagle})` }}
        ></div>
        <div className="flex justify-center items-center pt-9">
          <img src={logo} alt="Logo" className="relative" width={100} />
        </div>
        <div className="flex flex-col justify-center items-center gap-4 md:gap-8">
          <h1 className="relative font-bold text-xl md:text-6xl font-serif">
            Shop
          </h1>
          <p className="relative font-bold text-sm md:text-xl font-serif">
            Home &gt; Shop
          </p>
        </div>
      </section>

      <section className="h-32 md:h-40 bg-slate-100 flex justify-around items-center px-4">
        <div className="flex gap-4 md:gap-5 items-center">
          <div className="flex gap-2 cursor-pointer">
            <MdOutlineFilterList className="w-6 h-10 md:w-8 md:h-10" />
            <div className="flex gap-4">
              <select
                name="priceRange"
                onChange={handleFilterChange}
                className="p-2 border"
              >
                <option value="">All Prices</option>
                <option value="0-5000">Rs.0 - Rs.5000</option>
                <option value="5001-10000">Rs.5001 - Rs.10000</option>
                <option value="10001-15000">Rs.10001 - Rs.15000</option>
                <option value="15001-20000">Rs.15001 - Rs.20000</option>
                <option value="20001-25000">Rs.20001 - Rs.25000</option>
                {/* Add more price ranges */}
              </select>
            </div>
          </div>
          <PiCirclesFourFill className="w-6 h-6 md:w-8 md:h-8" />
          <span className="border-r-2 md:border-r-4 border-gray-400"></span>
          <p className="font-medium text-sm md:text-base">
            Showing {isFiltered ? filteredProducts.length : products.length} of{" "}
            {totalProducts} results
          </p>
        </div>
      </section>

      <section className="my-10 md:my-20 flex justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {currentProducts.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-center items-center"
            >
              <Link to={`/product/${item._id}`}>
                <img
                  src={`https://mern-buyme-ecommercre-store.onrender.com${item.imageUrl}`}
                  alt={item.name}
                  className="object-cover w-full"
                  style={{ maxWidth: "300px" }}
                />
              </Link>
              <div className="flex flex-col text-center">
                <h2 className="text-lg md:text-xl font-bold">
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </h2>
                <p className="font-medium text-lg md:text-2xl">
                  Rs.{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex justify-center items-center my-10 gap-4 md:gap-14">
        {Array.from({ length: totalPages }, (_, index) => (
          <div
            key={index + 1}
            className={`border px-3 py-2 md:px-5 md:py-3 cursor-pointer ${
              currentPage === index + 1 ? "bg-yellow-400" : "bg-yellow-200"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </section>

      <Deliverybar />
      <Footer />
    </>
  );
};

export default Shop;
