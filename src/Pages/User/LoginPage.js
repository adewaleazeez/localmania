import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import PublicLayout from "../../Components/Layouts/PublicLayout";
import ShopDisplayItem from "../../Components/ShopDisplayItem";
import Constants from "../../Utils/Constants";
import SpinnerButton from "../../Utils/SpinnerButton";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <PublicLayout>
        <div className="login-register-area mb-60px mt-53px">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <div className="login-register-tab-list nav">
                    <a className="active">
                      <h4>login</h4>
                    </a>
                  </div>
                  <div className="tab-content">
                    <div id="lg1" className="tab-pane active">
                      <div className="login-form-container bg-white">
                        <div className="login-register-form">
                          <form method="post">
                            <input
                              type="text"
                              name="email"
                              placeholder="Email"
                            />
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                            />
                            <div className="button-box">
                              <div className="login-toggle-btn">
                                <input type="checkbox" />
                                <span className="flote-none">Remember me</span>
                                <Link to="#">Forgot Password?</Link>
                              </div>
                            </div>
                            <div className="text-center mt-3">
                              <SpinnerButton
                                className="btn btn-primary btn-block"
                                label="Login"
                                onClick={() => this.setState({ loading: true })}
                                loading={this.state.loading}
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }
}
