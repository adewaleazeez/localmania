import axios from "axios";
const apiCall = require('./Utils/APICall');

export default axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
});