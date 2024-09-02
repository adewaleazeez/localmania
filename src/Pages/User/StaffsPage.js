import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CustomModal from "../../Components/CustomModal";
import MainLayout from "../../Components/Layouts/MainLayout";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

const options = [
  { value: 0, label: 'User' },
  { value: 1, label: 'Admin' } 
];

export default class StaffsPage extends Component {
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
      departmentsOptions: [],
      selectedDepartment: 0,
    };
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
  }

  componentWillMount(){
    if(localStorage.getItem('unitid') != 10){
      alert("Access Denid!!!\nOnly Admin is allowed access to Staffs Setup menu");
      this.setState({ redirectUrl: "/user/dashboard" });
    }
  }

  componentDidMount() {
    this.getDepartments();
    this.getStaffs();
  }


  handleDepartmentChange = (e) => {
    let index = this.state.departmentsOptions.findIndex(department => department.label == e.label);
    this.setState({ selectedDepartment: index });
  }

  editForm = () => {
    return (
      <form className="form-validate is-alter">
        <div className="form-group">
          <label className="form-label">Staff Name</label>
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
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <div className="form-control-wrap">
            <input
              type="text"
              id="fullNameEdit"
              name="fullNameEdit"
              ref="fullNameEdit"
              className="form-control"
              required
              defaultValue={this.state.selectedRecord.fullName}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="form-control-wrap">
            <input
              type="text"
              id="emailEdit"
              name="emailEdit"
              ref="emailEdit"
              className="form-control"
              required
              defaultValue={this.state.selectedRecord.email}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Phone No</label>
          <div className="form-control-wrap">
            <input
              type="text"
              id="phoneEdit"
              name="phoneEdit"
              ref="phoneEdit"
              className="form-control"
              required
              defaultValue={this.state.selectedRecord.phone}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Department</label>
          <div className="form-control-wrap">
            <Select 
              id="departmentEdit"
              name="departmentEdit"
              ref="departmentEdit"
              className="form-control" 
              defaultValue =  {this.state.departmentsOptions[this.state.selectedDepartment]} 
              options={this.state.departmentsOptions}
              onChange={this.handleDepartmentChange}
            />
          </div>
        </div>
        <div className="form-group">
          {this.state.selectedRecord.title == "Edit" ?
            <button 
              onClick={() => this.callUpdateStaff()}
              type="button" 
              className="btn btn-lg btn-primary"
            >
              Update Staff
            </button> 
            :
            <button 
              onClick={() => this.callDeleteStaff()}
              type="button" 
              className="btn btn-lg btn-danger"
            >
              Delete Staff
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
          <label className="form-label">Full Name</label>
          <div className="form-control-wrap">
            <input
              type="text"
              id="fullName"
              name="fullName"
              ref="fullName"
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="form-control-wrap">
            <input 
              type="text" 
              id="email"
              name="email"
              ref="email"
              className="form-control" 
              required 
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <div className="form-control-wrap">
            <input 
              type="text" 
              id="phone"
              name="phone"
              ref="phone"
              className="form-control" 
              required 
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Department</label>
          <div className="form-control-wrap">
            <Select
              id="department"
              name="department"
              ref="department"
              className="form-control"
              options={this.state.departmentsOptions} 
              onChange={this.handleDepartmentChange} 
            />
          </div>
        </div>
        <div className="form-group">
          <button 
            onClick={() => this.callCreateStaff()}
            type="button" 
            className="btn btn-lg btn-primary"
          >
            Create Staff
          </button>
        </div>
      </form>
    );
  }

  callCreateStaff = async() => {
    this.setState({ loading: true });
    let errormessage = "";
    if(this.refs.fullName.value==""){
      errormessage = <div>{errormessage}<div>Full Name can not be blank<br/></div></div>;
    }
    if(this.refs.email.value==""){
      errormessage = <div>{errormessage}<div>Email Address can not be blank<br/></div></div>;
    }
    if(this.refs.phone.value==""){
      errormessage = <div>{errormessage}<div>Phone No can not be blank<br/></div></div>;
    }
    if(this.state.departmentsOptions[this.state.selectedDepartment]==undefined){
      errormessage = <div>{errormessage}<div>Department can not be blank<br/></div></div>;
    }
    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }

    var data = {
      fullName: this.refs.fullName.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value,
      departmentId: this.state.departmentsOptions[this.state.selectedDepartment].value
    };
    
    await UsersDataService.createStaff(data)
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
            "Staff creation is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getStaffs();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error creating user"
        );
        this.setState({ loading: false });
      });
      
  }

  callUpdateStaff = async() => {
    this.setState({ loading: true });
    let errormessage = "";
    if(this.refs.fullNameEdit.value==""){
      errormessage = <div>{errormessage}<div>Full Name can not be blank<br/></div></div>;
    }
    if(this.refs.emailEdit.value==""){
      errormessage = <div>{errormessage}<div>Email Address can not be blank<br/></div></div>;
    }
    if(this.refs.phoneEdit.value==""){
      errormessage = <div>{errormessage}<div>Phone No can not be blank<br/></div></div>;
    }
    if(this.state.departmentsOptions[this.state.selectedDepartment]==undefined){
      errormessage = <div>{errormessage}<div>Department can not be blank<br/></div></div>;
    }
    
    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }

    var data = {
      id: this.refs.idEdit.value,
      fullName: this.refs.fullNameEdit.value,
      email: this.refs.emailEdit.value,
      phone: this.refs.phoneEdit.value,
      departmentId: this.state.departmentsOptions[this.state.selectedDepartment].value
    };
    console.log("data:::\n"+JSON.stringify(data));
    await UsersDataService.updateStaff(data)
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
            "Staff update is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getStaffs();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error updating user"
        );
        this.setState({ loading: false });
      });
      
  }

  callDeleteStaff = async() => {
    this.setState({ loading: true });
    var data = {
      id: this.refs.idEdit.value,
      fullName: this.refs.fullNameEdit.value,
      email: this.refs.emailEdit.value,
      phone: this.refs.phoneEdit.value,
      departmentId: this.state.selectedDepartment
    };
    
    await UsersDataService.deleteStaff(data)
      .then(response => {
        if(typeof(response) !== "object"){
          if(response.toString().includes("Error")){
            Toastr("error", response);
            return true;
          }
        }else{
          Toastr(
            "info",
            "Staff delete is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getStaffs();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error deleting user "
        );
        this.setState({ loading: false });
      });
      
  }
  
  getDepartments = async() => {
    await UsersDataService.getDepartments()
      .then(res => {
        const data = res.data;
        data.sort((a,b) => a.id - b.id);
        const options = data.map(d => ({
          "value" : d.id,
          "label" : d.departmentName
        }))
        this.setState({departmentsOptions: options});
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  getStaffs = async() => {
    await UsersDataService.getStaffs()
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
        this.getStaffsByOption();
      }
      
  }

  getStaffsByOption = async() => {
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
    await UsersDataService.getStaffsByOption(data)
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
      let users = items.map(item => {
      let selectedDepartmentIndex = this.state.departmentsOptions.findIndex(department => department.value == item.departmentId);
      return (
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-email">{item.fullName}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-email">{item.email}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-phone">{item.phone}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-department">{item.department}</span>
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
                          selectedDepartment: selectedDepartmentIndex,
                          selectedRecord: {
                            id: item.id,
                            fullName: item.fullName,
                            email: item.email,
                            phone: item.phone,
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
                          selectedDepartment: selectedDepartmentIndex,
                          selectedRecord: {
                            id: item.id,
                            fullName: item.fullName,
                            email: item.email,
                            phone: item.phone,
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
        title="Staffs"
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
                    onClick={() => this.getStaffsByOption()}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-search" />
                    <span>Search</span>
                  </button>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.getStaffs()}
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
                    <span>Add Staff</span>
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
              ? (this.state.selectedRecord.title == "Edit" ? "Edit Staff" : "Delete Staff")
              : "New Staff"
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
                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Full Name</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Email</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Phone No</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Department</h5></span>
                  </div>

                  <div className="nk-tb-col nk-tb-col-tools">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5>Actions</h5></div>
                </div>
                {/* .nk-tb-item */}

                {users}

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
