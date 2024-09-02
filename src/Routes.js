import React from "react";
import HomePage from "../Pages/Shop/HomePage";
import LoginPage from "../Pages/User_old/LoginPage";
import RegistrationPage from "../Pages/User_old/RegistrationPage";
import CartPage from "../Pages/Shop/CartPage";
import CheckoutPage from "../Pages/Shop/CheckoutPage";
import PaymentSuccessPage from "../Pages/Shop/PaymentSuccessPage";
import PaymentErrorPage from "../Pages/Shop/PaymentErrorPage";
import SingleProductPage from "../Pages/Shop/SingleProductPage";
import ProductSearchPage from "../Pages/Shop/ProductSearchPage";
import BuyerDashboard from "../Pages/Buyer/BuyerDashboard";
import UserDashboardPage from "../Pages/User/UserDashboardPage";
import SellerRegistationPage from "../Pages/User/UserRegistrationPage";
import SellerRegistationEditPage from "../Pages/User/UserRegistrationEditPage";
import UserPasswordChangePage from "../Pages/User/UserPasswordChangePage";
import UserLoginPage from "../Pages/User/UserLoginPage";
import UnitsPage from "../Pages/User/UnitsPage";
import UsersPage from "../Pages/User/UsersPage";
import QueryReceiversPage from "../Pages/User/QueryReceiversPage";
import VoucherTypesPage from "../Pages/User/VoucherTypesPage";
import VoucherEntryPage from "../Pages/User/VoucherEntryPage";
import QueryFormPage from "../Pages/User/QueryFormPage";
import ReportsPage from "../Pages/User/ReportsPage";
import UserPasswordResetPage from "../Pages/User/UserPasswordResetPage";
import SellerRegistrationSuccessPage from "../Pages/User/UserRegistrationSuccess";
import UserProductsPage from "../Pages/User/UserProductsPage";
import UserProductDetailsPage from "../Pages/User/UserProductDetailsPage";
import UserStockPage from "../Pages/User/UserStockPage";
import SalaryScaleUpdate from "../Pages/User/SalaryScaleUpdate";
import PaymentVoucher from "../Pages/User/PaymentVoucher";
import VariationAdvice from "../Pages/User/VariationAdvice";
import AdminDashboardPage from "../Pages/Admin/AdminDashboardPage";
import AdminRegistationEditPage from "../Pages/Admin/AdminRegistrationEditPage";
import AdminPasswordChangePage from "../Pages/Admin/AdminPasswordChangePage";
import AdminLoginPage from "../Pages/Admin/AdminLoginPage";
import AdminCategoriesPage from "../Pages/Admin/AdminCategoriesPage";
import AdminPasswordResetPage from "../Pages/Admin/AdminPasswordResetPage";
import AdminRegistrationSuccessPage from "../Pages/Admin/AdminRegistrationSuccess";
import AdminProductsPage from "../Pages/Admin/AdminProductsPage";
import AdminProductDetailsPage from "../Pages/Admin/AdminProductDetailsPage";
import AdminStockPage from "../Pages/Admin/AdminStockPage";

export const appRoutes = [
  {
    route: "/",
    //component: HomePage,
    component: UserLoginPage,
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
    route: "/user/dashboard",
    component: UserDashboardPage,
  },
  {
    route: "/user/registration",
    component: SellerRegistationPage,
  },
  {
    route: "/user/registrationedit",
    component:  SellerRegistationEditPage
  },
  {
    route: "/user/passwordchange",
    component: UserPasswordChangePage
  },
  {
    route: "/user/login",
    component: UserLoginPage,
  },
  {
    route: "/user/registration-success",
    component: SellerRegistrationSuccessPage,
  },
  {
    route: "/user/password-reset",
    component: UserPasswordResetPage,
  },
  {
    route: "/user/units",
    component: UnitsPage,
  }, 
  {
    route: "/user/users",
    component: UsersPage,
  }, 
  {
    route: "/user/query_receivers",
    component: QueryReceiversPage,
  }, 
  {
    route: "/user/voucher_types",
    component: VoucherTypesPage,
  }, 
  {
    route: "/user/voucher_entry",
    component: VoucherEntryPage,
  }, 
  {
    route: "/user/query_entry",
    component: QueryFormPage,
  }, 
  {
    route: "/user/reports",
    component: ReportsPage,
  }, 
  {
    route: "/user/products",
    component: UserProductsPage,
  }, 
  {
    route: "/user/product/:productId",
    component: UserProductDetailsPage,
  }, 
  {
	route: "/user/stock",
	component: UserStockPage,
  },
  {
    route: "/user/salary_scale_update",
    component: SalaryScaleUpdate,
  },
  {
    route: "/user/payment_voucher",
    component: PaymentVoucher,
  },
  {
    route: "/user/variation_advice",
    component: VariationAdvice,
  },
  {
    route: "/admin/dashboard",
    component: AdminDashboardPage,
  },
  {
    route: "/admin/registration",
    component: AdminRegistationEditPage,
  },
  {
    route: "/admin/passwordchange",
    component: AdminPasswordChangePage
  },
  {
    route: "/admin/login",
    component: AdminLoginPage,
  },
  {
    route: "/admin/registration-success",
    component: AdminRegistrationSuccessPage,
  },
  {
    route: "/admin/password-reset",
    component: AdminPasswordResetPage,
  },
  {
    route: "/admin/categories",
    component: AdminCategoriesPage,
  }, 
  {
    route: "/admin/products",
    component: AdminProductsPage,
  }, 
  {
    route: "/admin/product/:productId",
    component: AdminProductDetailsPage,
  }, 
  {
    route: "/admin/stock",
    component: AdminStockPage,
  },

];
