import { throttle } from "lodash";
var numberOfCalls = 1;
var message;
var messageType;
export default function (_messageType, _message) {
  message = _message;
  messageType = _messageType;
  throttledFunction();
}

var throttledFunction = throttle(() => showMessage(), 1000);

function showMessage() {
  //console.log(numberOfCalls);
  numberOfCalls++;

  var backgroundColor = "#83B739"; //success

  if (messageType == "info") {
    backgroundColor = "#a461d8";
  } else if (messageType == "warning") {
    backgroundColor = "#ffc542";
  } else if (messageType == "error") {
    backgroundColor = "#fc5a5a";
  }
  eval(`$.toast({
    heading: '',
    text: '${message}',
    showHideTransition: 'slide',
    icon: '${messageType}',
    loaderBg: '${backgroundColor}',
    position: 'top-right'
  })`);
}
