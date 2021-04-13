import React, { Component } from "react";
import "../sass/contact-container.scss";

export default class SocialAndContact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
        <div className="contact-container pt-0">
        
        <div className="social-buttons pt-0">        
        {/* facebook  Button */}
        <a href="#" target="blank" className="social-margin"> 
            <div className="social-icon youtube">
              <i className="fa fa-instagram" aria-hidden="true" /> 
            </div>
          </a>
          {/* facebook  Button */}
          <a href="#" target="blank" className="social-margin"> 
            <div className="social-icon facebook">
              <i className="fa fa-facebook" aria-hidden="true" /> 
            </div>
          </a>
          {/* LinkedIn Button */}
          <a href="#" className="social-margin" target="blank">
            <div className="social-icon linkedin">
              <i className="fa fa-linkedin" aria-hidden="true" />
            </div> 
          </a>
          {/* TwitterButton */}
          <a href="#" target="blank" className="social-margin">
            <div className="social-icon twitter">
              <i className="fa fa-twitter" aria-hidden="true" />
            </div> 
          </a>
          <a href="https://wa.link/408a2t" target="blank" className="social-margin">
            <div className="social-icon soundcloud">
              <i className="fa fa-whatsapp" aria-hidden="true" />
            </div> 
          </a>
        </div>
      
        <div className="row margin-top-75px contact-address">
                            <div className="address-item col-lg-4 col-md-4 col-sm-12 col-xs-12 margin-bottom-50px text-left uk-scrollspy-inview uk-animation-slide-left-medium" style={{}}>
                                <span className="text-gray-regular uk-icon" data-uk-icon="icon: receiver; ratio: 1"><svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="receiver"><path fill="none" stroke="#000" strokeWidth="1.01" d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611" /></svg></span>
                                <p className="margin-top-25px text-large font-weight-bold text-muted">Call Us</p>
                                <a href="#" className="no-margin text-weight-400 text-gray-dark">+2348144879202, +2349071049057</a>
                            </div>

                            <div className="address-item col-lg-4 col-md-4 col-sm-12 col-xs-12 margin-bottom-50px text-left uk-scrollspy-inview uk-animation-slide-left-medium" style={{}}>
                                <span className="text-gray-regular uk-icon" data-uk-icon="icon: mail; ratio: 1"><svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="mail"><polyline fill="none" stroke="#000" points="1.4,6.5 10,11 18.6,6.5" /><path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z" /></svg></span>
                                <p className="margin-top-25px text-large font-weight-bold text-muted">Email Us</p>
                                <a href="mailto:info@tattcleaning.com" className="no-margin text-weight-400 text-gray-dark">info@tattcleaning.com</a>
                            </div>

                            <div className="address-item col-lg-4 col-md-4 col-sm-12 col-xs-12 text-left uk-scrollspy-inview uk-animation-slide-left-medium" style={{}}>
                                <span className="text-gray-regular uk-icon" data-uk-icon="icon: location; ratio: 1"><svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="location"><path fill="none" stroke="#000" strokeWidth="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z" /><circle fill="none" stroke="#000" cx={10} cy="6.8" r="2.3" /></svg></span>
                                <p className="margin-top-25px text-large font-weight-bold text-muted">Visit Us</p>
                                <a href="#" className="no-margin text-weight-400 text-gray-dark">No 5 Prince Adegbola Street, Greenland  Estate, Idowu Egba, Isheri</a>
                            </div>

                        </div>
                                              
      </div>
    );
  }
}
