import React from "react";
import HomePage from "../Pages/Shop/HomePage";
import UserLoginPage from "../Pages/User/UserLoginPage";
import UserDashboardPage from "../Pages/User/UserDashboardPage";
//import RegistrationPage from "../Pages/User/RegistrationPage";
import DepartmentsPage from "../Pages/User/DepartmentsPage";
//import ReportsPage from "../Pages/User/ReportsPage";
import UsersPage from "../Pages/User/UsersPage";
import StaffsPage from "../Pages/User/StaffsPage";
import GatesPage from "../Pages/User/GatesPage";
//import ReportsPage from "../Pages/User/ReportsPage";

export const appRoutes = [
  {
    route: "/",
    //component: HomePage,
    component: UserLoginPage,
  },
  {
    route: "/user/login",
    component: UserLoginPage,
  },
  {
    route: "/user/dashboard",
    component: UserDashboardPage,
  },
  {
    route: "/user/department",
    component: DepartmentsPage,
  }, 
  {
    route: "/user/users",
    component: UsersPage,
  },
  {
    route: "/user/staff",
    component: StaffsPage,
  },
  {
    route: "/user/gate",
    component: GatesPage,
  }, 
  /*{
    route: "/register",
    component: RegistrationPage,
  },
  {
    route: "/users/passwordchange",
    component: UserPasswordChangePage
  },
  {
    route: "/users/password-reset",
    component: UserPasswordResetPage,
  },
  {
    route: "/users/reports",
    component: ReportsPage,
  }, */
  
];
