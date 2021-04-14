import React, { Component } from "react";
import { Link } from "react-router-dom";
import Constants from "../../Utils/Constants";

export default function PublicLayoutHeader({}) {
  return (
    <header className="main-header">
      {/* Header Top Start */}
      <div className="header-top-nav">
        <div className="container-fluid">
          <div className="row">
            {/*Left Start*/}
            <div className="col-lg-4 col-md-4">
              <div className="left-text">
                <p>Welcome to FoodCommerce!</p>
              </div>
            </div>
            {/*Left End*/}
            {/*Right Start*/}
            <div className="col-lg-8 col-md-8 text-right">
              <div className="header-right-nav">
                <ul className="res-xs-flex">
                  <li className="after-n">
                    <Link to="/cart">
                      <i className="mdi mdi-cart" />
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/account">
                      <i className="mdi mdi-account" />
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <i className="mdi mdi-information-outline" />
                      Contact us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/*Right End*/}
          </div>
        </div>
      </div>
      {/* Header Top End */}
      {/* Header Buttom Start */}
      <div className="header-navigation sticky-nav">
        <div className="container">
          <div className="row">
            {/* Logo Start */}
            <div className="col-md-2 col-sm-2">
              <div className="logo">
                <Link to={"/"}>
                  <img
                    src={Constants.subfolder + "/logo-wide.png"}
                    style={{ height: "35px" }}
                    alt=""
                  />
                </Link>
              </div>
            </div>
            {/* Logo End */}
            {/* Navigation Start */}
            <div className="col-md-10 col-sm-10">
              <div className="header_account_area">
                <div className="main-navigation d-none d-lg-block mt-0">
                  <ul>
                    <li className="menu-dropdown">
                      <a href="#">
                        <i
                          className="fa fa-user mr-2"
                          style={{ zoom: "0.7" }}
                        />{" "}
                        Login <i className="ml-2 ion-ios-arrow-down" />
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <Link
                            to="/login"
                            style={{ color: "#ffffff" }}
                            className="btn btn-warning mt-2 dropdown-button"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/register"
                            className="btn btn-inverse-success mt-2 dropdown-button reverse"
                          >
                            Create an account
                          </Link>
                        </li>
                        <li>
                          <Link to="/account">
                            <i className="mdi mdi-account-outline mr-2 account-icon" />{" "}
                            Account
                          </Link>
                        </li>
                        <li>
                          <Link to="/orders">
                            <i className="mdi mdi-buffer mr-2 account-icon" />{" "}
                            Orders
                          </Link>
                        </li>
                        <li>
                          <Link to="/logout">
                            <i className="mdi mdi-power mr-2 account-icon" />{" "}
                            Log out
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                {/*Contact info End */}
                {/*Cart info Start */}
                <div className="cart-info d-flex">
                  <div className="mini-cart-warp">
                    <Link to="/cart" className="count-cart">
                      <span>20.00</span>
                    </Link>
                  </div>
                </div>
                {/*Cart info End */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Header Bottom Account End */}
    </header>
  );
}
