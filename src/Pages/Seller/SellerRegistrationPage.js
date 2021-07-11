import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import MainLayout from "../../Components/Layouts/MainLayout";
import Constants from "../../Utils/Constants";
import Logo from "../../Logo";

export default class SellerRegistationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirectUrl: null,
    };
  }

  componentDidMount() {}

  clearCart() {
    //add code to clear shopping cart
  }

  register() {
    this.setState({ redirectUrl: "/seller/registration-success" });
  }

  render() {
    return this.state.redirectUrl ? (
      <Redirect to={this.state.redirectUrl} />
    ) : (
      <MainLayout isPublic>
        <div className="nk-split nk-split-page nk-split-md">
          <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white w-lg-45">
            <div className="absolute-top-right d-lg-none p-3 p-sm-5">
              <a
                href="#"
                className="toggle btn btn-white btn-icon btn-light"
                data-target="athPromo"
              >
                <em className="icon ni ni-info" />
              </a>
            </div>
            <div className="nk-block nk-block-middle nk-auth-body">
              <div className="brand-logo pb-5">
                <Link to="/" className="logo-link">
                  <Logo style={{ height: "55px" }} />
                </Link>
              </div>
              <div className="nk-block-head">
                <div className="nk-block-head-content">
                  <h5 className="nk-block-title">Create your store</h5>
                  <div className="nk-block-des">
                    <p>Register an account for your own online store</p>
                  </div>
                </div>
              </div>
              {/* .nk-block-head */}
              <form>
                <div className="form-group">
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      placeholder="Enter your store name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="email"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-control-wrap">
                    <a
                      tabIndex={-1}
                      href="#"
                      className="form-icon form-icon-right passcode-switch lg"
                      data-target="password"
                    >
                      <em className="passcode-icon icon-show icon ni ni-eye" />
                      <em className="passcode-icon icon-hide icon ni ni-eye-off" />
                    </a>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-control-xs custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkbox"
                    />
                    <label className="custom-control-label" htmlFor="checkbox">
                      I agree to
                      <a tabIndex={-1} href="#">
                        Terms and Conditions{" "}
                      </a>
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    onClick={() => this.register()}
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Register
                  </button>
                </div>
              </form>
              {/* form */}
              <div className="form-note-s2 pt-4">
                {" "}
                Already have an account ?{" "}
                <Link to="/seller/login">
                  <strong>Sign in instead</strong>
                </Link>
              </div>
            </div>
            {/* .nk-block */}
          </div>
          {/* nk-split-content */}
          <div
            className="nk-split-content nk-split-stretch theme-bg  d-flex toggle-break-lg toggle-slide toggle-slide-right"
            data-content="athPromo"
            data-toggle-screen="lg"
            data-toggle-overlay="true"
          >
            <div className="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
              <div
                className="slider-init"
                data-slick='{"dots":true, "arrows":false}'
              >
                <h1 className="text-white">Create your own Locamania store</h1>
                <h4 className="text-white font-weight-normal mt-2">
                  It takes only a few minutes to start selling online
                </h4>
              </div>
              {/* .slider-init */}
              <div className="slider-dots" />
              <div className="slider-arrows" />
            </div>
            {/* .slider-wrap */}
          </div>
          {/* nk-split-content */}
        </div>
      </MainLayout>
    );
  }
}
