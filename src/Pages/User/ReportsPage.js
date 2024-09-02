import React, { Component } from "react";
import PDFAuditVoucherDocument from "./PDFAuditVoucherDocument";
import MainLayout from "../../Components/Layouts/MainLayout";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import cookie from 'react-cookies';
import { Redirect } from "react-router-dom";

export default class QueryFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modalOpen: false,
      pdfDocOpen: false,
      reportHeading: "",
      startDate: "",
      endDate: "",
      list: [],
      pdfContent: [],
      voucherTypesOptions: [],
      selectedVoucherType: 0,
    }
    this.callUpdateCheckBox = this.callUpdateCheckBox.bind(this);
  };
     
  componentWillMount(){
    if(localStorage.getItem('unitid') != 10 && localStorage.getItem('unitid') != 40){
      alert("Access Denid!!!\nOnly Reports and Admin Units are allowed access to Reports menu");
      this.setState({ redirectUrl: "/user/dashboard" });
    }
  }

  componentDidMount() {
    this.getVoucherTypes();
    this.setState({startDate: (cookie.load('startDate') != undefined) ? cookie.load('startDate') : ""})
    this.setState({endDate: (cookie.load('endDate') != undefined) ? cookie.load('endDate') : ""})
    this.setState({reportHeading: (cookie.load('reportHeading') != undefined) ? cookie.load('reportHeading') : ""})
  }

  callUpdateCheckBox = (e, id, voucherName) => {
    let isChecked = e.target.checked;
    let items = this.state.list;
    items.map(item => {
      if(id == item.id){
        item.status = (isChecked) ? true : false;
      }
    })
  }

  getVoucherTypes = async() => {
    await UsersDataService.getVoucherTypes()
    .then(res => {
      const data = res.data;
      this.setState({list: data});
    })
    .catch(e => {
      this.setState({ loading: false });
    });
  };
  
  viewPDFReport = async() => {
    this.setState({ loading: true });
    let lst = ""
    let voucherTypes = this.state.list
    voucherTypes.map((token) => {
      lst += (token.status != undefined && token.status == true) ? ((lst != "") ? ", " + token.id : token.id): ""
    })

    let errormessage = "";
    if(this.refs.startDate.value==""){
      errormessage = <div>{errormessage}<div>Start Date can not be blank<br/></div></div>;
    }
    if(this.refs.endDate.value==""){
      errormessage = <div>{errormessage}<div>End Date can not be blank<br/></div></div>;
    }
    if(this.refs.reportHeading.value==""){
      errormessage = <div>{errormessage}<div>Report Heading can not be blank<br/></div></div>;
    }
    if(lst == ""){
      errormessage = <div>{errormessage}<div>Voucher Types List can not be blank<br/></div></div>;
    }
    
    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }
    
    const expires = new Date()
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
    //cookie.save('startDate', this.refs.startDate.value, { path: '/', expires })
    //cookie.save('endDate', this.refs.endDate.value, { path: '/', expires })
    cookie.save('reportHeading', this.refs.reportHeading.value, { path: '/', expires })
    var data = {
      startDate: this.refs.startDate.value,
      endDate: this.refs.endDate.value,
      reportHeading: this.refs.reportHeading.value,
      voucherTypes: lst
    };
    
    await UsersDataService.getVoucherAuditByDate(data)
    .then(res => {
      const list = res.data;
      this.setState({ pdfContent: list }); 
      this.setState({ pdfDocOpen: true });
    })
    .catch(e => {
      this.setState({ loading: false });
    });
  }

  render() {
     let items = this.state.list;
      let voucherTypes = items.map(item => {
      return (
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-voucherAuditCriterianame">{item.voucherName}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-beneficiary">
              <input 
                type="checkbox" 
                id="statusEdit"
                name="statusEdit"
                ref="statusEdit"
                checked = {item.status}
                onChange={e =>this.callUpdateCheckBox(e, item.id, item.voucherName)}
              />
            </span>
          </div>
        </div>
        
      )
    })

    return this.state.redirectUrl ? (
      <Redirect to={this.state.redirectUrl} />
    ) : (
      <MainLayout
        role="user"
        title="Audit Voucher Reports"
      >
      <div className="card card-bordered" style={{width: "50%"}}>
        <div className="card-inner-group">
          <div className="card-inner p-0">
            <div className="nk-tb-list">
              <div className="nk-tb-item">
                  <div className="nk-tb-col tb-col-md" style={{width: "20%"}}>
                    <label className="form-label">Start Date:</label>
                  </div>
                  <div className="nk-tb-col tb-col-md" style={{width: "30%"}}>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      ref="startDate"
                      className="form-control"
                      defaultValue={this.state.startDate}
                      required
                    />
                  </div>
                </div>
                <div className="nk-tb-item">
                  <div className="nk-tb-col tb-col-md">
                    <label className="form-label">End Date:</label>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      ref="endDate"
                      className="form-control"
                      defaultValue={this.state.endDate}
                      required
                    />
                  </div>
                </div>
                <div className="nk-tb-item">
                  <div className="nk-tb-col tb-col-md">
                    <label className="form-label">Report Heading:</label>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <textarea
                      id="reportHeading"
                      name="reportHeading"
                      ref="reportHeading"
                      className="form-control"
                      defaultValue={this.state.reportHeading}
                      required
                    />
                  </div>
                </div>
                <div className="nk-tb-item">
                  <div className="nk-tb-col tb-col-md">
                    <label className="form-label"></label>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    {voucherTypes}
                  </div>
                </div>
                <div className="nk-tb-item">
                  <div className="nk-tb-col tb-col-md"></div>

                  <div className="nk-tb-col tb-col-md">
                    <button 
                      onClick={() => this.viewPDFReport()}
                      type="button" 
                      className="btn btn-lg btn-primary"
                    >
                      Print Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <PDFAuditVoucherDocument
            title={this.state.docTitle}
            content={this.state.pdfContent}
            isVisible={this.state.pdfDocOpen}
            onClose={() => this.setState({ pdfDocOpen: false })}
        />
        

        
      </MainLayout>
    );
  }
}
/*refNosOptions 
queryReceiversOptions
selectedRefNo
selectedQueryReceiver
id, voucherAuditId, queryReceiverId, details, voucherTypeId*/
