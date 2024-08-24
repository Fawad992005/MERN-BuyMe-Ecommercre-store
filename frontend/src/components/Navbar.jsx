import React, { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CartSidebar from "./Cartsidebar";
import { toast } from "react-toastify";
import { Badge } from "antd";
import { Modal } from "antd";
import { useCart } from "../context/cartcontext";
import "./Navbar.css";
import logo from "../assets/Images/meubelhouse_logos_05-removebg-preview.png";

const Navbar = () => {
  const { cart } = useCart();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false); // State for logout modal
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user information (if authenticated)
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://mern-buyme-ecommercre-store.onrender.com/currentuser", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchUser();
  }, []);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu

  
  // Handle actual logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://mern-buyme-ecommercre-store.onrender.com/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      toast("User logged out", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLogoutModalVisible(false); // Close the modal
    }
  };
  // Show logout confirmation modal
  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };
  
  // Handle modal cancel
  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  return (
    <nav className="flex items-center py-5">
      {/* Desktop Navbar */}
      <ul className="md:flex justify-around items-center pl-5 w-full hidden">
        <li className="flex items-center">
          <img src={logo} alt="Logo" width={60} className="mr-4"/>
          <span className="text-3xl font-bold">BuyMe</span>
        </li>
        <div className="flex justify-center gap-28 font-bold text-lg">
          <li className="cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/shop">Shop</Link>
          </li>
          <Link to={"/contact"}>
            <li className="cursor-pointer">Contact Us</li>
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          {user ? (
            <li
              className="font-medium text-xl cursor-pointer"
              onClick={showLogoutModal} // Show confirmation modal on click
            >
              Logout
            </li>
          ) : (
            <Link to="/signin">
              <li className="font-medium text-xl cursor-pointer">Sign Up</li>
            </Link>
          )}
          <Link to={"/favourites"} title="Favourites">
            <IoIosHeartEmpty style={{ width: "30px", height: "30px" }} />
          </Link>

          <div className="cursor-pointer" onClick={openSidebar}>
            <Badge count={cart.length} showZero>
              <IoCartOutline style={{ width: "30px", height: "30px" }} title="Cart" />
            </Badge>
          </div>
        </div>
      </ul>
      
      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center w-full px-4">
        <FaBars onClick={toggleMobileMenu} style={{ fontSize: "24px" }} />
        <div className="flex items-center">
          <img src={logo} alt="Logo" width={40} className="mr-2"/>
          <span className="text-xl font-bold">BuyMe</span>
        </div>
        <div className="flex gap-6">
          <Link to={"/favourites"} className="cursor-pointer">
            <IoIosHeartEmpty style={{ width: "30px", height: "30px" }} />
          </Link>
          <div className="cursor-pointer" onClick={openSidebar}>
            <Badge count={cart.length} showZero>
              <IoCartOutline style={{ width: "30px", height: "30px" }} />
            </Badge>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="flex flex-col items-center py-4">
            <li className="cursor-pointer mb-4 font-medium text-xl">
              <Link to="/" onClick={toggleMobileMenu}>
                Home
              </Link>
            </li>
            <li className="cursor-pointer mb-4 font-medium text-xl">
              <Link to="/shop" onClick={toggleMobileMenu}>
                Shop
              </Link>
            </li>
            <li className="cursor-pointer mb-4 font-medium text-xl">
              <Link to="/contact" onClick={toggleMobileMenu}>
                Contact Us
              </Link>
            </li>
            {user ? (
              <li
                className="text-xl cursor-pointer font-medium"
                onClick={() => {
                  showLogoutModal(); // Show confirmation modal on click
                  toggleMobileMenu();
                }}
              >
                Logout
              </li>
            ) : (
              <Link to="/signin" onClick={toggleMobileMenu}>
                <li className="font-medium text-xl cursor-pointer">Sign Up</li>
              </Link>
            )}
          </ul>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={isLogoutModalVisible}
        onOk={handleLogout} // Handle actual logout
        onCancel={handleCancelLogout} // Close modal if user cancels
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>

      {/* Cart Sidebar */}
      {isSidebarOpen && <CartSidebar onClose={closeSidebar} />}
    </nav>
  );
};

export default Navbar;
