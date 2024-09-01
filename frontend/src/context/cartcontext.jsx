// CartContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size) => {
    // Check if product with the selected size already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id && item.size === size
    );

    if (existingProductIndex !== -1) {
      // If the product with the same size exists, increase its quantity
      const updatedCart = cart.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      // Otherwise, add the new product to the cart
      setCart([...cart, { ...product, size, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, size) => {
    // Remove only the specific product with the given ID and size
    const updatedCart = cart.filter(
      (item) => !(item._id === productId && item.size === size)
    );
    setCart(updatedCart);
  };

  const updateQuantity = (productId, size, change) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };
  const clearcart = ()=>{
    setCart([]);
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearcart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
