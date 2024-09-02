import React, { Component } from "react";
import Modal from "react-modal";
import Constants from "../../Utils/Constants";
//import Naira from "../../Utils/naira.jpg";
//import Check from "../../Utils/checkmark.jpg";
//import Cross from "../../Utils/crossmark.png";
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
    marginLeft: 0,
    width: 490,
    fontSize: 15,
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

function PDFQueryDocument({ title, content, isVisible, onClose, bigForm }) {

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
                            <Text style={{fontSize: "18px", marginTop: 20, textAlign: 'right'}}>Treasury 52b</Text>
                            <Text style={{fontSize: "25px", marginTop: 20}}>Audit Query/Observation(s)</Text>
                            <Text style={{fontSize: "13px", marginTop: 20}}>From:      The Head of Internal Audit</Text>
                            <Text style={{fontSize: "13px", marginLeft: 55}}>Ministry of Defence Headquarters</Text>
                            <Text style={{fontSize: "13px", marginLeft: 65}}>Abuja</Text>
                            <Text style={{fontSize: "13px", marginTop: 20}}>To:                  {content.voucherQuery[0].receiverName}</Text>
                            <Text style={{fontSize: "13px", marginTop: 20}}>File Ref. No:   {content.voucherQuery[0].refNo}</Text>
                            <Text style={{fontSize: "13px", marginTop: 20, marginLeft: 2.5}}>{`The attached document(s) does not fulfill Audit requirements and is returned herewith`}</Text>
                            <Text style={{fontSize: "13px", marginTop: 10, marginLeft: 2.5}}>for explanation:-</Text>
                            <Text style={styles.text}>{content.voucherQuery[0].details}</Text>
                            <Text style={{fontSize: "13px",  marginTop: 30, marginLeft: 2.5}}>Early return is requested, please.</Text>
                            <Text style={{fontSize: "13px", top: 220, left: 315}}>.....................................................</Text>
                            <Text style={{fontSize: "13px", top: 225, left: 330}}>Head of Internal Audit</Text>
                            <Text style={{fontSize: "13px", top: 230, left: 330}}>Ministry of Defence, Abuja</Text>

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
export default PDFQueryDocument;