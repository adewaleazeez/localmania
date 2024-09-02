import React, { Component } from "react";
import Modal from "react-modal";
import Constants from "../../Utils/Constants";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, } from "@react-pdf/renderer";
import Naira from "../../Utils/naira.jpg";

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
    marginLeft: 0,
    width: 200,
    //fontSize: 15,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    border: 1,
    borderColor: tableBorderColor,
    paddingLeft: 8,
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

const styleHeader = StyleSheet.create({
  container: {
    flexDirection: 'row',
    bordertColor: tableBorderColor,
    border: 0,  
    fontSize: 11,
    marginTop: 15,
    marginLeft: 18,
    //backgroundColor: '#bff0fd',
    alignItems: 'right',
    //height: 24,
    textAlign: 'right',
    fontStyle: 'bold',
    // flexGrow: 1,
  },
  containerTotal: {
    flexDirection: 'row',
    bordertColor: tableBorderColor,
    border: 0,  
    fontSize: 11,
    marginTop: 0,
    marginLeft: 18,
    //backgroundColor: '#bff0fd',
    alignItems: 'right',
    //height: 24,
    textAlign: 'right',
    fontStyle: 'bold',
    // flexGrow: 1,
  },
  sno: {
    width: '7%',
    alignItems: 'right',
    bordertColor: tableBorderColor,
    border: 1,
    paddingRight: 8,
  },
  description: {
    width: '25%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
  },
  criteriaDescription: {
    width: '40%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
  },
  rate: {
    width: '17%',
    bordertColor: tableBorderColor,
    border: 1,
    alignItems: 'center',
    textAlign: 'center',
    paddingRight: 8,
  },
  status: {
    width: '13%',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'center',
  },
  amount: {
    width: '20%',
    bordertColor: tableBorderColor,
    border: 1,
    alignItems: 'right',
    paddingRight: 8,
  },
});

const styleRows = StyleSheet.create({
  row: {
      flexDirection: 'row',
      borderColor: tableBorderColor,
      border: 0,
      alignItems: 'right',
      fontSize: 11,
      marginLeft: 18,
      fontStyle: 'normal',
      //height: 24,
  },
  sno: {
    width: '7%',
    textAlign: 'right',
    bordertColor: tableBorderColor,
    border: 1,
    paddingRight: 8,
    fontStyle: 'normal',
  },
  description: {
    width: '25%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  criteriaDescription: {
    width: '40%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  rate: {
    width: '17%',
    textAlign: 'center',
    bordertColor: tableBorderColor,
    border: 1,
    paddingRight: 8,
    fontStyle: 'normal',
  },
  status: {
    width: '13%',
    alignItems: 'center',
    bordertColor: tableBorderColor,
    paddingLeft: "28",
    paddingRight: "28",
    border: 1,
  },
  amount: {
      width: '20%',
      textAlign: 'right',
      bordertColor: tableBorderColor,
      border: 1,
      paddingRight: 8,
      fontStyle: 'normal',
  },
});

function PDFAuditVoucherDocument({ title, content, isVisible, onClose, bigForm }) {
  let voucherSummary = '';
  let totalCount = 0;
  if(content.voucherSummary != undefined){
    voucherSummary = content.voucherSummary.map((token, index) => {
      totalCount += token.total;
      return (
        <View style={styleRows.row} key={index.toString()}>
          <Text style={styleRows.sno}>{index + 1}</Text>
          <Text style={styleRows.criteriaDescription}>{token.voucherType}</Text>
          <Text style={styleRows.rate}>{token.pending}</Text>
          <Text style={styleRows.rate}>{token.approved}</Text>
          <Text style={styleRows.rate}>{token.queried}</Text>
          <Text style={styleRows.rate}>{token.total}</Text>
        </View>
      )
    })
  }

  let voucherDetail = '';
  let totalAmount = 0.0;
  if(content.voucherDetail != undefined){
    voucherDetail = content.voucherDetail.map((token, index) => {
      totalAmount += parseFloat(token.amount)
      return (
        <View style={styleRows.row} key={index.toString()}>
          <Text style={styleRows.sno}>{index + 1}</Text>
          <Text style={styleRows.description}>{token.refNo}</Text>
          <Text style={styleRows.description}>{token.beneficiary}</Text>
          <Text style={styles.text}>{token.details}</Text>
          <Text style={styleRows.amount}>{token.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
        </View>
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
                              <Text style={{fontSize: 15, textAlign: 'center', marginTop: 15}}>{content.reportHeading}</Text>
                              
                              <Text style={{fontSize: 12, textAlign: 'center', marginTop: 30}}>REPORT SUMMARY</Text>
                              <View style={styleHeader.container}>
                                  <Text style={styleHeader.sno}><b>S/No</b></Text>
                                  <Text style={styleHeader.criteriaDescription}><b>VOUCHER TYPES</b></Text>
                                  <Text style={styleHeader.rate}><b>PENDING</b></Text>
                                  <Text style={styleHeader.rate}><b>APPROVED</b></Text>
                                  <Text style={styleHeader.rate}><b>QUERIED</b></Text>
                                  <Text style={styleHeader.rate}><b>TOTAL</b></Text>
                              </View>
                              {voucherSummary}
                              <View style={styleHeader.containerTotal}>
                                  <Text style={styleHeader.sno}></Text>
                                  <Text style={styleHeader.criteriaDescription}></Text>
                                  <Text style={styleHeader.rate}></Text>
                                  <Text style={styleHeader.rate}></Text>
                                  <Text style={styleHeader.rate}><b>TOTAL:</b></Text>
                                  <Text style={styleHeader.rate}>{totalCount}</Text>
                              </View>
                               
                              <Text style={{fontSize: 12, textAlign: 'center', marginTop: 30}}>REPORT DETAILS</Text>
                              <View style={styleHeader.container}>
                                  <Text style={styleHeader.sno}><b>S/No</b></Text>
                                  <Text style={styleHeader.description}><b>REFERENCE NO</b></Text>
                                  <Text style={styleHeader.description}><b>BENEFICIARIES</b></Text>
                                  <Text style={styles.text}><b>DETAILS</b></Text>
                                  <Text style={styleHeader.amount}>
                                    <b>AMOUNT</b>
                                    <Image src={Naira} style={{width: "9", height: "9"}} />
                                  </Text>
                              </View>
                              {voucherDetail}
                              <View style={styleHeader.containerTotal}>
                                  <Text style={styleHeader.sno}></Text>
                                  <Text style={styleHeader.description}></Text>
                                  <Text style={styleHeader.description}></Text>
                                  <Text style={styles.text}><b>TOTAL:</b></Text>
                                  <Text style={styleHeader.amount}><b>{totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</b></Text>
                              </View>

                              <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                `${pageNumber} / ${totalPages}`
                              )} fixed />
                          </Page>
                           
                      </Document>
                  </PDFViewer>
              </div>
              <div className="modal-footer theme-bg py-0" style={{height: "4px"}}></div>
            </div>
          </Modal>
      )
  );
}
export default PDFAuditVoucherDocument;