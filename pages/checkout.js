import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";

const checkout = () => {
  const {
    cartItems,
    totalPrice,
    totalQuantities,
    adamsPayResponse,
    setAdamsPayResponse,
  } = useStateContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cartItems.length > 0) {
      setLoading(true);

      const data = {
        cartItems: cartItems,
        totalPrice: totalPrice,
        user: {
          cedula: event.target.cedula.value,
          email: event.target.email.value,
        },
      };
      const response = await fetch("/api/createDebt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!responseData.meta.status || responseData.meta.status === "error") {
        router.push("/error");
      }
      if (responseData.meta.status && responseData.meta.status === "success") {
        const response = await saveOrder(responseData);
        if (response) {
          window.location.href = responseData.debt.payUrl;
        }
      }
    } else {
      toast.error(`No tenés ningún item en tu carrito 😢`);
    }
  };

  const saveOrder = async (data) => {
    const orderData = {
      orderId: data.debt.docId,
      userId: data.debt.target.number,
      email: data.debt.target.label,
      cartItems: cartItems,
      totalQuantities: totalQuantities,
      totalPrice: totalPrice,
      status: data.debt.payStatus.status,
    };
    const response = await fetch("/api/saveOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  };

  return (
    <div>
      <div className="signup-container">
        <div className="whysign">
          <h2>Ultimo paso!</h2>
          <p>
            Antes de pagar por tus regalos necesitamos saber quien eres, para
            registrar tu pedido y enviarte luego sus detalles a tu email.
          </p>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="cedula"
              name="cedula"
              placeholder="Cédula:"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder="Email:"
              required
            />
            <div>
              <button type="submit" className="btn-pay">
                {loading && (
                  <div className="loading">
                    <span>Procesando pedido de cobro...</span>
                    <ClipLoader
                      color="#FFFFFF"
                      loading={loading}
                      size={30}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                )}
                {!loading && "Pagar con AdamsPay"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default checkout;
