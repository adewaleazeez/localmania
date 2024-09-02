import React, { Component } from "react";
import CustomModal from "../../Components/CustomModal";
import PDFQueryDocument from "./PDFQueryDocument";
import MainLayout from "../../Components/Layouts/MainLayout";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { Redirect } from "react-router-dom";

export default class QueryFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedRecord: null,
      modalOpen: false,
      pdfDocOpen: false,
      pdfContent: [],
      list: [],
      perPage: 7,
      page: 0,
      pages: 0,
      refNosOptions: [],
      queryReceiversOptions: [],
      //voucherTypesOptions: [],
      selectedRefNo: 0,
      selectedQueryReceiver: 0,
      //selectedVoucherType: 0,
    }
    this.handleRefNoChange = this.handleRefNoChange.bind(this);
    this.handleQueryReceiverChange = this.handleQueryReceiverChange.bind(this);
  };
     
  componentWillMount(){
    if(localStorage.getItem('unitid') != 10 && localStorage.getItem('unitid') != 20){
      alert("Access Denid!!!\nOnly Other Charges Unit is allowed access to Query Form Entry menu");
      this.setState({ redirectUrl: "/user/dashboard" });
    }
  }

  componentDidMount() {
    this.getRefNos();
    this.getQueryReceivers();
    this.getQueryForms();
  }

  componentWillUnmount(){

  }

  handleRefNoChange = (e) => {
    let index = this.state.refNosOptions.findIndex(refNo => refNo.label == e.label);
    this.setState({ selectedRefNo: index });
    this.refs.voucherType.value = e.voucherName;
    this.refs.voucherTypeHidden.value = e.voucherTypeId;
     
  }

  handleQueryReceiverChange = (e) => {
    let index = this.state.queryReceiversOptions.findIndex(receiver => receiver.label == e.label);
    this.setState({ selectedQueryReceiver: index });
  }

  /*handleVoucherTypeChange(e) {
    let index = this.state.voucherTypeOptions.findIndex(voucher => voucher.label == e.label);
    this.setState({ selectedVoucherType: index });
  }*/

  editForm = () => {
    return (
      <form className="form-validate is-alter">
        <div className="form-group">
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
            <Select 
              id="refNoEdit"
              name="refNoEdit"
              ref="refNoEdit"
              className="form-control" 
              readOnly={true} 
              disabled={true}
              defaultValue =  {this.state.refNosOptions[this.state.selectedRefNo]} 
              options={this.state.refNosOptions}
              //onChange={this.handleRefNoChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Voucher Type</label>
          <div className="form-control-wrap">
            <input
              type="hidden" 
              id="voucherTypeEditHidden"
              name="voucherTypeEditHidden"
              ref="voucherTypeEditHidden"
              defaultValue={this.state.selectedRecord.voucherTypeId}
            />
            <input
              type="text" 
              id="voucherTypeEdit"
              name="voucherTypeEdit"
              ref="voucherTypeEdit"
              defaultValue={this.state.selectedRecord.voucherName}
              className="form-control" 
              readOnly 
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Query Receiver</label>
          <div className="form-control-wrap">
            <Select 
              id="queryReceiverEdit"
              name="queryReceiverEdit"
              ref="queryReceiverEdit"
              className="form-control" 
              defaultValue =  {this.state.queryReceiversOptions[this.state.selectedQueryReceiver]} 
              options={this.state.queryReceiversOptions}
              onChange={this.handleQueryReceiverChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Details</label>
          <div className="form-control-wrap">
            <textarea 
              id="detailsEdit"
              name="detailsEdit"
              ref="detailsEdit"
              className="form-control"
              required
              defaultValue={this.state.selectedRecord.details}
            />
          </div>
        </div>
        <div className="form-group">
          {this.state.selectedRecord.title == "Edit" ?
            <div>
              <button 
                onClick={() => this.callUpdateQuery()}
                type="button" 
                className="btn btn-lg btn-primary"
              >
                Update Query
              </button>&nbsp;&nbsp;
              <button 
                onClick={() => this.viewPDFQuery()}
                type="button" 
                className="btn btn-lg btn-primary"
              >
                Print Query
              </button>
            </div>
            :
            <button 
              onClick={() => this.callDeleteQuery()}
              type="button" 
              className="btn btn-lg btn-danger"
            >
              Delete Query
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
        <label className="form-label">Reference No</label>
          <div className="form-control-wrap">
            <Select 
              id="refNo"
              name="refNo"
              ref="refNo"
              className="form-control" 
              options={this.state.refNosOptions}
              onChange={this.handleRefNoChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Voucher Type</label>
          <div className="form-control-wrap">
            <input
              type="hidden" 
              id="voucherTypeHidden"
              name="voucherTypeHidden"
              ref="voucherTypeHidden"
            />
            <input
              type="text" 
              id="voucherType"
              name="voucherType"
              ref="voucherType"
              className="form-control" 
              readOnly 
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Query Receiver</label>
          <div className="form-control-wrap">
            <Select 
              id="queryReceiver"
              name="queryReceiver"
              ref="queryReceiver"
              className="form-control" 
              options={this.state.queryReceiversOptions}
              onChange={this.handleQueryReceiverChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Details</label>
          <div className="form-control-wrap">
            <textarea 
              id="details"
              name="details"
              ref="details"
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <button 
            onClick={() => this.callCreateQuery()}
            type="button" 
            className="btn btn-lg btn-primary"
          >
            Create Query
          </button>
        </div>
      </form>
    );
  }

  callCreateQuery = async() => {
    this.setState({ loading: true });
    let errormessage = "";
    if(this.state.refNosOptions[this.state.selectedRefNo]==undefined){
      errormessage = <div>{errormessage}<div>Reference No can not be blank<br/></div></div>;
    }
    if(this.state.queryReceiversOptions[this.state.selectedQueryReceiver]==undefined){
      errormessage = <div>{errormessage}<div>Query Receiver can not be blank<br/></div></div>;
    }
    if(this.refs.details.value==""){
      errormessage = <div>{errormessage}<div>Details can not be blank<br/></div></div>;
    }

    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }

    var data = {
      voucherAuditId: this.state.refNosOptions[this.state.selectedRefNo].value,
      voucherTypeId: this.refs.voucherTypeHidden.value,
      queryReceiverId: this.state.queryReceiversOptions[this.state.selectedQueryReceiver].value,
      details: this.refs.details.value,
      unitId: localStorage.getItem('unitid'),
    };
 
    await UsersDataService.createQueryForm(data)
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
            "Query creation is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getQueryForms();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error creating query"
        );
        this.setState({ loading: false });
      });
      
  }

  callUpdateQuery = async() => {
    this.setState({ loading: true });
    let errormessage = "";
    if(this.state.refNosOptions[this.state.selectedRefNo]==undefined){
      errormessage = <div>{errormessage}<div>Reference No can not be blank<br/></div></div>;
    }
    if(this.state.queryReceiversOptions[this.state.selectedQueryReceiver]==undefined){
      errormessage = <div>{errormessage}<div>Query Receiver can not be blank<br/></div></div>;
    }
    if(this.refs.detailsEdit.value==""){
      errormessage = <div>{errormessage}<div>Details can not be blank<br/></div></div>;
    }
    
    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }

    var data = {
      id: this.refs.idEdit.value,
      voucherAuditId: this.state.refNosOptions[this.state.selectedRefNo].value,
      voucherTypeId: this.refs.voucherTypeEditHidden.value,
      queryReceiverId: this.state.queryReceiversOptions[this.state.selectedQueryReceiver].value,
      details: this.refs.detailsEdit.value,
      unitId: localStorage.getItem('unitid'),
    };

    await UsersDataService.updateQueryForm(data)
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
            "Query update is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getQueryForms();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error updating query"
        );
        this.setState({ loading: false });
      });
      
  }

  callDeleteQuery = async() => {
    this.setState({ loading: true });
    var data = {
      id: this.refs.idEdit.value,
      voucherAuditId: this.state.refNosOptions[this.state.selectedRefNo].value,
      voucherTypeId: this.refs.voucherTypeEditHidden.value,
      queryReceiverId: this.state.queryReceiversOptions[this.state.selectedQueryReceiver].value,
      details: this.refs.detailsEdit.value,
      unitId: localStorage.getItem('unitid'),
    };

    await UsersDataService.deleteQueryForm(data)
      .then(response => {
        if(typeof(response) !== "object"){
          if(response.toString().includes("Error")){
            Toastr("error", response);
            return true;
          }
        }else{
          Toastr(
            "info",
            "Query delete is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getQueryForms();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error deleting query "
        );
        this.setState({ loading: false });
      });
      
  };
    
  getRefNos = async() => {
    var data = {
      unit: localStorage.getItem('unitid'),
    };
    await UsersDataService.getVoucherAuditsByStatus(data)
      .then(res => {
        const data = res.data;
        data.sort((a,b) => a.id - b.id);
        const options = data.map(d => ({
          "value" : d.id,
          "label" : d.refNo,
          "voucherTypeId": d.voucherTypeId,
          "voucherName": d.voucherName
        }))
        this.setState({refNosOptions: options});
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  getQueryReceivers = async() => {
    await UsersDataService.getQueryReceivers()
      .then(res => {
        const data = res.data;
        data.sort((a,b) => a.id - b.id);
        const options = data.map(d => ({
          "value" : d.id,
          "label" : d.receiverName
        }))
        this.setState({queryReceiversOptions: options});
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  getQueryForms = async() => {
    var data = {
      unit: localStorage.getItem('unitid'),
    };
    await UsersDataService.getQueryForms(data)
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
  }
  
  handleKeyPress = (e) => {
      var key = e.key;
      if (key == "Enter") {
        this.getQueryFormsByOption();
      }
      
  }

  getQueryFormsByOption = async() => {
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
    await UsersDataService.getQueryFormsByOption(data)
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
 
  viewPDFQuery = async() => {
    this.setState({ loading: true });
    var data = {
      id: this.refs.idEdit.value,
      voucherAuditId: this.state.refNosOptions[this.state.selectedRefNo].value,
    };
    await UsersDataService.getVoucherQueryById(data)
    .then(res => {
      const list = res.data;
      this.setState({ pdfContent: list }); 
      this.setState({ pdfDocOpen: true });
    })
    .catch(e => {
      this.setState({ loading: false });
    });
    
    //setTimeout(() => {}, 10 00);
  }

  render() {
      const {page, perPage, pages, list} = this.state;
      let items = list.slice(page * perPage, (page + 1) * perPage);
      let queryForms = items.map(item => {
      let selectedRefNoIndex = this.state.refNosOptions.findIndex(refNo => refNo.value == item.voucherAuditId);
      let selectedQueryReceiverIndex = this.state.queryReceiversOptions.findIndex(queryReceiver => queryReceiver.value == item.queryReceiverId);
      // let selectedVoucherTypeIndex = this.state.voucherTypesOptions.findIndex(queryReceiver => queryReceiver.value == item.voucherTypeId);
      return ( 
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-refNo">{item.refNo}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-emailAddress">{item.voucherName}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-unit">{item.receiverName}</span>
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
                          selectedRefNo: selectedRefNoIndex,
                          selectedQueryReceiver: selectedQueryReceiverIndex,
                          selectedRecord: {
                            id: item.id,
                            details: item.details,
                            voucherTypeId: item.voucherTypeId,
                            voucherName: item.voucherName,
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
                          selectedRefNo: selectedRefNoIndex,
                          selectedQueryReceiver: selectedQueryReceiverIndex,
                          selectedRecord: {
                            id: item.id,
                            details: item.details,
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
        title="Query Form"
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
                    onClick={() => this.getQueryFormsByOption()}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-search" />
                    <span>Search</span>
                  </button>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.getQueryForms()}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-list" />
                    <span>List All</span>
                  </button>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.setState({ modalOpen: true })}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-plus" />
                    <span>Add Query</span>
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
              ? (this.state.selectedRecord.title == "Edit" ? "Edit Query" : "Delete Query")
              : "New Query"
          }
          content={this.state.selectedRecord ? this.editForm() : this.newForm()}
          isVisible={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
        />
        <PDFQueryDocument
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
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Reference No</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Voucher Type</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Query Receiver</h5></span>
                  </div>

                  <div className="nk-tb-col nk-tb-col-tools"></div>
                </div>
                {/* .nk-tb-item */}
                {queryForms}
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
// id, staff_category, staff_level, staff_step, staff_salary, year, status_flag
/*refNosOptions 
queryReceiversOptions
selectedRefNo
selectedQueryReceiver
id, voucherAuditId, queryReceiverId, details, voucherTypeId*/
