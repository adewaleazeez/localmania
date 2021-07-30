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

  /*register() {
    this.setState({ redirectUrl: "/seller/registration-success" });
  }*/

  register() {
    this.setState({ loading: true });
    let errormessage = "";
    if(this.refs.businessName.value==""){
      errormessage = <div>{errormessage}<div>Business Name can not be blank<br/></div></div>;
    }
    if(this.refs.officeAddress.value==""){
      errormessage = <div>{errormessage}<div>Office Address can not be blank<br/></div></div>;
    }
    if(this.refs.phoneNumber.value==""){
      errormessage = <div>{errormessage}<div>Phone Number can not be blank<br/></div></div>;
    }
    if(this.refs.emailAddress.value==""){
      errormessage = <div>{errormessage}<div>Email Address can not be blank<br/></div></div>;
    }
    if(this.refs.userName.value==""){
      errormessage = <div>{errormessage}<div>User Name can not be blank<br/></div></div>;
    }
    if(this.refs.password.value==""){
      errormessage = <div>{errormessage}<div>Password can not be blank<br/></div></div>;
    }
    if(this.refs.password.value != this.refs.repeatpassword.value){
      errormessage = <div>{errormessage}<div>Password and Repeat Password don't match<br/></div></div>;
    }
    if(errormessage !=""){
      errormessage = <div>Please correct the following errors:<br/>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }
    var data = {
      businessName: this.refs.businessName.value,
      officeAddress: this.refs.officeAddress.value,
      phoneNumber: this.refs.phoneNumber.value,
      emailAddress: this.refs.emailAddress.value,
      userName: this.refs.userName.value,
      password: this.refs.password.value
    };
    //console.log("response");
    UsersDataService.create(data)
      .then(response => {
        //console.log(response);
        Toastr(
          "info",
          "Seller registration is successful...."
        );
        this.setState({ redirectUrl: "/seller/registration-success" });
        //this.props.history.push('/');
        //localStorage.setItem('token', response.data.token);
        //this.setState({redirectUrl: "/account"});
      })
      .catch(e => {
        //console.log(e);
        Toastr(
          "error",
          "There is problem registering the seller"
        );
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
                      id="businessName"
                      name="businessName"
                      ref="businessName"
                      placeholder="Enter your store name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="officeAddress"
                      name="officeAddress"
                      ref="officeAddress"
                      placeholder="Enter your office address"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="phoneNumber"
                      name="phoneNumber"
                      ref="phoneNumber"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="emailAddress"
                      name="emailAddress"
                      ref="emailAddress"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="userName"
                      name="userName"
                      ref="userName"
                      placeholder="Enter user name"
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
                    /><br/>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="repeatpassword"
                      name="repeatpassword"
                      ref="repeatpassword"
                      placeholder="Enter your repeat password"
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
                <h1 className="text-white">Create your own Localmania store</h1>
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
