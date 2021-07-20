import axios from "axios";
const apiCall = require('./Utils/ApiCall');

export default axios.create({
  baseURL: "http://localhost:9090/api",
  headers: {
    "Content-type": "application/json"
  }
});