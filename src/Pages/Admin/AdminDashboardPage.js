import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import MainLayout from "../../Components/Layouts/MainLayout";
import Constants from "../../Utils/Constants";

export default class AdminDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
      if(localStorage.getItem('reload')==="1"){
      localStorage.setItem('reload', "0");
      window.location=window.location;
    }
    
    
  }

  componentWillUnmount(){
    localStorage.setItem('reload', "1");
  }
  
  clearCart() {
    //add code to clear shopping cart
  }

  render() {
    return (localStorage.getItem('username')!=="Administrator") ? (
      <Redirect to={"/user/login"} />
    ) : (
      <MainLayout
        role="admin"
        title= {'Hello ' + localStorage.getItem('username')}
        subtitle="Here's how your sellers have been performing"
      >
        <div className="row g-gs">
          <div className="col-xxl-6">
            <div className="row g-gs">
              <div className="col-lg-6 col-xxl-12">
                <div className="card card-bordered">
                  <div className="card-inner">
                    <div className="card-title-group align-start mb-2">
                      <div className="card-title">
                        <h6 className="title">Sales Revenue</h6>
                        <p>In last 30 days .</p>
                      </div>
                    </div>
                    <div className="align-end gy-3 gx-5 flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap">
                      <div className="nk-sale-data-group flex-md-nowrap g-4">
                        <div className="nk-sale-data">
                          <span className="amount">14,299.59 </span>
                          <span className="sub-title">This Month</span>
                        </div>
                        <div className="nk-sale-data">
                          <span className="amount">7,299.59 </span>
                          <span className="sub-title">This Week</span>
                        </div>
                      </div>
                      <div className="nk-sales-ck sales-revenue">
                        <canvas className="sales-bar-chart" id="salesRevenue" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* .col */}
              <div className="col-lg-6 col-xxl-12">
                <div className="row g-gs">
                  <div className="col-sm-6 col-lg-12 col-xxl-6">
                    <div className="card card-bordered">
                      <div className="card-inner">
                        <div className="card-title-group align-start mb-2">
                          <div className="card-title">
                            <h6 className="title">Pending Orders</h6>
                          </div>
                        </div>
                        <div className="align-end flex-sm-wrap g-4 flex-md-nowrap">
                          <div className="nk-sale-data">
                            <span className="amount">9.69K</span>
                            <span className="sub-title">
                              <em className="icon ni ni-info-i mr-1"></em>
                              <span className="change down text-danger">
                                10
                              </span>
                              transactions
                            </span>
                          </div>
                          <div className="nk-sales-ck">
                            <canvas
                              className="sales-bar-chart"
                              id="activeSubscription"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* .card */}
                  </div>
                  {/* .col */}
                  <div className="col-sm-6 col-lg-12 col-xxl-6">
                    <div className="card card-bordered">
                      <div className="card-inner">
                        <div className="card-title-group align-start mb-2">
                          <div className="card-title">
                            <h6 className="title">Fulfilled Orders</h6>
                          </div>
                          <div className="card-tools">
                            <em
                              className="card-hint icon ni ni-help-fill"
                              data-toggle="tooltip"
                              data-placement="left"
                              title="Daily Avg. subscription"
                            />
                          </div>
                        </div>
                        <div className="align-end flex-sm-wrap g-4 flex-md-nowrap">
                          <div className="nk-sale-data">
                            <span className="amount">346</span>
                            <span className="sub-title">this week</span>
                          </div>
                          <div className="nk-sales-ck">
                            <canvas
                              className="sales-bar-chart"
                              id="totalSubscription"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* .card */}
                  </div>
                  {/* .col */}
                </div>
                {/* .row */}
              </div>
              {/* .col */}
            </div>
            {/* .row */}
          </div>
          {/* .col */}
        </div>
      </MainLayout>
    );
  }
}
