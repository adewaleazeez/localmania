import React, { Component } from "react";
import CustomModal from "../../Components/CustomModal";
import MainLayout from "../../Components/Layouts/MainLayout";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import ReactPaginate from 'react-paginate';
import { Redirect } from "react-router-dom";

export default class GatesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirectUrl: null,
      selectedRecord: false,
      modalOpen: false,
      list: [],
      perPage: 7,
      page: 0,
      pages: 0,
    };
  }

  componentWillMount(){
    if(localStorage.getItem('unitid') != 10){
      alert("Access Denid!!!\nOnly Admin is allowed access to Gates Setup menu");
      this.setState({ redirectUrl: "/user/dashboard" });
    }
  }

  componentDidMount() {
   this.getGates();
  }

  componentWillUnmount(){

  }

  editForm = () => {
    return (
      <form className="form-validate is-alter">
        <div className="form-group">
          <label className="form-label">Gate Name</label>
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
              id="gateNameEdit"
              name="gateNameEdit"
              ref="gateNameEdit"
              className="form-control"
              required
              defaultValue={this.state.selectedRecord.name}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <div className="form-control-wrap">
            <textarea
              id="descriptionEdit"
              name="descriptionEdit"
              ref="descriptionEdit"
              className="form-control"
              defaultValue={this.state.selectedRecord.description}
            />
          </div>
        </div>
        <div className="form-group">
          {this.state.selectedRecord.title == "Edit" ?
            <button 
              onClick={() => this.callUpdateGate()}
              type="button" 
              className="btn btn-lg btn-primary"
            >
              Update Gate
            </button> 
            :
            <button 
              onClick={() => this.callDeleteGate()}
              type="button" 
              className="btn btn-lg btn-danger"
            >
              Delete Gate
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
          <label className="form-label">Gate Name</label>
          <div className="form-control-wrap">
            <input 
              type="text" 
              id="gateName"
              name="gateName"
              ref="gateName"
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
            onClick={() => this.callCreateGate()}
            type="button" 
            className="btn btn-lg btn-primary"
          >
            Create Gate
          </button>
        </div>
      </form>
    );
  }

  callCreateGate = async() => {
    this.setState({ loading: true });
    if(this.refs.gateName.value==""){
      Toastr(
        "error",
        "Invalid Gate Name"
      );
      return true;
    }
    var data = {
      gateName: this.refs.gateName.value,
      description: this.refs.description.value
    };
      await UsersDataService.createGate(data)
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
            "Gate creation is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getGates();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error creating gate"
        );
        this.setState({ loading: false });
      });
  };

  callUpdateGate = async() => {
    this.setState({ loading: true });
    if(this.refs.gateNameEdit.value==""){
      Toastr(
        "error",
        "Invalid Gate Name"
      );
      return true;
    }
    var data = {
      id: this.refs.idEdit.value,
      gateName: this.refs.gateNameEdit.value,
      description: this.refs.descriptionEdit.value
    };
    await UsersDataService.updateGate(data)
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
            "Gate update is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getGates();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error updating gate"
        );
        this.setState({ loading: false });
      });
      
  };

  callDeleteGate = async() => {
    this.setState({ loading: true });
    if(this.refs.gateNameEdit.value==""){
      Toastr(
        "error",
        "Invalid Gate Name"
      );
      return true;
    }
    var data = {
      id: this.refs.idEdit.value,
      gateName: this.refs.gateNameEdit.value,
      description: this.refs.descriptionEdit.value
    };
    
    await UsersDataService.deleteGate(data)
      .then(response => {
        if(typeof(response) !== "object"){
          if(response.toString().includes("Error")){
            Toastr("error", response);
            return true;
          }
        }else{
          Toastr(
            "info",
            "Gate delete is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getGates();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error deleting gate "+e
        );
        this.setState({ loading: false });
      });
      
  };
  
  getGates = async() => {
    await UsersDataService.getGates()
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
  getDepartments = async() => {
    await UsersDataService.getDepartments()
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
        this.getGatesByOption();
      }
      
  };

  getGatesByOption = async() => {
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
    await UsersDataService.getGatesByOption(data)
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
    let gates = items.map(item => {
      return (
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-gatename">{item.gateName}</span>
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
                            name: item.gateName,
                            description: item.description,
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
                            name: item.gateName,
                            description: item.description,
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
        title="Gates"
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
                    onClick={() => this.getGatesByOption()}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-search" />
                    <span>Search</span>
                  </button>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.getGates()}
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
                    <span>Add Gate</span>
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
              ? (this.state.selectedRecord.title == "Edit" ? "Edit Gate" : "Delete Gate")
              : "New Gate"
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

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Description</h5></span>
                  </div>

                  <div className="nk-tb-col nk-tb-col-tools"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5>Actions</h5></span></div>
                </div>
                {/* .nk-tb-item */}
               
                {gates}
                  
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
