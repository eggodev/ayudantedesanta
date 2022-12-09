import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Gracias por tu pedido!</h2>
        <p className="email-msg">Enviamos todos los detalles a tu email 📭😊</p>
        <p className="description">
          Si tienes alguna duda, por favor comunícate con nosotros:
          <a href="mailto:order@example.com" className="email">
            order@example.com
          </a>
        </p>
        <Link href={"/"}>
          <button type="button" width="300px" className="btn btn-pay">
            Sigue Comprando
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
