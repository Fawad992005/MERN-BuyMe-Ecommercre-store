import React, { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import {
  Badge,
  Modal,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  ListItemIcon,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import "./Navbar.css";
import logo from "../assets/Images/meubelhouse_logos_05-removebg-preview.png";
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from "@mui/icons-material/Call";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreIcon from "@mui/icons-material/Store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import { useCart } from "../context/cartcontext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Navbar = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [user, setUser] = useState(null);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false); // State for logout modal
  const [open, setOpen] = useState(false);
  const [cartside, setcartside] = useState(false); // State for Drawer
  const [TotalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
        setUser(response.data.user);
      } catch (error) {
        console.log(error, "error fetching user");
      }
    };

    fetchUser();
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

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  // Handle actual logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
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
  const opencart = () => {
    setcartside(true);
  };
  const closecart = () => {
    setcartside(false);
  };

  const cartlist = (
    <Box
      sx={{
        width: {
          xs: 380,
          sm: 500,
        },
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "20px",
              sm: "35px",
            },
          }}
        >
          Shopping Cart
        </Typography>
        <Tooltip title="Close cart">
          <IconButton onClick={closecart} aria-label="Close cart">
            <CloseIcon color="error" />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />

      <List sx={{ px: 2 }}>
        {cart.length === 0 ? (
          <Typography variant="body1" component="div" sx={{ mt: 2 }}>
            Cart is empty
          </Typography>
        ) : (
          cart.map((item) => (
            <Box
              key={`${item._id}-${item.size}`}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                justifyContent: "space-between",
              }}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${item.imageUrl}`}
                alt={item.name}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body1">Rs. {item.price}</Typography>
                <Typography variant="body2">Size: {item.size}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Tooltip title="Decrease">
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.size, -1)}
                      aria-label="Decrease quantity"
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body1" sx={{ mx: 1 ,fontWeight:"Bold"}}>
                    {item.quantity}
                  </Typography>
                  <Tooltip title="Increase">
                  <IconButton
                    onClick={() => updateQuantity(item.id, item.size, 1)}
                    aria-label="Increase quantity"
                  >
                    <AddIcon />
                  </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Tooltip title="Remove">
                <IconButton
                  onClick={() => removeFromCart(item._id, item.size)}
                  aria-label="Remove item from cart"
                >
                  <CloseIcon color="error" />
                </IconButton>
              </Tooltip>
            </Box>
          ))
        )}
      </List>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ p: 2 }}>
        <Typography variant="body1" sx={{ mb: 3, fontWeight: "bold" }}>
          Total: Rs. {TotalAmount}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Link to="/cart">
            <Button
              variant="outlined"
              sx={{
                color: "black",
                borderColor: "black", // Change border color
                borderRadius: "10px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                }, // Change border radius
              }}
            >
              View Cart
            </Button>
          </Link>
          {user ? (
            <Link to="/checkout">
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  borderColor: "black", // Change border color
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "bold",
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
            <Link to="/login">
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  borderColor: "black", // Change border color
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  }, // Change border radius
                }}
              >
                Login to checkout
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );

  //  Drawer content
  const drawerList = (
    <Box
      sx={{
        width: 250, // Adjust the width of the Drawer
        padding: 2, // Add padding inside the Drawer
        backgroundColor: "#f4f4f4", // Background color of the Drawer
      }}
    >
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          onClick={closeDrawer}
          sx={{
            borderBottom: "1px solid #ddd", // Add a border between items
            "&:hover": {
              backgroundColor: "#e0e0e0", // Change background on hover
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/shop"
          onClick={closeDrawer}
          sx={{
            borderBottom: "1px solid #ddd",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Shop" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/contact"
          onClick={closeDrawer}
          sx={{
            borderBottom: "1px solid #ddd",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <ListItemIcon>
            <CallIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
        {user ? (
          <ListItem
            button
            onClick={() => {
              showLogoutModal();
              closeDrawer();
            }}
            sx={{
              borderBottom: "1px solid #ddd",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem
            button
            component={Link}
            to="/signin"
            onClick={closeDrawer}
            sx={{
              borderBottom: "1px solid #ddd",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Up" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <nav className="flex items-center py-5" data-aos="fade-down">
      {/* Desktop Navbar */}
      <ul className="md:flex justify-around items-center pl-5 w-full hidden">
        <li className="flex items-center">
          <img src={logo} alt="Logo" width={60} className="mr-4" />
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
            <Tooltip title="Logout">
            <li
              className="font-medium text-xl cursor-pointer"
              onClick={showLogoutModal} // Show confirmation modal on click
            >
              Logout
            </li>
            </Tooltip>
          ) : (
            <Tooltip title="Sign Up">
            <Link to="/signin">
              <li className="font-medium text-xl cursor-pointer">Sign Up</li>
            </Link>
            </Tooltip>
          )}
          <Tooltip title="Favourites">
          <Link to={"/favourites"}>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </Link>
          </Tooltip>

          <Tooltip title="Shopping Cart">
          <IconButton onClick={opencart} sx={{ color: "black" }}>
            <Badge badgeContent={cart.length} showZero color="error">
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          </Tooltip>
        </div>
      </ul>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center w-full px-4">
        <IconButton onClick={openDrawer}>
          <MenuIcon sx={{ color: "black" }} />
        </IconButton>
        <div className="flex items-center">
          <img src={logo} alt="Logo" width={40} className="mr-2" />
          <span className="text-xl font-bold">BuyMe</span>
        </div>
        <div className="flex gap-6">
          <Link to={"/favourites"} className="cursor-pointer">
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </Link>
          <IconButton
            onClick={opencart}
            sx={{ color: "black" }}
            aria-label="cart"
          >
            <Badge badgeContent={cart.length} showZero color="error">
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </div>

      {/* Drawer for Mobile Menu */}
      <Drawer
        anchor="top"
        open={open}
        onClose={closeDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250, // Adjust width here
          },
        }}
      >
        {drawerList}
      </Drawer>

      {/* Logout Confirmation Modal */}
      <Modal
        open={isLogoutModalVisible}
        onClose={handleCancelLogout}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
          role="dialog"
          aria-labelledby="logout-modal-title"
          aria-describedby="logout-modal-description"
        >
          <Typography id="logout-modal-title" variant="h6" component="h2">
            Confirm Logout
          </Typography>
          <Typography id="logout-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to log out?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleLogout} variant="contained" color="primary">
              Logout
            </Button>
            <Button
              onClick={handleCancelLogout}
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Drawer open={cartside} onClose={closecart} anchor="right">
        {cartlist}
      </Drawer>
    </nav>
  );
};

export default Navbar;
