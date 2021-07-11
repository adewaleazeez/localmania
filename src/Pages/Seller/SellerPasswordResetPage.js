import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import MainLayout from "../../Components/Layouts/MainLayout";
import Constants from "../../Utils/Constants";
import Logo from "../../Logo";

export default class SellerPasswordResetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {}

  clearCart() {
    //add code to clear shopping cart
  }

  render() {
    return (
      <MainLayout isPublic>
        <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to="/" className="logo-link">
              <Logo style={{ height: "55px" }} />
            </Link>
          </div>
          <div className="card card-bordered">
            <div className="card-inner card-inner-lg">
              <div className="nk-block-head">
                <div className="nk-block-head-content">
                  <h5 className="nk-block-title">Reset password</h5>
                  <div className="nk-block-des">
                    <p>
                      Provide your account email below, we will email you
                      instructions to reset your password.
                    </p>
                  </div>
                </div>
              </div>
              <form>
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">
                      Email
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="default-01"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
              <div className="form-note-s2 text-center pt-4">
                <Link to="/seller/login">
                  <strong>Return to login</strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}
