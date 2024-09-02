import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import MainLayout from "../../Components/Layouts/MainLayout";
import Constants from "../../Utils/Constants";
import Logo from "../../Logo";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";

export default class AdminPasswordResetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    if(localStorage.getItem('reload')==="1"){
    localStorage.setItem('reload', "0");
    window.location=window.location;
  }
}

componentWillUnmount(){
  localStorage.setItem('reload', "1");
}

  clearCart() {
    //add code to clear shopping cart
  }

  callPasswordResetRequest() {
    this.setState({ loading: true });
    if(this.refs.username.value==""){
      Toastr(
        "error",
        "Invalid Username"
      );
      return true;
    }
    var data = {
      userName: this.refs.username.value
    };
    //console.log("response");
    UsersDataService.resetPassword(data)
      .then(response => {
        //console.log(response);
        Toastr(
          "info",
          "Your password reset request link is successfully sent to your email...."
        );
        //this.setState({ redirectUrl: "/admin/login" });
        //localStorage.setItem('token', response.data.token);
        setTimeout(function(){ window.location.href = "/admin/login"; }, 3000);
        //this.setState({redirectUrl: "/account"});
      })
      .catch(e => {
        //console.log(e);
        Toastr(
          "error",
          "User with User Name "+data.userName+". not found"
        )
        this.setState({ loading: false });
      });
      
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
                      Provide your account Username below, we will email you
                      instructions to reset your password.
                    </p>
                  </div>
                </div>
              </div>
              <form>
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">
                      User Name
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="username"
                      name="username"
                      ref="username"
                      placeholder="Enter your User Name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    onClick={() => this.callPasswordResetRequest()}
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
              <div className="form-note-s2 text-center pt-4">
                <Link to="/admin/login">
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
