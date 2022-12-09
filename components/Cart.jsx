import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
  AiFillCloseCircle,
} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

const Cart = () => {
  const cartRef = useRef();
  const router = useRouter();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <div className="cart-header-menu">
          <button type="button" className="cart-heading">
            <span className="heading">Tu carrito</span>
            <span className="cart-num-items">
              ({totalQuantities} {`${totalQuantities > 1 ? "items" : "item"}`})
            </span>
          </button>
          <button
            type="button"
            className="cart-close-btn"
            onClick={() => setShowCart(false)}
          >
            <AiFillCloseCircle />
          </button>
        </div>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Tu carrito está vacío</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn btn-continue-shop"
              >
                Sigue Comprando
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>SubTotal:</h3>
              <h3>Gs. {totalPrice}</h3>
            </div>

            {router.asPath !== "/checkout" && (
              <div className="btn-container">
                <Link href="/checkout/">
                  <button
                    type="button"
                    className="btn btn-pay"
                    onClick={() => setShowCart(false)}
                  >
                    Finalizar pedido
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
