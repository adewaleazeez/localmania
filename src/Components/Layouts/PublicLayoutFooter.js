import React, { Component } from "react";
import { Link } from "react-router-dom";
import Constants from "../../Utils/Constants";

export default function PublicLayoutFooter({}) {
  return (
    <footer className="footer-area">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            {/* footer single wedget */}
            <div className="col-md-6 col-lg-4">
              {/* footer logo */}
              <div className="footer-logo">
                <a href="index.html">
                  <img
                    src={Constants.subfolder + "/logo-wide-reverse.png"}
                    alt=""
                    style={{ height: "40px" }}
                  />
                </a>
              </div>
              {/* footer logo */}
              <div className="about-footer">
                <p className="text-info">Quality food at reasonable prices</p>
                <div className="social-info">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="mdi mdi-facebook-box" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="mdi mdi-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="mdi mdi-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ion-social-google" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* footer single wedget */}
            <div className="col-md-6 col-lg-8 mt-res-sx-30px mt-res-md-30px">
              <div className="single-wedge">
                <h4 className="footer-herading">Quick links</h4>
                <div className="footer-links">
                  <div className="row">
                    <div className="col">
                      <ul>
                        <li>
                          <a href="#">Contact us</a>
                        </li>
                        <li>
                          <a href="#">Terms and Privacy</a>
                        </li>
                        <li>
                          <a href="#">Delivery</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col">
                      <ul>
                        <li>
                          <a href="#">Register</a>
                        </li>
                        <li>
                          <a href="#">Login</a>
                        </li>
                        <li>
                          <a href="#">My Orders</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col">
                      <ul>
                        <li>
                          <a href="#">Cart</a>
                        </li>
                        <li>
                          <a href="#">Checkout</a>
                        </li>
                        <li>
                          <a href="#">Payments</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  Footer Bottom Area start */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <p className="copy-text">Copyright © 2021. All Rights Reserved</p>
            </div>
            <div className="col-md-6 col-lg-8">
              <img
                className="payment-img"
                style={{ height: "30px" }}
                src={Constants.subfolder + "/images/card-icons.png"}
              />
            </div>
          </div>
        </div>
      </div>
      {/*  Footer Bottom Area End*/}
    </footer>
  );
}
