import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import PublicLayout from "../../Components/Layouts/PublicLayout";
import SpinnerButton from "../../Utils/SpinnerButton";

export default class RegistrationPage extends Component {
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
                      <h4>Register</h4>
                    </a>
                  </div>
                  <div className="tab-content">
                    <div id="lg1" className="tab-pane active">
                      <div className="login-form-container bg-white">
                        <div className="login-register-form">
                          <form method="post">
                            <input
                              type="text"
                              name="name"
                              placeholder="Your Name"
                            />
                            <input
                              type="text"
                              name="email"
                              placeholder="Email Address"
                            />
                            <div className="row">
                              <div className="col">
                                <input
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                />
                              </div>
                              <div className="col">
                                <input
                                  type="password"
                                  name="password"
                                  placeholder="Confirm password"
                                />
                              </div>
                            </div>

                            <div className="text-center mt-3">
                              <SpinnerButton
                                className="btn btn-primary btn-block"
                                label="Register"
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
