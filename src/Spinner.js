import React, { Component } from "react";

export default class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "2",
      color: null
    };
  }

  componentDidMount() {
    if (this.props) {
      if (this.props.size) {
        this.setState({ size: this.props.size });
      }
      if (this.props.color) {
        this.setState({ color: this.props.color });
      }
    }
  }

  render() {
    return (
      <div
        className="spinner-border theme-color"
        role="status"
        style={{
          width: this.state.size + "rem",
          height: this.state.size + "rem",
          margin: "0 auto",
          color: this.state.color ? this.state.color : ""
        }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
}
