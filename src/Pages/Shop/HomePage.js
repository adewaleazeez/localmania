import React, { Component } from "react";
import PublicLayout from "../../Components/Layouts/PublicLayout";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {}

  render() {
    return <PublicLayout />;
  }
}
