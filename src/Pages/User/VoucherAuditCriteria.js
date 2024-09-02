import React, { Component } from "react";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import CustomModal from "../../Components/CustomModal";
import ReactPaginate from 'react-paginate';

export default class VoucherAuditCriteria extends Component {
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
    this.callUpdateVoucherAuditCriteria = this.callUpdateVoucherAuditCriteria.bind(this);
  };

  componentDidMount() {
    this.getVoucherAuditCriteria();
  };

  componentWillUnmount(){

  };

  /*editForm = () => {
    return (
      <form className="form-validate is-alter">
        <div className="form-group">
          <label className="form-label">Voucher Criteria</label>
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
              id="voucherAuditCriteriaEdit"
              name="voucherAuditCriteriaEdit"
              ref="voucherAuditCriteriaEdit"
              className="form-control"
              required
              defaultValue={this.state.selectedRecord.name}
            />
          </div>
        </div>
        <div className="form-group">
          {this.state.selectedRecord.title == "Edit" ?
            <button 
              onClick={() => this.callUpdateVoucherAuditCriteria()}
              type="button" 
              className="btn btn-lg btn-primary"
            >
              Update Voucher Criterion
            </button> 
            :
            <button 
              onClick={() => this.callDeleteVoucherAuditCriteria()}
              type="button" 
              className="btn btn-lg btn-danger"
            >
              Delete Voucher Criterion
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
          <label className="form-label">Voucher Criteria Name</label>
          <div className="form-control-wrap">
            <input 
              type="text" 
              id="voucherAuditCriteria"
              name="voucherAuditCriteria"
              ref="voucherAuditCriteria"
              className="form-control" 
              required 
            />
          </div>
        </div>
        <div className="form-group">
          <button 
            onClick={() => this.callCreateVoucherAuditCriteria()}
            type="button" 
            className="btn btn-lg btn-primary"
          >
            Create Voucher Criterion
          </button>
        </div>
      </form>
    );
  };

  callCreateVoucherAuditCriteria = async() => {
    this.setState({ loading: true });
    if(this.refs.voucherAuditCriteria.value==""){
      Toastr(
        "error",
        "Invalid Voucher Criteria"
      );
      return true;
    }
    var data = {
      voucherAuditCriteriaId: this.refs.voucherAuditCriteria.value,
      voucherTypeId: localStorage.getItem('voucherTypeId')
    };
    await UsersDataService.createVoucherAuditCriteria(data)
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
            "Voucher Criteria creation is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getVoucherAuditCriteria();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error creating voucher criteria"
        );
        this.setState({ loading: false });
      });
      
  };*/

  async callUpdateVoucherAuditCriteria(chkBox, id, voucherAuditId, voucherAuditCriteriaId) {
    this.setState({ loading: true });
    let isChecked = chkBox.target.checked;
    var data = {
      id: id,
      voucherAuditId: voucherAuditId,
      voucherAuditCriteriaId: voucherAuditCriteriaId,
      status: isChecked
    };
    await UsersDataService.updateVoucherAuditCriteria(data)
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
            "Voucher Criteria update is successful...."
          );*/
        }
        this.setState({ modalOpen: false});
        this.getVoucherAuditCriteria();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error updating voucher criteria"
        );
        this.setState({ loading: false });
      });
      
  };

  /*callDeleteVoucherAuditCriteria = async() => {
    this.setState({ loading: true });
    if(this.refs.voucherAuditCriteriaEdit.value==""){
      Toastr(
        "error",
        "Invalid Voucher Criteria"
      );
      return true;
    }
    var data = {
      id: this.refs.idEdit.value,
      voucherAuditCriteria: this.refs.voucherAuditCriteriaEdit.value,
      voucherTypeId: localStorage.getItem('voucherTypeId')
    };
    await UsersDataService.deleteVoucherAuditCriteria(data)
      .then(response => {
        if(typeof(response) !== "object"){
          if(response.toString().includes("Error")){
            Toastr("error", response);
            return true;
          }
        }else{
          Toastr(
            "info",
            "Voucher Criteria delete is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getVoucherAuditCriteria();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error deleting voucher criteria "
        );
        this.setState({ loading: false });
      });
      
  };*/
  
  getVoucherAuditCriteria = async() => {
    var data = {
      voucherAuditId: localStorage.getItem('voucherid'),
    };
    await UsersDataService.getVoucherAuditCriteria(data)
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
 
  handlePageClick = (event) => {
    let page = event.selected;
    this.setState({page})
  };
  
  handleKeyPress = (e) => {
      var key = e.key;
      if (key == "Enter") {
        this.getVoucherAuditCriteriaByOption();
      }
      
  };

  getVoucherAuditCriteriaByOption = async() => {
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
    await UsersDataService.getVoucherAuditCriteriaByOption(data)
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
    let voucherCriterions = items.map(item => {
      return (
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-voucherAuditCriterianame">{item.voucherAuditCriteriaName}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-beneficiary">
              <input 
                type="checkbox" 
                id="statusEdit"
                name="statusEdit"
                ref="statusEdit"
                checked = {item.status}
                onChange={e =>this.callUpdateVoucherAuditCriteria(e, item.id, item.voucherAuditId, item.voucherAuditCriteriaId)}
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
                    onClick={() => this.getVoucherAuditCriteriaByOption()}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-search" />
                    <span>Search</span>
                  </button>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.getVoucherAuditCriteria()}
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
                    <span>Add Voucher Criteria</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        
        {/*<CustomModal
          title={
            this.state.selectedRecord
              ? (this.state.selectedRecord.title == "Edit" ? "Edit Voucher Criteria" : "Delete Voucher Criteria")
              : "New Voucher Criteria"
          }
          content={this.state.selectedRecord ? this.editForm() : this.newForm()}
          isVisible={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
        />    style={{position: "relative", top: "0px", left: "0px"}}*/}

        <div className="card card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Criteria</h5></span>
                  </div>
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Status</h5></span>
                  </div>
                </div>
                {/* .nk-tb-item */}
               
                {voucherCriterions}
                  
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
