import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import MainLayout from "../../Components/Layouts/MainLayout";
import Constants from "../../Utils/Constants";
import Logo from "../../Logo";

export default class SellerRegistrationSuccessPage extends Component {
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
                  <h5 className="nk-block-title">Registration successful</h5>
                  <div className="nk-block-des">
                    <p>
                      Check your email for instructions on how to activate your
                      store account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}
