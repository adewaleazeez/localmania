import React, { Component } from "react";
import Modal from "react-modal";
import Constants from "../../Utils/Constants";
import Naira from "../../Utils/naira.jpg";
import Check from "../../Utils/checkmark.jpg";
import Cross from "../../Utils/crossmark.png";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Svg, Rect, Image, } from "@react-pdf/renderer";
//import Naira from 'react-naira' 

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

const styleHeader = StyleSheet.create({
  container: {
    flexDirection: 'row',
    bordertColor: tableBorderColor,
    border: 0,  
    fontSize: 12,
    marginTop: 15,
    marginLeft: 18,
    //backgroundColor: '#bff0fd',
    alignItems: 'right',
    //height: 24,
    textAlign: 'right',
    fontStyle: 'bold',
    // flexGrow: 1,
  },
  sno: {
    width: '10%',
    bordertColor: tableBorderColor,
    border: 1,
    paddingRight: 8,
  },
  description: {
    width: '20%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
  },
  criteriaDescription: {
    width: '70%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
  },
  rate: {
    width: '15%',
    bordertColor: tableBorderColor,
    border: 1,
    alignItems: 'right',
    paddingRight: 8,
  },
  status: {
    width: '13%',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'center',
  },
  amount: {
    width: '25%',
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
      fontSize: 12,
      marginLeft: 18,
      fontStyle: 'normal',
      //height: 24,
  },
  sno: {
    width: '10%',
    textAlign: 'right',
    bordertColor: tableBorderColor,
    border: 1,
    paddingRight: 8,
    fontStyle: 'normal',
  },
  description: {
    width: '20%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  criteriaDescription: {
    width: '70%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  rate: {
    width: '15%',
    textAlign: 'right',
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
      width: '25%',
      textAlign: 'right',
      bordertColor: tableBorderColor,
      border: 1,
      paddingRight: 8,
      fontStyle: 'normal',
  },
});

var th = ['','Thousand','Million', 'Billion','Trillion'];
var dg = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine']; 
var tn = ['Ten','Eleven','Twelve','Thirteen', 'Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen']; 
var tw = ['Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']; 
function toWords(s){
  s = s.toString(); 
  s = s.replace(/[\, ]/g,''); 
  if (s != parseFloat(s)) return 'not a number'; 
  var x = s.indexOf('.'); 
  if (x == -1) x = s.length; 
  if (x > 15) return 'too big'; 
  var n = s.split(''); 
  var str = ''; 
  var sk = 0; 
  for (var i=0; i < x; i++) {
    if((x-i)%3==2) {
      if (n[i] == '1') {
        str += tn[Number(n[i+1])] + ' '; 
        i++; sk=1;
      } else if (n[i]!=0) {
        str += tw[n[i]-2] + ' ';sk=1;
      }
    } else if (n[i]!=0) {
      str += dg[n[i]] +' '; 
      if ((x-i)%3==0) str += 'Hundred ';
      sk=1;
    } 
    if ((x-i)%3==1) {
      if (sk) str += th[(x-i-1)/3] + ' ';
      sk=0;
    }
  }
   return str;
}


