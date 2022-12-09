import React, { useState, useEffect } from "react";
import Marquee from "react-easy-marquee";
import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Router } from "next/dist/client/router";

const ProductDetails = ({ product, products }) => {
  const { _id, image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const {
    decQty,
    incQty,
    qty,
    setQty,
    onAdd,
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantities,
  } = useStateContext();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.setItem("totalQuantities", JSON.stringify(totalQuantities));
  }, [cartItems, totalPrice, totalQuantities]);

  Router.events.on("routeChangeComplete", () => {
    setQty(1);
  });

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item && item)}
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Detalles:</h4>
          <p>{details}</p>
          <p className="price">Gs. {price}</p>
          <div className="quantity">
            <h3>Cantidad:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart btn"
              onClick={() => onAdd(product, qty)}
            >
              Agregar Al Carrito
            </button>
            <button
              type="button"
              className="buy-now btn"
              onClick={handleBuyNow}
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>Quizás tambien te interese</h2>
        <Marquee
          duration={30000}
          height="250px"
          reverse={true}
          pauseOnHover={true}
        >
          <div className="maylike-products-container">
            {products
              .filter((item) => item._id !== _id)
              .map((item1) => (
                <Product key={item1._id} product={item1} source="marquee" />
              ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type=="product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  return {
    props: { product, products },
  };
};

export default ProductDetails;
