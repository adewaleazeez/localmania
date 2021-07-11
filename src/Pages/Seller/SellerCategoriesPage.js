import React, { Component } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import CardBlock from "../../Components/CardBlock";
import CenterBlock from "../../Components/CenterBlock";
import CustomModal from "../../Components/CustomModal";
import MainLayout from "../../Components/Layouts/MainLayout";
import Constants from "../../Utils/Constants";

export default class SellerCategoriesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedRecord: null,
      modalOpen: false,
    };
  }

  componentDidMount() {}

  clearCart() {
    //add code to clear shopping cart
  }

  editForm = () => {
    return (
      <form className="form-validate is-alter">
        <div className="form-group">
          <label className="form-label">Category Name</label>
          <div className="form-control-wrap">
            <input
              type="text"
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
              className="form-control"
              defaultValue={this.state.selectedRecord.description}
            />
          </div>
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-lg btn-primary">
            Update Category
          </button>
        </div>
      </form>
    );
  };

  newForm() {
    return (
      <form className="form-validate is-alter">
        <div className="form-group">
          <label className="form-label">Category Name</label>
          <div className="form-control-wrap">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <div className="form-control-wrap">
            <textarea className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-lg btn-primary">
            Create Category
          </button>
        </div>
      </form>
    );
  }

  render() {
    return (
      <MainLayout
        role="seller"
        title="Product Categories"
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
                    onClick={() => this.setState({ modalOpen: true })}
                    className="toggle btn btn-primary d-none d-md-inline-flex"
                  >
                    <em className="icon ni ni-plus" />
                    <span>Add Product Category</span>
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
              ? "Edit Product Cateogry"
              : "New Product Category"
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
                    <span>Name</span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span>Description</span>
                  </div>

                  <div className="nk-tb-col nk-tb-col-tools"></div>
                </div>
                {/* .nk-tb-item */}
                <div className="nk-tb-item">
                  <div className="nk-tb-col tb-col-sm">
                    <span className="tb-product">
                      <span className="title">Product Category name</span>
                    </span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sub">Category description</span>
                  </div>

                  <div className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1 my-n1">
                      <li className="mr-n1">
                        <div>
                          <button
                            type="button"
                            className="btn btn-icon btn-trigger"
                          >
                            <em
                              onClick={() =>
                                this.setState({
                                  modalOpen: true,
                                  selectedRecord: {
                                    name: "Product Category name",
                                    description: "Sample description",
                                  },
                                })
                              }
                              className="icon ni ni-pen"
                            ></em>
                          </button>
                        </div>
                      </li>
                    </ul>
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
