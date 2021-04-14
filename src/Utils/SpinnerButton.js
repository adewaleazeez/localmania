import React, { Component } from "react";
import Spinner from "./Spinner";

export default function SpinnerButton({ onClick, loading, className, label }) {
  const doAction = () => {
    onClick();
  };

  return loading ? (
    <button type="button" className="btn btn-gradient-dark btn-icon-text">
      <Spinner size="1" />
    </button>
  ) : (
    <button type="button" className={className} onClick={() => doAction()}>
      {label}
    </button>
  );
}
