import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CustomModal from "../../Components/CustomModal";
import VoucherCriteria from "./VoucherCriteria";
import VoucherCharges from "./VoucherCharges";
import MainLayout from "../../Components/Layouts/MainLayout";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import ReactPaginate from 'react-paginate';

export default class VoucherTypesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedRecord: null,
      modalOpen: false,
      list: [],
      perPage: 7,
      page: 0,
      pages: 0,
    };
  }

  componentWillMount(){
    if(localStorage.getItem('unitid') != 10){
      alert("Access Denid!!!\nOnly Admin is allowed access to Voucher Types Setup menu");
      this.setState({ redirectUrl: "/user/dashboard" });
    }
  }

  componentDidMount() {
    this.getVoucherTypes();
  }

  componentWillUnmount(){

  }

  editForm = () => {
    localStorage.setItem('voucherTypeId', this.state.selectedRecord.id);
    return (
      <form className="form-validate is-alter">
        <div className="card card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-lg">
                    <label className="form-label">Voucher Type</label>
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
                        id="voucherNameEdit"
                        name="voucherNameEdit"
                        ref="voucherNameEdit"
                        className="form-control"
                        required
                        defaultValue={this.state.selectedRecord.name}
                      />
                    </div>
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <label className="form-label">Description</label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="descriptionEdit"
                        name="descriptionEdit"
                        ref="descriptionEdit"
                        className="form-control"
                        defaultValue={this.state.selectedRecord.description}
                      />
                    </div>
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    {this.state.selectedRecord.title == "Edit" ?
                      <button 
                        onClick={() => this.callUpdateVoucherType()}
                        type="button" 
                        className="btn btn-lg btn-primary"
                      >
                        Update Voucher Type
                      </button> 
                      :
                      <button 
                        onClick={() => this.callDeleteVoucherType()}
                        type="button" 
                        className="btn btn-lg btn-danger"
                      >
                        Delete Voucher Type
                      </button>
                    }
                  </div>
                </div>
              </div>
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-lg">
                    <VoucherCriteria />
                  </div>
                  <div className="nk-tb-col tb-col-lg">
                    <VoucherCharges />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };

  newForm() {
    return (
      <form className="form-validate is-alter">
        <div className="form-group">
          <label className="form-label">Voucher Type Name</label>
          <div className="form-control-wrap">
            <input 
              type="text" 
              id="voucherName"
              name="voucherName"
              ref="voucherName"
              className="form-control" 
              required 
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <div className="form-control-wrap">
            <textarea 
              id="description"
              name="description"
              ref="description"
              className="form-control" 
            />
          </div>
        </div>
        <div className="form-group">
          <button 
            onClick={() => this.callCreateVoucherType()}
            type="button" 
            className="btn btn-lg btn-primary"
          >
            Create Voucher Type
          </button>
        </div>
      </form>
    );
  }

  callCreateVoucherType = async() => {
    this.setState({ loading: true });
    if(this.refs.voucherName.value==""){
      Toastr(
        "error",
        "Invalid Voucher Name"
      );
      return true;
    }
    var data = {
      voucherName: this.refs.voucherName.value,
      description: this.refs.description.value
    };
    await UsersDataService.createVoucherType(data)
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
            "Voucher Type creation is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getVoucherTypes();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error creating voucher type"
        );
        this.setState({ loading: false });
      });
      
  };

  callUpdateVoucherType = async() => {
    this.setState({ loading: true });
    if(this.refs.voucherNameEdit.value==""){
      Toastr(
        "error",
        "Invalid Voucher Name"
      );
      return true;
    }
    var data = {
      id: this.refs.idEdit.value,
      voucherName: this.refs.voucherNameEdit.value,
      description: this.refs.descriptionEdit.value
    };
    await UsersDataService.updateVoucherType(data)
      .then(response => {
        if(response.toString().includes("does not exist")){
          Toastr(
            "error",
            response
          );
          return true;
        }else{
          Toastr(
            "info",
            "Voucher Type update is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getVoucherTypes();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error updating voucher type"
        );
        this.setState({ loading: false });
      });
      
  };

  callDeleteVoucherType = async() => {
    this.setState({ loading: true });
    /*if(this.refs.voucherNameEdit.value==""){
      Toastr(
        "error",
        "Invalid Voucher Name"
      );
      return true;
    }*/
    var data = {
      id: this.refs.idEdit.value,
      voucherName: this.refs.voucherNameEdit.value,
      description: this.refs.descriptionEdit.value
    };
    await UsersDataService.deleteVoucherType(data)
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
        this.getVoucherTypes();
      })
      .catch(e => {
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
        const {perPage} = this.state;
        const list = res.data;
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
        this.getVoucherTypesByOption();
      }
      
  };

  getVoucherTypesByOption = async() => {
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
    };
    await UsersDataService.getVoucherTypesByOption(data)
      .then(res => {
        const {perPage} = this.state;
        const list = res.data;
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
    let vouchers = items.map(item => {
      return (
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-vouchername">{item.voucherName}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-description">{item.description}</span>
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
                            name: item.voucherName,
                            description: item.description,
                            title: "Edit"
                          },
                        })
                      }
                      className="icon ni ni-pen"
                      title="Edit Record"
                    ></em>
                  </button>
                  {<button type="button" className="btn btn-icon tb-delete">
                    <em
                      onClick={() =>
                        this.setState({
                          modalOpen: true,
                          selectedRecord: {
                            id: item.id,
                            name: item.voucherName,
                            description: item.description,
                            title: "Delete"
                          },
                        })
                      }
                      className="icon ni ni-trash"
                      title="Delete Record"
                    ></em>
                    </button>}
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
        title="Voucher Types"
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
                    onClick={() => this.getVoucherTypesByOption()}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-search" />
                    <span>Search</span>
                  </button>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.getVoucherTypes()}
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
                    <span>Add Voucher Type</span>
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
              ? (this.state.selectedRecord.title == "Edit" ? "Edit Voucher Type" : "Delete Voucher Type")
              : "New Voucher Type"
          }
          content={this.state.selectedRecord ? this.editForm() : this.newForm()}
          isVisible={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          bigForm={this.state.selectedRecord ? true : false }
        />

        <div className="card card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Name</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Description</h5></span>
                  </div>

                  <div className="nk-tb-col nk-tb-col-tools"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5>Actions</h5></span></div>
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
