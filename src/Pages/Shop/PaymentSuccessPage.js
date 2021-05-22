import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import PublicLayout from "../../Components/Layouts/PublicLayout";
import Constants from "../../Utils/Constants";

export default class PaymentSuccessPage extends Component {
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
      <PublicLayout>
        <div className="cart-main-area mtb-60px">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12 bg-white shadow mx-auto py-5 px-4 text-center">
                <i
                  className="mdi mdi-check-circle text-success p-3"
                  style={{ fontSize: "40px" }}
                ></i>
                <h3 className="cart-page-title py-4 text-center">
                  Payment Successful
                </h3>
                <p>Order Reference</p>
                <h3 className="cart-page-title small text-center mb-5">
                  {this.props.match.params.orderReference}
                </h3>
                <Link
                  to="/"
                  className="btn btn-rounded btn-success px-5 mt-4 btn-lg"
                >
                  View Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }
}
