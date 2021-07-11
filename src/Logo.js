import React, { Component } from "react";
import { Link } from "react-router-dom";
import Constants from "./Utils/Constants";

export default function Logo({ icon, style, reverse }) {
  return reverse ? (
    <img src={Constants.subfolder + "/logo-wide-reverse.png"} style={style} />
  ) : icon ? (
    <img src={Constants.subfolder + "/logo-icon.png"} style={style} />
  ) : (
    <img src={Constants.subfolder + "/logo-wide.png"} style={style} />
  );
}
