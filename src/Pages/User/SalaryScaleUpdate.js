import React, { Component } from "react";
import ScaleYearUpdate from "./ScaleYearUpdate";
import CustomModal from "../../Components/CustomModal";
import PDFSalaryScaleDocument from "./PDFSalaryScaleDocument";
import MainLayout from "../../Components/Layouts/MainLayout";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { Redirect } from "react-router-dom";

export default class SalaryScaleUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedRecord: false,
      modalOpen: false,
      pdfDocOpen: false,
      docTitle: "Salary Scale List",
      pdfContent: [],
      list: [],
      perPage: 7,
      page: 0,
      pages: 0,
      yearsOptions: [],
      staffCategorysOptions: [],
      staffLevelsOptions: [],
      staffStepsOptions: [],
      selectedYear: -1,
      selectedStaffCategory: -1,
      selectedStaffLevel: -1,
      selectedStaffStep: -1,
    }
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleStaffCategoryChange = this.handleStaffCategoryChange.bind(this);
    this.handleStaffLevelChange = this.handleStaffLevelChange.bind(this);
    this.handleStaffStepChange = this.handleStaffStepChange.bind(this);
  };

  componentWillMount(){
    if(localStorage.getItem('unitid') != 10 && localStorage.getItem('unitid') != 30){
      alert("Access Denied!!!\nOnly Salary And System Audit unit is allowed access to Salary Scale Update");
      this.setState({ redirectUrl: "/user/dashboard" });
    }
  }

  componentDidMount() {
    this.getYears();
    this.getStaffCategorys();
    this.getStaffLevels();
    this.getStaffSteps();
    //this.getSalaryScales();
  }

  componentWillUnmount(){

  }

  handleYearChange = (e) => {
    let index = this.state.yearsOptions.findIndex(year => year.label == e.label);
    this.setState({ selectedYear: index });
  }

  handleStaffCategoryChange = (e) => {
    let index = this.state.staffCategorysOptions.findIndex(category => category.label == e.label);
    this.setState({ selectedStaffCategory: index });
  }

  handleStaffLevelChange = (e) => {
    let index = this.state.staffLevelsOptions.findIndex(level => level.label == e.label);
    this.setState({ selectedStaffLevel: index });
  }

  handleStaffStepChange = (e) => {
    let index = this.state.staffStepsOptions.findIndex(step => step.label == e.label);
    this.setState({ selectedStaffStep: index });
  }

  editForm = () => {
    return (
      <form className="form-validate is-alter">
        <div className="form-group">
          <label className="form-label">Scale Year</label>
          <div className="form-control-wrap">
            <input
              type="hidden"
              id="idEdit"
              name="idEdit"
              ref="idEdit"
              defaultValue={this.state.selectedRecord.id}
            />
            <input
              type="text"
              id="yearEdit"
              name="yearEdit"
              ref="yearEdit"
              className="form-control"
              readOnly
              disabled
              defaultValue={this.state.selectedRecord.selectedYear}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Staff Category</label>
          <div className="form-control-wrap">
            <input
              type="text"
              id="staffCategoryEdit"
              name="staffCategoryEdit"
              ref="staffCategoryEdit"
              className="form-control"
              readOnly
              disabled
              defaultValue={this.state.selectedRecord.selectedStaffCategory}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Staff Level</label>
          <div className="form-control-wrap">
            <input
              type="text"
              id="staffLevelEdit"
              name="staffLevelEdit"
              ref="staffLevelEdit"
              className="form-control"
              readOnly
              disabled
              defaultValue={this.state.selectedRecord.selectedStaffLevel}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Staff Step</label>
          <div className="form-control-wrap">
            <input
              type="text"
              id="staffStepEdit"
              name="staffStepEdit"
              ref="staffStepEdit"
              className="form-control"
              readOnly
              disabled
              defaultValue={this.state.selectedRecord.selectedStaffStep}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Salary Scale</label>
          <div className="form-control-wrap">
            <input
              type="text"
              id="salaryScaleEdit"
              name="salaryScaleEdit"
              ref="salaryScaleEdit"
              className="form-control"
              required
              defaultValue={this.state.selectedRecord.salaryScale}
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <button 
              onClick={() => this.callUpdateSalaryScale()}
              type="button" 
              className="btn btn-lg btn-primary"
            >
              Update Salary Scale
            </button>&nbsp;&nbsp;
          </div>
        </div>
      </form>
    );
  }

  callUpdateSalaryScale = async() => {
    this.setState({ loading: true });
    let errormessage = "";
    if(this.refs.idEdit.value==""){
      errormessage = <div>{errormessage}<div>No record is selected for update<br/></div></div>;
    }
    if(this.refs.yearEdit.value==""){
      errormessage = <div>{errormessage}<div>Year can not be blank<br/></div></div>;
    }
    if(this.refs.staffCategoryEdit.value==""){
      errormessage = <div>{errormessage}<div>Category can not be blank<br/></div></div>;
    }
    if(this.refs.staffLevelEdit.value==""){
      errormessage = <div>{errormessage}<div>Level can not be blank<br/></div></div>;
    }
    if(this.refs.staffStepEdit.value==""){
      errormessage = <div>{errormessage}<div>Step can not be blank<br/></div></div>;
    }
    if(this.refs.salaryScaleEdit.value==""){
      errormessage = <div>{errormessage}<div>Salary Scale can not be blank<br/></div></div>;
    }

    
    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }

    var data = {
      id: this.refs.idEdit.value,
      yearId: this.refs.yearEdit.value,
      categoryId: this.refs.staffCategoryEdit.value,
      levelId: this.refs.staffLevelEdit.value,
      stepId: this.refs.staffStepEdit.value,
      salaryScale: this.refs.salaryScaleEdit.value,
    };

    await UsersDataService.updateSalaryScales(data)
      .then(response => {
        // console.log("response::: ", response)

        if(response.toString().includes("does not exist")){
          Toastr(
            "error",
            response
          );
          return true;
        }else{
          Toastr(
            "info",
            "Salary Scale update is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getSalaryScalesByYearAndCategory();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error updating query"
        );
        this.setState({ loading: false });
      });
      
  }

  createSalaryScaleForm = () => {
    return (
      <form className="form-validate is-alter">
        <div className="toggle-wrap nk-block-tools-toggle">
          <div className="toggle-expand-content" data-content="pageMenu">
            <ul className="nk-block-tools g-3">
              <li className="nk-block-tools-opt">
              
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="form-group">
                  <label className="form-label">Source Year Scale</label>
                  <div className="form-control-wrap" style={{width: 200, height: 10}}>
                    <Select 
                      id="source_year"
                      name="source_year"
                      ref="source_year"
                      className="form-control" 
                      options={this.state.yearsOptions}
                      onChange={this.handleYearChange}
                    />
                  </div>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="form-group">
                  <label className="form-label">Target Year Scale</label>
                  <div className="form-control-wrap" style={{width: 200, height: 10}}>
                    <input
                      type="text"
                      id="target_year"
                      name="target_year"
                      ref="target_year"
                      className="form-control"
                      required
                    />
                  </div>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="form-group">
                  <div className="form-control-wrap" style={{width: 300, height: 10}}>
                    <br></br>
                    <button 
                      onClick={() => this.callCreateateSalaryScale()}
                      type="button" 
                      className="btn btn-lg btn-primary"
                    >
                      Duplicate Salary Scale
                    </button>&nbsp;&nbsp;
                  </div>
                </div>&nbsp;&nbsp;
              </li>
            </ul>
          </div>
        </div>
        <br></br>
        <div className="nk-tb-list">
          <div className="nk-tb-item nk-tb-head">
            <div className="nk-tb-col tb-col-lg">
              <ScaleYearUpdate />
            </div>
          </div>
        </div>
      </form>
    );
  }

  callCreateateSalaryScale = async() => {
    this.setState({ loading: true });
    let errormessage = "";
	  if(this.state.yearsOptions[this.state.selectedYear]==undefined){  
      errormessage = <div>{errormessage}<div>Source Year can not be blank<br/></div></div>;
    }
    if(this.refs.target_year.value==""){
      errormessage = <div>{errormessage}<div>Target Year can not be blank<br/></div></div>;
    }
   
    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }
    var data = {
      source_year: this.state.yearsOptions[this.state.selectedYear].value,
      target_year: this.refs.target_year.value,
    };

    await UsersDataService.createSalaryScales(data)
      .then(response => {
        if(response.toString().includes("does not exist")){
          Toastr(
            "error",
            response
          );
          return true;
        }else{
          this.getYears();
          Toastr(
            "info",
            "Salary Scale update is successful...."
          );
        }
        this.setState({ modalOpen: false});
        this.getSalaryScalesByYearAndCategory();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error updating query"
        );
        this.setState({ loading: false });
      });
      
  }

  getYears = async() => {
    await UsersDataService.getYears()
      .then(res => {
        const data = res.data;
        data.sort((a,b) => a.id - b.id);
        const options = data.map(d => ({
          "value" : d.id,
          "label" : d.year
        }))
        this.setState({yearsOptions: options});
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  getStaffCategorys = async() => {
    await UsersDataService.getStaffCategorys()
      .then(res => {
        const data = res.data;
        data.sort((a,b) => a.id - b.id);
        const options = data.map(d => ({
          "value" : d.id,
          "label" : d.category
        }))
        this.setState({staffCategorysOptions: options});
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  getStaffLevels = async() => {
    await UsersDataService.getStaffLevels()
      .then(res => {
        const data = res.data;
        data.sort((a,b) => a.id - b.id);
        const options = data.map(d => ({
          "value" : d.id,
          "label" : d.level
        }))
        this.setState({staffLevelsOptions: options});
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  getStaffSteps = async() => {
    await UsersDataService.getStaffSteps()
      .then(res => {
        const data = res.data;
        data.sort((a,b) => a.id - b.id);
        const options = data.map(d => ({
          "value" : d.id,
          "label" : d.step
        }))
        this.setState({staffStepsOptions: options});
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  getSalaryScales = async() => {
    var data = {
      unit: localStorage.getItem('unitid'),
    };
    await UsersDataService.getSalaryScales(data)
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

  getSalaryScalesByYearAndCategory = async() => {
    this.setState({ loading: true });
    let errormessage = "";
	  if(this.state.yearsOptions[this.state.selectedYear]==undefined){  
      errormessage = <div>{errormessage}<div>Scale Year can not be blank<br/></div></div>;
    }
    if(this.state.staffCategorysOptions[this.state.selectedStaffCategory]==undefined){  
      errormessage = <div>{errormessage}<div>Staff Category can not be blank<br/></div></div>;
    }
    if(this.state.staffLevelsOptions[this.state.selectedStaffLevel]==undefined){  
      errormessage = <div>{errormessage}<div>Staff Level can not be blank<br/></div></div>;
    }
    
    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }

    var data = {
      year_id: this.state.yearsOptions[this.state.selectedYear].value,
      staff_category_id: this.state.staffCategorysOptions[this.state.selectedStaffCategory].value, 
      staff_level_id: this.state.staffLevelsOptions[this.state.selectedStaffLevel].value, 
    };
    await UsersDataService.getSalaryScalesByYearAndCategory(data)
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
 
  viewPDFDoc = async() => {
    this.setState({ loading: true });
    let errormessage = "";
	  if(this.state.yearsOptions[this.state.selectedYear]==undefined){  
      errormessage = <div>{errormessage}<div>Scale Year can not be blank<br/></div></div>;
    }
    
    if(errormessage !=""){
      errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
      Toastr("error", errormessage);
      return true;
    }
    var data = {
      year_id: this.state.yearsOptions[this.state.selectedYear].value,
    };

    Toastr(
      "info",
      "Salary Scale document is being generated...."
    );

    await UsersDataService.getSalaryScalesByYear(data)
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
      let salaryScales = items.map(item => {
      let selectedYearIndex = this.state.yearsOptions.findIndex(year => year.value == item.year_id);
      let selectedStaffCategoryIndex = this.state.staffCategorysOptions.findIndex(category => category.value == item.staff_category_id);
      let selectedStaffLevelIndex = this.state.staffLevelsOptions.findIndex(level => level.value == item.staff_level_id);
      let selectedStaffStepIndex = this.state.staffStepsOptions.findIndex(step => step.value == item.staff_step_id);
      return ( 
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-refNo">{this.state.yearsOptions[selectedYearIndex].label}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-refNo">{this.state.staffCategorysOptions[selectedStaffCategoryIndex].label}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-refNo">{this.state.staffLevelsOptions[selectedStaffLevelIndex].label}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-refNo">{this.state.staffStepsOptions[selectedStaffStepIndex].label}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-unit">{item.staff_salary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
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
                            yearId: selectedYearIndex,
                            categoryId: selectedStaffCategoryIndex,
                            levelId: selectedStaffLevelIndex,
                            stepId: selectedStaffStepIndex,
                            salaryScale: item.staff_salary,
                            title: "Edit",
                            selectedYear: this.state.yearsOptions[selectedYearIndex].label,
                            selectedStaffCategory: this.state.staffCategorysOptions[selectedStaffCategoryIndex].label,
                            selectedStaffLevel: this.state.staffLevelsOptions[selectedStaffLevelIndex].label,
                            selectedStaffStep: this.state.staffStepsOptions[selectedStaffStepIndex].label,
                          },
                        })
                      }
                      className="icon ni ni-pen"
                      title="Edit Record"
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
        title="Salary Scale Form"
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
                <li className="nk-block-tools-opt">
                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <div className="form-control-wrap" style={{width: 200, height: 10}}>
                      <Select 
                        id="year_header"
                        name="year_header"
                        ref="year_header"
                        className="form-control" 
                        options={this.state.yearsOptions}
                        onChange={this.handleYearChange}
                      />
                    </div>
                  </div>&nbsp;&nbsp;
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <div className="form-control-wrap" style={{width: 200, height: 10}}>
                      <Select 
                        id="staffCategory_header"
                        name="staffCategory_header"
                        ref="staffCategory_header"
                        className="form-control" 
                        options={this.state.staffCategorysOptions}
                        onChange={this.handleStaffCategoryChange}
                      />
                    </div>
                  </div>&nbsp;&nbsp;
                  <div className="form-group">
                   <label className="form-label">Level</label>
                    <div className="form-control-wrap" style={{width: 200, height: 10}}>
                      <Select 
                        id="staffLevel_header"
                        name="staffLevel_header"
                        ref="staffLevel_header"
                        className="form-control" 
                        options={this.state.staffLevelsOptions}
                        onChange={this.handleStaffLevelChange}
                      />
                    </div>
                  </div>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.getSalaryScalesByYearAndCategory()}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-list" />
                    <span>List</span>
                  </button>&nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() => this.setState({ modalOpen: true, selectedRecord: {title: "Duplicate"}})}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-plus" />
                    <span>Manage Salary Scales</span>
                  </button>&nbsp;&nbsp;
                  <button 
                    onClick={() => this.viewPDFDoc()}
                    type="button" 
                    className="btn btn-lg btn-primary"
                  >
                    Print Salary Scale
                  </button>
                </li>
              </ul>
            </div>
          </div>
        }
      >
        <CustomModal
          title={(this.state.selectedRecord.title == "Edit" ? "Edit User" : "Manage Salary Scales")}
          content={this.state.selectedRecord.title == "Edit" ? this.editForm() : this.createSalaryScaleForm()}
          isVisible={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          bigForm={(this.state.selectedRecord.title == "Edit" ? false : true)}
        />

        <PDFSalaryScaleDocument
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
                    <span><h5>Scale Years</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Categories</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Levels</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span><h5>Steps</h5></span>
                  </div>

                  <div className="nk-tb-col nk-tb-col-tools"></div>
                </div>
                {/* .nk-tb-item */}
                {salaryScales}
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
