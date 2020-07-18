"use strict";

const DataHandler = require("../datahandler");
const SettingsHandler = require("../settingshandler");
const ErrorHandler = require("../../utils/errorhandler");

class OptionsCandlestickBuilder {
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
    const dates = this.DataHandler.getDataAsDate("dates");
    const low = this.DataHandler.getDataAsNumber("low-value");
    const open = this.DataHandler.getDataAsNumber("opening-value");
    const close = this.DataHandler.getDataAsNumber("closing-value");
    const high = this.DataHandler.getDataAsNumber("high-value");

    const error = [];

    if (dates == null) {
      error.push("Missing dataset: Dates");
    }
    if (low == null) {
      error.push("Missing dataset: Low Value");
    }
    if (open == null) {
      error.push("Missing dataset: Open Value");
    }
    if (close == null) {
      error.push("Missing dataset: Close Value");
    }
    if (high == null) {
      error.push("Missing dataset: High Value");
    }

    if (error.length !== 0) {
      throw new ErrorHandler("Feeding Error", "Incorrect Feeding", error);
    }
  }

  buildDataTable() {
    let dataTable = "";

    //Initiating DataTable Header
    let initHeader = require("./feeds").header;
    let header = [];
    initHeader.forEach((elt) => {
      if (this.DataHandler.mapData.get(elt.id) !== null) {
        if (Array.isArray(elt.header)) {
          for (let i in elt.header) {
            header.push(elt.header[i]);
          }
        } else {
          header.push(elt.header);
        }
      } else {
        return;
      }
    });

    const tooltipHeader = {
      type: "string",
      role: "tooltip",
      p: { html: true },
    };
    header.push(tooltipHeader);

    dataTable = dataTable.concat(JSON.stringify(header));

    //Input data into DataTable
    const data = this.transformRawData();
    dataTable = dataTable.concat(data);

    return `[${dataTable}]`;
  }

  initChart() {
    let init = "";
    //Configuration for time format
    const formatter =
      'var f = new google.visualization.DateFormat({formatType: "short"});f.format(data,0);';
    init = init.concat(formatter);

    // Configure chart initialization
    const chartInit =
      'var chart = new google.visualization.CandlestickChart(document.getElementById("container")); chart.draw(data, options);};';
    init = init.concat(chartInit);

    //Configure tooltip configuration
    const tooltipTemplate =
      'function tf(d,l,o,c,h,dl){return `<div style="padding: 5px;">' +
      "<center><strong>${dl}</strong></center>" +
      "<center>${d}</center>" +
      "<strong>Low</strong>: ${l}<br>" +
      "<strong>Open</strong>: ${o}<br>" +
      "<strong>Close</strong>: ${c}<br>" +
      "<strong>High</strong>: ${h}<br></div>`;}";

    init = init.concat(tooltipTemplate);
    return init;
  }

  buildChartOptions() {
    const options = {};

    //Configure options setting for title
    const isVisible = this.SettingsHandler.getAsBoolean("title-visible");
    const title = isVisible
      ? this.SettingsHandler.getAsString("title-text")
      : null;
    const titleTextStyle = this.SettingsHandler.getAsFont("title-font");

    //Configure options setting for plotarea candlestick
    const candlestick = {
      fallingColor: {
        fill: this.SettingsHandler.getAsColor("plotArea-color"),
        stroke: this.SettingsHandler.getAsColor("plotArea-line-color"),
        strokeWidth: this.SettingsHandler.getAsInt("candlestick-line-width"),
      },
      risingColor: {
        fill: this.SettingsHandler.getAsColor("plotArea-up-color"),
        stroke: this.SettingsHandler.getAsColor("plotArea-up-line-color"),
        strokeWidth: this.SettingsHandler.getAsInt("candlestick-line-width"),
      },
    };

    //Configure options setting for chartarea such as height and width
    const chartArea = {
      left: 10,
      top: 10,
      width: "100%",
      height: "100%",
    };

    options.colors = ["#000000", "#479905", "#b92322"];
    options.legend = "none";
    options.title = title;
    options.titleTextStyle = titleTextStyle;
    options.tooltip = { isHtml: true };
    options.candlestick = candlestick;

    return options;
  }

  transformRawData() {
    //Transform into array
    const dates = this.DataHandler.getDataAsDate("dates");
    const low = this.DataHandler.getDataAsNumber("low-value");
    const open = this.DataHandler.getDataAsNumber("opening-value");
    const close = this.DataHandler.getDataAsNumber("closing-value");
    const high = this.DataHandler.getDataAsNumber("high-value");
    const datelabel = this.DataHandler.getDataAsString("dates");
    const datalabel = this.SettingsHandler.getAsString("data-serie-name");

    let data = "";
    //Populating data into an array
    for (let i = 0; i < dates.length; i++) {
      //Inserting the data
      let row = `[${dates[i]},${low[i]},${open[i]},${close[i]},${high[i]},tf("${datelabel[i]}",${low[i]},${open[i]},${close[i]},${high[i]},"${datalabel}")]`;
      data = data.concat(",", row);
    }

    return data;
  }
  ///////// End of the class /////////
}

module.exports = OptionsCandlestickBuilder;
