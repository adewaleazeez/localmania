import React, { Component } from "react";
import Constants from "../../Utils/Constants";
import CenterBlock from "../CenterBlock";
import Spinner from "../../Utils/Spinner";
import MainLayoutSidebar from "./MainLayoutSidebar";
import MainLayoutHeader from "./MainLayoutHeader";
import { ToastContainer } from "react-toastify";

//For interfaces where the user has logged in,
//and seller registration and login

export default class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: true,
      redirect: null,
      mobileMenuIsOpen: false,
    };
  }

  jsScripts = ["/app-assets/js/bundle.js", "/app-assets/js/scripts.js"];

  stylesheets = ["/app-assets/css/dashlite.css", "/app-assets/css/theme.css"];

  loadedScripts = [];
  loadedStyles = [];

  loadScripts() {
    this.loadStyles();
    this.jsScripts.forEach((scriptUrl) => {
      const script = document.createElement("script");
      script.src = Constants.subfolder + scriptUrl;
      script.async = true;
      document.body.appendChild(script);
      this.loadedScripts.push(script);
    });
  }

  loadStyles() {
    this.stylesheets.forEach((css) => {
      const link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = Constants.subfolder + css;
      document.head.appendChild(link);
      this.loadedStyles.push(link);
    });
  }

  unloadScripts() {
    this.loadedScripts.forEach((script) => {
      document.body.removeChild(script);
    });
    this.loadedStyles.forEach((css) => {
      document.head.removeChild(css);
    });
  }

  componentDidMount() {
    this.loadScripts();
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  componentWillUnmount() {
    this.unloadScripts();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading && (
          <CenterBlock>
            <Spinner />
          </CenterBlock>
        )}
        {this.state.loading || (
          <div className="nk-body bg-lighter npc-general has-sidebar">
            <ToastContainer />
            <div className="nk-app-root">
              {/* main @s */}
              <div className="nk-main ">
                {this.props.isPublic || (
                  <MainLayoutSidebar role={this.props.role} />
                )}
                {/* wrap @s */}
                <div
                  className={`nk-wrap ${
                    this.props.isPublic && "nk-wrap-nosidebar"
                  }`}
                >
                  {this.props.isPublic || <MainLayoutHeader />}
                  <div className="nk-content ">
                    {this.props.isPublic ? (
                      this.props.children
                    ) : (
                      <div className="container-fluid">
                        <div className="nk-content-inner">
                          <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                              <div className="nk-block-between">
                                <div className="nk-block-head-content">
                                  <h3 className="nk-block-title page-title">
                                    {this.props.title}
                                  </h3>
                                  <div className="nk-block-des text-soft">
                                    <p>{this.props.subtitle}</p>
                                  </div>
                                </div>
                                {/* .nk-block-head-content */}
                                <div className="nk-block-head-content">
                                  {this.props.topRight}
                                </div>
                                {/* .nk-block-head-content */}
                              </div>
                              {/* .nk-block-between */}
                            </div>
                            {/* .nk-block-head */}
                            <div className="nk-block">
                              {this.props.children}
                            </div>
                            {/* .nk-block */}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* content @e */}
                </div>
                {/* wrap @e */}
              </div>
              {/* main @e */}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
