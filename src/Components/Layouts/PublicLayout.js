import React, { Component } from "react";
import Constants from "../../Utils/Constants";
import PublicLayoutHeader from "./PublicLayoutHeader";
import "../../sass/public-layout.scss";
import PublicLayoutFooter from "./PublicLayoutFooter";
import CenterBlock from "../CenterBlock";
import Spinner from "../../Utils/Spinner";
import { ToastContainer } from "react-toastify";

//The public layout is for interfaces like shoping, login, checkout etc
//where the user has not logged into the system yet.
//For interfaces where the user has logged in, please use MainLayout

export default class PublicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: true,
      redirect: null,
      mobileMenuIsOpen: false,
    };
  }

  jsScripts = [
    "/assets/js/jquery-front.js",
    "/assets/js/modernizr-front.js",
    "/assets/js/plugins-front.js",
  ];

  stylesheets = [
    "/assets/layout-css/public/plugins.min.css",
    "/assets/layout-css/public/style-front.min.css",
    "/assets/layout-css/public/responsive-front.min.css",
  ];

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
          <div id="main" className="public-layout-container">
            <ToastContainer/>
            <PublicLayoutHeader />
            {this.props.children}
            <PublicLayoutFooter />
          </div>
        )}
      </React.Fragment>
    );
  }
}
