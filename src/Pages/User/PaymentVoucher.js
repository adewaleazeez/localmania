import React, { Component } from "react";
import CustomModal from "../../Components/CustomModal";
import PaymentVoucherDocs from "./PaymentVoucherDocs";
import PDFPaymentVoucherDocument from "./PDFPaymentVoucherDocument";
import MainLayout from "../../Components/Layouts/MainLayout";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { Redirect } from "react-router-dom";

const statusOptions = [
    { value: 0, label: 'Pending' },
    { value: 1, label: 'Approved' },
    { value: 2, label: 'Rejected' }
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
export default class PaymentVoucher extends Component {
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
            voucherTypeOptions: [],
            selectedVoucherType: 0,
            selectedStatus: 0,
        };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('unitid') != 10 && localStorage.getItem('unitid') != 30) {
            alert("Access Denid!!!\nOnly Salary And System Audit unit is allowed access to Payment Voucher menu");
            this.setState({ redirectUrl: "/user/dashboard" });
        }
    }

    componentDidMount() {
        var curr = new Date();
        curr.setDate(curr.getDate());
        this.setState({ dateNow: curr.toISOString().substr(0, 10) });
        this.getPaymentVouchers();
    }

    componentWillUnmount() {

    }

    handleStatusChange(e) {
        this.setState({ selectedStatus: e.value });
    }

    editForm = () => {
        { localStorage.setItem('voucherid', this.state.selectedRecord.id); }
        { localStorage.setItem('selectedAmount', this.state.selectedRecord.amount); }
        return (
            <form className="form-validate is-alter">
                <div className="card card-bordered">
                    <div className="card-inner-group">
                        <div className="card-inner p-0">
                            <div className="nk-tb-list">
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Origin No</label>
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
                                                id="originNoEdit"
                                                name="originNoEdit"
                                                ref="originNoEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.originNo}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Station</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="stationEdit"
                                                name="stationEdit"
                                                ref="stationEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.station}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Head</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="headEdit"
                                                name="headEdit"
                                                ref="headEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.head}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">S/Head</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="sHeadEdit"
                                                name="sHeadEdit"
                                                ref="sHeadEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.sHead}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Data Type<div style={{ paddingRight: "300px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="dataTypeEdit"
                                                name="dataTypeEdit"
                                                ref="dataTypeEdit"
                                                className="form-control"
                                                defaultValue={this.state.selectedRecord.dataType}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Source</label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="sourceEdit"
                                                name="sourceEdit"
                                                ref="sourceEdit"
                                                defaultValue={this.state.selectedRecord.source}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Voucher No</label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="voucherNoEdit"
                                                name="voucherNoEdit"
                                                ref="voucherNoEdit"
                                                defaultValue={this.state.selectedRecord.voucherNo}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Classification Code</label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="classificationCodeEdit"
                                                name="classificationCodeEdit"
                                                ref="classificationCodeEdit"
                                                defaultValue={this.state.selectedRecord.classificationCode}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Payment Voucher Date</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="date"
                                                readOnly
                                                disabled
                                                id="voucherDateEdit"
                                                name="voucherDateEdit"
                                                ref="voucherDateEdit"
                                                defaultValue={this.state.selectedRecord.voucherDate}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Amount</label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="amountEdit"
                                                name="amountEdit"
                                                ref="amountEdit"
                                                defaultValue={this.state.selectedRecord.amount}
                                                onBlur={() => this.getAmountInWords('edit')}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Beneficiaries</label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="beneficiariesEdit"
                                                name="beneficiariesEdit"
                                                ref="beneficiariesEdit"
                                                defaultValue={this.state.selectedRecord.beneficiaries}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Status<div style={{ paddingRight: "300px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <Select
                                                id="statusEdit"
                                                name="statusEdit"
                                                ref="statusEdit"
                                                className="form-control"
                                                defaultValue={statusOptions[this.state.selectedRecord.status]}
                                                options={statusOptions}
                                                onChange={this.handleStatusChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Details</label>
                                        <div className="form-control-wrap">
                                            <textarea
                                                id="detailsEdit"
                                                name="detailsEdit"
                                                ref="detailsEdit"
                                                defaultValue={this.state.selectedRecord.details}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Amount in Words</label>
                                        <div className="form-control-wrap">
                                            <textarea
                                                className="form-control"
                                                readOnly
                                                disabled
                                                id="amountInWordsEdit"
                                                name="amountInWordsEdit"
                                                ref="amountInWordsEdit"
                                                defaultValue={this.state.selectedRecord.amountInWords}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label"></label>
                                        <div className="form-control-wrap">
                                            {this.state.selectedRecord.title == "Edit" ?
                                                <div>
                                                    <button
                                                        onClick={() => this.callUpdatePaymentVoucher()}
                                                        type="button"
                                                        className="btn btn-lg btn-primary"
                                                    >
                                                        Update Voucher Payment
                                                    </button>&nbsp;&nbsp;<br /><br />

                                                    <button
                                                        onClick={() => this.viewPDFDoc()}
                                                        type="button"
                                                        className="btn btn-lg btn-primary"
                                                    >
                                                        Print Voucher Payment
                                                    </button>
                                                </div>
                                                :
                                                <button
                                                    onClick={() => this.callDeletePaymentVoucher()}
                                                    type="button"
                                                    className="btn btn-lg btn-danger"
                                                >
                                                    Delete Voucher
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="nk-tb-list">
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <PaymentVoucherDocs />
                                    </div>
                                </div>
                            </div>
                            {/*<div style={{paddingBottom: "200px"}}></div>*/}
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
                                        <label className="form-label">Origin No</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="originNo"
                                                name="originNo"
                                                ref="originNo"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Station</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="station"
                                                name="station"
                                                ref="station"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Head</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="head"
                                                name="head"
                                                ref="head"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">S/Head</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="sHead"
                                                name="sHead"
                                                ref="sHead"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Data Type<div style={{ paddingRight: "300px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="dataType"
                                                name="dataType"
                                                ref="dataType"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Source</label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="source"
                                                name="source"
                                                ref="source"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Voucher No</label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="voucherNo"
                                                name="voucherNo"
                                                ref="voucherNo"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Classification Code</label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="classificationCode"
                                                name="classificationCode"
                                                ref="classificationCode"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Payment Voucher Date</label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="date"
                                                readOnly
                                                disabled
                                                id="voucherDate"
                                                name="voucherDate"
                                                ref="voucherDate"
                                                defaultValue={this.state.dateNow}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Amount</label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="amount"
                                                name="amount"
                                                ref="amount"
                                                onBlur={() => this.getAmountInWords('new')}
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Beneficiaries</label>
                                        <div className="form-control-wrap">
                                            <input
                                                className="form-control"
                                                id="beneficiaries"
                                                name="beneficiaries"
                                                ref="beneficiaries"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Status<div style={{ paddingRight: "300px" }}></div></label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                id="status"
                                                name="status"
                                                ref="status"
                                                readOnly
                                                disabled
                                                className="form-control"
                                                defaultValue={statusOptions[0].label}
                                            // options={statusOptions}
                                            // onChange={this.handleStatusChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Details</label>
                                        <div className="form-control-wrap">
                                            <textarea
                                                id="details"
                                                name="details"
                                                ref="details"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label">Amount in Words</label>
                                        <div className="form-control-wrap">
                                            <textarea
                                                className="form-control"
                                                readOnly
                                                disabled
                                                id="amountInWords"
                                                name="amountInWords"
                                                ref="amountInWords"
                                            />
                                        </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                        <label className="form-label"></label>
                                        <div className="form-control-wrap">
                                            <button
                                                onClick={() => this.callCreatePaymentVoucher()}
                                                type="button"
                                                className="btn btn-lg btn-primary"
                                            >
                                                Create Voucher Payment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="nk-tb-list">
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-lg">
                                        <PaymentVoucherDocs />
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
        let amount = (opt === 'edit') ? (this.refs.amountEdit.value) : (this.refs.amount.value);
        //let total -= parseFloat(amount);
        let totals = amount.split('.');
        let naira = totals[0];
        let kobo = totals[1];
        naira = (parseInt(naira) > 0) ? toWords(naira) + " Naira" : "";
        kobo = (parseInt(kobo) > 0) ? toWords(kobo) + " Kobo" : "";
        let amountWords = naira + " " + kobo;
        (opt === 'edit') ? (this.refs.amountInWordsEdit.value = amountWords) : (this.refs.amountInWords.value = amountWords);
    }

    callCreatePaymentVoucher = async () => {
        this.setState({ loading: true });
        let errormessage = "";
        if (this.refs.originNo.value == "") {
            errormessage = <div>{errormessage}<div>Origin No can not be blank<br /></div></div>;
        }
        if (this.refs.beneficiaries.value == "") {
            errormessage = <div>{errormessage}<div>Beneficiaries can not be blank<br /></div></div>;
        }
        if (this.refs.amount.value == "") {
            errormessage = <div>{errormessage}<div>Amount can not be blank<br /></div></div>;
        }
        if (this.refs.voucherNo.value == "") {
            errormessage = <div>{errormessage}<div>Voucher No can not be blank<br /></div></div>;
        }
        if (statusOptions[this.state.selectedStatus] == undefined) {
            errormessage = <div>{errormessage}<div>Status can not be blank<br /></div></div>;
        }

        if (errormessage != "") {
            errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
            Toastr("error", errormessage);
            return true;
        }

        var data = {
            originNo: this.refs.originNo.value,
            station: this.refs.station.value,
            head: this.refs.head.value,
            sHead: this.refs.sHead.value,
            dataType: this.refs.dataType.value,
            source: this.refs.source.value,
            voucherNo: this.refs.voucherNo.value,
            classificationCode: this.refs.classificationCode.value,
            voucherDate: this.refs.voucherDate.value,
            amount: this.refs.amount.value,
            details: this.refs.details.value,
            amountInWords: this.refs.amountInWords.value,
            beneficiaries: this.refs.beneficiaries.value,
            status: this.state.selectedStatus,
            userId: localStorage.getItem('userid'),
            unitId: localStorage.getItem('unitid'),
        };
        // console.log("data::::::::", data)
        await UsersDataService.createPaymentVoucher(data)
            .then(response => {
                if (response.toString().includes("already exists")) {
                    Toastr(
                        "error",
                        response
                    );
                    return true;
                } else {
                    Toastr(
                        "info",
                        "Payment Voucher creation is successful...."
                    );
                }
                this.setState({ modalOpen: false });
                this.getPaymentVouchers();
            })
            .catch(() => {
                Toastr(
                    "error",
                    "Error creating voucher type"
                );
                this.setState({ loading: false });
            });

    };

    callUpdatePaymentVoucher = async () => {
        this.setState({ loading: true });
        let errormessage = "";
        if (this.refs.originNoEdit.value == "") {
            errormessage = <div>{errormessage}<div>Origin No can not be blank<br /></div></div>;
        }
        if (this.refs.beneficiariesEdit.value == "") {
            errormessage = <div>{errormessage}<div>Beneficiaries can not be blank<br /></div></div>;
        }
        if (this.refs.amountEdit.value == "") {
            errormessage = <div>{errormessage}<div>Amount can not be blank<br /></div></div>;
        }
        if (this.refs.voucherNoEdit.value == "") {
            errormessage = <div>{errormessage}<div>Voucher No can not be blank<br /></div></div>;
        }
        if (statusOptions[this.state.selectedStatus] == undefined) {
            errormessage = <div>{errormessage}<div>Status can not be blank<br /></div></div>;
        }

        if (errormessage != "") {
            errormessage = <div><h5>Please correct the following errors:</h5>{errormessage}</div>;
            Toastr("error", errormessage);
            return true;
        }

        var data = {
            id: this.refs.idEdit.value,
            originNo: this.refs.originNoEdit.value,
            station: this.refs.stationEdit.value,
            head: this.refs.headEdit.value,
            sHead: this.refs.sHeadEdit.value,
            dataType: this.refs.dataTypeEdit.value,
            source: this.refs.sourceEdit.value,
            voucherNo: this.refs.voucherNoEdit.value,
            classificationCode: this.refs.classificationCodeEdit.value,
            voucherDate: this.refs.voucherDateEdit.value,
            amount: this.refs.amountEdit.value,
            details: this.refs.detailsEdit.value,
            amountInWords: this.refs.amountInWordsEdit.value,
            beneficiaries: this.refs.beneficiariesEdit.value,
            status: this.state.selectedStatus.toString(),
            userId: localStorage.getItem('userid'),
            unitId: localStorage.getItem('unitid'),
        };
        await UsersDataService.updatePaymentVoucher(data)
            .then(response => {
                // console.log("response::::: ",response.response.status)
                if (response.status == 200 && response.data.message.toString().includes("successfully")) {
                    Toastr(
                        "info",
                        response.data.message
                    );
                } else if (response.data.message.toString().includes("already approved") || response.data.message.toString().includes("already rejected")) {
                    Toastr(
                        "error",
                        response.data.message
                    );
                    return true;
                }
                this.setState({ modalOpen: false });
                this.getPaymentVouchers();
            })
            .catch(() => {
                Toastr(
                    "error",
                    "Error updating voucher type"
                );
                this.setState({ loading: false });
            });

    };

    callDeletePaymentVoucher = async () => {
        this.setState({ loading: true });
        var data = {
            id: this.refs.idEdit.value,
            originNo: this.refs.originNoEdit.value,
            station: this.refs.stationEdit.value,
            head: this.refs.headEdit.value,
            sHead: this.refs.sHeadEdit.value,
            dataType: this.refs.dataTypeEdit.value,
            source: this.refs.sourceEdit.value,
            voucherNo: this.refs.voucherNoEdit.value,
            classificationCode: this.refs.classificationCodeEdit.value,
            voucherDate: this.refs.voucherDateEdit.value,
            amount: this.refs.amountEdit.value,
            details: this.refs.detailsEdit.value,
            amountInWords: this.refs.amountInWordsEdit.value,
            beneficiaries: this.refs.beneficiariesEdit.value,
            status: this.state.selectedStatus.toString(),
            userId: localStorage.getItem('userid'),
            unitId: localStorage.getItem('unitid'),
        };
        await UsersDataService.deletePaymentVoucher(data)
            .then(response => {
                if (typeof (response) !== "object") {
                    if (response.toString().includes("Error")) {
                        Toastr("error", response);
                        return true;
                    }
                } else {
                    Toastr(
                        "info",
                        "Voucher delete is successful...."
                    );
                }
                this.setState({ modalOpen: false });
                this.getPaymentVouchers();
            })
            .catch(e => {
                console.log(e)

                Toastr(
                    "error",
                    "Error deleting voucher type"
                );
                this.setState({ loading: false });
            });

    };

    getPaymentVouchers = async () => {
        var data = {
            unit: localStorage.getItem('unitid'),
        };
        await UsersDataService.getPaymentVouchers(data)
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

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({ page })
    };

    handleKeyPress = (e) => {
        var key = e.key;
        if (key == "Enter") {
            this.getPaymentVouchersByOption();
        }

    };

    getPaymentVouchersByOption = async () => {
        this.setState({ loading: true });
        if (this.refs.searchStr.value == "") {
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
        await UsersDataService.getPaymentVouchersByOption(data)
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

    viewPDFDoc = async () => {
        this.setState({ loading: true });
        var data = {
            id: this.refs.idEdit.value
        };
        await UsersDataService.getPaymentVoucherById(data)
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
        const { page, perPage, pages, list } = this.state;
        let items = list.slice(page * perPage, (page + 1) * perPage);
        let sno = 0;
        let vouchers = items.map(item => {
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
                        <span className="tb-refNo">{item.originNo}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-auditNo">{item.voucherNo}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.beneficiaries}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.userName}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.unitName}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{newdate}</span>
                    </div>

                    <div className="nk-tb-col tb-col-md">
                        <span className="tb-beneficiary">{item.statusDesc}</span>
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
                                                        originNo: item.originNo,
                                                        station: item.station,
                                                        head: item.head,
                                                        sHead: item.sHead,
                                                        dataType: item.dataType,
                                                        source: item.source,
                                                        voucherNo: item.voucherNo,
                                                        classificationCode: item.classificationCode,
                                                        voucherDate: newdate,
                                                        amount: item.amount,
                                                        details: item.details,
                                                        amountInWords: item.amountInWords,
                                                        beneficiaries: item.beneficiaries,
                                                        status: item.status,
                                                        userId: item.userId,
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
                                                        originNo: item.originNo,
                                                        station: item.station,
                                                        head: item.head,
                                                        sHead: item.sHead,
                                                        dataType: item.dataType,
                                                        source: item.source,
                                                        voucherNo: item.voucherNo,
                                                        classificationCode: item.classificationCode,
                                                        voucherDate: newdate,
                                                        amount: item.amount,
                                                        details: item.details,
                                                        amountInWords: item.amountInWords,
                                                        beneficiaries: item.beneficiaries,
                                                        status: item.status,
                                                        userId: item.userId,
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
                title="Payment Voucher"
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
                                        onClick={() => this.getPaymentVouchersByOption()}
                                        className="toggle btn btn-primary d-none d-md-inline-flex"
                                    >
                                        <em className="icon ni ni-search" />
                                        <span>Search</span>
                                    </button>&nbsp;&nbsp;
                                    <button
                                        type="button"
                                        onClick={() => this.getPaymentVouchers()}
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
                                        <span>Add Payment Voucher</span>
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
                            ? (this.state.selectedRecord.title == "Edit" ? "Edit Voucher" : "Delete Voucher")
                            : "New Voucher"
                    }
                    content={this.state.selectedRecord ? this.editForm() : this.newForm()}
                    isVisible={this.state.modalOpen}
                    onClose={() => this.setState({ modalOpen: false })}
                    bigForm={true}
                />
                <PDFPaymentVoucherDocument
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
                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>S/No</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-sm">
                                        <span><h5>Origin. No</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-sm">
                                        <span><h5>Voucher No</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Beneficiaries</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Amount</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Users</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Units</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Date</h5></span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md">
                                        <span><h5>Status</h5></span>
                                    </div>

                                    <div className="nk-tb-col nk-tb-col-tools">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5>Actions</h5></div>
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
