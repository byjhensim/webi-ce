"use strict";

const DataHandler = require("../../utils/datahandler");
const CR = String.fromCharCode(13);

class OptionsSankeyBuilder {
  constructor(renderInfo){
    this.DataHandler = new DataHandler(renderInfo);
  }

  buildData() {
    let dataTable = '';
    const sourceCategory = this.DataHandler.getData("source-category")[0].values.rawvalues;
    // console.log(this.DataHandler.getData("source-category"));
    const destinationCategory = this.DataHandler.getData("destination-category")[0].values.rawvalues;
    // console.log(this.DataHandler.getData("destination-category"));
    const flowWeight = this.DataHandler.getData("flow-weight")[0].values.rawvalues;
    // console.log(this.DataHandler.getData("flow-weight"));

    const columnSource = 'data.addColumn("string", "Source");' + CR;
    const columnDest = 'data.addColumn("string", "Destination");' + CR;
    const columnMeasure = 'data.addColumn("number", "Weight");' + CR;

    dataTable = dataTable.concat(columnSource);
    dataTable = dataTable.concat(columnDest);
    dataTable = dataTable.concat(columnMeasure);

    let rowNumber = sourceCategory.length;

    for (let n=0; n < rowNumber; n++) {
      const rowData = 'data.addRows([["' + sourceCategory[n] + '","' + destinationCategory[n] + '",' + flowWeight[n] + ']]);' + CR;
      dataTable = dataTable.concat(rowData);
    }

    return dataTable;
  }

  initChart() {
    const init = 'var chart = new google.visualization.Sankey(document.getElementById("container")); chart.draw(data);}';
    return init;
  }
}

module.exports = OptionsSankeyBuilder;
