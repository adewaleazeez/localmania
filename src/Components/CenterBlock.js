import React, { Component } from "react";

export default class CenterBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div style={{ minHeight: (this.props.height || "150") + "px" }}>
        <div
          className="v-center-flex"
          style={{
            height: (this.props.height || "150") + "px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
