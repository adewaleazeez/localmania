import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import PublicLayout from "../../Components/Layouts/PublicLayout";
import CartItem from "../../Components/Shop/CartItem";
import ProductRating from "../../Components/Shop/ProductRating";
import ShopDisplayItem from "../../Components/ShopDisplayItem";
import Constants from "../../Utils/Constants";
import { mockCart } from "../../Utils/MockData";
import "../../sass/single-product-page.scss";

export default class SingleProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      otherImages: [mockCart[0].image1, mockCart[0].image1, mockCart[0].image1],
    };
  }

  componentDidMount() {
    //fetch product from backend, using this.props.match.params.productReference
  }

  render() {
    return (
      <PublicLayout>
        <section className="product-details-area mt-1 single-product-page bg-white shadow pt-5">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="product-details-img product-details-tab">
                  <div className="zoompro-wrap zoompro-2">
                    <div className="zoompro-border zoompro-span">
                      <img
                        className="zoompro"
                        src={mockCart[0].image1}
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    id="gallery"
                    className="product-dec-slider-2 slick-initialized slick-slider p-3 bg-white mx-0"
                  >
                    <div className="slick-list draggable">
                      <div
                        className="slick-track"
                        style={{
                          opacity: 1,
                          width: "548px",
                          transform: "translate3d(0px, 0px, 0px)",
                        }}
                      >
                        {this.state.otherImages.map((image, index) => (
                          <a
                            key={index}
                            className="slick-slide slick-current slick-active"
                            style={{ width: "137px" }}
                          >
                            <img src={image} alt="" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="product-details-content">
                  <h2 className="mt-4">Product Name</h2>
                  <ProductRating stars="4" />
                  <div className="pricing-meta">
                    <ul>
                      <li className="old-price not-cut theme-color">
                        <strong>18.90</strong>
                      </li>
                    </ul>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisic elit eiusm
                    tempor incidid ut labore et dolore magna aliqua. Ut enim ad
                    minim venialo quis nostrud exercitation ullamco
                  </p>
                  <div className="pro-details-quality mt-0px mt-5">
                    <div className="cart-plus-minus bg-white">
                      <div className="dec qtybutton">-</div>
                      <input
                        className="cart-plus-minus-box"
                        type="text"
                        name="qtybutton"
                        defaultValue={1}
                      />
                      <div className="inc qtybutton">+</div>
                    </div>
                    <div className="pro-details-cart btn-hover">
                      <button className="btn btn-dark ml-2 btn-lg">
                        <small className="font-weight-bold">
                          + ADD TO CART
                        </small>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="description-review-area mb-60px mt-5">
                  <div className="container">
                    <div className="description-review-wrapper">
                      <div className="description-review-topbar nav">
                        <a data-toggle="tab" href="#des-details1">
                          Product Details
                        </a>
                        <a
                          data-toggle="tab"
                          href="#des-details3"
                          className="active"
                        >
                          Reviews (2)
                        </a>
                      </div>
                      <div className="tab-content description-review-bottom">
                        <div id="des-details1" className="tab-pane">
                          <div className="product-description-wrapper">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit, sed do eiusmod tempor incididunt
                            </p>
                            <p>
                              ut labore et dolore magna aliqua. Ut enim ad minim
                              veniam, quis nostrud exercitation ullamco laboris
                              nisi ut aliquip ex ea commo consequat. Duis aute
                              irure dolor in reprehend in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt
                            </p>
                          </div>
                        </div>
                        <div id="des-details3" className="tab-pane active">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="review-wrapper">
                                <div className="single-review">
                                  <div className="review-content">
                                    <div className="review-top-wrap">
                                      <div className="review-left">
                                        <div className="review-name">
                                          <h4>
                                            <strong>Review User Name</strong>
                                          </h4>
                                        </div>
                                        <ProductRating stars={3} />
                                      </div>
                                      <small>1st Apr 2020</small>
                                    </div>
                                    <div className="review-bottom">
                                      <p>
                                        Vestibulum ante ipsum primis aucibus
                                        orci luctustrices posuere cubilia Curae
                                        Suspendisse viverra ed viverra. Mauris
                                        ullarper euismod vehicula. Phasellus
                                        quam nisi, congue id nulla.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    );
  }
}
