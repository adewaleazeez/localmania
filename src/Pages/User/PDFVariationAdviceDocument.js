import React, { Component } from "react";
import Modal from "react-modal";
import Constants from "../../Utils/Constants";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Svg, Rect, Image, } from "@react-pdf/renderer";
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
    width: '100px',
    bordertColor: tableBorderColor,
    border: 1,
    paddingRight: 8,
  },
  staffNo: {
    width: '20%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
  },
  staffName: {
    width: '30%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
  },
  rank: {
    width: '30%',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'left',
    paddingLeft: 8,
  },
  fileNo: {
    width: '20%',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'left',
    paddingLeft: 8,
  },
  ippisNo: {
    width: '20%',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'left',
    paddingLeft: 8,
  },
  salary: {
    width: '200px',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
  },
  variationAmount: {
    width: '200px',
    bordertColor: tableBorderColor,
    border: 1,
    alignItems: 'right',
    paddingRight: 8,
  },
  variationReason: {
    width: '200px',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'left',
    paddingLeft: 8,
  },
  effectiveDate: {
    width: '200px',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'left',
    paddingLeft: 8,
  },
  authorityGazzeteNotification: {
    width: '200px',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'left',
    paddingLeft: 8,
  },
  loanGranted: {
    width: '200px',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'left',
    paddingLeft: 8,
  },
  remarks: {
    width: '200px',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'left',
    paddingLeft: 8,
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
    width: '100px',
    textAlign: 'right',
    bordertColor: tableBorderColor,
    border: 1,
    paddingRight: 8,
    fontStyle: 'normal',
  },
  staffNo: {
    width: '20%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  staffName: {
    width: '30%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  rank: {
    width: '30%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  fileNo: {
    width: '20%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  ippisNo: {
    width: '20%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  salary: {
    width: '200px',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  variationAmount: {
    width: '200px',
    textAlign: 'right',
    bordertColor: tableBorderColor,
    border: 1,
    paddingRight: 8,
    fontStyle: 'normal',
  },
  variationReason: {
    width: '200px',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    paddingLeft: 8,
    border: 1,
    fontStyle: 'normal',
  },
  effectiveDate: {
    width: '200px',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    paddingLeft: 8,
    border: 1,
    fontStyle: 'normal',
  },
  authorityGazzeteNotification: {
    width: '200px',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    paddingLeft: 8,
    border: 1,
    fontStyle: 'normal',
  },
  loanGranted: {
    width: '200px',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    paddingLeft: 8,
    border: 1,
    fontStyle: 'normal',
  },
  remarks: {
    width: '200px',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    paddingLeft: 8,
    border: 1,
    fontStyle: 'normal',
  },
  
});

function PDFVariationAdviceDocument({ title, content, isVisible, onClose, bigForm }) {
  let variationAdviceReport = '';
  if (content.VariationAdvice != undefined) {
    variationAdviceReport = content.VariationAdvice.map((token, index) => {
      index++;
      return (
        <View style={styleRows.row} key={index.toString()} >
          <Text style={styleRows.sno}>{index}</Text>
          <Text style={styleRows.salary}><Image src={Naira} style={{width: "9", height: "9"}} />{token.oldStaffSalary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} {token.oldStaffCategory} {token.oldStaffLevel}/{token.oldStaffStep}</Text>
          <Text style={styleRows.salary}><Image src={Naira} style={{width: "9", height: "9"}} />{token.newStaffSalary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} {token.newStaffCategory} {token.newStaffLevel}/{token.newStaffStep}</Text>
          <Text style={styleRows.variationAmount}><Image src={Naira} style={{width: "9", height: "9"}} />{token.variationAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
          <Text style={styleRows.variationReason}>{token.variationReason}</Text>
          <Text style={styleRows.effectiveDate}>{token.effectiveDate}</Text>
          <Text style={styleRows.authorityGazzeteNotification}>{token.authorityGazzeteNotification}</Text>
          <Text style={styleRows.loanGranted}>{token.loanGranted}</Text>
          <Text style={styleRows.remarks}>{token.remarks}</Text>
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
        <div className="modal-content" style={{ height: "600px", width: "1100px" }}>
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
                <Page style={styles.page} size="A4" orientation="landscape">
                    <Svg viewBox="0 -20 300 100" fixed>
                      
                      <Rect x="85" y="10" rx="0" ry="0" width="95" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                      <Text x="106" y="20" style={{fontSize: "5px"}}>VARIATION ADVICE</Text>
                    

                      <Text x="11" y="37" style={{fontSize: "5px"}}>Staff No</Text>
                      <Rect x="10" y="40" rx="0" ry="0" width="90" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                      <Text x="11" y="50" style={{fontSize: "5px"}}>{content.VariationAdvice[0].staffNo}</Text>
            
                      <Text x="106" y="37" style={{fontSize: "5px"}}>Staff Name</Text>
                      <Rect x="105" y="40" rx="0" ry="0" width="80" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                      <Text x="106" y="50" style={{fontSize: "5px"}}>{content.VariationAdvice[0].staffName}</Text>

                      <Text x="191" y="37" style={{fontSize: "5px"}}>Rank</Text>
                      <Rect x="190" y="40" rx="0" ry="0" width="100" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                      <Text x="198" y="50" style={{fontSize: "5px"}}>{content.VariationAdvice[0].rank}</Text>

                      <Text x="11" y="67" style={{fontSize: "5px"}}>File No</Text>
                      <Rect x="10" y="70" rx="0" ry="0" width="90" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                      <Text x="11" y="80" style={{fontSize: "5px"}}>{content.VariationAdvice[0].fileNo}</Text>

                      <Text x="106" y="67" style={{fontSize: "5px"}}>Ippis No</Text>
                      <Rect x="105" y="70" rx="0" ry="0" width="110" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                      <Text x="106" y="80" style={{fontSize: "5px"}}>{content.VariationAdvice[0].ippisNo}</Text>

                      {/* <Text x="221" y="67" style={{fontSize: "5px"}}>Status</Text>
                      <Rect x="220" y="70" rx="0" ry="0" width="70" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                      <Text x="221" y="80" style={{fontSize: "5px"}}>{content.VariationAdvice[0].statusDesc}</Text> */}
                    </Svg>
                    <View style={styleHeader.container} fixed>
                        <Text style={styleHeader.sno}>S/No</Text>
                        <Text style={styleHeader.salary}>Old Salary PA (<Image src={Naira} style={{width: "9", height: "9"}} />)</Text>
                        <Text style={styleHeader.salary}>New Salary PA (<Image src={Naira} style={{width: "9", height: "9"}} />)</Text>
                        <Text style={styleHeader.variationAmount}>Amount Variation (<Image src={Naira} style={{width: "9", height: "9"}} />)</Text>
                        <Text style={styleHeader.variationReason}>Reason for Variation</Text>
                        <Text style={styleHeader.effectiveDate}>Effective Date</Text>
                        <Text style={styleHeader.authorityGazzeteNotification}>Authority Gazzete Notification</Text>
                        <Text style={styleHeader.loanGranted}>Whether Loan Granted</Text>
                        <Text style={styleHeader.remarks}>Remarks</Text>
                    </View>
                    {variationAdviceReport}
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                      `${pageNumber} / ${totalPages}`
                    )} fixed />
                </Page>
                
              </Document>
            </PDFViewer>
          </div>
          <div className="modal-footer theme-bg py-0" style={{ height: "4px" }}></div>
        </div>
      </Modal>
    )
  );
}
export default PDFVariationAdviceDocument;