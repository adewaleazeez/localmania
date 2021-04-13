import React from "react";

export default function UserBioBrief({ user, children }) {

  return (
    <div className="d-flex">
    {/*begin: Pic*/}
    <div className="flex-shrink-0 mr-4 mt-lg-0 mt-3">
        <div className="symbol symbol-50 symbol-lg-120">
            <img alt="Pic" src={process.env.REACT_APP_API_BASEURL + '/api/loadimage/profilephoto/' + user.id.toString()}
            />
        </div>
        <div className="symbol symbol-50 symbol-lg-120 symbol-primary d-none">
            <span className="font-size-h3 symbol-label font-weight-boldest"></span>
        </div>
    </div>
    {/*end: Pic*/}
    {/*begin: Info*/}
    <div className="flex-grow-1">
        {/*begin: Title*/}
        <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="mr-3">
                {/*begin::Name*/}
                <a href="#" className="d-flex align-items-center text-dark text-hover-primary font-size-h5 font-weight-bold mr-3">
                    {user.name}
                </a>
                {/*end::Name*/}
                {/*begin::Contacts*/}
                <div className="d-flex flex-wrap my-2">
                    <a href="#" className="text-muted  mr-lg-5 mr-4 mb-lg-0 mb-2">
                        <span className="svg-icon svg-icon-md svg-icon-gray-500 mr-1">{/*begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo4/dist/assets/media/svg/icons/Communication/Mail-notification.svg*/}<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                <rect x={0} y={0} width={24} height={24} />
                                <path d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z" fill="#b5b5c3" />
                                <circle fill="#b5b5c3" opacity="0.3" cx="19.5" cy="17.5" r="2.5" />
                            </g>
                        </svg>{/*end::Svg Icon*/}</span>
                        {user.email}
                    </a>
                    <a href="#" className="text-muted text-hover-primary  mr-lg-5 mr-4 mb-lg-0 mb-2">
                        <span className="svg-icon svg-icon-md svg-icon-gray-500 mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                    <rect x={0} y={0} width={24} height={24} />
                                    <path d="M7.13888889,4 L7.13888889,19 L16.8611111,19 L16.8611111,4 L7.13888889,4 Z M7.83333333,1 L16.1666667,1 C17.5729473,1 18.25,1.98121694 18.25,3.5 L18.25,20.5 C18.25,22.0187831 17.5729473,23 16.1666667,23 L7.83333333,23 C6.42705272,23 5.75,22.0187831 5.75,20.5 L5.75,3.5 C5.75,1.98121694 6.42705272,1 7.83333333,1 Z" fill="#b5b5c3" fillRule="nonzero" />
                                    <polygon fill="#b5b5c3" opacity="0.3" points="7 4 7 19 17 19 17 4" />
                                    <circle fill="#b5b5c3" cx={12} cy={21} r={1} />
                                </g>
                            </svg>
                        </span>
                        {user.phoneNumber}
                    </a>

                </div>
                {/*end::Contacts*/}

                {
                    children
                }

            </div>

        </div>
        {/*end: Title*/}

    </div>
    {/*end: Info*/}
</div>
  )
}