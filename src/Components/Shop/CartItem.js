import React, { Component, useState } from "react";
import Functions from "../../Utils/Functions";
import Toastr from "../../Utils/Toastr";

export default function CartItem({
  productId,
  productImage,
  units,
  amountPerUnit,
  productName,
}) {
  const [removed, setRemoved] = useState(false);
  const [actualUnits, setActualUnits] = useState(units);

  const removeItem = () => {
    //add additional code to remove this item from the cart
    //using productId passed to this function
    setRemoved(true);
    //Toastr("warning", `${productName} removed`);
  };

  const increaseUnits = () => {
    let newUnits = actualUnits + 1;
    setActualUnits(newUnits);
  };

  const decreaseUnits = () => {
    let newUnits = actualUnits - 1;
    if (newUnits <= 0) newUnits = 1;
    setActualUnits(newUnits);
  };

  return (
    removed || (
      <tr>
        <td className="product-thumbnail">
          <a href="#">
            <img
              src={productImage}
              alt=""
              style={{ maxHeight: "75px", maxWidth: "75px" }}
            />
          </a>
        </td>
        <td className="product-name">
          <a href="#">{productName}</a>
        </td>
        <td className="product-price-cart">
          <span className="amount">
            {Functions.currencyFormat(amountPerUnit)}
          </span>
        </td>
        <td className="product-quantity" style={{ borderRadius: "0" }}>
          <div className="cart-plus-minus bg-white">
            <div className="dec qtybutton" onClick={() => decreaseUnits()}>
              -
            </div>
            <input
              className="cart-plus-minus-box"
              type="text"
              name="qtybutton"
              defaultValue={units}
              value={actualUnits}
            />
            <div className="inc qtybutton" onClick={() => increaseUnits()}>
              +
            </div>
          </div>
        </td>
        <td className="product-subtotal">
          {Functions.currencyFormat(actualUnits * amountPerUnit)}
        </td>
        <td className="product-remove">
          <a onClick={() => removeItem()} style={{ cursor: "pointer" }}>
            <i className="fa fa-times" />
          </a>
        </td>
      </tr>
    )
  );
}
