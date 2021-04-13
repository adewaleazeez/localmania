import axios from "axios";
import Toastr from "./Toastr";
import Constants from "./Constants";

export default function (Url, Method, Data = null, timeoutOverride) {
  if (localStorage.getItem("token")) {
    var authToken = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  }

  axios.defaults.withCredentials = true;
  axios.interceptors.response.use(
    (response) => {
      console.log(response);
      if (response.data && response.data.redirectUrl) {
        //if (response.data.redirectUrl.toLowerCase().startsWith("http")) {
        //window.location.href = response.data.redirectUrl;
        //} else {
        //window.location.href =
        //Constants.subfolder + response.data.redirectUrl;
        //}
      }
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response && error.response.status == "401") {
        window.location.href = Constants.subfolder + "/logout";
      } else {
        Toastr(
          "error",
          "Your request generated an error. Please check your network connection"
        );
      }
      return Promise.reject(error);
    }
  );

  var baseUrl = Constants.apiBaseUrl;
  if (!baseUrl.endsWith("/")) {
    baseUrl = baseUrl + "/";
  }

  if (Url.startsWith("/")) {
    Url = Url.substring(1);
  }

  console.log("api baseurl: " + baseUrl);

  var Response = axios({
    method: Method,
    url: baseUrl + Url,
    data: Data,
    timeout: timeoutOverride || process.env.REACT_APP_REQUEST_TIMEOUT,
  });

  return Response;
}
