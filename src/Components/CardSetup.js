import React, { Component } from "react";
import CardBlock from "./CardBlock";
import Tabs from "../Utils/Tabs";
import CenterBlock from "./CenterBlock";
import { Link } from "react-router-dom";
import Constants from "../Utils/Constants";
import APICall from "../Utils/APICall";
import Spinner from "../Utils/Spinner";
import SpinnerButton from "../Utils/SpinnerButton";
import Toastr from "../Utils/Toastr";
import CreditCard from "./CreditCard";
import Functions from "../Utils/Functions";
//import "../../sass/kanban.scss";
import Modal from "react-modal";

export default class CardSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      cardSetupLoading: false,
      errorMessage: null,
      autoRenewLoading: false,
      user: {},
      modalIsOpen: false,
    };
  }

  componentDidMount() {
    this.loadData();
    new Functions().whoIsLoggedIn((data, error) => {
      this.setState({ user: data });
    });
  }

  loadData(silent) {
    this.setState({ errorMessage: null, loading: silent ? false : true });
    let endpoint = "api/cards/get";
    if (this.props.userId) {
      endpoint += `/${this.props.userId}`;
    }
    APICall(endpoint, "GET", null)
      .then((data) => {
        var response = data.data;
        if (response.isSuccess) {
          this.setState({ data: response.data, loading: false });
        } else {
          this.setState({
            errorMessage: response.message,
            loading: false,
            data: {},
          });
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: "An error occurred, please check your network",
          loading: false,
        });
      });
  }

  addCard() {
    this.setState({ cardSetupLoading: true });
    APICall(`api/cards/addcard`, "POST", null)
      .then((data) => {
        var response = data.data;
        if (response.isSuccess) {
          window.location.href = response.redirectUrl;
        } else {
          Toastr("error", response.message);
          this.setState({ cardSetupLoading: false });
        }
      })
      .catch((error) => {
        Toastr("error", "An error occurred, please check your network.");
        this.setState({ cardSetupLoading: false });
      });
  }

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel=""
          style={Constants.defaultModalStyle}
          onRequestClose={() => this.setState({ modalIsOpen: false })}
        >
          <div className="mymodal-wrapper">
            <h5>Confirm card change</h5>
            <hr style={{ clear: "both", visibility: "hidden" }} />
            <form className="forms-sample">
              <p className="mb-5 mt-4 text-center">
                Are you sure you want to change this card?
              </p>

              <button
                className="btn btn-inverse-light text-danger btn-rounded btn-fw"
                onClick={() => this.setState({ modalIsOpen: false })}
              >
                No, cancel
              </button>
              <SpinnerButton
                onClick={() => this.addCard()}
                className="btn btn-inverse-light btn-rounded mr-2 theme-color float-right btn-fw"
                label="Yes, continue"
                loading={this.state.cardSetupLoading}
              />
            </form>
          </div>
        </Modal>
        {this.state.errorMessage ? (
          <CenterBlock height="150">
            <h1 className="text-danger icon-lg">
              <i className="mdi mdi-alert-circle"></i>
            </h1>
            <div className="text-dark text-center" role="alert">
              An error occurred. <br />
              Try again after sometime.{" "}
            </div>
            <button
              type="button"
              onClick={() => this.loadData()}
              className="btn btn-inverse-success btn-fw mt-4 mb-5 btn-rounded"
            >
              Reload
            </button>
          </CenterBlock>
        ) : !this.state.data || this.state.data.isExpired ? (
          <div className="text-center">
            <div style={{ border: "0", background: "none" }} className="alert">
              {this.props.userId == 0 ? (
                <>
                  <img
                    src={Constants.creditCardIcon}
                    style={{ height: "50px", display: "inline-block" }}
                    className="mb-4 mt-4"
                  />
                  <br />
                  {this.state.data?.isExpired
                    ? "The card you added has expired."
                    : "You do not have any debit or credit card on file."}{" "}
                  <br />A valid debit/credit card is required before you can be
                  issued certificates <br />
                  for your purchases at the abattoir.
                </>
              ) : (
                <>User does not have any debit or credit card setup</>
              )}{" "}
            </div>
            {this.props.userId == 0 ? (
              <SpinnerButton
                loading={this.state.cardSetupLoading}
                className="btn-lg mt-3 mb-5 btn btn-success btn-fw btn-rounded"
                label={`+ Add my card`}
                onClick={() => this.addCard()}
              />
            ) : null}
          </div>
        ) : this.state.data ? (
          <>
            <div>
              <p className="mb-0">
                We have your card on file. For ease, this card will be
                automatically <br />
                charged for meat purchase certificate fees.
              </p>

              <CreditCard
                last4={this.state.data.last4}
                expiry={`${this.state.data.expiryMonth}/${this.state.data.expiryYear}`}
                name={this.state.user.name}
                style={{ float: "left", left: "0px" }}
              />
              <br style={{ clear: "both" }} />
              <button
                className="btn btn-md btn-link"
                onClick={() => this.setState({ modalIsOpen: true })}
              >
                Change Card
              </button>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}
