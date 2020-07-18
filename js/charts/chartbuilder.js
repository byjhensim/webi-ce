"use strict";

const logger = require("../utils/logger");

class ChartBuilder {
  constructor(serviceInfo, renderInfo) {
    this.renderInfo = renderInfo;
    this.serviceInfo = serviceInfo;
    const type = serviceInfo.getVisualizationType(renderInfo.id);
    const OptionsBuilder = require("./" + type + "/optionsbuilder");
    this.builder = new OptionsBuilder(renderInfo);
  }

  build() {
    let html = "";
    let checker = this.builder.checkBuilder();
    html = html.concat(this.buildContainerDiv());
    html = html.concat(this.buildChartJsCode());

    return html;
  }

  buildContainerDiv() {
    let height = this.renderInfo.size.height;
    let width = this.renderInfo.size.width;

    let container =
      '<div id="container" style="width:' +
      width +
      "px;height:" +
      height +
      'px;"></div>';

    return container;
  }

  buildChartJsCode() {
    let chartJs = '<script type="text/javascript">';

    //Load Package for Sankey Chart
    let gPackage = this.serviceInfo.getVisualizationPackage(this.renderInfo.id);
    let loadChart =
      'google.charts.load("current", {packages:["' +
      gPackage +
      '"], callback: drawChart});';
    chartJs = chartJs.concat(loadChart);

    //DataTable
    const dataTable = this.builder.buildDataTable();
    chartJs = chartJs.concat(
      "function drawChart(){var data = new google.visualization.arrayToDataTable(" +
        dataTable +
        ");"
    );

    //Options Setting
    const options = JSON.stringify(this.builder.buildChartOptions());
    chartJs = chartJs.concat("var options = " + options + ";");

    //Draw the chart
    const initChart = this.builder.initChart();
    chartJs = chartJs.concat(initChart);
    chartJs = chartJs.concat("</script>");

    return chartJs;
  }
}

module.exports = ChartBuilder;
