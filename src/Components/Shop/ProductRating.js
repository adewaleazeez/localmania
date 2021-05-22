import React, { Component, useState } from "react";

export default function ProductRating({ stars }) {
  stars = stars || 1;
  const rating = [];
  for (var i = 1; i <= stars; i++) {
    rating.push(i);
  }
  return (
    <div className="rating-product">
      {rating.map((i) => (
        <i className="fa fa-star small" style={{ zoom: "0.8" }} />
      ))}
    </div>
  );
}
