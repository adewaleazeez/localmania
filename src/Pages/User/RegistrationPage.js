import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import PublicLayout from "../../Components/Layouts/PublicLayout";
import SpinnerButton from "../../Utils/SpinnerButton";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.saveUser = this.saveUser.bind(this);
    
    this.state = {
      id: null,
      emailAddress: "", 
      username: "",
      password: "",

      loading: false,
    };
  }

  componentDidMount() {}

  saveUser() {
    this.setState({ loading: true });
    var data = {
      id: this.refs.id.value,
      emailAddress: this.refs.emailAddress.value,
      username: this.refs.username.value,
      password: this.refs.password.value
      
    };

    UsersDataService.create(data)
      .then(response => {
        
        this.setState({
          loading: false,
          id: response.data.id,
          emailAddress: response.data.emailAddress,
          username: response.data.username,
        });
        this.props.history.push('/');
      })
      .catch(e => {
        //console.log(e);
        this.setState({ loading: false });
      });
      
  }

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
                              type="hidden"
                              name="id"
                              ref="id"
                            />
                            <input
                              type="text"
                              name="emailAddress"
                              ref="emailAddress"
                              placeholder="Email Address"
                            />
                            <input
                              type="text"
                              name="username"
                              ref="username"
                              placeholder="User Name"
                            />
                            <div className="row">
                              <div className="col">
                                <input
                                  type="password"
                                  name="password"
                                  ref="password"
                                  placeholder="Password"
                                />
                              </div>
                              <div className="col">
                                <input
                                  type="password"
                                  name="confpassword"
                                  ref="confpassword"
                                  placeholder="Confirm password"
                                />
                              </div>
                            </div>
                            
                            <div className="text-center mt-3">
                              <SpinnerButton
                                className="btn btn-primary btn-block"
                                label="Register"
                                onClick={this.saveUser}
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
