import axios from "axios";
import Toastr from "./Toastr";
import Constants from "./Constants";

export default function (Url, Method, Data = null, timeoutOverride) {
  if(!Url.includes("users/authenticate") && !Url.includes("users/register")){
    if (localStorage.getItem("token")) {
      var authToken = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }
  }
  
  axios.defaults.withCredentials = true;
  axios.interceptors.response.use(
    (response) => {
      if (response.data && response.data.redirectUrl) {
        if (response.data.redirectUrl.toLowerCase().startsWith("http")) {
          // console.log("response.data.redirectUrl::: ",response.data.redirectUrl);
          window.location.href = response.data.redirectUrl;
        } else {
          // console.log("Constants.subfolder + response.data.redirectUrl::: ",Constants.subfolder + response.data.redirectUrl);
          window.location.href = Constants.subfolder + response.data.redirectUrl;
        }
      }
      // console.log("response::: ",response);
      return response;
    },
    (error) => {
      if (error.response && error.response.status == "401") {
        window.location.href = Constants.subfolder + "/logout";
      } 
      // else {
        // console.log("error::: ",error);
        //return Promise.reject(error);
        // console.log("error.message::: ",error.message);
        // console.log("error.response::: ",error.response);
        //console.log("error.response.data::: ",error.response.data);
        //console.log("error.response.data.message::: ",error.response.data.message);
      //    Toastr(
      //     "error",
      //     "Your request generated an error. Please check your network connection "+error.message
      //   );
        
      // }
      return error //.response.data.message;
    }
  );

  var baseUrl = Constants.apiBaseUrl;
  if (!baseUrl.endsWith("/")) {
    baseUrl = baseUrl + "/";
  }

  if (Url.startsWith("/")) {
    Url = Url.substring(1);
  }

  console.log("api data "+JSON.stringify(Data)+"      Url: "+baseUrl + Url+"       Method: "+Method);
   
  var Response = axios({
    method: Method,
    url: baseUrl + Url,
    data: Data,
    timeout: timeoutOverride || process.env.REACT_APP_REQUEST_TIMEOUT,
  });
   console.log("Response:::",Response)    
  return Response;
}
