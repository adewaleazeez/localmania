import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import PublicLayout from "../../Components/Layouts/PublicLayout";
import ShopDisplayItem from "../../Components/ShopDisplayItem";
import Constants from "../../Utils/Constants";
import {
  bestSellers,
  newArrivals,
  featuredProducts,
} from "../../Utils/MockData";
import Toastr from "../../Utils/Toastr";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchQuery: "",
      redirectUrl: null,
    };
  }

  componentDidMount() {}

  searchNow() {
    this.setState({ redirectUrl: `/search?q=${this.state.searchQuery}` });
  }

  render() {
    return (
      <PublicLayout>
        {this.state.redirectUrl ? (
          <Redirect to={this.state.redirectUrl} />
        ) : (
          <React.Fragment>
            <section className="container  mb-20px mt-3">
              <div
                className="feature-image"
                style={{
                  backgroundImage: `url('${Constants.subfolder}/images/hero-image.jpg')`,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgba(32,0,65,0.5)",
                  }}
                >
                  <CenterBlock height={200}>
                    <div
                      className="dropdown_search"
                      style={{ display: "block" }}
                    >
                      <form action="#">
                        <input
                          placeholder="Search entire store here ..."
                          type="text"
                          onChange={(e) =>
                            this.setState({ searchQuery: e.target.value })
                          }
                        />
                        <button type="button" onClick={() => this.searchNow()}>
                          <i className="fa  fa-search" />
                        </button>
                      </form>
                    </div>
                  </CenterBlock>
                </div>
              </div>
            </section>

            {/* Best Sells Area Start */}
            <section className="best-sells-area mb-30px">
              <div className="container">
                <CardBlock>
                  {/* Section Title Start */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="section-title">
                        <h2 className="">Best Sellers test</h2>
                      </div>
                    </div>
                  </div>
                  {/* Section Title End */}
                  {/* Best Sell Slider Carousel Start */}
                  <div className="row">
                    {bestSellers.map((item, index) => (
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <ShopDisplayItem key={index} {...item} removeSpacing />
                      </div>
                    ))}
                  </div>
                </CardBlock>
              </div>
            </section>

            <section className="best-sells-area mb-30px">
              <div className="container">
                <CardBlock>
                  {/* Section Title Start */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="section-title">
                        <h2 className="">New Arrivals</h2>
                      </div>
                    </div>
                  </div>
                  {/* Section Title End */}
                  {/* Best Sell Slider Carousel Start */}
                  <div className="row">
                    {newArrivals.map((item, index) => (
                      <div className="col-sm-6 col-md-3 col-lg-3">
                        <ShopDisplayItem key={index} {...item} removeSpacing />
                      </div>
                    ))}
                  </div>
                </CardBlock>
              </div>
            </section>

            {/* Hot Deal Area End */}
            {/* Banner Area Start */}
            <div className="banner-area">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 col-xs-12">
                    <div className="banner-wrapper">
                      <a href="#">
                        <img
                          src={Constants.subfolder + "/images/banner-1.jpg"}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-12 mt-res-sx-30px">
                    <div className="banner-wrapper">
                      <a href="#">
                        <img
                          src={Constants.subfolder + "/images/banner-2.jpg"}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-md-3 col-xs-12 mt-res-sx-30px">
                    <div className="banner-wrapper">
                      <a href="#">
                        <img
                          src={Constants.subfolder + "/images/banner-3.jpg"}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Banner Area End */}
            {/* Feature Area Start */}
            <section className="feature-area">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {/* Section Title */}
                    <div className="section-title">
                      <h2>Featured Products</h2>
                      <p>Add products to weekly line up</p>
                    </div>
                    {/* Section Title */}
                  </div>
                </div>
                {/* Feature Slider Start */}
                <div className="feature-slider  owl-nav-style">
                  {/* Single Item */}
                  <div className="feature-slider-item">
                    <div className="row">
                      {featuredProducts.map((item, index) => (
                        <div className="col-sm-6 col-md-4">
                          <ShopDisplayItem key={index} {...item} />
                        </div>
                      ))}
                    </div>
                    <div className="row">
                      {featuredProducts.map((item, index) => (
                        <div className="col-sm-6 col-md-4">
                          <ShopDisplayItem key={index} {...item} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Feature Slider End */}
              </div>
            </section>
          </React.Fragment>
        )}
      </PublicLayout>
    );
  }
}
