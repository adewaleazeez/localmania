import React, { Component } from "react";
import Modal from "react-modal";
import Constants from "../../Utils/Constants";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Svg, Rect, } from "@react-pdf/renderer";
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
  //id, year_id, staff_category_id, staff_level_id, staff_step_id, staff_salary
  sno: {
    width: '10%',
    bordertColor: tableBorderColor,
    border: 1,
    paddingRight: 8,
  },
  year: {
    width: '20%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
  },
  category: {
    width: '40%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
  },
  level: {
    width: '20%',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'left',
    paddingLeft: 8,
  },
  step: {
    width: '20%',
    bordertColor: tableBorderColor,
    border: 1,
    textAlign: 'left',
    paddingLeft: 8,
  },
  salary: {
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
  year: {
    width: '20%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  category: {
    width: '40%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  level: {
    width: '20%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    border: 1,
    paddingLeft: 8,
    fontStyle: 'normal',
  },
  step: {
    width: '20%',
    textAlign: 'left',
    bordertColor: tableBorderColor,
    paddingLeft: 8,
    border: 1,
    fontStyle: 'normal',
  },
  salary: {
    width: '25%',
    textAlign: 'right',
    bordertColor: tableBorderColor,
    border: 1,
    paddingRight: 8,
    fontStyle: 'normal',
  },
});

function PDFSalaryScaleDocument({ title, content, isVisible, onClose, bigForm }) {
  let salaryScaleReport = '';
  let cur_level = '';
  let ndx = -1;
  // console.log("content.salaryScale ::: ", content.salaryScale)
  if (content.salaryScale != undefined) {
    //cur_cat = content.salaryScale[0].category;
    cur_level = content.salaryScale[0].level;
    //console.log("cur_level ", cur_level)
    salaryScaleReport = content.salaryScale.map((token, index) => {
      index++;
      //console.log("cur_level/token.level ", cur_level+"/"+token.level)
      let break_flag = true;
      ((cur_level !== token.level) ? cur_level = token.level : break_flag = false);

      return (
        <View style={styleRows.row} key={index.toString()}  wrap={false} break={break_flag} >
          <Text style={styleRows.sno}>{index}</Text>
          <Text style={styleRows.year}>{token.year}</Text>
          <Text style={styleRows.category}>{token.category}</Text>
          <Text style={styleRows.level}>{token.level}</Text>
          <Text style={styleRows.step}>{token.step}</Text>
          <Text style={styleRows.salary}>{token.staff_salary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
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
        <div className="modal-content" style={{ height: "600px", width: "900px" }}>
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
                  <Svg viewBox="0 -20 300 35" fixed>
                      {/* <Text x="11" y="7" style={{fontSize: "7px"}}>Salary Scale Year</Text> */}
                      <Rect x="10" y="10" rx="0" ry="0" width="125" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                      <Text x="11" y="20" style={{fontSize: "7px"}}>{'Salary Scale Report List for Year '+content.salaryScale[0].year}</Text>

                      {/* <Text x="11" y="7" style={{fontSize: "7px"}}>Salary Scale Year</Text>
                      <Rect x="10" y="10" rx="0" ry="0" width="80" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                      <Text x="11" y="20" style={{fontSize: "7px"}}>{content.salaryScale[0].year}</Text>

                      <Text x="121" y="7" style={{fontSize: "7px"}}>Staff Category</Text>
                      <Rect x="120" y="10" rx="0" ry="0" width="80" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                      <Text x="121" y="20" style={{fontSize: "7px"}}>{content.salaryScale[++ndx].category}</Text>

                      <Text x="221" y="7" style={{fontSize: "7px"}}>Staff Level</Text>
                      <Rect x="220" y="10" rx="0" ry="0" width="80" height="15" fill="white" stroke={borderColor} strokeWidth={1} />
                      <Text x="221" y="20" style={{fontSize: "7px"}}>{content.salaryScale[++ndx].level}</Text> */}
                    </Svg>
                    <View style={styleHeader.container} fixed>
                        <Text style={styleHeader.sno}>S/No</Text>
                        <Text style={styleHeader.year}>Year</Text>
                        <Text style={styleHeader.category}>Category</Text>
                        <Text style={styleHeader.level}>Level</Text>
                        <Text style={styleHeader.step}>Step</Text>
                        <Text style={styleHeader.salary}>Salary</Text>
                    </View>
                    {salaryScaleReport}
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
export default PDFSalaryScaleDocument;