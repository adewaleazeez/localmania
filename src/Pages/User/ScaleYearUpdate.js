import React, { Component } from "react";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import CustomModal from "../../Components/CustomModal";
import ReactPaginate from 'react-paginate';

export default class ScaleYearUpdate extends Component {
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
    this.callUpdateScaleYear = this.callUpdateScaleYear.bind(this);
  };

  componentDidMount() {
    this.getScaleYear();
  };

  componentWillUnmount(){

  };

  async callUpdateScaleYear(chkBox, id, year, description) {
    this.setState({ loading: true });
    let isChecked = chkBox.target.checked;
    var data = {
      id: id,
      year: year,
      description: description,
      status_flag: 1,
    }; 
    await UsersDataService.updateYears(data)
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
        this.getScaleYear();
      })
      .catch(e => {
        Toastr(
          "error",
          "Error updating Scale Year"
        );
        this.setState({ loading: false });
      });
      
  };

  
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

  getScaleYear = async() => {
    await UsersDataService.getYears()
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
        this.getScaleYear();
      }
      
  };

  render() {
    const {page, perPage, pages, list} = this.state;
    let items = list.slice(page * perPage, (page + 1) * perPage);
    let yearScale = items.map(item => {
      //item.status = (isChecked) ? true : false;
      return (
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-scaleYear">{item.year}</span>
          </div>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-beneficiary">
              <input
                type="hidden"
                id="rec_id"
                name="rec_id"
                ref="rec_id"
                defaultValue={item.id}
              />
              <input 
                type="checkbox" 
                id="statusEdit"
                name="statusEdit"
                ref="statusEdit"
                checked = {(item.status_flag == 1) ? true : false}
                onChange={e =>this.callUpdateScaleYear(e, item.id, item.year, item.description)}
              />
            </span>
          </div>
        </div>
        
      )
    }) || '';

    return (
      <div>
        <div className="card card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Year</h5></span>
                  </div>
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Active</h5></span>
                  </div>
                </div>
                {/* .nk-tb-item */}
               
                {yearScale}
                  
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
