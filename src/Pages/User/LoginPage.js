import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import PublicLayout from "../../Components/Layouts/PublicLayout";
import ShopDisplayItem from "../../Components/ShopDisplayItem";
import APICall from "../../Utils/APICall";
import Constants from "../../Utils/Constants";
import SpinnerButton from "../../Utils/SpinnerButton";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      redirectUrl: null
    };
  }

  componentDidMount() {}

  callLoginEndpoint() {
    this.setState({ loading: true });
    var data = {
      username: this.refs.username.value,
      password: this.refs.password.value
    };
    
    UsersDataService.findByUserNamePassword(data.username, data.password)
      .then(response => {
        
        this.props.history.push('/');
        localStorage.setItem('token', response.data.token);
        //this.setState({redirectUrl: "/account"});
      })
      .catch(e => {
        //console.log(e);
        this.setState({ loading: false });
      });
      
  }
  /*callLoginEndpoint(){
    this.setState({loading: true});

    APICall("/login", "POST", this.state.payload)
    .then(response=>{
      localStorage.setItem('token', response.data.token);
      this.setState({redirectUrl: "/account"});
    }).catch(error=>{
      this.setState({loading: false});
    })
  }*/

  render() {
    return (
      this.state.redirectUrl?<Redirect to={this.state.redirectUrl} />:
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
                              name="username"
                              ref="username"
                              placeholder="Email or User Name"
                            />
                            <input
                              type="password"
                              name="password"
                              ref="password"
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
                                onClick={() => this.callLoginEndpoint()}
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
