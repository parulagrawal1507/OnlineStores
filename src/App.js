import React, {Component} from 'react';
import './App.css';
import DataTable from './Components/DataTable';
import Select from 'react-select';
import {ExcelRenderer} from 'react-excel-renderer';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'All',
      Data:[],
      rowData: []


  }
}

componentDidMount(){
  console.log(this.state.selectedOption);
  if(this.state.selectedOption === 'All'){
    this.setState({
      rowData: this.state.Data
    })
  }
}

  fileHandler=(event)=>{
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
     ExcelRenderer(fileObj, (err, resp) => {
         if(err){
           console.log(err);
         }
         else{
            var columns = {
              'A' : "item",
              'B' : "market_price",
              'C' : "our_price",
              'D' : 'category'
            }
            var rowIndex = 1;

            // iterate over the worksheet pulling out the columns we're expecting
            while (resp.rows[rowIndex]) {
                var i = 0
                var row = {};
                Object.keys(columns).forEach(function(column) {
                  row[columns[column]] = resp.rows[rowIndex][i];
                  i++;
                });
                this.setState({
                  Data: [...this.state.Data, row],
                  rowData: [...this.state.rowData, row]
                })
                rowIndex++;
              }
            }})

      }

  handleChange = (value) => {
    this.setState(
      { selectedOption: value,
        rowData: this.state.Data.filter(item => item.category === value.value)},
    );
    if(value.value === 'All'){
      this.setState({
        rowData: this.state.Data
      })
    }
  }

  render(){
    const options = [
      { label: 'Fruits', value: 'Fruits'},
      { label: 'Grocery', value: 'Grocery'},
      { label: 'Vegetables', value: 'Vegetables'},
      { label: 'Beverages', value: 'Beverages'},
      { label: 'All', value: 'All'},
    ];
    return (

      <div className="App">
        <div className="App-header">
          <h2>Sunrise Store (Sec-76)</h2>
          <div className = "Contact-Info">
          <label>Phone No: 9953200774</label>
          <label>Paytm No: 8882326951</label>
          </div>
        </div>
        <div className="Info">
          <Select
          placeholder="Select..."
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={options}
          className = "select-filter"
          />
          <DataTable
          rowData = {this.state.rowData}/>
        </div>
      </div>
    );
  }

}

export default App;
