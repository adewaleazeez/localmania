import React from "react";
import HomePage from "../Pages/Shop/HomePage";
import LoginPage from "../Pages/User/LoginPage";
import RegistrationPage from "../Pages/User/RegistrationPage";

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
];
