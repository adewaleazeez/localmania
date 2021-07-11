import React from "react";
import Logo from "../../Logo";
import { Link } from "react-router-dom";

export default function MainLayoutHeader({}) {
  return (
    <div className="nk-header nk-header-fixed is-light">
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ml-n1">
            <a
              href="#"
              className="nk-nav-toggle nk-quick-nav-icon"
              data-target="sidebarMenu"
            >
              <em className="icon ni ni-menu" />
            </a>
          </div>
          <div className="nk-header-brand d-xl-none">
            <Link to="/" className="logo-link">
              <Logo style={{ height: "50px" }} />
            </Link>
          </div>
          {/* .nk-header-brand */}
          <div className="nk-header-news d-none d-xl-block">
            <div className="nk-news-list">
              <a className="nk-news-item" href="#">
                <div className="nk-news-icon"></div>
                <div className="nk-news-text"></div>
              </a>
            </div>
          </div>
          {/* .nk-header-news */}
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="dropdown user-dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <div className="user-toggle">
                    <div className="user-avatar sm">
                      <em className="icon ni ni-user-alt" />
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1">
                  <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card">
                      <div className="user-avatar">
                        <span>AZ</span>
                      </div>
                      <div className="user-info">
                        <span className="lead-text">Adewale Azeez</span>
                        <span className="sub-text">adewaleazeez@gmail.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li>
                        <Link to="/seller/profile">
                          <em className="icon ni ni-user-alt" />
                          <span>View Profile</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li>
                        <Link to="/seller/login">
                          <em className="icon ni ni-signout" />
                          <span>Sign out</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            {/* .nk-quick-nav */}
          </div>
          {/* .nk-header-tools */}
        </div>
        {/* .nk-header-wrap */}
      </div>
      {/* .container-fliud */}
    </div>
  );
}
