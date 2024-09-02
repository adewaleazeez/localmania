import React, { Component, useState } from "react";
import "../sass/my-table.scss";
import {
  useTable, useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination
} from 'react-table'



export default function MyTable({ columns, data, deleteAction, enableSearch,
  reloadData, searchQuery, pageSize, page, cssArray,
  recordSelected }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  var _currentPage = page;
  var _pageSize = pageSize;
  var _searchQuery = "";
  var pageOptions = ["10", "50", "100", "150"];
  var _cssArray = [];
  if (!cssArray || cssArray.length < columns.length) {
    columns.forEach(element => {
      _cssArray.push("");
    });
  } else {
    _cssArray = cssArray;
  }

  const [filteredRows, setValue] = useState(rows);

  function filterRow(event) {
    if (!event || !event.target) {
      setValue(rows);
    }
    else {
      if (reloadData) {
        __reloadData(null, 1, event.target.value);
        _searchQuery = event.target.value;
      } else {
        var _filteredRows = [];
        rows.forEach(element => {
          if (JSON.stringify(element.original).toLowerCase().includes(event.target.value.toLowerCase())) {
            _filteredRows.push(element);
          }
        });
        setValue(_filteredRows);
      }
    }
  }

  function __deleteAction(_record) {
    deleteAction(_record);
  }

  function __reloadData(pageSizeParam, currentPageParam, _query) {
    if (pageSizeParam) _pageSize = pageSizeParam;
    if (currentPageParam) _currentPage = currentPageParam;
    if (!_query) _query = _searchQuery;
    reloadData(_currentPage, _pageSize, _query);
  }

  function __nextPage(){
    var pageToNavigateTo = (_currentPage || 1) + 1;
    __reloadData(null, pageToNavigateTo, null);
  }

  function __prevPage(){
    var pageToNavigateTo = (_currentPage || 2) - 1;
    __reloadData(null, pageToNavigateTo, null);
  }


  // Render the UI for your table
  return (
    <div className="my-table datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded">
      {
        enableSearch ?
          <div style={{ width: "50%", maxWidth: "300px", float: "left" }}>
            <div className="input-group input-group-sm mb-4" style={{ zoom: "0.75" }}>
              <div className="input-group-prepend" style={{ background: "transparent" }}>
                <span className="input-group-text pr-2"
                  style={{ background: "#ffffff", paddingRight: "0px", height: "100%", borderTop: "0px", borderLeft: "0px", borderRight: "0" }}>
                  <i className="mdi mdi-magnify" style={{ fontSize: "18px", lineHeight: "18px" }} /></span></div>
              <input autoFocus={true} defaultValue={searchQuery} style={{ borderLeft: "0px", borderRight: "0px", borderTop: "0px" }}
                type="text" className="form-control kt-quick-search__input" placeholder="Search..."
                onChange={(e) => filterRow(e)} />
            </div>
          </div> : null
      }

      {
        reloadData ?
          <div className={enableSearch ? "ml-4" : ""} style={{ width: "100%", maxWidth: "150px", float: "left" }}>
            <div className="input-group input-group-sm mb-4" style={{ zoom: "0.75" }}>
              <div className="input-group-prepend" style={{ background: "transparent" }}>
                <span className="input-group-text pr-2"
                  style={{ background: "#eeeeff", paddingRight: "0px", height: "100%", borderTop: "0px", borderLeft: "0px" }}>
                  Page size</span></div>
              <select style={{ borderLeft: "0px", borderRight: "0px", borderTop: "0px" }} type="text" className="form-control kt-quick-search__input"
                onChange={(e) => __reloadData(e.target.value)} defaultValue={pageSize}>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
              </select>
            </div>
          </div> : null
      }
      <br style={{ clear: "both" }} />
      {
        filteredRows.length <= 0 ? <p>No results to show</p> :
          <table {...getTableProps()} className="datatable-table table table-striped" style={{ display: "table", width: "100%" }}>
            <thead className="datatable-head" style={{ display: "table-header-group", width: "100%" }}>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="datatable-row" style={{ display: "table-row" }}>
                  {
                    deleteAction ? <th style={{ width: "50px", display: "table-cell" }}></th> : null
                  }
                  {headerGroup.headers.map((column, index) => (
                    <th style={{ display: "table-cell" }} className={"datatable-cell " + _cssArray[index]} {...column.getHeaderProps()}><span>{column.render('Header')}</span></th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="datatable-body" style={{ display: "table-row-group", width: "100%" }}>
              {filteredRows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr onClick={recordSelected ? () => recordSelected(row.original) : null} style={{ display: "table-row" }}
                    className={"animated fadeIn datatable-row " + (recordSelected ? " cursor-pointer " : "")} {...row.getRowProps()}>
                    {
                      deleteAction ? <td style={{ width: "50px", textAlign: "center", display: "table-cell" }}>
                        <a title="delete record" className="delete-row-trigger" onClick={() => __deleteAction(row.original)}>
                          <i className="mdi mdi-window-close"></i>
                        </a></td> : null
                    }
                    {row.cells.map((cell, index) => {
                      return <td style={{ display: "table-cell" }} className={"datatable-cell " + _cssArray[index]} {...cell.getCellProps()}><span>{cell.render('Cell')}</span></td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
      }
      {
        reloadData ? <div className="text-right"><div className="btn-group mt-4 " role="group" aria-label="Basic example">
          {
            _currentPage <= 1?null:<button type="button" className="btn btn-outline-secondary" onClick={()=>__prevPage()}><i className="mdi mdi-arrow-left mr-1"></i>Previous page</button>
          }
          {
            filteredRows.length <= 0? null:
            <button type="button" className="btn btn-outline-secondary" onClick={()=>__nextPage()}>Next page <i className="mdi mdi-arrow-right ml-1"></i></button>
          }
          
        </div> </div>: null
      }
    </div>
  )
}