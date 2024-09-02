import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomModal from "../../Components/CustomModal";
import MainLayout from "../../Components/Layouts/MainLayout";
import Dropzone from 'react-dropzone';

export default class UserStockPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            useExcel: false,
            modalOpen: false,
        };
    }

    componentDidMount() {
        if(localStorage.getItem('reload')==="1"){
            localStorage.setItem('reload', "0");
            window.location=window.location;
        }
    }

    componentWillUnmount(){
        localStorage.setItem('reload', "1");
    }
    

    excelForm = () => {
        return <span>
            <Dropzone accept=".xls,.xlsx" maxFiles={1} onDrop={acceptedFiles => this.grabUploadedFile(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()} className="my-dropzone py-5 clickable">
                            <input {...getInputProps()} />
                            <em style={{ fontSize: "36px" }} className="icon ni ni-upload-cloud"></em>
                            <p>Drag 'n' drop excel file here, or click to select files</p>
                        </div>

                    </section>
                )}
            </Dropzone>
            <a className="btn btn-link pl-0 mt-3" href="/path/to/excel-template" target="_blank">Download excel template </a></span>


    };

    singleForm() {
        return (
            <form className="form-validate is-alter">
                <div className="form-group">
                    <label className="form-label">Product</label>
                    <div className="form-control-wrap">
                        <input type="text" className="form-control" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="form-label col-12">Quantity</label>
                    <div className="col-6">
                        <div className="form-control-wrap">
                            <input type="text" className="form-control" required />
                        </div>
                    </div>

                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-lg btn-primary mt-4">
                        Add to stock
                    </button>
                </div>
            </form>
        );
    }

    render() {
        return (
            <MainLayout
                role="user"
                title="Stock Management"
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
                                        <button
                                            type="button"
                                            onClick={() => this.setState({ modalOpen: true, useExcel: false })}
                                            className="toggle btn btn-primary d-none d-md-inline-flex"
                                        >
                                            <em className="icon ni ni-plus" />
                                            <span>Add to stock</span>
                                        </button>
                                    </div>
                                </li>
                                <li className="nk-block-tools-opt">

                                    <button
                                        type="button"
                                        onClick={() => this.setState({ modalOpen: true, useExcel: true })}
                                        className="toggle btn btn-success d-none d-md-inline-flex"
                                    >
                                        <em className="icon ni ni-upload-cloud" />
                                        <span>Excel Upload</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            >
                <CustomModal
                    title={
                        this.state.useExcel
                            ? "Upload new stock"
                            : "Add to stock"
                    }
                    content={this.state.useExcel ? this.excelForm() : this.singleForm()}
                    isVisible={this.state.modalOpen}
                    onClose={() => this.setState({ modalOpen: false })}
                />

                <div className="card card-bordered">
                    <div className="card-inner-group">
                        <div className="card-inner p-0">
                            <div className="nk-tb-list">
                                <div className="nk-tb-item nk-tb-head">
                                    <div className="nk-tb-col tb-col-md">
                                        <span>Date</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                        <span>Product</span>
                                    </div>

                                    <div className="nk-tb-col tb-col-md text-center">
                                        <span>Quantity before</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md text-center">
                                        <span>Quantity added</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md text-center">
                                        <span>New Quantity</span>
                                    </div>
                                </div>
                                {/* .nk-tb-item */}
                                <div className="nk-tb-item">
                                    <div className="nk-tb-col tb-col-md">
                                        <span className="tb-sub">12-01-2021</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                        <span className="tb-product">
                                            <span className="title mr-2">Product Name</span>
                                        </span>
                                    </div>


                                    <div className="nk-tb-col tb-col-md text-center">
                                        <span className="tb-sub">10</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md text-center">
                                        <span className="tb-sub font-weight-bold text-dark">100</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-md text-center">
                                        <span className="tb-sub ">110</span>
                                    </div>

                                </div>
                            </div>
                            {/* .nk-tb-list */}
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }
}
