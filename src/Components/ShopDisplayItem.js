import React, { Component } from "react";
import { Link } from "react-router-dom";
import Constants from "../Utils/Constants";
import Functions from "../Utils/Functions";
import ProductRating from "./Shop/ProductRating";

export default function ShopDisplayItem({
  productId,
  image1,
  image2,
  productCategory,
  productName,
  ratingStars,
  price,
  discountPercentage,
  isNew,
  removeSpacing,
}) {
  const formattedAmount = Functions.currencyFormat(price);
  let discountedAmount = 0;
  if (discountPercentage && discountPercentage > 0) {
    let _newPrice = price - (discountPercentage / 100.0) * price;
    discountedAmount = Functions.currencyFormat(_newPrice);
  }

  const addToCart = () => {
    //productId is the key
    //implement add to cart here
  };

  return (
    <article className={`list-product ${removeSpacing && "mb-0"}`}>
      <div className="img-block">
        <Link to={`/product/${productId}`} className="thumbnail">
          <img className="first-img" src={image1} alt="" />
          <img className="second-img" src={image2 || image1} alt="" />
        </Link>
      </div>
      <ul className="product-flag">{isNew && <li className="new">New</li>}</ul>
      <div className="product-decs">
        <Link className="inner-link" to={`/product/${productId}`}>
          <span>{productCategory}</span>
        </Link>
        <h2>
          <Link to={`/product/${productId}`} className="product-link">
            {productName}
          </Link>
        </h2>

        <ProductRating stars={ratingStars} />

        <div className="pricing-meta">
          <ul>
            {discountPercentage && (
              <li className="old-price">{formattedAmount}</li>
            )}
            <li className="current-price">
              {discountedAmount || formattedAmount}
            </li>
            {discountPercentage && (
              <li className="discount-price">-{discountPercentage}%</li>
            )}
          </ul>
        </div>
      </div>
      <div className="add-to-link">
        <ul>
          <li className="cart">
            <button
              type="button"
              className="cart-btn"
              onClick={() => addToCart()}
            >
              <i className="fa fa-cart-plus mr-2" />
              ADD TO CART{" "}
            </button>
          </li>
        </ul>
      </div>
    </article>
  );
}
