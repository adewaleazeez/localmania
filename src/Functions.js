import APICall from "./APICall";
import React from "react";
import Constants from "./Constants";

export default class Functions {
  static toReadableDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }

  static sqlDateString(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  static isPhoneValid(phoneNumber) {
    if (phoneNumber.startsWith("0")) {
      phoneNumber = phoneNumber.substr(1);
    }

    var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var digits = phoneNumber.replace(/\D/g, "");
    return phoneRe.test(digits);
  }

  static currencyFormat(amount) {
    return Number(parseFloat(amount).toFixed(2)).toLocaleString("en", {
      minimumFractionDigits: 2,
    });
  }

  static ratingStars(noOfstars) {
    var stars = [];
    if (noOfstars <= 0) noOfstars = 1;
    for (var i = 1; i <= noOfstars; i++) {
      stars.push(i);
    }
    return stars.map((star, index) => (
      <i key={index} className="mdi mdi-star text-warning"></i>
    ));
  }

  static getUserPhotoUrl(userId) {
    return (
      Constants.apiBaseUrl +
      "/api/loadimage/profilephoto/" +
      userId.toString() +
      "?v=" +
      Functions.randomString(10)
    );
  }

  static randomString(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  formatDate(dateStr) {
    var monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    var date = new Date(dateStr);

    var hour = date.getHours() - 1;
    var minutes = date.getMinutes();
    var meridiem = hour >= 12 ? "PM" : "AM";
    if (hour > 12) {
      hour = hour - 12;
    }

    return (
      date.getDate() +
      "-" +
      monthNames[date.getMonth()] +
      "-" +
      date.getFullYear() +
      " " +
      hour +
      ":" +
      minutes +
      " " +
      meridiem
    );
  }

  whoIsLoggedIn(callback, force) {
    if (global.loggedInUser && !force) {
      console.log(`exited with loggedinuser: `, global.loggedInUser);
      callback(global.loggedInUser, null);
    }

    APICall("api/users/profile", "GET", {})
      .then((data) => {
        var response = data.data;
        if (response.isSuccess) {
          global.loggedInUser = response.data;
          callback(response.data, null);
        } else {
          callback(
            null,
            "Your request generated an error. Refresh or try again after sometime"
          );
        }
      })
      .catch((error) => {
        callback(
          null,
          "Your request generated an error. Please check your connection"
        );
      });
  }

  static modalDefaultStyle() {
    return {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
  }

  static iconsBroom() {
    return (
      <div className="kt-iconbox__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
          className="kt-svg-icon"
        >
          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <rect x={0} y={0} width={24} height={24} />
            <path
              d="M10.5278225,22.5278225 L8.79765312,20.7976531 L9.99546268,18.4463973 L7.35584531,19.3558453 L5.04895282,17.0489528 L8.15438502,11.6366281 L2.74206034,14.7420603 L1.30025253,13.3002525 L9.26548692,8.03126375 C11.3411817,6.65819522 14.1285885,7.15099488 15.6076701,9.15253022 C17.1660799,11.2614147 17.1219524,14.1519817 15.4998952,16.212313 L10.5278225,22.5278225 Z"
              fill="#000000"
              opacity="0.3"
            />
            <path
              d="M22.4246212,4.91054166 L18.4071175,8.92804534 C17.6260689,9.70909393 16.359739,9.70909393 15.5786904,8.92804534 C14.7976418,8.14699676 14.7976418,6.8806668 15.5786904,6.09961822 L19.6029298,2.0753788 C19.7817428,2.41498256 19.9878937,2.74436937 20.2214305,3.06039796 C20.8190224,3.86907629 21.5791361,4.49033747 22.4246212,4.91054166 Z"
              fill="#000000"
              transform="translate(18.708763, 5.794605) rotate(-180.000000) translate(-18.708763, -5.794605) "
            />
          </g>
        </svg>
      </div>
    );
  }

  static iconsUsers() {
    return (
      <div className="kt-iconbox__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
          className="kt-svg-icon"
        >
          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <path
              d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
              fill="#000000"
              fillRule="nonzero"
              opacity="0.3"
            />
            <path
              d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
              fill="#000000"
              fillRule="nonzero"
            />
          </g>
        </svg>
      </div>
    );
  }

  static iconsSingleUser() {
    return (
      <div className="kt-iconbox__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
          className="kt-svg-icon"
        >
          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <path
              d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
              fill="#000000"
              fillRule="nonzero"
              opacity="0.3"
            />
            <path
              d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
              fill="#000000"
              fillRule="nonzero"
            />
          </g>
        </svg>{" "}
      </div>
    );
  }

  static iconsStar() {
    return (
      <div className="kt-iconbox__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
          className="kt-svg-icon"
        >
          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <rect x={0} y={0} width={24} height={24} />
            <path
              style={{ fill: "#FEC22E" }}
              d="M19.5,10.5 L21,10.5 C21.8284271,10.5 22.5,11.1715729 22.5,12 C22.5,12.8284271 21.8284271,13.5 21,13.5 L19.5,13.5 C18.6715729,13.5 18,12.8284271 18,12 C18,11.1715729 18.6715729,10.5 19.5,10.5 Z M16.0606602,5.87132034 L17.1213203,4.81066017 C17.7071068,4.22487373 18.6568542,4.22487373 19.2426407,4.81066017 C19.8284271,5.39644661 19.8284271,6.34619408 19.2426407,6.93198052 L18.1819805,7.99264069 C17.5961941,8.57842712 16.6464466,8.57842712 16.0606602,7.99264069 C15.4748737,7.40685425 15.4748737,6.45710678 16.0606602,5.87132034 Z M16.0606602,18.1819805 C15.4748737,17.5961941 15.4748737,16.6464466 16.0606602,16.0606602 C16.6464466,15.4748737 17.5961941,15.4748737 18.1819805,16.0606602 L19.2426407,17.1213203 C19.8284271,17.7071068 19.8284271,18.6568542 19.2426407,19.2426407 C18.6568542,19.8284271 17.7071068,19.8284271 17.1213203,19.2426407 L16.0606602,18.1819805 Z M3,10.5 L4.5,10.5 C5.32842712,10.5 6,11.1715729 6,12 C6,12.8284271 5.32842712,13.5 4.5,13.5 L3,13.5 C2.17157288,13.5 1.5,12.8284271 1.5,12 C1.5,11.1715729 2.17157288,10.5 3,10.5 Z M12,1.5 C12.8284271,1.5 13.5,2.17157288 13.5,3 L13.5,4.5 C13.5,5.32842712 12.8284271,6 12,6 C11.1715729,6 10.5,5.32842712 10.5,4.5 L10.5,3 C10.5,2.17157288 11.1715729,1.5 12,1.5 Z M12,18 C12.8284271,18 13.5,18.6715729 13.5,19.5 L13.5,21 C13.5,21.8284271 12.8284271,22.5 12,22.5 C11.1715729,22.5 10.5,21.8284271 10.5,21 L10.5,19.5 C10.5,18.6715729 11.1715729,18 12,18 Z M4.81066017,4.81066017 C5.39644661,4.22487373 6.34619408,4.22487373 6.93198052,4.81066017 L7.99264069,5.87132034 C8.57842712,6.45710678 8.57842712,7.40685425 7.99264069,7.99264069 C7.40685425,8.57842712 6.45710678,8.57842712 5.87132034,7.99264069 L4.81066017,6.93198052 C4.22487373,6.34619408 4.22487373,5.39644661 4.81066017,4.81066017 Z M4.81066017,19.2426407 C4.22487373,18.6568542 4.22487373,17.7071068 4.81066017,17.1213203 L5.87132034,16.0606602 C6.45710678,15.4748737 7.40685425,15.4748737 7.99264069,16.0606602 C8.57842712,16.6464466 8.57842712,17.5961941 7.99264069,18.1819805 L6.93198052,19.2426407 C6.34619408,19.8284271 5.39644661,19.8284271 4.81066017,19.2426407 Z"
              fill="#000000"
              fillRule="nonzero"
              opacity="0.3"
            />
          </g>
        </svg>
      </div>
    );
  }

  static iconsCheckMark() {
    return (
      <div className="kt-iconbox__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
          className="kt-svg-icon"
        >
          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <path
              style={{ fill: "#92d275" }}
              d="M9.26193932,16.6476484 C8.90425297,17.0684559 8.27315905,17.1196257 7.85235158,16.7619393 C7.43154411,16.404253 7.38037434,15.773159 7.73806068,15.3523516 L16.2380607,5.35235158 C16.6013618,4.92493855 17.2451015,4.87991302 17.6643638,5.25259068 L22.1643638,9.25259068 C22.5771466,9.6195087 22.6143273,10.2515811 22.2474093,10.6643638 C21.8804913,11.0771466 21.2484189,11.1143273 20.8356362,10.7474093 L17.0997854,7.42665306 L9.26193932,16.6476484 Z"
              fill="#000000"
              fillRule="nonzero"
              opacity="0.3"
              transform="translate(14.999995, 11.000002) rotate(-180.000000) translate(-14.999995, -11.000002) "
            />
            <path
              style={{ fill: "#92d275" }}
              d="M4.26193932,17.6476484 C3.90425297,18.0684559 3.27315905,18.1196257 2.85235158,17.7619393 C2.43154411,17.404253 2.38037434,16.773159 2.73806068,16.3523516 L11.2380607,6.35235158 C11.6013618,5.92493855 12.2451015,5.87991302 12.6643638,6.25259068 L17.1643638,10.2525907 C17.5771466,10.6195087 17.6143273,11.2515811 17.2474093,11.6643638 C16.8804913,12.0771466 16.2484189,12.1143273 15.8356362,11.7474093 L12.0997854,8.42665306 L4.26193932,17.6476484 Z"
              fill="#000000"
              fillRule="nonzero"
              transform="translate(9.999995, 12.000002) rotate(-180.000000) translate(-9.999995, -12.000002) "
            />
          </g>
        </svg>
      </div>
    );
  }

  static iconsCancel() {
    return (
      <div className="kt-iconbox__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
          className="kt-svg-icon"
        >
          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <g
              style={{ fill: "#ff5a60" }}
              transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
              fill="#000000"
            >
              <rect x={0} y={7} width={16} height={2} rx={1} />
              <rect
                opacity="0.3"
                transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) "
                x={0}
                y={7}
                width={16}
                height={2}
                rx={1}
              />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  static iconsStarRating() {
    return (
      <div className="kt-iconbox__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <path
              d="M12,18 L7.91561963,20.1472858 C7.42677504,20.4042866 6.82214789,20.2163401 6.56514708,19.7274955 C6.46280801,19.5328351 6.42749334,19.309867 6.46467018,19.0931094 L7.24471742,14.545085 L3.94038429,11.3241562 C3.54490071,10.938655 3.5368084,10.3055417 3.92230962,9.91005817 C4.07581822,9.75257453 4.27696063,9.65008735 4.49459766,9.61846284 L9.06107374,8.95491503 L11.1032639,4.81698575 C11.3476862,4.32173209 11.9473121,4.11839309 12.4425657,4.36281539 C12.6397783,4.46014562 12.7994058,4.61977315 12.8967361,4.81698575 L14.9389263,8.95491503 L19.5054023,9.61846284 C20.0519472,9.69788046 20.4306287,10.2053233 20.351211,10.7518682 C20.3195865,10.9695052 20.2170993,11.1706476 20.0596157,11.3241562 L16.7552826,14.545085 L17.5353298,19.0931094 C17.6286908,19.6374458 17.263103,20.1544017 16.7187666,20.2477627 C16.5020089,20.2849396 16.2790408,20.2496249 16.0843804,20.1472858 L12,18 Z"
              fill="#FEC22E"
            />
          </g>
        </svg>
      </div>
    );
  }

  static iconsWallet() {
    return (
      <div className="kt-iconbox__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <rect x={0} y={0} width={24} height={24} />
            <circle fill="#01A3EB" opacity="0.3" cx="20.5" cy="12.5" r="1.5" />
            <rect
              fill="#01A3EB"
              opacity="0.3"
              transform="translate(12.000000, 6.500000) rotate(-15.000000) translate(-12.000000, -6.500000) "
              x={3}
              y={3}
              width={18}
              height={7}
              rx={1}
            />
            <path
              d="M22,9.33681558 C21.5453723,9.12084552 21.0367986,9 20.5,9 C18.5670034,9 17,10.5670034 17,12.5 C17,14.4329966 18.5670034,16 20.5,16 C21.0367986,16 21.5453723,15.8791545 22,15.6631844 L22,18 C22,19.1045695 21.1045695,20 20,20 L4,20 C2.8954305,20 2,19.1045695 2,18 L2,6 C2,4.8954305 2.8954305,4 4,4 L20,4 C21.1045695,4 22,4.8954305 22,6 L22,9.33681558 Z"
              fill="#01A3EB"
            />
          </g>
        </svg>
      </div>
    );
  }

  static iconsClock() {
    return (
      <div className="kt-iconbox__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
          className="kt-svg-icon"
        >
          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <rect x={0} y={0} width={24} height={24} />
            <path
              d="M12,22 C7.02943725,22 3,17.9705627 3,13 C3,8.02943725 7.02943725,4 12,4 C16.9705627,4 21,8.02943725 21,13 C21,17.9705627 16.9705627,22 12,22 Z"
              fill="#000000"
              opacity="0.3"
            />
            <path
              d="M11.9630156,7.5 L12.0475062,7.5 C12.3043819,7.5 12.5194647,7.69464724 12.5450248,7.95024814 L13,12.5 L16.2480695,14.3560397 C16.403857,14.4450611 16.5,14.6107328 16.5,14.7901613 L16.5,15 C16.5,15.2109164 16.3290185,15.3818979 16.1181021,15.3818979 C16.0841582,15.3818979 16.0503659,15.3773725 16.0176181,15.3684413 L11.3986612,14.1087258 C11.1672824,14.0456225 11.0132986,13.8271186 11.0316926,13.5879956 L11.4644883,7.96165175 C11.4845267,7.70115317 11.7017474,7.5 11.9630156,7.5 Z"
              fill="#000000"
            />
          </g>
        </svg>
      </div>
    );
  }
}
