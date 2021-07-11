import React from "react";
import menus from "../../menus/index";
import { Link } from "react-router-dom";
import Logo from "../../Logo";

export default function MainLayoutSidebar({ role }) {
  const roleMenus = role ? menus[role] : [];
  return (
    <div
      className="nk-sidebar nk-sidebar-fixed is-dark "
      data-content="sidebarMenu"
    >
      <div className="nk-sidebar-element nk-sidebar-head">
        <div className="nk-menu-trigger">
          <a
            href="#"
            className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
            data-target="sidebarMenu"
          >
            <em className="icon ni ni-arrow-left" />
          </a>
          <a
            href="#"
            className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex"
            data-target="sidebarMenu"
          >
            <em className="icon ni ni-menu" />
          </a>
        </div>
        <div className="nk-sidebar-brand">
          <Link to="/" className="logo-link nk-sidebar-logo">
            <Logo reverse style={{ height: "40px" }} />
          </Link>
        </div>
      </div>
      {/* .nk-sidebar-element */}
      <div className="nk-sidebar-element nk-sidebar-body">
        <div className="nk-sidebar-content">
          <div className="nk-sidebar-menu" data-simplebar>
            <ul className="nk-menu">
              <li className="nk-menu-heading">
                <h6 className="overline-title text-primary-alt">Menu</h6>
              </li>
              {/* .nk-menu-item */}
              {roleMenus.map((menu, index) => (
                <li className="nk-menu-item" key={index}>
                  <Link to={menu.url} className="nk-menu-link">
                    <span className="nk-menu-icon">
                      <em className={menu.icon} />
                    </span>
                    <span className="nk-menu-text">{menu.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {/* .nk-menu */}
          </div>
          {/* .nk-sidebar-menu */}
        </div>
        {/* .nk-sidebar-content */}
      </div>
      {/* .nk-sidebar-element */}
    </div>
  );
}
