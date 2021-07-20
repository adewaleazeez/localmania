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

export default class SellerProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedRecord: null,
      modalOpen: false,
    };
  }

  yesNo=[{label: "Yes", value:"Y"}, {label: "No", value:"N"}];

  componentDidMount() {
  }

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
            <textarea className="form-control" style={{height: "100px"}} placeholder="Product description" />
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
            <div className="col">
                <div className="form-control-wrap">
                    <input type="number" className="form-control" placeholder="Quantity to stock" />
                </div>    
            </div>
          <div className="col">
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
            Add Product
          </button>
        </div>
      </form>
    );
  }

  render() {
    return (
      <MainLayout
        role="seller"
        title="Products"
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
                      <div className="form-control-wrap" style={{width: "250px"}}>
                    <Select options={categories} placeholder="Select category" />
                  </div>
                      
                  </li>
                <li>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-right">
                      <em className="icon ni ni-search" />
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search" style={{width: "250px"}}
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
                    <span>Add Product</span>
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
              ? "Edit Product"
              : "New Product"
          }
          content={this.state.selectedRecord ? this.editForm() : this.newForm()}
          isVisible={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
        />

        <div className="row g-gs">
            {
                productList.map((product, index)=><div className="col-xxl-3 col-lg-4 col-sm-6" key={index}>
            <div className="card card-bordered product-card">
              <div className="product-thumb">
                <Link to={`/seller/product/${product.productId}`}>
                  <img className="card-img-top" src={product.image1} alt="" />
                </Link>
                {product.isNew && <ul className="product-badges">
                  <li><span className="badge badge-success">New</span></li>
                </ul>}
               
              </div>
              <div className="card-inner text-center">
                <ul className="product-tags">
                  <li><a href="#">{product.productCategory}</a></li>
                </ul>
                <h5 className="product-title"><Link to={`/seller/product/${product.productId}`}>{product.productName}</Link></h5>
                {
                    product.discountPercentage > 0?
                    <div className="product-price text-primary h5"><small className="text-muted del fs-13px">{Functions.currencyFormat(product.price)}</small> {Functions.currencyFormat(product.price - (product.discountPercentage/100 * product.price))}</div>:
                    <div className="product-price text-primary h5">{Functions.currencyFormat(product.price)}</div>
                }
                
              </div>
            </div>
          </div>)
            }
          </div>
    
      </MainLayout>
    );
  }
}
