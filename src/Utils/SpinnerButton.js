import React, { Component } from "react";
import Spinner from "./Spinner";

export default class SpinnerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  doAction() {
    console.log("do action called");
    this.props.onClick();
  }

  render() {
    return this.props.loading ? (
      <button type="button" className="btn btn-gradient-dark btn-icon-text">
        <Spinner size="1" />
      </button>
    ) : (
      <button
        type="button"
        className={this.props.className}
        onClick={() => this.doAction()}
      >
        {this.props.label}
      </button>
    );
  }
}
