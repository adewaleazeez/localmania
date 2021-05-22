import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import PublicLayout from "../../Components/Layouts/PublicLayout";
import CartItem from "../../Components/Shop/CartItem";
import ShopDisplayItem from "../../Components/ShopDisplayItem";
import Constants from "../../Utils/Constants";
import {
  bestSellers,
  newArrivals,
  featuredProducts,
} from "../../Utils/MockData";

export default class CartPage extends Component {
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
            <h3 className="cart-page-title">Your cart items</h3>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <form action="#">
                  <div className="table-content table-responsive cart-table-content bg-white shadow table-striped">
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Product Name</th>
                          <th>Until Price</th>
                          <th>Qty</th>
                          <th>Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {bestSellers.map((product, index) => (
                          <CartItem
                            key={index}
                            productId={product.productId}
                            productImage={product.image1}
                            productName={product.productName}
                            units={2}
                            amountPerUnit={product.price}
                          />
                        ))}
                      </tbody>
                    </table>

                    <div className="col-lg-4 col-md-6 float-right">
                      <div
                        className="grand-totall"
                        style={{ border: "0", background: "none" }}
                      >
                        <h4 className="grand-totall-title mt-4">
                          Grand total<span>260.00</span>
                        </h4>
                        <Link to="/checkout">Proceed to Checkout</Link>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="cart-shiping-update-wrapper">
                        <div className="cart-shiping-update">
                          <Link to="/">Continue Shopping</Link>
                        </div>
                        <div className="cart-clear">
                          <button onClick={() => this.clearCart()}>
                            Clear Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }
}
