import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import MainLayout from "../../Components/Layouts/MainLayout";
import CartItem from "../../Components/Shop/CartItem";
import ShopDisplayItem from "../../Components/ShopDisplayItem";
import Constants from "../../Utils/Constants";


export default class BuyerDashboard extends Component {
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
      <MainLayout />
    );
  }
}
