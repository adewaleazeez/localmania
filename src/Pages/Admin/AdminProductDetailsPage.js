import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomModal from "../../Components/CustomModal";
import MainLayout from "../../Components/Layouts/MainLayout";
import ProductRating from "../../Components/Shop/ProductRating";
import Select from "react-select";
import {
  productList, categories
} from "../../Utils/MockData";
import Functions from "../../Utils/Functions";

export default class AdminProductDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedRecord: null,
      modalOpen: false,
      bigImage: null
    };
  }

  yesNo = [{ label: "Yes", value: "Y" }, { label: "No", value: "N" }];
  selectedProduct = productList[0];

  componentDidMount() {
    if(localStorage.getItem('reload')==="1"){
    localStorage.setItem('reload', "0");
    window.location=window.location;
  }
}

componentWillUnmount(){
  localStorage.setItem('reload', "1");
}


  editForm() {
    return (
      <form className="form-validate is-alter">
        <div className="form-group">
          <div className="form-control-wrap">
            <Select options={categories} placeholder="Select category" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control-wrap">
            <input type="text" className="form-control" placeholder="Product name" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control-wrap">
            <textarea className="form-control" style={{ height: "100px" }} placeholder="Product description" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col">
            <div className="form-control-wrap">
              <input type="number" className="form-control" placeholder="Price" />
            </div>
          </div>
          <div className="col">
            <div className="form-control-wrap">
              <input type="number" className="form-control" placeholder="Discount" />
            </div>
          </div>
        </div>
        <div className="form-group row">

          <div className="col-6">
            <div className="form-control-wrap">
              <Select options={this.yesNo} placeholder="Featured?" />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="form-label col-12 mt-2">Product image(s)</label>
          <div className="col">
            <div className="form-control-wrap">
              <input type="file" className="form-control" />
            </div>
          </div>
          <div className="col">
            <div className="form-control-wrap">
              <input type="file" className="form-control" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-lg btn-primary btn-block mt-4">
            Update Product
          </button>
        </div>
      </form>
    );
  }

  render() {
    return (
      <MainLayout
        role="admin"
        title={<em onClick={() => this.props.history.goBack()} className="clickable icon ni ni-arrow-left-circle-fill"></em>}
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
                    <span>Edit Product</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        }
      >
        <CustomModal
          title="Edit Product"
          content={this.editForm()}
          isVisible={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
        />
        <div className="card card-bordered">
          <div className="card-inner">
            <div className="row pb-5">
              <div className="col-lg-6">
                <div className="product-gallery mr-xl-1 mr-xxl-5 border-0">
                  <div className="slider-init slick-initialized slick-slider" id="sliderFor">
                    <div className="slick-list draggable">
                      <div className="slick-track" style={{ opacity: 1, width: '3105px' }}>
                        <div className="slider-item rounded slick-slide slick-current slick-active" data-slick-index={0} aria-hidden="false" style={{ width: '621px', position: 'relative', left: '0px', top: '0px', zIndex: 999, opacity: 1 }} tabIndex={0}>
                          <img src={this.state.bigImage || this.selectedProduct.image2} className="w-100" alt="" />
                        </div>


                      </div></div>
                  </div>{/* .slider-init */}
                  <div className="slider-init slider-nav slick-initialized slick-slider" id="sliderNav">
                    <div className="slick-list draggable" style={{ padding: '0px 50px' }}>
                      <div className="slick-track" style={{ opacity: 1, width: '470px', transform: 'translate3d(0px, 0px, 0px)' }}>
                        <div className="slider-item slick-slide slick-center" data-slick-index={0} aria-hidden="true" style={{ width: '94px' }} tabIndex={0}>
                          <div className="thumb">
                            <img src={this.selectedProduct.image1}
                              onClick={() => this.setState({ bigImage: this.selectedProduct.image1 })} alt="" />
                          </div>
                        </div>
                        <div className="slider-item slick-slide" data-slick-index={1} aria-hidden="true" style={{ width: '94px' }} tabIndex={0}>
                          <div className="thumb">
                            <img src={this.selectedProduct.image2} onClick={() => this.setState({ bigImage: this.selectedProduct.image2 })} alt="" />
                          </div>
                        </div>
                      </div></div>
                  </div>{/* .slider-nav */}
                </div>{/* .product-gallery */}
              </div>{/* .col */}
              <div className="col-lg-6">
                <div className="product-info mt-5 mr-xxl-5">
                  <h4 className="product-price text-primary">{Functions.currencyFormat(this.selectedProduct.price)}</h4>
                  <h2 className="product-title">{this.selectedProduct.productName}</h2>
                  <div className="product-rating">
                    <ProductRating stars={4} innerPage />
                    <div className="amount">(10 Reviews)</div>
                  </div>{/* .product-rating */}

                  <div className="product-meta">
                    <ul className="d-flex g-3 gx-5">
                      <li>
                        <div className="fs-14px text-muted">Category</div>
                        <div className="fs-16px fw-bold text-secondary">{this.selectedProduct.productCategory}</div>
                      </li>
                      <li>
                        <div className="fs-14px text-muted">Discount</div>
                        <div className="fs-16px fw-bold text-secondary">{this.selectedProduct.discountPercentage}%</div>
                      </li>
                      <li>
                        <div className="fs-14px text-muted">Featured</div>
                        <div className="fs-16px fw-bold text-secondary">Yes</div>
                      </li>
                      <li>
                        <div className="fs-14px text-muted">Quantity in stock</div>
                        <div className="fs-16px fw-bold text-secondary">50</div>
                      </li>
                    </ul>
                  </div>

                  <div className="product-excrept text-soft">
                    <p className="lead"><strong className="fs-16px fw-bold text-secondary">Description</strong><br />
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>

                  <div className="product-meta">
                    <ul className="d-flex flex-wrap ailgn-center g-2 pt-1">
                      <li className="w-140px">
                        <div className="form-control-wrap number-spinner-wrap">
                          <input style={{ borderRadius: "50px" }} type="number" className="form-control number-spinner" defaultValue={0} />
                        </div>
                      </li>
                      <li>
                        <button className="btn btn-primary btn-rounded">Add to Stock</button>
                      </li>

                    </ul>
                  </div>{/* .product-meta */}
                </div>{/* .product-info */}
              </div>{/* .col */}
            </div>{/* .row */}

          </div>
        </div>
      </MainLayout>
    );
  }
}
