import { throttle } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


var numberOfCalls = 1;
var message;
var messageType;
const toastrOptions = {
  position: "top-right",
  autoClose: 50000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  bodyOutputType: 'trustedHtml',
  };
export default function (_messageType, _message) {
  message = _message;
  messageType = _messageType;
  throttledFunction();
}

var throttledFunction = throttle(() => showMessage(), 1000);

function showMessage() {
  numberOfCalls++;

  var backgroundColor = "#83B739"; //success

  if (messageType == "info") {
    backgroundColor = "#a461d8";
  } else if (messageType == "warning") {
    backgroundColor = "#ffc542";
  } else if (messageType == "error") {
    backgroundColor = "#fc5a5a";
  } else if (messageType == "success") {
    backgroundColor = "#83B739"
  }

  
  toast[messageType](message, toastrOptions);
  //toast[messageType](message);
  //console.log("messageType: "+messageType);
  //console.log("message: "+message);
  //console.log("toastrOptions: "+toastrOptions);
}
