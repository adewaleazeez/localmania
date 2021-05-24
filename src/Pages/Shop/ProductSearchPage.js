import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import PublicLayout from "../../Components/Layouts/PublicLayout";
import CartItem from "../../Components/Shop/CartItem";
import ProductRating from "../../Components/Shop/ProductRating";
import ShopDisplayItem from "../../Components/ShopDisplayItem";
import Constants from "../../Utils/Constants";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import {
  bestSellers,
  newArrivals,
  featuredProducts,
} from "../../Utils/MockData";
import Functions from "../../Utils/Functions";

export default class ProductSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      amountFrom: 5000,
      amountTo: 900000,
    };
  }

  //this should be replaced with data from the backend
  allProducts = bestSellers.concat(newArrivals).concat(featuredProducts);

  //replace with categories from backend
  categories = ["Vegetable", "Processed", "Juices", "Fresh"];

  //replace with sellers from backend
  sellers = ["Seller 1", "Seller 2"];

  componentDidMount() {
    console.log(this.allProducts);
  }

  render() {
    return (
      <PublicLayout>
        <div className="shop-category-area bg-white mt-1 pt-5">
          <div className="container ">
            <div className="row">
              <div className="col-lg-9 order-lg-last col-md-12 order-md-first">
                {/* Shop Top Area Start */}
                <div className="shop-top-bar">
                  <div className="shop-tab nav mb-res-sm-15">
                    <input
                      type="text"
                      placeholder="search here ..."
                      className="form-control form-control-sm"
                      style={{ maxWidth: "400px", borderRadius: "25px" }}
                    />
                    <i
                      className="fa  fa-search"
                      style={{
                        position: "relative",
                        right: "25px",
                        top: "9px",
                        opacity: "0.8",
                      }}
                    ></i>
                  </div>
                  <div className="select-shoing-wrap">
                    <div className="shot-product">
                      <p></p>
                    </div>
                    <div className="shop-select">
                      <span className="d-inline-block float-right">
                        <span className="d-inline-block mr-2">Sort</span>
                        <select
                          style={{
                            position: "relative",
                            top: "0px",
                            maxWidth: "150px",
                            borderRadius: "25px",
                          }}
                          className="form-control form-control-sm d-inline-block"
                        >
                          <option value>Newest first</option>
                          <option value>Lowest price first</option>
                          <option value>Highest price first</option>
                        </select>
                      </span>
                    </div>
                  </div>
                  {/* Right Side End */}
                </div>
                {/* Shop Top Area End */}
                {/* Shop Bottom Area Start */}
                <div className="shop-bottom-area mt-35">
                  {/* Shop Tab Content Start */}
                  <div className="tab-content jump">
                    {/* Tab One Start */}
                    <div id="shop-1" className="tab-pane active">
                      <div className="row">
                        {this.allProducts.map((item, index) => (
                          <div className="col-sm-6 col-md-4 col-lg-4">
                            <ShopDisplayItem
                              key={index}
                              {...item}
                              removeSpacing
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Shop Tab Content End */}
                  {/*  Pagination Area Start */}
                  <div className="pro-pagination-style text-center">
                    <ul>
                      <li>
                        <a className="prev" href="#">
                          <i className="fa fa-arrow-left" />
                        </a>
                      </li>
                      <li>
                        <a className="active" href="#">
                          1
                        </a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a className="next" href="#">
                          <i className="fa fa-arrow-right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/*  Pagination Area End */}
                </div>
                {/* Shop Bottom Area End */}
              </div>
              {/* Sidebar Area Start */}
              <div className="col-lg-3 order-lg-first col-md-12 order-md-last mb-res-md-60px mb-res-sm-60px">
                <div className="left-sidebar">
                  <div className="sidebar-heading">
                    <div className="main-heading">
                      <h2>Filter By</h2>
                    </div>
                    {/* Sidebar single item */}
                    <div className="sidebar-widget">
                      <h4 className="pro-sidebar-title">Categories</h4>
                      <div className="sidebar-widget-list">
                        <ul>
                          {this.categories.map((category, index) => (
                            <li key={index}>
                              <div className="sidebar-widget-list-left">
                                <input type="checkbox" />{" "}
                                <a href="#">{category}</a>
                                <span className="checkmark" />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Sidebar single item */}
                  </div>
                  {/* Sidebar single item */}
                  <div className="sidebar-widget mt-20">
                    <h4 className="pro-sidebar-title">Price</h4>
                    <div className=" mt-10">
                      <Range
                        min={1000}
                        max={1000000}
                        step={5000}
                        defaultValue={[
                          this.state.amountFrom,
                          this.state.amountTo,
                        ]}
                        onChange={(value) =>
                          this.setState({
                            amountFrom: value[0],
                            amountTo: value[1],
                          })
                        }
                      />
                    </div>
                    <div className="row mt-3">
                      <div className="col">
                        <span className="form-control form-control-sm">
                          {Functions.currencyFormat(this.state.amountFrom)}
                        </span>
                      </div>
                      <div className="col">
                        <span className="form-control form-control-sm">
                          {Functions.currencyFormat(this.state.amountTo)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar single item */}
                  <div className="sidebar-widget mt-30">
                    <h4 className="pro-sidebar-title">Seller</h4>
                    <div className="sidebar-widget-list">
                      <ul>
                        {this.sellers.map((seller, index) => (
                          <li key={index}>
                            <div className="sidebar-widget-list-left">
                              <input type="checkbox" /> <a href="#">{seller}</a>
                              <span className="checkmark" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sidebar Area End */}
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }
}
