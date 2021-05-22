import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import PublicLayout from "../../Components/Layouts/PublicLayout";
import CartItem from "../../Components/Shop/CartItem";
import ShopDisplayItem from "../../Components/ShopDisplayItem";
import Constants from "../../Utils/Constants";
import { mockCart } from "../../Utils/MockData";

export default class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <PublicLayout>
        <div className="checkout-area mt-60px mb-40px">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="billing-info-wrap">
                  <h3>Billing Details</h3>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20px">
                        <label>First Name</label>
                        <input type="text" className="bg-white" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20px">
                        <label>Last Name</label>
                        <input type="text" className="bg-white" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="billing-info mb-20px">
                        <label>Street Address</label>
                        <input
                          className="billing-address"
                          placeholder="House number and street name"
                          type="text"
                          className="bg-white"
                        />
                        <input
                          placeholder="Apartment, suite, unit etc."
                          type="text"
                          className="bg-white mt-2"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20px">
                        <label>Town / City</label>
                        <input type="text" className="bg-white" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20px">
                        <label>State</label>
                        <input type="text" className="bg-white" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20px">
                        <label>Country</label>
                        <input type="text" className="bg-white" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20px">
                        <label>Postcode / ZIP</label>
                        <input type="text" className="bg-white" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20px">
                        <label>Phone</label>
                        <input type="text" className="bg-white" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20px">
                        <label>Email Address</label>
                        <input type="text" className="bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="additional-info-wrap">
                    <h4>Additional information</h4>
                    <div className="additional-info">
                      <label>Order notes</label>
                      <textarea
                        placeholder="Notes about your order, e.g. special notes for delivery. "
                        name="message"
                        className="bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="your-order-area">
                  <h3>Your order</h3>
                  <div className="your-order-wrap gray-bg-4">
                    <div className="your-order-product-info">
                      <div className="your-order-top">
                        <ul>
                          <li>Product</li>
                          <li>Total</li>
                        </ul>
                      </div>
                      <div className="your-order-middle">
                        <ul>
                          {}
                          <li>
                            <span className="order-middle-left">
                              Product Name X 1
                            </span>{" "}
                            <span className="order-price">$329 </span>
                          </li>
                          <li>
                            <span className="order-middle-left">
                              Product Name X 1
                            </span>{" "}
                            <span className="order-price">$329 </span>
                          </li>
                        </ul>
                      </div>

                      <div className="your-order-total border-0 mb-0">
                        <ul>
                          <li className="order-total">Total</li>
                          <li>329</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="Place-order mt-25">
                    <Link
                      to="/payment-success/TEST-ORDERREF"
                      className="btn-hover"
                    >
                      Place Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }
}
