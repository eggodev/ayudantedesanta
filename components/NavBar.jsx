import React, { useEffect } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import Image from "next/image";
import logo from "../assets/ayudantedesanta.webp";

const NavBar = () => {
  const {
    showCart,
    setShowCart,
    totalQuantities,
    setTotalQuantities,
    setCartItems,
    setTotalPrice,
  } = useStateContext();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems"));
    if (items) {
      setCartItems(items);
      setTotalQuantities(JSON.parse(localStorage.getItem("totalQuantities")));
      setTotalPrice(JSON.parse(localStorage.getItem("totalPrice")));
    }
  }, []);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default NavBar;
