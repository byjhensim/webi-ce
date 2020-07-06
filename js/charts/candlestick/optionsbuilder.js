"use strict";

const DataHandler = require("../../utils/datahandler");
const SettingsHandler = require("../settingshandler");

class OptionsCandlestickBuilder {
  constructor(serviceInfo, renderInfo) {
    this.DataHandler = new DataHandler(renderInfo);
    const type = serviceInfo.getVisualizationType(renderInfo.id);
    // const defaultSettings = require("./settings").settings;
    // this.SettingsHandler = new SettingsHandler(defaultSettings, renderInfo.settings);
    this.renderInfo = renderInfo;
  }

  buildDataTable() {
    let dataTable = [];

    //Initiating DataTable
    const header = [{label: 'Group Label', id: 'group-label'},
         {label: 'Low', id: 'low', type: 'number'},
         {label: 'Opening', id: 'opening', type: 'number'},
         {label: 'Closing', id: 'closing', type: 'number'},
         {label: 'High', id: 'high', type: 'number'},
         {label: 'Value', id: 'tooltip', role: 'tooltip'}
       ]
    dataTable.push(header);

    //Input data into DataTable
    const data = this.transformRawData();
    for (let row in data) {
      dataTable.push(data[row]);
    }

    return dataTable;
  }

  initChart() {
    const init = 'var chart = new google.visualization.CandlestickChart(document.getElementById("container")); chart.draw(data, options);}';
    return init;
  }

  buildChartOptions() {
    const options = {};

    return options;
  }

  transformRawData() {
    //Extracting data and transform into array
    const groupColumn = this.DataHandler.getData("group-label")[0].values.rawvalues
    const lowColumn = this.DataHandler.getData("low-value")[0].values.rawvalues;
    const openingColumn = this.DataHandler.getData("opening-value")[0].values.rawvalues;
    const closingColumn = this.DataHandler.getData("closing-value")[0].values.rawvalues;
    const highColumn = this.DataHandler.getData("high-value")[0].values.rawvalues;

    const data = []

    //Populating data into an array
    for (let i = 0; i < groupColumn.length; i++) {
      let tooltip = "L: " + lowColumn[i] + " O: " + openingColumn[i] + " C: " + closingColumn[i] + " H: " + highColumn[i]
      let value = [groupColumn[i],lowColumn[i],openingColumn[i],closingColumn[i],highColumn[i], tooltip]
      data.push(value);
      }
    return data;
  }
///////// End of the class /////////
}

module.exports = OptionsCandlestickBuilder;
