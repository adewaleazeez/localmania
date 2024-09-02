import React, { Component } from "react";
import Modal from "react-modal";
import Constants from "../../Utils/Constants";
import Naira from "../../Utils/naira.jpg";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Svg, Rect, Image, } from "@react-pdf/renderer";
// import Naira from 'react-naira' 

// Create styles
const borderColor = 'gray';
const tableBorderColor = 'black';
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  section: {
    margin: 10,
    padding: 0,
    color: "black",
  },
  centerImage: {
    alignItems: "center",
    flexGrow: 1,
  },
  viewer: {
    width: window.innerWidth / 2, //the pdf viewer will take up all of the width and height
    height: window.innerHeight / 1.5,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    marginTop: 2,
    marginLeft: 18,
    width: 490,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    border: 2,
    borderColor: borderColor,
    padding: 3,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: borderColor,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

function PDFPaymentVoucherDocument({ title, content, isVisible, onClose, bigForm }) {
  let docs = '';
  if(content.scannedNames != undefined){
    docs = content.scannedNames.map((token) => {
      return (
        <Page style={styles.page} size="A4">
            <Image src={token.scannedDoc} />
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
      )
    })
  }

  return (
      isVisible && (
          <Modal
            style={bigForm ? Constants.defaultBigModalStyle : Constants.defaultModalStyle}
            isOpen={isVisible}
            ariaHideApp={false}
            onRequestClose={onClose ? () => onClose() : null}
            shouldCloseOnOverlayClick={false}
          >
            <div className="modal-content" style={{height: "600px", width:"900px"}}>
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                {onClose && (
                  <a href="#" className="close" onClick={() => onClose()}>
                    <em className="icon ni ni-cross" />
                  </a>
                )}
              </div>
              <div className="modal-body">
                  <PDFViewer style={styles.viewer}>
                      <Document>
                          <Page style={styles.page} size="A4">
                            <Svg viewBox="0 -20 300 135">
                                <Text x="11" y="7" style={{fontSize: "7px"}}>Origin No</Text>
                                <Rect x="10" y="10" rx="0" ry="0" width="90" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="11" y="20" style={{fontSize: "7px"}}>{content.PaymentVoucher[0].originNo}</Text>
                      
                                {/* <Text x="106" y="7" style={{fontSize: "7px"}}></Text>
                                <Rect x="105" y="10" rx="0" ry="0" width="110" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="106" y="20" style={{fontSize: "7px"}}></Text> */}

                                <Text x="221" y="7" style={{fontSize: "7px"}}>Status</Text>
                                <Rect x="220" y="10" rx="0" ry="0" width="70" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="221" y="20" style={{fontSize: "7px"}}>{content.PaymentVoucher[0].statusDesc}</Text>


                                <Text x="11" y="37" style={{fontSize: "7px"}}>Station</Text>
                                <Rect x="10" y="40" rx="0" ry="0" width="90" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="11" y="50" style={{fontSize: "7px"}}>{content.PaymentVoucher[0].station.substring(0,10)}</Text>

                                <Text x="106" y="37" style={{fontSize: "7px"}}>Head</Text>
                                <Rect x="105" y="40" rx="0" ry="0" width="110" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="106" y="50" style={{fontSize: "7px"}}>{content.PaymentVoucher[0].head}</Text>

                                <Text x="221" y="37" style={{fontSize: "7px"}}>S/Head</Text>
                                <Rect x="220" y="40" rx="0" ry="0" width="70" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="221" y="50" style={{fontSize: "7px"}}>{content.PaymentVoucher[0].sHead}</Text>


                                <Text x="11" y="67" style={{fontSize: "7px"}}>Data Type</Text>
                                <Rect x="10" y="70" rx="0" ry="0" width="90" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="11" y="80" style={{fontSize: "7px"}}>{content.PaymentVoucher[0].dataType}</Text>

                                <Text x="106" y="67" style={{fontSize: "7px"}}>Source</Text>
                                <Rect x="105" y="70" rx="0" ry="0" width="110" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="106" y="80" style={{fontSize: "7px"}}>{content.PaymentVoucher[0].source}</Text>

                                <Text x="221" y="67" style={{fontSize: "7px"}}>Voucher No</Text>
                                <Rect x="220" y="70" rx="0" ry="0" width="70" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="221" y="80" style={{fontSize: "7px"}}>{content.PaymentVoucher[0].voucherNo}</Text>


                                <Text x="11" y="97" style={{fontSize: "7px"}}>Date</Text>
                                <Rect x="10" y="100" rx="0" ry="0" width="90" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="11" y="110" style={{fontSize: "7px"}}>{content.PaymentVoucher[0].voucherDate.substring(0,10)}</Text>

                                <Text x="106" y="97" style={{fontSize: "7px"}}>classificationCode</Text>
                                <Rect x="105" y="100" rx="0" ry="0" width="110" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="106" y="110" style={{fontSize: "7px"}}>{content.PaymentVoucher[0].classificationCode}</Text>

                                <Text x="221" y="97" style={{fontSize: "7px"}}>Amount</Text>
                                <Rect x="220" y="100" rx="0" ry="0" width="70" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <View x="221" y="104" style={styles.centerImage}>
                                  <Image src={Naira} style={{width: "7", height: "7"}} />
                                </View>
                                <Text x="228" y="110" style={{fontSize: "7px"}}>{content.PaymentVoucher[0].amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+"K"}</Text>
                              </Svg>
                              <Text style={{fontSize: "14px", marginLeft: 18}}>Beneficiaries</Text>
                              <Text style={styles.text}>{content.PaymentVoucher[0].beneficiaries}</Text>
                              <Text style={{fontSize: "14px", marginLeft: 18}}>&nbsp;</Text>

                              <Text style={{fontSize: "14px", marginLeft: 18}}>Amount in Words</Text>
                              <Text style={styles.text}>{content.PaymentVoucher[0].amountInWords}</Text>
                              <Text style={{fontSize: "14px", marginLeft: 18}}>&nbsp;</Text>

                              <Text style={{fontSize: "14px", marginLeft: 18}}>Details</Text>
                              <Text style={styles.text}>{content.PaymentVoucher[0].details}</Text>
                              
                              <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                `${pageNumber} / ${totalPages}`
                              )} fixed />
                            </Page>
                            {docs}
                      </Document>
                  </PDFViewer>
              </div>
              <div className="modal-footer theme-bg py-0" style={{height: "4px"}}></div>
            </div>
          </Modal>
      )
  );
}
export default PDFPaymentVoucherDocument;