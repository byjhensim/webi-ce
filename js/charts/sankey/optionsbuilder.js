"use strict";

const DataHandler = require("../../utils/datahandler");
const SettingsHandler = require("../settingshandler");
const CR = String.fromCharCode(13);

class OptionsSankeyBuilder {
  constructor(serviceInfo, renderInfo) {
    this.DataHandler = new DataHandler(renderInfo);
    const type = serviceInfo.getVisualizationType(renderInfo.id);
    const defaultSettings = require("./settings").settings;
    this.SettingsHandler = new SettingsHandler(defaultSettings, renderInfo.settings);
    this.renderInfo = renderInfo;
  }

  buildDataTable() {
    let dataTable = []

    //Initiating DataTable
    const header = ["Source", "Destination", "Weight"]
    dataTable.push(header);

    //Input data into DataTable
    const data = this.transformRawData();
    for (let row in data) {
      dataTable.push(data[row])
    }

    return JSON.stringify(dataTable);
  }

  initChart() {
    const init = 'var chart = new google.visualization.Sankey(document.getElementById("container")); chart.draw(data, options);}';
    return init;
  }

  buildChartOptions() {
    const options = {
      width: this.renderInfo.size.width - 10,
      height: this.renderInfo.size.height - 10,
      sankey: {
        node: {
          label: this.SettingsHandler.getAsFont("label-font"),
          labelPadding: this.SettingsHandler.getAsInt("label-padding"),
          nodePadding: this.SettingsHandler.getAsInt("node-padding"),
          width: this.SettingsHandler.getAsInt("node-size"),
          color: this.SettingsHandler.getAsColor("node-color")
        },
        link: {
          color: {
            fill: this.SettingsHandler.getAsColor("link-color"),
            stroke: this.SettingsHandler.getAsColor("stroke-color"),
            strokeWidth: this.SettingsHandler.getAsInt("stroke-width")
          },
          colorMode: this.SettingsHandler.getAsState("link-color-mode")
        }
      }
    };

    return options;
  }

  transformRawData() {
    //Extracting data from multiple column in two column format, which is compatible with google sankey chart
    const catRawData = this.DataHandler.getData("source-destination")
    const valRawData = this.DataHandler.getData("flow-weight")
    const data = []
    let value = []

    //Extracting data from two column each iteration
    for (let i = 0; i < catRawData.length - 1; i++) {
      let SourceColumn = catRawData[i].values.rawvalues
      let DestColumn = catRawData[i + 1].values.rawvalues

      //Extract data from two column and save in tempData
      for (let row = 0; row < SourceColumn.length; row++) {
        let source = SourceColumn[row]
        let dest = DestColumn[row]

        if (!value[source]) {
          value[source] = {}
        }
        if (!value[source][dest]) {
          value[source][dest] = 0;
        }

        value[source][dest] += valRawData[0].values.rawvalues[row];
        }

      //Populating two-column extracted data into final formats
      let setSource = new Set(SourceColumn);
      let setDest = new Set(DestColumn);

      for (let s of setSource) for (let d of setDest) if (value[s][d]) {
        data.push([s, d, value[s][d]]);
      }

      //Clearing tempData for the next two-column iteration
      value = []
    }

  return data;
  }
///////// End of the class /////////
}

module.exports = OptionsSankeyBuilder;
