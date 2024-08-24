// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AdminPanel from "./components/admin";
import Shop from "./components/Shop";
import Login from "./components/Login";
import Signin from "./components/Signin";
import ProtectedRoute from "./components/Protectedroutes";
import Forbidden from "./components/Forbidden";
import Productpage from "./components/Productpage";
import { CartProvider } from "./context/cartcontext";
import { FavouritesProvider } from "./context/favouritescontext"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Checkout from "./components/Checkout";
import Favourites from "./components/Favourites";

const App = () => {
  return (
    <CartProvider>
      <FavouritesProvider>
      <Router>
          <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="/product/:id" element={<Productpage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      </FavouritesProvider>
    </CartProvider>
  );
};

export default App;
