import React, { Component } from "react";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import CustomModal from "../../Components/CustomModal";
import ReactPaginate from 'react-paginate';

export default class VoucherAuditCharges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedRecord: null,
      modalOpen: false,
      list: [],
      perPage: 5,
      page: 0,
      pages: 0,
      //bPadding: "",
    };
    this.callUpdateVoucherAuditCharge = this.callUpdateVoucherAuditCharge.bind(this);
  };

  componentDidMount() {
    this.getVoucherAuditCharges();
  };

  componentWillUnmount(){

  };

  /*editForm = () => {
    return (
      <form className="form-validate is-alter">
        <div className="form-group">
          <label className="form-label">Voucher Charges</label>
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
              id="voucherAuditChargeEdit"
              name="voucherAuditChargeEdit"
              ref="voucherAuditChargeEdit"
              className="form-control"
              required
              defaultValue={this.state.selectedRecord.name}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <div className="form-control-wrap">
            <input 
              type="text" 
              id="chargeRateEdit"
              name="chargeRateEdit"
              ref="chargeRateEdit"
              className="form-control"
              defaultValue={this.state.selectedRecord.chargeRate}
            />
          </div>
        </div>
        <div className="form-group">
          {this.state.selectedRecord.title == "Edit" ?
            <button 
              onClick={() => this.callUpdateVoucherAuditCharge()}
              type="button" 
              className="btn btn-lg btn-primary"
            >
              Update Voucher Charge
            </button> 
            :
            <button 
              onClick={() => this.callDeleteVoucherAuditCharge()}
              type="button" 
              className="btn btn-lg btn-danger"
            >
              Delete Voucher Charge
            </button>
          }
        </div>
      </form>
    );
  };

  newForm() {
    return (
      <form className="form-validate is-alter">
        <div className="form-group">
          <label className="form-label">Voucher Charges</label>
          <div className="form-control-wrap">
            <input 
              type="text" 
              id="voucherAuditCharge"
              name="voucherAuditCharge"
              ref="voucherAuditCharge"
              className="form-control" 
              required 
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Charge Rate</label>
          <div className="form-control-wrap">
            <input 
              type="text" 
              id="chargeRate"
              name="chargeRate"
              ref="chargeRate"
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <button 
            onClick={() => this.callCreateVoucherAuditCharge()}
            type="button" 
            className="btn btn-lg btn-primary"
          >
            Create Voucher Charge
          </button>
        </div>
      </form>
    );
  };

  callCreateVoucherAuditCharge = async() => {
    this.setState({ loading: true });
    if(this.refs.voucherAuditCharge.value==""){
      Toastr(
        "error",
        "Invalid Voucher Charges"
      );
      return true;
    }
    var data = {
      voucherAuditCharge: this.refs.voucherAuditCharge.value,
      chargeRate: this.refs.chargeRate.value,
      voucherTypeId: localStorage.getItem('voucherTypeId')
    };
    await UsersDataService.createVoucherAuditCharge(data)
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
            "Voucher Charge creation is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getVoucherAuditCharges();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error creating voucher charge"
        );
        this.setState({ loading: false });
      });
      
  };*/

  async callUpdateVoucherAuditCharge(chkBox, id, voucherAuditId, voucherAuditChargeId, chargeRate) {
    this.setState({ loading: true });
    let isChecked = chkBox.target.checked;
    let chargeAmount = 0.0;
    if(isChecked){
      chargeAmount = (parseFloat(chargeRate) / 107.5) * parseFloat(localStorage.getItem('selectedAmount'));
    }else{
      chargeAmount = 0.0;
    }
    
    var data = {
      id: id,
      voucherAuditId: voucherAuditId,
      voucherAuditChargeId: voucherAuditChargeId,
      chargeRate: chargeRate,
      chargeAmount: chargeAmount,
      status: isChecked
    };
    await UsersDataService.updateVoucherAuditCharge(data)
      .then(response => {
        if(response.toString().includes("exist")){
          Toastr(
            "error",
            response
          );
          return true;
        }else{
          /*Toastr(
            "info",
            "Voucher Charge update is successful...."
          );*/
        }
        this.setState({ modalOpen: false});
        this.getVoucherAuditCharges();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error updating voucher charge"
        );
        this.setState({ loading: false });
      });
      
  };

  /*callDeleteVoucherAuditCharge = async() => {
    this.setState({ loading: true });
    if(this.refs.voucherAuditChargeEdit.value==""){
      Toastr(
        "error",
        "Invalid Voucher Charges"
      );
      return true;
    }
    var data = {
      id: this.refs.idEdit.value,
      voucherAuditCharge: this.refs.voucherAuditChargeEdit.value,
      chargeRate: this.refs.chargeRateEdit.value,
      voucherTypeId: localStorage.getItem('voucherTypeId')
    };
    await UsersDataService.deleteVoucherAuditCharge(data)
      .then(response => {
        if(typeof(response) !== "object"){
          if(response.toString().includes("Error")){
            Toastr("error", response);
            return true;
          }
        }else{
          Toastr(
            "info",
            "Voucher Charge delete is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getVoucherAuditCharges();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error deleting voucher charge "
        );
        this.setState({ loading: false });
      });
      
  };*/
  
  getVoucherAuditCharges = async() => {
    var data = {
      voucherAuditId: localStorage.getItem('voucherid'),
    };
    await UsersDataService.getVoucherAuditCharges(data)
      .then(res => {
        const {perPage} = this.state;
        const list = res.data;
        /*let lent = list.length;
        if(lent == 0){
          this.setState({ bPadding: "270px" });
        } else if(lent == 1){
          this.setState({ bPadding: "220px" });
        } else if(lent == 2){
          this.setState({ bPadding: "160px" });
        } else if(lent == 3){
          this.setState({ bPadding: "110px" });
        } else if(lent == 4){
          this.setState({ bPadding: "50px" });
        } else{
          this.setState({ bPadding: "0px" });
        }*/
        this.setState({
          list,
          pages: Math.ceil(list.length / perPage)
        });
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };
 
  /*handlePageClick = (event) => {
    let page = event.selected;
    this.setState({page})
  };
  
  handleKeyPress = (e) => {
      var key = e.key;
      if (key == "Enter") {
        this.getVoucherAuditChargesByOption();
      }
      
  };*/

  getVoucherAuditChargesByOption = async() => {
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
      voucherAuditId: localStorage.getItem('voucherid'),
    };
    await UsersDataService.getVoucherAuditChargesByOption(data)
      .then(res => {
        const {perPage} = this.state;
        const list = res.data;
        /*let lent = list.length;
        if(lent == 0){
          this.setState({ bPadding: "270px" });
        } else if(lent == 1){
          this.setState({ bPadding: "220px" });
        } else if(lent == 2){
          this.setState({ bPadding: "160px" });
        } else if(lent == 3){
          this.setState({ bPadding: "110px" });
        } else if(lent == 4){
          this.setState({ bPadding: "50px" });
        } else{
          this.setState({ bPadding: "0px" });
        }*/
        this.setState({
          list,
          pages: Math.ceil(list.length / perPage)
        });
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };
 
  render() {
    const {page, perPage, pages, list} = this.state;
    let items = list.slice(page * perPage, (page + 1) * perPage);
    let voucherAuditCharges = items.map(item => {
      return (
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-voucherAuditChargeName">{item.voucherAuditChargeName}</span>
          </div>
          
          <div className="nk-tb-col tb-col-md">
            <span className="tb-voucherAuditChargeRate">{item.chargeRate.toFixed(2)+"%"}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-voucherAuditChargeAmount">{item.chargeAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-beneficiary">
              <input 
                type="checkbox" 
                id="statusEdit"
                name="statusEdit"
                ref="statusEdit"
                checked = {item.status}
                onChange={e =>this.callUpdateVoucherAuditCharge(e, item.id, item.voucherAuditId, item.voucherAuditChargeId, item.chargeRate)}
                
              />
            </span>
          </div>
        </div>
        
      )
    }) || '';

    return (
      <div>
        
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
                    onClick={() => this.getVoucherAuditChargesByOption()}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-search" />
                    <span>Search</span>
                  </button>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.getVoucherAuditCharges()}
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
                    <span>Add Voucher Charge</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        
        {/*<CustomModal
          title={
            this.state.selectedRecord
              ? (this.state.selectedRecord.title == "Edit" ? "Edit Voucher Charge" : "Delete Voucher Charge")
              : "New Voucher Charge"
          }
          content={this.state.selectedRecord ? this.editForm() : this.newForm()}
          isVisible={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
        />*/}

        <div className="card card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Charge</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Rate</h5></span>
                  </div>
                  
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Amount</h5></span>
                  </div>
                  
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Status</h5></span>
                  </div>
                </div>
                {/* .nk-tb-item */}
               
                {voucherAuditCharges}
                  
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
        <div style={{paddingBottom: "inherit"}}></div>
      </div>
    );
  }
}
