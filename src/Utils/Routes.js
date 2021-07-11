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
import BuyerDashboard from "../Pages/Buyer/BuyerDashboard";
import SellerDashboardPage from "../Pages/Seller/SellerDashboardPage";
import SellerRegistationPage from "../Pages/Seller/SellerRegistrationPage";
import SellerLoginPage from "../Pages/Seller/SellerLoginPage";
import SellerCategoriesPage from "../Pages/Seller/SellerCategoriesPage";
import SellerPasswordResetPage from "../Pages/Seller/SellerPasswordResetPage";
import SellerRegistrationSuccessPage from "../Pages/Seller/SellerRegistrationSuccess";

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
  {
    route: "/buyer/dashboard",
    component: BuyerDashboard,
  },
  ,
  {
    route: "/seller/dashboard",
    component: SellerDashboardPage,
  },
  {
    route: "/seller/registration",
    component: SellerRegistationPage,
  },
  {
    route: "/seller/login",
    component: SellerLoginPage,
  },
  {
    route: "/seller/registration-success",
    component: SellerRegistrationSuccessPage,
  },
  {
    route: "/seller/password-reset",
    component: SellerPasswordResetPage,
  },
  {
    route: "/seller/categories",
    component: SellerCategoriesPage,
  },
];
