import React, { Component } from "react";
import CustomModal from "../../Components/CustomModal";
import VoucherAuditCriteria from "./VoucherAuditCriteria";
import VoucherAuditCharges from "./VoucherAuditCharges";
import VoucherAuditDocs from "./VoucherAuditDocs";
import PDFDocument from "./PDFDocument";
import MainLayout from "../../Components/Layouts/MainLayout";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { Redirect } from "react-router-dom";

const statusOptions = [
  { value: 0, label: 'Pending' },
  { value: 1, label: 'Approved' },
  { value: 2, label: 'Queried' } 
];

export default class VoucherEntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedRecord: null,
      modalOpen: false,
      pdfDocOpen: false,
      pdfContent: [],
      docTitle: '',
      list: [],
      perPage: 7,
      page: 0,
      pages: 0,
      dateNow: "",
      voucherTypeOptions: [],
      selectedVoucherType: 0,
      selectedStatus: 0,
    };
    this.handleVoucherTypeChange = this.handleVoucherTypeChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentWillMount(){
    if(localStorage.getItem('unitid') != 10 && localStorage.getItem('unitid') != 20){
      alert("Access Denid!!!\nOnly Other Charges Unit is allowed access to Voucher Entry menu");
      this.setState({ redirectUrl: "/user/dashboard" });
    }
  }

  componentDidMount() {
    this.getVoucherTypes();
    this.getVoucherAudits();
    var curr = new Date();
    curr.setDate(curr.getDate());
    this.setState({ dateNow: curr.toISOString().substr(0,10) });
  }

  componentWillUnmount(){
    
  }

  handleVoucherTypeChange(e) {
    let index = this.state.voucherTypeOptions.findIndex(voucher => voucher.label == e.label);
    this.setState({ selectedVoucherType: index });
  }

  handleStatusChange(e) {
    this.setState({ selectedStatus: e.value });
  }

  editForm = () => {
    {localStorage.setItem('voucherid', this.state.selectedRecord.id);}
    {localStorage.setItem('selectedAmount', this.state.selectedRecord.amount);}
    return (
      <form className="form-validate is-alter">
        <div className="card card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-lg">
                    <label className="form-label">Reference No</label>
                    <div className="form-control-wrap">
                      <input
                        type="hidden"
                        id="idEdit"
                        name="idEdit"
                        ref="idEdit"
                        className="form-control"
                        required
                        defaultValue={this.state.selectedRecord.id}
                      />
                      <input
                        type="text"
                        id="refNoEdit"
                        name="refNoEdit"
                        ref="refNoEdit"
                        className="form-control"
                        required
                        defaultValue={this.state.selectedRecord.refNo}
                      />
                      <input
                        type="text"
                        id="auditNoEdit"
                        name="auditNoEdit"
                        ref="auditNoEdit"
                        readOnly
                        disabled
                        className="form-control"
                        required
                        defaultValue={this.state.selectedRecord.auditNo}
                      />
                    </div>
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <label className="form-label">Beneficiary</label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="beneficiaryEdit"
                        name="beneficiaryEdit"
                        ref="beneficiaryEdit"
                        className="form-control"
                        required
                        defaultValue={this.state.selectedRecord.beneficiary}
                      />
                    </div>
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <label className="form-label">Amount</label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="amountEdit"
                        name="amountEdit"
                        ref="amountEdit"
                        className="form-control"
                        required
                        defaultValue={this.state.selectedRecord.amount}
                      />
                    </div>
                  </div>
                </div>
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-lg">
                    <label className="form-label">Details</label>
                    <div className="form-control-wrap">
                      <textarea 
                        className="form-control"
                        id="detailsEdit"
                        name="detailsEdit"
                        ref="detailsEdit"
                        required
                        defaultValue={this.state.selectedRecord.details}
                      />
                    </div>
                  </div>
                  <div className="nk-tb-col tb-col-lg">

                    <div className="nk-tb-item nk-tb-head">
                      <div className="nk-tb-col tb-col-lg">
                        <label className="form-label">Voucher Type<div style={{paddingRight: "300px"}}></div></label>
                        <div className="form-control-wrap">
                          <input
                            type="text" 
                            readOnly
                            disabled
                            id="voucherTypeIdEdit"
                            name="voucherTypeIdEdit"
                            ref="voucherTypeIdEdit"
                            className="form-control" 
                            defaultValue =  {this.state.voucherTypeOptions[this.state.selectedVoucherType].label}
                            //onChange={this.handleVoucherTypeChange} 
                            //options={this.state.voucherTypeOptions}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="nk-tb-item nk-tb-head">
                      <div className="nk-tb-col tb-col-lg">
                        <label className="form-label">Voucher Audit Date</label>
                        <div className="form-control-wrap">
                          <input
                            type="date" 
                            readOnly
                            disabled
                            id="voucherDateEdit"
                            name="voucherDateEdit"
                            ref="voucherDateEdit"
                            defaultValue={this.state.selectedRecord.voucherDate}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <div className="nk-tb-item nk-tb-head">
                      <div className="nk-tb-col tb-col-lg">
                        <label className="form-label">Status<div style={{paddingRight: "300px"}}></div></label>
                        <div className="form-control-wrap">
                          <Select 
                            id="statusEdit"
                            name="statusEdit"
                            ref="statusEdit"
                            className="form-control"
                            defaultValue =  {statusOptions[this.state.selectedRecord.status]}
                            options = {statusOptions}
                            onChange={this.handleStatusChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="nk-tb-item nk-tb-head">
                      <div className="nk-tb-col tb-col-lg">
                        <label className="form-label"></label>
                        <div className="form-control-wrap">
                          {this.state.selectedRecord.title == "Edit" ?
                            <div>
                              <button 
                                onClick={() => this.callUpdateVoucherAudit()}
                                type="button" 
                                className="btn btn-lg btn-primary"
                              >
                                Update Voucher
                              </button>&nbsp;&nbsp;
                              <button 
                                onClick={() => this.viewPDFDoc()}
                                type="button" 
                                className="btn btn-lg btn-primary"
                              >
                                Print Voucher
                              </button>
                            </div>
                            :
                            <button 
                              onClick={() => this.callDeleteVoucherAudit()}
                              type="button" 
                              className="btn btn-lg btn-danger"
                            >
                              Delete Voucher
                            </button>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-lg">
                    <VoucherAuditCriteria />
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <VoucherAuditCharges />
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <VoucherAuditDocs />
                  </div>
                </div>
              </div>
              {/*<div style={{paddingBottom: "200px"}}></div>*/}
            </div>
          </div>
        </div>
      </form>
    );
  };

  newForm() {
    return (
      <form className="form-validate is-alter">
        <div className="card card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-lg">
                    <label className="form-label">Reference No</label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="refNo"
                        name="refNo"
                        ref="refNo"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <label className="form-label">Beneficiary</label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="beneficiary"
                        name="beneficiary"
                        ref="beneficiary"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <label className="form-label">Amount</label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="amount"
                        name="amount"
                        ref="amount"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-lg">
                    <label className="form-label">Details</label>
                    <div className="form-control-wrap">
                    <textarea 
                        className="form-control"
                        id="details"
                        name="details"
                        ref="details"
                        required
                      />
                    </div>
                  </div>
                  <div className="nk-tb-col tb-col-lg">

                    <div className="nk-tb-item nk-tb-head">
                      <div className="nk-tb-col tb-col-lg">
                        <label className="form-label">Voucher Type<div style={{paddingRight: "300px"}}></div></label>
                        <div className="form-control-wrap">
                          <Select
                            id="voucherTypeId"
                            name="voucherTypeId"
                            ref="voucherTypeId"
                            className="form-control"
                            defaultValue =  {this.state.voucherTypeOptions[this.state.selectedVoucherType]}
                            options={this.state.voucherTypeOptions} 
                            onChange={this.handleVoucherTypeChange} 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="nk-tb-item nk-tb-head">
                      <div className="nk-tb-col tb-col-lg">
                        <label className="form-label">Voucher Audit Date</label>
                        <div className="form-control-wrap">
                          <input
                            readOnly
                            disabled
                            type="date" 
                            id="voucherDate"
                            name="voucherDate"
                            ref="voucherDate"
                            defaultValue={this.state.dateNow}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <div className="nk-tb-item nk-tb-head">
                      <div className="nk-tb-col tb-col-lg">
                        <label className="form-label">Status<div style={{paddingRight: "300px"}}></div></label>
                        <div className="form-control-wrap">
                          <input
                            type="text" 
                            readOnl
                            disabled 
                            id="status"
                            name="status"
                            ref="status"
                            className="form-control"
                            defaultValue = {statusOptions[0].label}
                            //onChange={this.handleStatusChange}
                            //options = {statusOptions} 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="nk-tb-item nk-tb-head">
                      <div className="nk-tb-col tb-col-lg">
                        <label className="form-label"></label>
                        <div className="form-control-wrap">
                            <button 
                              onClick={() => this.callCreateVoucherAudit()}
                              type="button" 
                              className="btn btn-lg btn-primary"
                            >
                              Create Voucher Charge
                            </button>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*<div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-lg">
                    <VoucherAuditCriteria />
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <VoucherAuditCharges />
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <VoucherAuditCharges />
                  </div>
                </div>
              </div>*/}
              <div style={{paddingBottom: "200px"}}></div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  callCreateVoucherAudit = async() => {
    this.setState({ loading: true });
    let errormessage = "";
    if(this.refs.refNo.value==""){
      errormessage = <div>{errormessage}<div>Reference No can not be blank<br/></div></div>;
    }
    if(this.refs.beneficiary.value==""){
      errormessage = <div>{errormessage}<div>Beneficiary can not be blank<br/></div></div>;
    }
    if(this.refs.amount.value==""){
      errormessage = <div>{errormessage}<div>Amount can not be blank<br/></div></div>;
    }
    if(this.state.voucherTypeOptions[this.state.selectedVoucherType]==undefined){
      errormessage = <div>{errormessage}<div>voucher Type can not be blank<br/></div></div>;
    }
    if(statusOptions[this.state.selectedStatus]==undefined){
      errormessage = <div>{errormessage}<div>Status can not be blank<br/></div></div>;
    }

    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }

    var data = {
      refNo: this.refs.refNo.value,
      beneficiary: this.refs.beneficiary.value,
      details: this.refs.details.value,
      amount: this.refs.amount.value,
      voucherTypeId: this.state.voucherTypeOptions[this.state.selectedVoucherType].value.toString(),
      status: this.state.selectedStatus,
      voucherDate: this.refs.voucherDate.value,
      userId: localStorage.getItem('userid'),
      unitId: localStorage.getItem('unitid'),
    };
    await UsersDataService.createVoucherAudit(data)
      .then(response => {
        if(response.toString().includes("already exists")){
          Toastr(
            "error",
            response
          );
          return true;
        }else{
          Toastr(
            "info",
            "Voucher Audit creation is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getVoucherAudits();
      })
      .catch(() => {
        Toastr(
          "error",
          "Error creating voucher type"
        );
        this.setState({ loading: false });
      });
      
  };

  callUpdateVoucherAudit = async() => {
    this.setState({ loading: true });
    let errormessage = "";
    if(this.refs.refNoEdit.value==""){
      errormessage = <div>{errormessage}<div>Reference No can not be blank<br/></div></div>;
    }
    if(this.refs.beneficiaryEdit.value==""){
      errormessage = <div>{errormessage}<div>Beneficiary can not be blank<br/></div></div>;
    }
    if(this.refs.amountEdit.value==""){
      errormessage = <div>{errormessage}<div>Amount can not be blank<br/></div></div>;
    }
    if(this.state.voucherTypeOptions[this.state.selectedVoucherType]==undefined){
      errormessage = <div>{errormessage}<div>voucher Type can not be blank<br/></div></div>;
    }
    if(statusOptions[this.state.selectedStatus]==undefined){
      errormessage = <div>{errormessage}<div>Status can not be blank<br/></div></div>;
    }
    
    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }
    
    var data = {
      id: this.refs.idEdit.value,
      refNo: this.refs.refNoEdit.value,
      beneficiary: this.refs.beneficiaryEdit.value,
      details: this.refs.detailsEdit.value,
      amount: this.refs.amountEdit.value,
      voucherTypeId: this.state.voucherTypeOptions[this.state.selectedVoucherType].value.toString(),
      status: this.state.selectedStatus.toString(),
      voucherDate: this.refs.voucherDateEdit.value,
      userId: localStorage.getItem('userid'),
      unitId: localStorage.getItem('unitid'),
    };
    await UsersDataService.updateVoucherAudit(data)
      .then(response => {
        if (response.status == 200 && response.data.message.toString().includes("successfully")){
          Toastr(
            "info",
            response.data.message
          );
        } else if (response.data.message.toString().includes("already approved") || response.data.message.toString().includes("already queried")) {
          Toastr(
              "error",
              response.data.message
          );
          return true;
        }
        this.setState({ modalOpen: false});
        this.getVoucherAudits();
      })
      .catch(() => {
        Toastr(
          "error",
          "Error updating voucher"
        );
        this.setState({ loading: false });
      });
      
  };

  callDeleteVoucherAudit = async() => {
    this.setState({ loading: true });
    var data = {
      id: this.refs.idEdit.value,
      refNo: this.refs.refNoEdit.value,
      beneficiary: this.refs.beneficiaryEdit.value,
      details: this.refs.detailsEdit.value,
      amount: this.refs.amountEdit.value,
      voucherTypeId: this.state.selectedVoucherType,
      status: this.state.selectedStatus,
      voucherDate: this.refs.voucherDateEdit.value,
      userId: localStorage.getItem('userid'),
      unitId: localStorage.getItem('unitid'),
    };
    await UsersDataService.deleteVoucherAudit(data)
      .then(response => {
        if(typeof(response) !== "object"){
          if(response.toString().includes("Error")){
            Toastr("error", response);
            return true;
          }
        }else{
          Toastr(
            "info",
            "Voucher delete is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getVoucherAudits();
      })
      .catch(e => {
        console.log(e)
        
        Toastr(
          "error",
          "Error deleting voucher type"
        );
        this.setState({ loading: false });
      });
      
  };
  
  getVoucherTypes = async() => {
    await UsersDataService.getVoucherTypes()
    .then(res => {
      const data = res.data;
      data.sort((a,b) => a.id - b.id);
      const options = data.map(d => ({
        "value" : d.id,
        "label" : d.voucherName
      }))
      this.setState({voucherTypeOptions: options});
    })
    .catch(() => {
      this.setState({ loading: false });
    });
  };
  
  getVoucherAudits = async() => {
    var data = {
      unit: localStorage.getItem('unitid'),
    };
    await UsersDataService.getVoucherAudits(data)
      .then(res => {
        const {perPage} = this.state;
        const list = res.data;
        this.setState({
          list,
          pages: Math.ceil(list.length / perPage)
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };
 
  handlePageClick = (event) => {
    let page = event.selected;
    this.setState({page})
  };
  
  handleKeyPress = (e) => {
      var key = e.key;
      if (key == "Enter") {
        this.getVoucherAuditsByOption();
      }
      
  };

  getVoucherAuditsByOption = async() => {
    this.setState({ loading: true });
    if(this.refs.searchStr.value==""){
      Toastr(
        "error",
        "Invalid search text"
      );
      return true;
    }
    var data = {
      searchStr: this.refs.searchStr.value,
      unit: localStorage.getItem('unitid'),
    };
    await UsersDataService.getVoucherAuditsByOption(data)
      .then(res => {
        const {perPage} = this.state;
        const list = res.data;
        this.setState({
          list,
          pages: Math.ceil(list.length / perPage)
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };
      
  viewPDFDoc = async() => {
    this.setState({ loading: true });
    var data = {
      id: this.refs.idEdit.value
    };
    await UsersDataService.getVoucherAuditById(data)
    .then(res => {
      const list = res.data;
      this.setState({ pdfContent: list }); 
      this.setState({ pdfDocOpen: true });
    })
    .catch(() => {
      this.setState({ loading: false });
    });
    
    //setTimeout(() => {}, 10 00);
  }

  render() {
    const {page, perPage, pages, list} = this.state;
    let items = list.slice(page * perPage, (page + 1) * perPage);
    let sno = 0;
    let vouchers = items.map(item => {
      let date = new Date(item.voucherDate);
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let dt = date.getDate();

      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      let newdate = year+'-' + month + '-'+dt;      
      sno++;
      return (
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-sno">{sno}</span>
          </div>
          
          <div className="nk-tb-col tb-col-md">
            <span className="tb-refNo">{item.refNo}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-auditNo">{item.auditNo}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-beneficiary">{item.beneficiary}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-beneficiary">{item.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-beneficiary">{item.voucherName}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-beneficiary">{item.userName}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-beneficiary">{item.unitName}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-beneficiary">{newdate}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-beneficiary">{item.statusDesc}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <ul className="tb-edit">
              <li className="tb-edit">
                <div>
                  <button type="button" className="btn btn-icon tb-edit">
                    <em
                      onClick={() =>
                        this.setState({
                          modalOpen: true,
                          selectedRecord: {
                            id: item.id,
                            refNo: item.refNo,
                            auditNo: item.auditNo,
                            beneficiary: item.beneficiary,
                            details: item.details,
                            amount: item.amount,
                            voucherAuditId: item.voucherAuditId,
                            status: item.status,
                            voucherDate: newdate,
                            userId: item.userId,
                            title: "Edit"
                          },
                        })
                      }
                      className="icon ni ni-pen"
                      title="Edit Record"
                    ></em>
                  </button>
                  <button type="button" className="btn btn-icon tb-delete">
                    <em
                      onClick={() =>
                        this.setState({
                          modalOpen: true,
                          selectedRecord: {
                            id: item.id,
                            refNo: item.refNo,
                            auditNo: item.auditNo,
                            beneficiary: item.beneficiary,
                            details: item.details,
                            amount: item.amount,
                            voucherAuditId: item.voucherAuditId,
                            status: item.status,
                            voucherDate: newdate,
                            userId: item.userId,
                            title: "Delete"
                          },
                        })
                      }
                      className="icon ni ni-trash"
                      title="Delete Record"
                    ></em>
                    </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
      )
    }) || '';

    return this.state.redirectUrl ? (
      <Redirect to={this.state.redirectUrl} />
    ) : (
      <MainLayout
        role="user"
        title="Vouchers Audit"
        topRight={
          <div className="toggle-wrap nk-block-tools-toggle">
            <a
              href="#"
              className="btn btn-icon btn-trigger toggle-expand mr-n1"
              data-target="pageMenu"
            >
              <em className="icon ni ni-more-v" />
            </a>
            <div className="toggle-expand-content" data-content="pageMenu">
              <ul className="nk-block-tools g-3">
                <li>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-right">
                      <em className="icon ni ni-search" />
                    </div>
                    <input
                      type="text"
                      onKeyPress={(e) => this.handleKeyPress(e)}
                      id="searchStr"
                      name="searchStr"
                      ref="searchStr"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                </li>
                <li className="nk-block-tools-opt">
                  <a
                    href="#"
                    className="toggle btn btn-icon btn-primary d-md-none"
                  >
                    <em className="icon ni ni-plus" />
                  </a>
                  <button
                    type="button"
                    onClick={() => this.getVoucherAuditsByOption()}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-search" />
                    <span>Search</span>
                  </button>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.getVoucherAudits()}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-list" />
                    <span>List All</span>
                  </button>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.setState({ modalOpen: true, selectedRecord: false })}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-plus" />
                    <span>Add Voucher To Audit</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        }
      >
        <CustomModal
          title={
            this.state.selectedRecord
              ? (this.state.selectedRecord.title == "Edit" ? "Edit Voucher" : "Delete Voucher")
              : "New Voucher"
          }
          content={this.state.selectedRecord ? this.editForm() : this.newForm()}
          isVisible={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          bigForm={true}
        />
        <PDFDocument
          title={this.state.docTitle}
          content={this.state.pdfContent}
          isVisible={this.state.pdfDocOpen}
          onClose={() => this.setState({ pdfDocOpen: false })}
        />
        <div className="card card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-md">
                    <span><h5>S/No</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Ref. No</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Audit No</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Beneficiary</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Amount</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Vouchers</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Users</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Units</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Date</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Status</h5></span>
                  </div>

                  <div className="nk-tb-col nk-tb-col-tools">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5>Actions</h5></div>
                </div>
                {/* .nk-tb-item */}

                {vouchers}

              </div>
              {/* .nk-tb-list */}
            </div>
          </div>
        </div>
        <div>
          <ReactPaginate
            previousLabel={'prev'}
            nextLabel={'next'}
            pageCount={pages}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
      </MainLayout>
    );
  }
}