function PDFDocument({ title, content, isVisible, onClose, bigForm }) {
  let criteria = '';
  if(content.voucherAuditCriteria != undefined){
    criteria = content.voucherAuditCriteria.map((token, index) => {
      return (
        <View style={styleRows.row} key={index.toString()}>
          <Text style={styleRows.sno}>{index + 1}</Text>
          <Text style={styleRows.criteriaDescription}>{token.voucherCriteria}</Text>
          <Image src={(token.status == 1) ? Check : Cross} style={styleRows.status} />
        </View>
      )
    })
  }

  let charges = '';
  let amountWords = '';
  let total = 0.0;

  if(content.voucherAudit != undefined){
    content.voucherAudit.map(token => {total = token.amount});
    total = parseFloat(total);
    let totals = total.toString().split('.')
    let naira = totals[0];
    let kobo = totals[1];
    naira = (parseInt(naira) > 0) ? toWords(naira) + " Naira" : "";
    kobo = (parseInt(kobo) > 0) ? toWords(kobo) + " Kobo" : "";
    amountWords = naira + kobo;
  }

  if(content.voucherAuditCharges != undefined){
      total = parseFloat(total);
      charges = content.voucherAuditCharges.map((token, index) => {
          index++;
          total -= parseFloat(token.chargeAmount);
          let totals = total.toString().split('.');
          let naira = totals[0];
          let kobo = totals[1];
          naira = (parseInt(naira) > 0) ? toWords(naira) + " Naira" : "";
          kobo = (parseInt(kobo) > 0) ? toWords(kobo) + " Kobo" : "";
          amountWords = naira + kobo;
          return (
              <View style={styleRows.row} key={index.toString()}>
                <Text style={styleRows.sno}>{index + 1}</Text>
                <Text style={styleRows.description}>{token.voucherCharge}</Text>
                <Text style={styleRows.rate}>{token.chargeRate.toFixed(2)+"%"}</Text>
                <Text style={styleRows.amount}>{token.chargeAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
              </View>
          )
      })
  }
  
  let docs = '';
  if(content.scannedVouchers != undefined){
    docs = content.scannedVouchers.map((token) => {
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
                          
                            <Svg viewBox="0 -20 300 70">
                                <Text x="11" y="7" style={{fontSize: "7px"}}>Reference No</Text>
                                <Rect x="10" y="10" rx="0" ry="0" width="90" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="11" y="20" style={{fontSize: "7px"}}>{content.voucherAudit[0].refNo}</Text>
                      
                                <Text x="106" y="7" style={{fontSize: "7px"}}>Beneficiary</Text>
                                <Rect x="105" y="10" rx="0" ry="0" width="110" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="106" y="20" style={{fontSize: "7px"}}>{content.voucherAudit[0].beneficiary}</Text>

                                <Text x="221" y="7" style={{fontSize: "7px"}}>Amount</Text>
                                <Rect x="220" y="10" rx="0" ry="0" width="70" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <View x="221" y="14" style={styles.centerImage}>
                                  <Image src={Naira} style={{width: "7", height: "7"}} />
                                </View>
                                <Text x="228" y="20" style={{fontSize: "7px"}}>{content.voucherAudit[0].amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+"K"}</Text>

                                <Text x="11" y="37" style={{fontSize: "7px"}}>Date</Text>
                                <Rect x="10" y="40" rx="0" ry="0" width="90" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="11" y="50" style={{fontSize: "7px"}}>{content.voucherAudit[0].voucherDate.substring(0,10)}</Text>

                                <Text x="106" y="37" style={{fontSize: "7px"}}>Voucher Type</Text>
                                <Rect x="105" y="40" rx="0" ry="0" width="110" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="106" y="50" style={{fontSize: "7px"}}>{content.voucherAudit[0].voucherType}</Text>

                                <Text x="221" y="37" style={{fontSize: "7px"}}>Status</Text>
                                <Rect x="220" y="40" rx="0" ry="0" width="70" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                                <Text x="221" y="50" style={{fontSize: "7px"}}>{content.voucherAudit[0].statusDesc}</Text>
                              </Svg>
                              <Text style={{fontSize: "14px", marginLeft: 18}}>Details</Text>
                              <Text style={styles.text}>{content.voucherAudit[0].details}</Text>
                              
                              <View style={styleHeader.container}>
                                  <Text style={styleHeader.sno}>S/No</Text>
                                  <Text style={styleHeader.description}>Charges</Text>
                                  <Text style={styleHeader.rate}>Rate</Text>
                                  <Text style={styleHeader.amount}>Amount</Text>
                              </View>
                              <View style={styleRows.row}>
                                  <Text style={styleRows.sno}>1</Text>
                                  <Text style={styleRows.description}>Voucher Amount</Text>
                                  <Text style={styleRows.rate}></Text>
                                  <Text style={styleRows.amount}>{content.voucherAudit[0].amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                              </View>
                              {charges}
                              <View style={styleRows.row}>
                                  <Text style={styleRows.sno}></Text>
                                  <Text style={styleRows.description}>Total</Text>
                                  <Text style={styleRows.rate}></Text>
                                  <Text style={styleRows.amount}>{total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                              </View>
                              <Text style={styles.text}>{amountWords}</Text>

                              <View style={styleHeader.container}>
                                  <Text style={styleHeader.sno}>S/No</Text>
                                  <Text style={styleHeader.criteriaDescription}>Criteria</Text>
                                  <Text style={styleHeader.status}>Status</Text>
                              </View>
                              {criteria}
                              
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
export default PDFDocument;