import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UsersDataService from "../../Components/Services/Users.Service";
import Toastr from "../../Utils/Toastr";
import CustomModal from "../../Components/CustomModal";

export default class PaymentVoucherDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedRecord: null,
      base64File: null,
      imageFile: null,
      modalOpen: false,
      list: [],
      perPage: 5,
      page: 0,
      pages: 0,
      docTitle: "",
    };
    this.getBase64 = this.getBase64.bind(this);
  };
  

  componentDidMount() {
    localStorage.setItem('openClose', 'false');
    this.getPaymentVoucherDocs();
  };

  componentWillUnmount(){

  };

  getBase64() {
    let file = this.fileUploaded.files[0];
    var reader = new FileReader();
    reader.onload = (event) => {
        var base64 = event.target.result;
        this.setState({ base64File: base64 });
        this.callCreatePaymentVoucherDoc();
    };

    reader.onerror = () => {
        this.setState({filePresent: false});
    };
    reader.readAsDataURL(file);
  }

  callCreatePaymentVoucherDoc = async() => {
    this.setState({ loading: true });
    if(this.refs.description.value==""){
      Toastr(
        "error",
        "Invalid Doc description"
      );
      return true;
    }

    if(this.state.base64File=="" || this.state.base64File==undefined || this.state.base64File==null){
      Toastr(
        "error",
        "Invalid Doc file"
      );
      return true;
    }


    
    var data = {
      description: this.refs.description.value,
      scannedDoc: this.state.base64File,
      paymentVoucherId: localStorage.getItem('voucherid')
    };
    await UsersDataService.createPaymentVoucherDoc(data)
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
          "Voucher Doc creation is successful...."
        );
      }
      this.getPaymentVoucherDocs();
    })
    .catch(() => {
      Toastr(
        "error",
        "Error creating voucher doc"
      );
      this.setState({ loading: false });
    });
  };
    
  viewModal = async(img, title) => {
    this.setState({ docTitle: title });
    this.setState({ imageFile: img });
    setTimeout(() => {
      this.setState({ modalOpen: true })
    }, 1000);
  }

  callDeletePaymentVoucherDoc = async(record_id) => {
    this.setState({ loading: true });
    var data = {
      id: record_id,
    };
    await UsersDataService.deletePaymentVoucherDoc(data)
      .then(response => {
        if(typeof(response) !== "object"){
          if(response.toString().includes("Error")){
            Toastr("error", response);
            return true;
          }
        }else{
          Toastr(
            "info",
            "Voucher Doc delete is successful...."
          );
        }
        this.getPaymentVoucherDocs();
      })
      .catch(() => {
        Toastr(
          "error",
          "Error deleting voucher charge "
        );
        this.setState({ loading: false });
      });
      
  };
  
  getPaymentVoucherDocs = async() => {
    var data = {
      paymentVoucherId: localStorage.getItem('voucherid'),
    };
    await UsersDataService.getPaymentVoucherDocs(data)
      .then(res => {
        const {perPage} = this.state;
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

  render() {
    const {page, perPage, list} = this.state;
    let items = list.slice(page * perPage, (page + 1) * perPage);
    let sno = 0;
    let paymentVoucherDocs = items.map(item => {
      return (
        <div className="nk-tb-item" key={item.id}>
          <div className="nk-tb-col tb-col-md">
            <span className="tb-description">{++sno}</span>
          </div>

          <div className="nk-tb-col tb-col-md">
            <span className="tb-description">{item.description}</span>
          </div>
          
          <div className="nk-tb-col tb-col-md">
            <span className="tb-actions">
              <a 
                href="#"
                onClick={() => this.viewModal(item.scannedDoc, item.description)}
              >
                View
              </a>&nbsp;|&nbsp;
              <a 
                href="#"
                onClick={() => this.callDeletePaymentVoucherDoc(item.id)}
              >
                Delete
              </a>

            </span>
          </div>
        </div>
        
      )
    }) || '';

    return (
      <div>
        <CustomModal
          title={this.state.docTitle}
          content={<img src={this.state.imageFile} alt="Scanned Document" style={{height: "550px", width:"800px"}}/>}
          isVisible={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
        />
        
        <div className="card card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">
              <div className="nk-tb-list">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>S/No</h5></span>
                  </div>
                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Documents</h5></span>
                  </div>

                  <div className="nk-tb-col tb-col-sm">
                    <span><h5>Actions</h5></span>
                  </div>
                </div>
                {/* .nk-tb-item */}
               
                {paymentVoucherDocs}

                <div className="nk-tb-item">
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sno"></span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-description">
                      <input
                        type="text"
                        id="description"
                        name="description"
                        ref="description"
                        className="form-control"
                        placeholder="Doc description"
                      />
                    </span>
                  </div>
                  
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-button">
                      <a 
                        href="#"
                        onClick={() => this.fileUploaded.click()}
                      >
                        Upload
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              {/* .nk-tb-list */}
            </div>
          </div>
        </div>
        <input 
          type="file" 
          id="scannedDoc"
          name="scannedDoc"
          ref={(ref) => this.fileUploaded = ref}
          style={{width: "0px", height: "0px", visibility: "hidden"}}
          onChange={() => this.getBase64()}
        /> 
        <div style={{paddingBottom: "inherit"}}></div>
      </div>
    );
  }
}
