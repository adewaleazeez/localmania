import React, { Component } from "react";
import CustomModal from "../../Components/CustomModal";
import VariationAdviceList from "./VariationAdviceList";
// import VariationAdviceDocs from "./VariationAdviceDocs";
// import PDFVariationAdviceDocument from "./PDFVariationAdviceDocument";
import MainLayout from "../../Components/Layouts/MainLayout";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { Redirect } from "react-router-dom";

const variationReasonList = [
    { value: 0, label: 'A/PROM' },
    { value: 1, label: 'A/INCRE' }
];

const loanGrantedList = [
    { value: 0, label: 'No' },
    { value: 1, label: 'Yes' }
];

var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
function toWords(s) {
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++; sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' '; sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'Hundred ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    return str;
}

export default class VariationAdvice extends Component {
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
            selectedVariationReason: 0,
            selectedLoanGranted: 0,
            selectedOldYear: 0,
            selectedNewYear: 0,
            selectedOldStaffCategory: 0,
            selectedNewStaffCategory: 0,
            selectedOldStaffLevel: 0,
            selectedNewStaffLevel: 0,
            selectedOldStaffStep: 0,
            selectedNewStaffStep: 0,
        };
        this.handleVariationReasonChange = this.handleVariationReasonChange.bind(this);
        this.handleLoanGrantedChange = this.handleLoanGrantedChange.bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('unitid') != 10 && localStorage.getItem('unitid') != 30) {
            alert("Access Denid!!!\nOnly Salary And System Audit unit is allowed access to Variation Advice menu");
            this.setState({ redirectUrl: "/user/dashboard" });
        }
    }

    componentDidMount() {
        var curr = new Date();
        curr.setDate(curr.getDate());
        this.setState({ dateNow: curr.toISOString().substr(0, 10) });
        this.getYears();
        this.getStaffCategorys();
        this.getStaffLevels();
        this.getStaffSteps();
        this.getStaffDetails();
    }

    componentWillUnmount() {

    }

    handleVariationReasonChange(e) {
        console.log("e.value::: ", typeof (e.value))
        this.state.selectedVariationReason = 0; //e.value;
        // this.setState({ selectedVariationReason: e.value });
    }

    handleLoanGrantedChange(e) {
        console.log("e.value::: ", typeof (e.value))
        this.state.selectedLoanGranted = 0; //e.value;
        // this.setState({ selectedLoanGranted: e.value });
    }

    handleYearChange = (e, opt) => {
        let index = this.state.yearsOptions.findIndex(year => year.label == e.label);
        (opt.props.name === "oldScaleYearEdit") ? this.setState({ selectedOldYear: index }) : this.setState({ selectedNewYear: index });
    }

    handleStaffCategoryChange = (e, opt) => {
        let index = this.state.staffCategorysOptions.findIndex(category => category.label == e.label);
        (opt.props.name === "oldStaffCategoryEdit") ? this.setState({ selectedOldStaffCategory: index }) : this.setState({ selectedNewStaffCategory: index });
    }

    handleStaffLevelChange = (e, opt) => {
        let index = this.state.staffLevelsOptions.findIndex(level => level.label == e.label);
        (opt.props.name === "oldStaffLevelEdit") ? this.setState({ selectedOldStaffLevel: index }) : this.setState({ selectedNewStaffLevel: index });
    }

    handleStaffStepChange = (e, opt) => {
        let index = this.state.staffStepsOptions.findIndex(step => step.label == e.label);
        (opt.props.name === "oldStaffStepEdit") ? this.setState({ selectedOldStaffStep: index }) : this.setState({ selectedNewStaffStep: index });
    }

    editForm = () => {
        { localStorage.setItem('staffid', this.state.selectedRecord.id); }
        { localStorage.setItem('staffNo', this.state.selectedRecord.staffNo); }
        { localStorage.setItem('staffName', this.state.selectedRecord.staffName); }
        { localStorage.setItem('rank', this.state.selectedRecord.rank); }
        { localStorage.setItem('fileNo', this.state.selectedRecord.fileNo); }
        { localStorage.setItem('ippisNo', this.state.selectedRecord.ippisNo); }
        { localStorage.setItem('oldScaleYear', this.state.selectedRecord.newScaleYear); }
        { localStorage.setItem('oldStaffCategory', this.state.selectedRecord.newStaffCategory); }
        { localStorage.setItem('oldStaffLevel', this.state.selectedRecord.newStaffLevel); }
        { localStorage.setItem('oldStaffStep', this.state.selectedRecord.newStaffStep); }
        { localStorage.setItem('oldStaffSalary', this.state.selectedRecord.newStaffSalary); }
        return (
            <form className="form-validate is-alter">
                <div className="card card-bordered">
                    <div className="card-inner-group">
                        <div className="card-inner p-0">
                            <div className="nk-tb-list">
                                {/* <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Staff No<div style={{ paddingRight: "200px" }}></div></label>
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
                                                type="hidden"
                                                id="staffIdEdit"
                                                name="staffIdEdit"
                                                ref="staffIdEdit"
                                                className="form-control"
                                                required
                                                defaultValue={this.state.selectedRecord.staffId}
                                            />
                                            <input
                                                type="text"
                                                id="staffNoEdit"
                                                name="staffNoEdit"
                                                ref="staffNoEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.staffNo}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Staff Name<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="staffNameEdit"
                                                name="staffNameEdit"
                                                ref="staffNameEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.staffName}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Rank<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="rankEdit"
                                                name="rankEdit"
                                                ref="rankEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.rank}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">File No<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="fileNoEdit"
                                                name="fileNoEdit"
                                                ref="fileNoEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.fileNo}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Ippis (Oracle) No<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="ippisNoEdit"
                                                name="ippisNoEdit"
                                                ref="ippisNoEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.ippisNo}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Scale Year<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldScaleYearEdit"
                                                name="oldScaleYearEdit"
                                                ref="oldScaleYearEdit"
                                                className="form-control"
                                                options={this.state.yearsOptions}
                                                onChange={e => this.handleYearChange(e, this.refs.oldScaleYearEdit)}
                                                defaultValue={this.state.selectedRecord.oldScaleYear}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Category<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldStaffCategoryEdit"
                                                name="oldStaffCategoryEdit"
                                                ref="oldStaffCategoryEdit"
                                                className="form-control"
                                                options={this.state.staffCategorysOptions}
                                                onChange={e => this.handleStaffCategoryChange(e, this.refs.oldStaffCategoryEdit)}
                                                defaultValue={this.state.selectedRecord.oldStaffCategory}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Level<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldStaffLevelEdit"
                                                name="oldStaffLevelEdit"
                                                ref="oldStaffLevelEdit"
                                                className="form-control"
                                                options={this.state.staffLevelsOptions}
                                                onChange={e => this.handleStaffLevelChange(e, this.refs.oldStaffLevelEdit)}
                                                defaultValue={this.state.selectedRecord.oldStaffLevel}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Step<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="oldStaffStepEdit"
                                                name="oldStaffStepEdit"
                                                ref="oldStaffStepEdit"
                                                className="form-control"
                                                options={this.state.staffStepsOptions}
                                                onChange={e => this.handleStaffStepChange(e, this.refs.oldStaffStepEdit)}
                                                defaultValue={this.state.selectedRecord.oldStaffStep}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Old Staff Salary<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="oldStaffSalaryEdit"
                                                name="oldStaffSalaryEdit"
                                                ref="oldStaffSalaryEdit"
                                                className="form-control"
                                                readOnly
                                                disabled
                                                defaultValue={this.state.selectedRecord.oldStaffSalary}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Scale Year<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newScaleYearEdit"
                                                name="newScaleYearEdit"
                                                ref="newScaleYearEdit"
                                                className="form-control"
                                                options={this.state.yearsOptions}
                                                onChange={e => this.handleYearChange(e, this.refs.newScaleYearEdit)}
                                                defaultValue={this.state.selectedRecord.newScaleYear}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Staff Category<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newStaffCategoryEdit"
                                                name="newStaffCategoryEdit"
                                                ref="newStaffCategoryEdit"
                                                className="form-control"
                                                options={this.state.staffCategorysOptions}
                                                onChange={e => this.handleStaffCategoryChange(e, this.refs.newStaffCategoryEdit)}
                                                defaultValue={this.state.selectedRecord.newStaffCategory}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Staff Level<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newStaffLevelEdit"
                                                name="newStaffLevelEdit"
                                                ref="newStaffLevelEdit"
                                                className="form-control"
                                                options={this.state.staffLevelsOptions}
                                                onChange={e => this.handleStaffLevelChange(e, this.refs.newStaffLevelEdit)}
                                                defaultValue={this.state.selectedRecord.newStaffLevel}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">New Staff Step<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="newStaffStepEdit"
                                                name="newStaffStepEdit"
                                                ref="newStaffStepEdit"
                                                className="form-control"
                                                options={this.state.staffStepsOptions}
                                                onChange={e => this.handleStaffStepChange(e, this.refs.newStaffStepEdit)}
                                                defaultValue={this.state.selectedRecord.newStaffStep}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg" onClick={console.log("newStaffSalaryEdit clicked1")}>
                                        <label className="form-label" onClick={console.log("newStaffSalaryEdit clicked2")}>New Staff Salary<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap" onClick={console.log("newStaffSalaryEdit clicked3")}>
                                            <input
                                                className="form-control"
                                                id="newStaffSalaryEdit"
                                                name="newStaffSalaryEdit"
                                                ref="newStaffSalaryEdit"
                                                onMouseUp={console.log("                                                mouseup")}
                                                onMouseDown={console.log("newStaffSalaryEdit mousedown")}
                                                onMouseOver={console.log("newStaffSalaryEdit mouseover")}
                                                onClick={console.log("newStaffSalaryEdit clicked4")}
                                                onBlur={console.log("newStaffSalaryEdit blurred")}
                                                onKeyDown={console.log("newStaffSalaryEdit keydown")}
                                                onKeyUp={console.log("newStaffSalaryEdit keyup")}
                                                // readOnly
                                                // disabled
                                                defaultValue={this.state.selectedRecord.newStaffSalary}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Amount Variation<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="variationAmountEdit"
                                                name="variationAmountEdit"
                                                ref="variationAmountEdit"
                                                readOnly
                                                disabled
                                                defaultValue={this.state.selectedRecord.amount}
                                                onBlur={() => this.getAmountInWords('edit')}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Effective Date<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="date"
                                                id="effectiveDateEdit"
                                                name="effectiveDateEdit"
                                                ref="effectiveDateEdit"
                                                defaultValue={this.state.selectedRecord.voucherDate}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Authority Gazzete Notification<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="authorityGazzeteNotificationEdit"
                                                name="authorityGazzeteNotificationEdit"
                                                ref="authorityGazzeteNotificationEdit"
                                                defaultValue={this.state.selectedRecord.beneficiaries}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Wheather Loan Granted<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="loanGrantedEdit"
                                                name="loanGrantedEdit"
                                                ref="loanGrantedEdit"
                                                className="form-control"
                                                defaultValue={loanGrantedList[0].label}
                                                options={loanGrantedList}
                                                onChange={this.handleLoanGrantedChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Reason for Variation<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="variationReasonEdit"
                                                name="variationReasonEdit"
                                                ref="variationReasonEdit"
                                                className="form-control"
                                                defaultValue={variationReasonList[0].label}
                                                options={variationReasonList}
                                                onChange={this.handleVariationReasonChange}
                                            />
                                        </div>
                                    </div>
                                </div> */}
                                <div className="nk-tb-item nk-tb-head">
                                    {/* <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Remarks<div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                readOnly
                                                disabled
                                                id="remarksEdit"
                                                name="remarksEdit"
                                                ref="remarksEdit"
                                                defaultValue={this.state.selectedRecord.remarks}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label"><div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <div>
                                                <button
                                                    onClick={() => this.callUpdateVariationAdvice()}
                                                    type="button"
                                                    className="btn btn-lg btn-primary"
                                                >
                                                    Update Variation Advice
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label"><div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <div>
                                                <button
                                                    onClick={() => this.viewPDFDoc()}
                                                    type="button"
                                                    className="btn btn-lg btn-primary"
                                                >
                                                    Print Variation Advice
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label"><div style={{ paddingRight: "200px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <div>
                                                <button
                                                    onClick={() => this.callDeleteVariationAdvice()}
                                                    type="button"
                                                    className="btn btn-lg btn-danger"
                                                >
                                                    Delete Variation Advice
                                                </button>

                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="nk-tb-list">
                                        <div className="nk-tb-item nk-tb-head">
                                            <div className="nk-tb-col tb-col-lg">
                                                <VariationAdviceList />
                                            </div>
                                            <div className="nk-tb-col tb-col-lg">
                                                {/* <VariationAdviceDocs /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ paddingBottom: "200px" }}></div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
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
                                        <label className="form-label">Staff No</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="staffNo"
                                                name="staffNo"
                                                ref="staffNo"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Staff Name</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="staffName"
                                                name="staffName"
                                                ref="staffName"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Rank</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="rank"
                                                name="rank"
                                                ref="rank"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">File No</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="fileNo"
                                                name="fileNo"
                                                ref="fileNo"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Ippis (Oracle) No</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="ippisNo"
                                                name="ippisNo"
                                                ref="ippisNo"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label"></label>
                                        <div className="form-control-wrap">
                                            <button
                                                onClick={() => this.callCreateStaffDetails()}
                                                type="button"
                                                className="btn btn-lg btn-primary"
                                            >
                                                Add New Staff
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ paddingBottom: "200px" }}></div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    getAmountInWords = (opt) => {
        let amount = this.refs.variationAmountEdit.value;
        //let total -= parseFloat(amount);
        let totals = amount.split('.');
        let naira = totals[0];
        let kobo = totals[1];
        naira = (parseInt(naira) > 0) ? toWords(naira) + " Naira" : "";
        kobo = (parseInt(kobo) > 0) ? toWords(kobo) + " Kobo" : "";
        let amountWords = naira + " " + kobo;
        (opt === 'edit') ? (this.refs.amountInWordsEdit.value = amountWords) : (this.refs.amountInWords.value = amountWords);
    }

    callCreateStaffDetails = async () => {
        this.setState({ loading: true });
        let errormessage = "";
        if (this.refs.staffNo.value == "") {
            errormessage = <div>{errormessage}<div>Staff No can not be blank<br /></div></div>;
        }
        if (this.refs.staffName.value == "") {
            errormessage = <div>{errormessage}<div>Staff Name can not be blank<br /></div></div>;
        }
        if (this.refs.rank.value == "") {
            errormessage = <div>{errormessage}<div>Rank can not be blank<br /></div></div>;
        }
        if (this.refs.fileNo.value == "") {
            errormessage = <div>{errormessage}<div>File No can not be blank<br /></div></div>;
        }
        if (this.refs.ippisNo.value == "") {
            errormessage = <div>{errormessage}<div>Ippis (Oracle) No can not be blank<br /></div></div>;
        }

        if (errormessage != "") {
            errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
            Toastr("error", errormessage);
            return true;
        }

        var data = {
            staffNo: this.refs.staffNo.value,
            staffName: this.refs.staffName.value,
            rank: this.refs.rank.value,
            fileNo: this.refs.fileNo.value,
            ippisNo: this.refs.ippisNo.value,
            userId: localStorage.getItem('userid'),
            unitId: localStorage.getItem('unitid'),
        };
        // console.log("data::::::::", data)
        await UsersDataService.createStaffDetail(data)
            .then(response => {
                if (response.toString().includes("does not exist")) {
                    Toastr(
                        "error",
                        response
                    );
                    return true;
                } else {
                    Toastr(
                        "info",
                        "Variation Advice creation is successful...."
                    );
                }
                this.setState({ modalOpen: false });
                this.getStaffDetails();
            })
            .catch(() => {
                Toastr(
                    "error",
                    "Error creating voucher type"
                );
                this.setState({ loading: false });
            });

    };

    getStaffDetails = async () => {
        var data = {
            unit: localStorage.getItem('unitid'),
        };
        await UsersDataService.getStaffDetails(data)
            .then(res => {
                const { perPage } = this.state;
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

    getYears = async () => {
        await UsersDataService.getYears()
            .then(res => {
                const data = res.data;
				data.sort((a, b) => a.id - b.id);
                let count = 0;
                data.map(d => {
                    count = count + 1;
                    if(d.status_flag == '1') {
                        localStorage.setItem('current_year_id', count);
                    }
                });
                const options = data.map(d => ({
                    "value": d.id,
                    "label": d.year
                }));
                this.setState({ yearsOptions: options });
            })
            .catch(e => {
                this.setState({ loading: false });
            });
    };

    getStaffCategorys = async () => {
        await UsersDataService.getStaffCategorys()
            .then(res => {
                const data = res.data;
                data.sort((a, b) => a.id - b.id);
                const options = data.map(d => ({
                    "value": d.id,
                    "label": d.category
                }))
                this.setState({ staffCategorysOptions: options });
            })
            .catch(e => {
                this.setState({ loading: false });
            });
    };

    getStaffLevels = async () => {
        await UsersDataService.getStaffLevels()
            .then(res => {
                const data = res.data;
                data.sort((a, b) => a.id - b.id);
                const options = data.map(d => ({
                    "value": d.id,
                    "label": d.level
                }))
                this.setState({ staffLevelsOptions: options });
            })
            .catch(e => {
                this.setState({ loading: false });
            });
    };

    getStaffSteps = async () => {
        await UsersDataService.getStaffSteps()
            .then(res => {
                const data = res.data;
                data.sort((a, b) => a.id - b.id);
                const options = data.map(d => ({
                    "value": d.id,
                    "label": d.step
                }))
                this.setState({ staffStepsOptions: options });
            })
            .catch(e => {
                this.setState({ loading: false });
            });
    };

    callUpdateVariationAdvice = async () => {
        // this.setState({ loading: true });
        // let errormessage = "";
        // if (this.refs.originNoEdit.value == "") {
        //     errormessage = <div>{errormessage}<div>Origin No can not be blank<br /></div></div>;
        // }
        // if (this.refs.beneficiariesEdit.value == "") {
        //     errormessage = <div>{errormessage}<div>Beneficiaries can not be blank<br /></div></div>;
        // }
        // if (this.refs.amountEdit.value == "") {
        //     errormessage = <div>{errormessage}<div>Amount can not be blank<br /></div></div>;
        // }
        // if (this.refs.voucherNoEdit.value == "") {
        //     errormessage = <div>{errormessage}<div>Voucher No can not be blank<br /></div></div>;
        // }
        // if (statusOptions[this.state.selectedStatus] == undefined) {
        //     errormessage = <div>{errormessage}<div>Status can not be blank<br /></div></div>;
        // }

        // if (errormessage != "") {
        //     errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
        //     Toastr("error", errormessage);
        //     return true;
        // }

        // var data = {
        //     id: this.refs.idEdit.value,
        //     originNo: this.refs.originNoEdit.value,
        //     station: this.refs.stationEdit.value,
        //     head: this.refs.headEdit.value,
        //     sHead: this.refs.sHeadEdit.value,
        //     dataType: this.refs.dataTypeEdit.value,
        //     source: this.refs.sourceEdit.value,
        //     voucherNo: this.refs.voucherNoEdit.value,
        //     classificationCode: this.refs.classificationCodeEdit.value,
        //     voucherDate: this.refs.voucherDateEdit.value,
        //     amount: this.refs.amountEdit.value,
        //     details: this.refs.detailsEdit.value,
        //     amountInWords: this.refs.amountInWordsEdit.value,
        //     beneficiaries: this.refs.beneficiariesEdit.value,
        //     status: this.state.selectedStatus.toString(),
        //     userId: localStorage.getItem('userid'),
        //     unitId: localStorage.getItem('unitid'),
        // };
        // await UsersDataService.updateVariationAdvice(data)
        //     .then(response => {
        //         // console.log("response::::: ",response.response.status)
        //         if (response.status == 200 && response.data.message.toString().includes("successfully")) {
        //             Toastr(
        //                 "info",
        //                 response.data.message
        //             );
        //         } else if (response.data.message.toString().includes("already approved") || response.data.message.toString().includes("already rejected")) {
        //             Toastr(
        //                 "error",
        //                 response.data.message
        //             );
        //             return true;
        //         }
        //         this.setState({ modalOpen: false });
        //         this.getVariationAdvices();
        //     })
        //     .catch(() => {
        //         Toastr(
        //             "error",
        //             "Error updating voucher type"
        //         );
        //         this.setState({ loading: false });
        //     });

    };

    callDeleteVariationAdvice = async () => {
        // this.setState({ loading: true });
        // var data = {
        //     id: this.refs.idEdit.value,
        //     originNo: this.refs.originNoEdit.value,
        //     station: this.refs.stationEdit.value,
        //     head: this.refs.headEdit.value,
        //     sHead: this.refs.sHeadEdit.value,
        //     dataType: this.refs.dataTypeEdit.value,
        //     source: this.refs.sourceEdit.value,
        //     voucherNo: this.refs.voucherNoEdit.value,
        //     classificationCode: this.refs.classificationCodeEdit.value,
        //     voucherDate: this.refs.voucherDateEdit.value,
        //     amount: this.refs.amountEdit.value,
        //     details: this.refs.detailsEdit.value,
        //     amountInWords: this.refs.amountInWordsEdit.value,
        //     beneficiaries: this.refs.beneficiariesEdit.value,
        //     status: this.state.selectedStatus.toString(),
        //     userId: localStorage.getItem('userid'),
        //     unitId: localStorage.getItem('unitid'),
        // };
        // await UsersDataService.deleteVariationAdvice(data)
        //     .then(response => {
        //         if (typeof (response) !== "object") {
        //             if (response.toString().includes("Error")) {
        //                 Toastr("error", response);
        //                 return true;
        //             }
        //         } else {
        //             Toastr(
        //                 "info",
        //                 "Voucher delete is successful...."
        //             );
        //         }
        //         this.setState({ modalOpen: false });
        //         this.getVariationAdvices();
        //     })
        //     .catch(e => {
        //         console.log(e)

        //         Toastr(
        //             "error",
        //             "Error deleting voucher type"
        //         );
        //         this.setState({ loading: false });
        //     });

    };

    getVariationAdvices = async () => {
        // var data = {
        //     unit: localStorage.getItem('unitid'),
        // };
        // await UsersDataService.getVariationAdvices(data)
        //     .then(res => {
        //         const { perPage } = this.state;
        //         const list = res.data;
        //         this.setState({
        //             list,
        //             pages: Math.ceil(list.length / perPage)
        //         });
        //     })
        //     .catch(() => {
        //         this.setState({ loading: false });
        //     });
    };

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({ page })
    };

    handleKeyPress = (e) => {
        var key = e.key;
        if (key == "Enter") {
            this.getVariationAdvicesByOption();
        }
    };

    getVariationAdvicesByOption = async () => {
        // this.setState({ loading: true });
        // if (this.refs.searchStr.value == "") {
        //     Toastr(
        //         "error",
        //         "Invalid search text"
        //     );
        //     return true;
        // }
        // var data = {
        //     searchStr: this.refs.searchStr.value,
        //     unit: localStorage.getItem('unitid'),
        // };
        // await UsersDataService.getVariationAdvicesByOption(data)
        //     .then(res => {
        //         const { perPage } = this.state;
        //         const list = res.data;
        //         this.setState({
        //             list,
        //             pages: Math.ceil(list.length / perPage)
        //         });
        //     })
        //     .catch(() => {
        //         this.setState({ loading: false });
        //     });
    };

    // viewPDFDoc = async () => {
    //     this.setState({ loading: true });
    //     var data = {
    //         id: this.refs.idEdit.value
    //     };
    //     await UsersDataService.getVariationAdviceById(data)
    //         .then(res => {
    //             const list = res.data;
    //             this.setState({ pdfContent: list });
    //             this.setState({ pdfDocOpen: true });
    //         })
    //         .catch(() => {
    //             this.setState({ loading: false });
    //         });

    //     //setTimeout(() => {}, 10 00);
    // }

    render() {
        const { page, perPage, pages, list } = this.state;
        let items = list.slice(page * perPage, (page + 1) * perPage);
        let sno = 0;
        let variations = items.map(item => {
            let date = new Date(item.voucherDate);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let dt = date.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            let newdate = year + '-' + month + '-' + dt;
            sno++;
            return (
                <div className="nk-tb-item" key={item.id}>
                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-sno">{sno}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-refNo">{item.staffNo}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-auditNo">{item.staffName}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.rank}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.fileNo}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.ippisNo}</span>
                    </div>

                    {/* <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                    </div> */}

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.userName}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.unitName}</span>
                    </div>

                    {/* <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{newdate}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.statusDesc}</span>
                    </div> */}

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
                                                        staffNo: item.staffNo,
                                                        staffName: item.staffName,
                                                        rank: item.rank,
                                                        fileNo: item.fileNo,
                                                        ippisNo: item.ippisNo,
                                                        newScaleYear: item.newScaleYear,
                                                        newStaffCategory: item.newStaffCategory,
                                                        newStaffLevel: item.newStaffLevel,
                                                        newStaffStep: item.newStaffStep,
                                                        newStaffSalary: item.newStaffSalary,
                                                        // dataType: item.dataType,
                                                        // source: item.source,
                                                        // voucherNo: item.voucherNo,
                                                        // classificationCode: item.classificationCode,
                                                        // voucherDate: newdate,
                                                        // amount: item.amount,
                                                        // details: item.details,
                                                        // amountInWords: item.amountInWords,
                                                        // beneficiaries: item.beneficiaries,
                                                        // status: item.status,
                                                        userId: item.userId,
                                                        title: "Edit"
                                                    },
                                                })
                                            }
                                            className="icon ni ni-pen"
                                            title="Edit Record"
                                        ></em>
                                    </button>
                                    {/* <button type="button" className="btn btn-icon tb-delete">
                                        <em
                                            onClick={() =>
                                                this.setState({
                                                    modalOpen: true,
                                                    selectedRecord: {
                                                        id: item.id,
                                                        staffNo: item.staffNo,
                                                        staffName: item.staffName,
                                                        rank: item.rank,
                                                        fileNo: item.fileNo,
                                                        ippisNo: item.ippisNo,
                                                        newScaleYear: item.newScaleYear,
                                                        newStaffCategory: item.newStaffCategory,
                                                        newStaffLevel: item.newStaffLevel,
                                                        newStaffStep: item.newStaffStep,
                                                        newStaffSalary: item.newStaffSalary,
                                                        // dataType: item.dataType,
                                                        // source: item.source,
                                                        // voucherNo: item.voucherNo,
                                                        // classificationCode: item.classificationCode,
                                                        // voucherDate: newdate,
                                                        // amount: item.amount,
                                                        // details: item.details,
                                                        // amountInWords: item.amountInWords,
                                                        // beneficiaries: item.beneficiaries,
                                                        // status: item.status,
                                                        userId: item.userId,
                                                        title: "Delete"
                                                    },
                                                })
                                            }
                                            className="icon ni ni-trash"
                                            title="Delete Record"
                                        ></em>
                                    </button> */}
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
                title="Variation Advice - Staff List"
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
                                        // onClick={() => this.getVariationAdvicesByOption()}
                                        className="toggle btn btn-primary d-none d-md-inline-flex"
                                    >
                                        <em className="icon ni ni-search" />
                                        <span>Search</span>
                                    </button>&nbsp;&nbsp;
                                    <button
                                        type="button"
                                        // onClick={() => this.getVariationAdvices()}
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
                                        <span>Add New Staff</span>
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
                            ? (this.state.selectedRecord.title == "Edit" ? "Variation Advice List" : "Delete Variation Advice") : "New Staff"
                    }
                    content={this.state.selectedRecord ? this.editForm() : this.newForm()}
                    isVisible={this.state.modalOpen}
                    onClose={() => this.setState({ modalOpen: false })}
                    bigForm={this.state.selectedRecord}
                />
                {/* <VariationAdviceList
                    title={"Variation Advice List"}
                    content={this.editForm()}
                    isVisible={this.state.modalOpen}
                    onClose={() => this.setState({ modalOpen: false })}
                    bigForm={true}
                /> */}
                {/* <PDFVariationAdviceDocument
                    title={this.state.docTitle}
                    content={this.state.pdfContent}
                    isVisible={this.state.pdfDocOpen}
                    onClose={() => this.setState({ pdfDocOpen: false })}
                /> */}
                <div className="card card-bordered">
                    <div className="card-inner-group">
                        <div className="card-inner p-0">
                            <div className="nk-tb-list">
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>S/No</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-sm">
                                        <span><h5>Staff No</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-sm">
                                        <span><h5>Staff Name</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Rank</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>File No</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Ippis No</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Users</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Units</h5></span>
                                    </div>

                                    <div className="nk-tb-col nk-tb-col-tools">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5>Actions</h5></div>
                                </div>
                                {/* .nk-tb-item */}

                                {variations}

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
