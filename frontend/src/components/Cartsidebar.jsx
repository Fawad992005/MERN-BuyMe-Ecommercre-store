import { React, useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/cartcontext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Cartsidebar.css"

const CartSidebar = ({ onClose }) => {
  const [TotalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState(null);
  const { cart, removeFromCart, updateQuantity } = useCart();

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
        const response = await axios.get("http://localhost:5000/currentuser", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchUser();
  }, []);

  return (
    <div
  className="cart-sidebar"
>
  <div className="flex justify-between items-center p-4 border-b">
    <h2 className="text-xl font-bold">Shopping Cart</h2>
    <IoClose className="cursor-pointer" onClick={onClose} />
  </div>
  <div className="p-4 flex-1">
    {cart.length === 0 ? (
      <p className="text-gray-500">Your cart is empty.</p>
    ) : (
      cart.map((item) => (
        <div
          key={`${item._id}-${item.size}`}
          className="flex justify-between items-center mb-4"
        >
          <div className="flex items-center">
            <img
              src={`http://localhost:5000${item.imageUrl}`}
              alt={item.name}
              className="w-16 h-16 object-cover"
            />
            <div className="ml-4">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-sm text-gray-500">
                Price: Rs.{item.price}
              </p>
              <div className="flex items-center mt-2">
                <button
                  className="px-2 py-1 border rounded-sm"
                  onClick={() => updateQuantity(item.id, item.size, -1)}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="px-2 py-1 border rounded-sm"
                  onClick={() => updateQuantity(item.id, item.size, 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => removeFromCart(item.id, item.size)}
          >
            Remove
          </button>
        </div>
      ))
    )}
  </div>
  <div className="m-4 border-t flex flex-col md:flex-row justify-around items-center gap-5">
  <p className="mt-3 font-bold">Total Amount: Rs.{TotalAmount}</p>
  <Link to={"/cart"}>
    <button className="px-3 py-2 mt-2 rounded-xl border-gray-900 border text-xl font-medium md:px-10">
      View My Cart
    </button>
  </Link>
  {user ? (
    <Link to={"/checkout"}>
      <button className="px-3 py-2 mt-2 rounded-xl border-gray-900 border text-xl font-medium md:px-5">
        Checkout
      </button>
    </Link>
  ) : (
    <p className="underline text-blue-500 mt-4">
      <Link to={"/login"}>Login to checkout</Link>
    </p>
  )}
</div>

</div>
)};

export default CartSidebar;
