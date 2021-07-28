import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import MainLayout from "../../Components/Layouts/MainLayout";
import Constants from "../../Utils/Constants";
import Logo from "../../Logo";
import APICall from "../../Utils/APICall";
import SpinnerButton from "../../Utils/SpinnerButton";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";

export default class SellerLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirectUrl: null,
      username: "",
      password: ""
    };
  }

  componentDidMount() {}

  login() {
    this.setState({ redirectUrl: "/seller/dashboard" });
  }
  callLoginEndpoint() {
    this.setState({ loading: true });
    if(this.refs.username.value=="" || this.refs.password.value==""){
      Toastr(
        "error",
        "Invalid Username or Password"
      );
      console.log("Invalid Username or Password");
      return true;
    }
    var data = {
      userName: this.refs.username.value,
      password: this.refs.password.value
    };
    
    UsersDataService.findByUserNamePassword(data)
      .then(response => {
        console.log(response);
        Toastr(
          "info",
          "Your request was successful...."
        );
        console.log("Your request was successful....");
        this.setState({ redirectUrl: "/seller/dashboard" });
        //this.props.history.push('/');
        //localStorage.setItem('token', response.data.token);
        //this.setState({redirectUrl: "/account"});
      })
      .catch(e => {
        //console.log(e);
        this.setState({ loading: false });
      });
      
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
                  <h5 className="nk-block-title">Seller Login</h5>
                </div>
              </div>
              {/* .nk-block-head */}
              <form>
                <div className="form-group mt-4">
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="username"
                      name="username"
                      ref="username"
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
                      name="password"
                      ref="password"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <button
                    type="button"
                    onClick={() => this.callLoginEndpoint()}
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Access Store
                  </button>
                </div>
              </form>
              {/* form */}
              <div className="form-note-s2 pt-4 mt-4">
                {" "}
                Not registered ?{" "}
                <Link to="/seller/registration">
                  <strong>Create your store</strong>
                </Link>
              </div>
              <div className="form-note-s2 pt-4">
                {" "}
                Forgot password?{" "}
                <Link to="/seller/registration">
                  <strong>Recover password</strong>
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
                <h1 className="text-white">
                  <em className="icon ni ni-signin"></em>
                </h1>
                <h1 className="text-white">Access your Localmania Store</h1>
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
