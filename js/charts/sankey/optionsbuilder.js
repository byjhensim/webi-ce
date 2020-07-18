"use strict";

const DataHandler = require("../datahandler");
const SettingsHandler = require("../settingshandler");
const ErrorHandler = require("../../utils/errorhandler");

class OptionsSankeyBuilder {
  constructor(renderInfo) {
    const feeds = require("./feeds").feeds.feeds;
    const defaultSettings = require("./settings").settings;
    this.DataHandler = new DataHandler(renderInfo, feeds);
    this.SettingsHandler = new SettingsHandler(
      defaultSettings,
      renderInfo.settings
    );
    this.renderInfo = renderInfo;
  }

  checkBuilder() {
    const sourceDest = this.DataHandler.getDataAsString("source-destination");
    const flowWeight = this.DataHandler.getDataAsNumber("flow-weight");

    const error = [];

    if (sourceDest == null && Array.isArray(sourceDest[0])) {
      error.push("Missing dataset: Source and Destination");
    }
    if (!Array.isArray(sourceDest[0])) {
      error.push("Missing dataset: Source and Destination");
    }
    if (flowWeight == null) {
      error.push("Missing dataset: Flow Weight");
    }

    if (error.length !== 0) {
      throw new ErrorHandler("Feeding Error", "Incorrect Feeding", error);
    }
  }

  buildDataTable() {
    let dataTable = [];

    //Initiating DataTable
    const header = ["Source", "Destination", "Weight"];
    dataTable.push(header);

    //Input data into DataTable
    const data = this.transformRawData();
    for (let row in data) {
      dataTable.push(data[row]);
    }

    return JSON.stringify(dataTable);
  }

  initChart() {
    const init =
      'var chart = new google.visualization.Sankey(document.getElementById("container")); chart.draw(data, options);}';
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
          color: this.SettingsHandler.getAsColor("node-color"),
        },
        link: {
          color: {
            fill: this.SettingsHandler.getAsColor("link-color"),
            stroke: this.SettingsHandler.getAsColor("stroke-color"),
            strokeWidth: this.SettingsHandler.getAsInt("stroke-width"),
          },
          colorMode: this.SettingsHandler.getAsState("link-color-mode"),
        },
      },
    };

    return options;
  }

  transformRawData() {
    //Extracting data from multiple column in two column format that is compatible with google sankey chart
    const sourceDest = this.DataHandler.getDataAsString("source-destination");
    const flowWeight = this.DataHandler.getDataAsNumber("flow-weight");
    const data = [];
    let value = [];

    //Extracting data from two column each iteration
    for (let i = 0; i < sourceDest.length - 1; i++) {
      //Extract data from two column and save in tempData
      for (let row = 0; row < sourceDest[0].length; row++) {
        let source = sourceDest[i][row];
        let dest = sourceDest[i + 1][row];

        if (!value[source]) {
          value[source] = {};
        }
        if (!value[source][dest]) {
          value[source][dest] = 0;
        }

        value[source][dest] += flowWeight[row];
      }

      //Populating two-column extracted data into final formats

      for (let s of new Set(sourceDest[i]))
        for (let d of new Set(sourceDest[i + 1]))
          if (value[s][d]) {
            data.push([s, d, value[s][d]]);
          }

      //Clearing tempData for the next two-column iteration
      value = [];
    }

    return data;
  }
  ///////// End of the class /////////
}

module.exports = OptionsSankeyBuilder;
