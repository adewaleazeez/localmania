import React from "react";

export default class Menus {
  static vet = [
    { label: "Home", icon: "mdi mdi-home", url: "/home" },
    {
      label: "New Certificate",
      icon: "mdi mdi-book-plus",
      url: "/new-certificate",
    },
    {
      label: "Issued Certificates",
      icon: "mdi mdi-book-multiple-variant",
      url: "/issued-certificates",
    },
  ];

  static admin = [
    { label: "Home", icon: "mdi mdi-home", url: "/home" },
    {
      label: "Abattoirs",
      icon: "mdi mdi-houzz",
      url: "/abattoirs",
    },
    {
      label: "Vets Management",
      icon: "mdi mdi-hospital",
      url: "/vets-management",
    },
    {
      label: "Meat Suppliers",
      icon: "mdi mdi-car-connected",
      url: "/distributors",
    },
    {
      label: "Certificates",
      icon: "mdi mdi-book-multiple-variant",
      url: "/all-certificates",
    },
  ];
  static distributor = [
    { label: "Home", icon: "mdi mdi-home", url: "/home" },
    {
      label: "Card Setup",
      icon: "mdi mdi-credit-card",
      url: "/card",
    },
    {
      label: "My Certificates",
      icon: "mdi mdi-book-multiple-variant",
      url: "/my-certificates",
    },
  ];
}
