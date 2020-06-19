"use strict";

const DataHandler = require("../../utils/datahandler");
const SettingsHandler = require("../settingshandler");
const CR = String.fromCharCode(13);

class OptionsSankeyBuilder {
  constructor(serviceInfo,renderInfo){
    this.DataHandler = new DataHandler(renderInfo);
    const type = serviceInfo.getVisualizationType(renderInfo.id);
    const defaultSettings = require("./settings").settings;
    this.SettingsHandler = new SettingsHandler(defaultSettings, renderInfo.settings)
  }

  buildData() {
    let dataTable = '';
    const sourceCategory = this.DataHandler.getData("source-category")[0].values.rawvalues;
    const destinationCategory = this.DataHandler.getData("destination-category")[0].values.rawvalues;
    const flowWeight = this.DataHandler.getData("flow-weight")[0].values.rawvalues;

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
    const init = 'var chart = new google.visualization.Sankey(document.getElementById("container")); chart.draw(data, options);}';
    return init;
  }

  buildChartOptions() {
    const options = {
      sankey: {
        node: {
          label: this.SettingsHandler.getAsFont("label-font"),
          labelPadding: this.SettingsHandler.getAsInt("label-padding"),
          nodePadding: this.SettingsHandler.getAsInt("node-padding"),
          width: this.SettingsHandler.getAsInt("node-size"),
          color: this.SettingsHandler.getAsColor("node-color")
        },
        link: {
          color:{
            fill: this.SettingsHandler.getAsColor("link-color"),
            fillOpacity: this.SettingsHandler.getAsInt("link-opacity"),
            stroke: this.SettingsHandler.getAsColor("stroke-color"),
            strokeWidth: this.SettingsHandler.getAsInt("stroke-width")
          },
          colorMode: this.SettingsHandler.getAsState("link-color-mode")
        }
      }
    };

    return options;
  }
}

module.exports = OptionsSankeyBuilder;
