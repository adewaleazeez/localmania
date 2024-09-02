import React, { Component } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import CustomModal from "../../Components/CustomModal";
import MainLayout from "../../Components/Layouts/MainLayout";
import Constants from "../../Utils/Constants";
import Logo from "../../Logo";
import APICall from "../../Utils/APICall";
import SpinnerButton from "../../Utils/SpinnerButton";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import ReactPaginate from 'react-paginate';

export default class VoucherCharges extends Component {
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
      bPadding: "",
    };
  };

  componentDidMount() {
    this.getVoucherCharges();
  };

  componentWillUnmount(){

  };

  editForm = () => {
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
              id="voucherChargeEdit"
              name="voucherChargeEdit"
              ref="voucherChargeEdit"
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
              onClick={() => this.callUpdateVoucherCharge()}
              type="button" 
              className="btn btn-lg btn-primary"
            >
              Update Voucher Charge
            </button> 
            :
            <button 
              onClick={() => this.callDeleteVoucherCharge()}
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
              id="voucherCharge"
              name="voucherCharge"
              ref="voucherCharge"
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
            onClick={() => this.callCreateVoucherCharge()}
            type="button" 
            className="btn btn-lg btn-primary"
          >
            Create Voucher Charge
          </button>
        </div>
      </form>
    );
  };

  callCreateVoucherCharge = async() => {
    this.setState({ loading: true });
    if(this.refs.voucherCharge.value==""){
      Toastr(
        "error",
        "Invalid Voucher Charges"
      );
      return true;
    }
    var data = {
      voucherCharge: this.refs.voucherCharge.value,
      chargeRate: this.refs.chargeRate.value,
      voucherTypeId: localStorage.getItem('voucherTypeId')
    };
    await UsersDataService.createVoucherCharge(data)
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
        this.getVoucherCharges();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error creating voucher charge"
        );
        this.setState({ loading: false });
      });
      
  };

  callUpdateVoucherCharge = async() => {
    this.setState({ loading: true });
    if(this.refs.voucherChargeEdit.value==""){
      Toastr(
        "error",
        "Invalid Voucher Charges"
      );
      return true;
    }
    var data = {
      id: this.refs.idEdit.value,
      voucherCharge: this.refs.voucherChargeEdit.value,
      chargeRate: this.refs.chargeRateEdit.value,
      voucherTypeId: localStorage.getItem('voucherTypeId')
    };
    await UsersDataService.updateVoucherCharge(data)
      .then(response => {
        if(response.toString().includes("exist")){
          Toastr(
            "error",
            response
          );
          return true;
        }else{
          Toastr(
            "info",
            "Voucher Charge update is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getVoucherCharges();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error updating voucher charge"
        );
        this.setState({ loading: false });
      });
      
  };

  callDeleteVoucherCharge = async() => {
    this.setState({ loading: true });
    if(this.refs.voucherChargeEdit.value==""){
      Toastr(
        "error",
        "Invalid Voucher Charges"
      );
      return true;
    }
    var data = {
      id: this.refs.idEdit.value,
      voucherCharge: this.refs.voucherChargeEdit.value,
      chargeRate: this.refs.chargeRateEdit.value,
      voucherTypeId: localStorage.getItem('voucherTypeId')
    };
    await UsersDataService.deleteVoucherCharge(data)
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
        this.getVoucherCharges();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error deleting voucher charge "
        );
        this.setState({ loading: false });
      });
      
  };
  
  getVoucherCharges = async() => {
    var data = {
      voucherTypeId: localStorage.getItem('voucherTypeId')
    };
    await UsersDataService.getVoucherCharges(data)
      .then(res => {
        const {perPage} = this.state;
        const list = res.data;
        let lent = list.length;
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
        }
        this.setState({
          list,
          pages: Math.ceil(list.length / perPage)
        });
      })
      .catch(e => {
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
        this.getVoucherChargesByOption();
      }
      
  };

  getVoucherChargesByOption = async() => {
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
      voucherTypeId: localStorage.getItem('voucherTypeId')
    };
    await UsersDataService.getVoucherChargesByOption(data)
      .then(res => {
        const {perPage} = this.state;
        const list = res.data;
        let lent = list.length;
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
        }
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
    let voucherCharges = items.map(item => {
      return (
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-voucherChargename">{item.voucherCharge}</span>
          </div>
          
          <div className="nk-tb-col tb-col-md">
            <span className="tb-voucherChargename">{item.chargeRate.toFixed(2)+"%"}</span>
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
                            name: item.voucherCharge,
                            chargeRate: item.chargeRate,
                            title: "Edit"
                          },
                        })
                      }
                      className="icon ni ni-pen"
                    ></em>
                  </button>
                  <button type="button" className="btn btn-icon tb-delete">
                    <em
                      onClick={() =>
                        this.setState({
                          modalOpen: true,
                          selectedRecord: {
                            id: item.id,
                            name: item.voucherCharge,
                            chargeRate: item.chargeRate,
                            title: "Delete"
                          },
                        })
                      }
                      className="icon ni ni-trash"
                    ></em>
                    </button>
                </div>
              </li>
            </ul>
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
                    onClick={() => this.getVoucherChargesByOption()}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-search" />
                    <span>Search</span>
                  </button>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.getVoucherCharges()}
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
        
        <CustomModal
          title={
            this.state.selectedRecord
              ? (this.state.selectedRecord.title == "Edit" ? "Edit Voucher Charge" : "Delete Voucher Charge")
              : "New Voucher Charge"
          }
          content={this.state.selectedRecord ? this.editForm() : this.newForm()}
          isVisible={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
        />

        <div className="card card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Name</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Charge Rate</h5></span>
                  </div>
                  
                  <div className="nk-tb-col nk-tb-col-tools"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5>Actions</h5></span></div>
                </div>
                {/* .nk-tb-item */}
               
                {voucherCharges}
                  
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
        <div style={{paddingBottom: this.state.bPadding}}></div>
      </div>
    );
  }
}
