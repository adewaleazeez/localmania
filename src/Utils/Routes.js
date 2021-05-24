import React from "react";
import HomePage from "../Pages/Shop/HomePage";
import LoginPage from "../Pages/User/LoginPage";
import RegistrationPage from "../Pages/User/RegistrationPage";
import CartPage from "../Pages/Shop/CartPage";
import CheckoutPage from "../Pages/Shop/CheckoutPage";
import PaymentSuccessPage from "../Pages/Shop/PaymentSuccessPage";
import PaymentErrorPage from "../Pages/Shop/PaymentErrorPage";
import SingleProductPage from "../Pages/Shop/SingleProductPage";
import ProductSearchPage from "../Pages/Shop/ProductSearchPage";

export const appRoutes = [
  {
    route: "/",
    component: HomePage,
  },
  {
    route: "/login",
    component: LoginPage,
  },
  {
    route: "/register",
    component: RegistrationPage,
  },
  {
    route: "/cart",
    component: CartPage,
  },
  {
    route: "/checkout",
    component: CheckoutPage,
  },
  {
    route: "/payment-success/:orderReference",
    component: PaymentSuccessPage,
  },
  {
    route: "/payment-error/:orderReference",
    component: PaymentErrorPage,
  },
  {
    route: "/product/:productReference",
    component: SingleProductPage,
  },
  {
    route: "/search",
    component: ProductSearchPage,
  },
];
