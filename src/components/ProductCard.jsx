import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="card h-100 shadow-sm border-0 position-relative">
      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.name}
        style={{ height: "220px", objectFit: "contain" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.name}</h5>
        <p className="card-text text-muted text-truncate">{product.shortDescription}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center pt-2">
          <span className="h5 fw-bold text-danger mb-0">${product.price}</span>
          <div className="d-flex gap-2">
            <Link to={`/detail/${product.id}`} className="btn btn-outline-dark btn-sm">
              Buy Now
            </Link>
            <button
              onClick={() => addToCart(product, 1)}
              className="btn btn-warning btn-sm"
            >
              Add Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;