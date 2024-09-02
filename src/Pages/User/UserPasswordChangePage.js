import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import MainLayout from "../../Components/Layouts/MainLayout";
import Constants from "../../Utils/Constants";
import Logo from "../../Logo";
import APICall from "../../Utils/APICall";
import SpinnerButton from "../../Utils/SpinnerButton";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";

export default class UserPasswordChangePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userName: '',
      hash: '',
      oldpassword: '',
    };
  }

  componentDidMount() {
    if(localStorage.getItem('reload')==="1"){
      localStorage.setItem('reload', "0");
      window.location=window.location;
    }
    this.getUser();
  }
  
  componentWillUnmount(){
    localStorage.setItem('reload', "1");
  }
  clearCart() {
    //add code to clear shopping cart
  }

  /*register() {
    this.setState({ redirectUrl: "/user/registration-success" });
  }*/

  getUser(){
    this.setState({ loading: true });

    UsersDataService.findByUserName(localStorage.getItem('username'))
      .then(response => {
        this.setState({ userName: response.data.userName });
        localStorage.setItem('id', response.data.id)
      })
      .catch(e => {
        console.log("error::: "+e);
        Toastr(
          "error",
          "There is problem changing the user's password"
        );
        this.setState({ loading: false });
      });
  }

  UpdateUser() {
    this.setState({ loading: true });
    let errormessage = "";
    if(this.refs.userName.value==""){
      errormessage = <div>{errormessage}<div>User Name can not be blank<br/></div></div>;
    }
    if(this.refs.oldpassword.value!="" || this.refs.password.value!=""){
      if(this.refs.oldpassword.value == ""){
        errormessage = <div>{errormessage}<div>Old Password must not be blank<br/></div></div>;
      }
      if(this.refs.password.value == ""){
        errormessage = <div>{errormessage}<div>New Password must not be blank<br/></div></div>;
      }
      if(this.refs.repeatpassword.value == ""){
        errormessage = <div>{errormessage}<div>Repeat New Password must not be blank<br/></div></div>;
      }
      if(this.refs.password.value != this.refs.repeatpassword.value){
        errormessage = <div>{errormessage}<div>New Password and Repeat Password don't match<br/></div></div>;
      }
    }
    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }
    
    var data = {
      id: localStorage.getItem('id'),
      userName: this.refs.userName.value,
      oldpassword: this.refs.oldpassword.value,
      hash: this.refs.password.value
    };
    let id = localStorage.getItem('id');
    UsersDataService.passwordChange(id, data)
      .then(response => {
        Toastr(
          "info",
          "User password change is successful...., check your email box for the new password!!!"
        );
        setTimeout(function(){ window.location.href = "/user/login"; }, 10000);
        //this.setState({ redirectUrl: "/user/dashboard" });
        //this.props.history.push('/');
        //localStorage.setItem('token', response.data.token);
        //this.setState({redirectUrl: "/account"});
      })
      .catch(error => {
        console.log("error::: "+error);
        Toastr(
          "error",
          "There is problem changing the user password, "+error.response.data.message
        );
        this.setState({ loading: false });
      });
      
  }

  render() {
    return this.state.redirectUrl ? (
      <Redirect to={this.state.redirectUrl} />
    ) : (
      <MainLayout
        role="user"
        title={'Edit ' + localStorage.getItem('username') + "'s Profile"}
      >
        <div className="">
          <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white w-lg-45">
            <div className="nk-block nk-block-middle nk-auth-body">
              <form>
                <div className="form-group">
                  <div className="form-control-wrap">
                    <input
                      type="text" disabled
                      className="form-control form-control-lg"
                      id="userName"
                      name="userName"
                      value={this.state.userName}
                      ref="userName"
                      placeholder="Enter user name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-control-wrap">
                  <input
                  type="password"
                  className="form-control form-control-lg"
                  id="oldpassword"
                  name="oldpassword"
                  ref="oldpassword"
                  placeholder="Enter your old password"
                /><br/>
                <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      name="password"
                      ref="password"
                      placeholder="Enter your new password"
                    /><br/>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="repeatpassword"
                      name="repeatpassword"
                      ref="repeatpassword"
                      placeholder="Repeat your new password"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    onClick={() => this.UpdateUser()}
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Update
                  </button>
                </div>
              </form>
              {/* form */}
            </div>
            {/* .nk-block */}
          </div>
        </div>
      </MainLayout>
    );
  }
}
