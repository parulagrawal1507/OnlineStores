import React, {Component} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import '../Stylesheets/styles.css';



class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultColDef: {
        width: 250,
        sortable: true,
        resizable: true,
        filter: true,
        enableRangeSelection: true,
        cellClassRules: {
          darkGreyBackground: function(params) {
            return params.rowIndex % 2 === 0;
          },
        }
      },
      columnDefs:[
        { headerName: "Item", field: "item"},
        { headerName: "Market Price", field: "market_price"},
        { headerName: "Our Price", field: "our_price"},
      ]
  }
};


  onGridReady = params => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    };


  render() {
    return (
      <div id="myGrid" className="ag-theme-balham" style={ { height: "80%", width:'44%'}}>
        <AgGridReact
            // modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            rowData={this.props.rowData}
            defaultColDef={this.state.defaultColDef}>
        </AgGridReact>
      </div>
    )
  }
}

export default DataTable;
