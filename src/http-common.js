import axios from "axios";
import Constants from "./Utils/Constants";

const apiCall = require('./Utils/APICall');

export default axios.create({
  baseURL: Constants.apiBaseUrl,
  headers: {
    "Content-type": "application/json"
  }
});