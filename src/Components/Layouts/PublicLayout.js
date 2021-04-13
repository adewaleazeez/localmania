import React, { Component } from "react";
import Constants from "../../Utils/Constants";
import Functions from "../../Utils/Functions";
import { Link, Redirect } from "react-router-dom";
import CenterBlock from "../CenterBlock";
import Spinner from "../../Utils/Spinner";
import ShopDisplayItem from "../ShopDisplayItem";
import PublicLayoutHeader from "./PublicLayoutHeader";
import "../../sass/public-layout.scss";
import CardBlock from "../CardBlock";
import {
  bestSellers,
  newArrivals,
  featuredProducts,
} from "../../Utils/MockData";
import PublicLayoutFooter from "./PublicLayoutFooter";

//The public layout is for interfaces like shoping, login, checkout etc
//where the user has not logged into the system yet.
//For interfaces where the user has logged in, please use MainLayout

export default class PublicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: true,
      redirect: null,
      mobileMenuIsOpen: false,
    };
  }

  jsScripts = [
    "/assets/js/jquery-front.js",
    "/assets/js/modernizr-front.js",
    "/assets/js/plugins-front.js",
  ];

  stylesheets = [
    "/assets/layout-css/public/plugins.min.css",
    "/assets/layout-css/public/style-front.min.css",
    "/assets/layout-css/public/responsive-front.min.css",
  ];

  loadedScripts = [];
  loadedStyles = [];

  loadScripts() {
    this.loadStyles();
    this.jsScripts.forEach((scriptUrl) => {
      const script = document.createElement("script");
      script.src = Constants.subfolder + scriptUrl;
      script.async = true;
      document.body.appendChild(script);
      this.loadedScripts.push(script);
    });
  }

  loadStyles() {
    this.stylesheets.forEach((css) => {
      const link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = Constants.subfolder + css;
      document.head.appendChild(link);
      this.loadedStyles.push(link);
    });
  }

  unloadScripts() {
    this.loadedScripts.forEach((script) => {
      document.body.removeChild(script);
    });
    this.loadedStyles.forEach((css) => {
      document.head.removeChild(css);
    });
  }

  componentDidMount() {
    this.loadScripts();
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    this.unloadScripts();
  }

  render() {
    return (
      <>
        {this.state.loading || (
          <div id="main" className="public-layout-container">
            <PublicLayoutHeader />

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
                    backgroundColor: "rgba(12,46,19,0.5)",
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
                        />
                        <button type="button">
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
                        <h2 className="">Best Sellers</h2>
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

            <PublicLayoutFooter />
          </div>
        )}
      </>
    );
  }
}
