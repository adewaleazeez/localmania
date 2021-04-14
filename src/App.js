import React, { Component } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import dotenv from "dotenv";
import axios from "axios";
import Constants from "./Utils/Constants";
import { appRoutes } from "./Utils/Routes";

dotenv.config();

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={Constants.subfolder}>
        <Switch>
          {appRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.route}
              exact
              component={route.component}
            />
          ))}
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
