"use strict"

const logger = require("../utils/logger");
const CR = String.fromCharCode(13);

class ChartBuilder {

  constructor(serviceInfo, renderInfo) {
    this.renderInfo = renderInfo;
    this.serviceInfo = serviceInfo;
    const type = serviceInfo.getVisualizationType(renderInfo.id);
    const OptionsBuilder = require("./" + type + "/optionsbuilder");
    this.builder = new OptionsBuilder(this.serviceInfo, renderInfo);
  }

  build() {
    let html = '';
    html = html.concat(this.buildContainerDiv());
    html = html.concat(this.buildChartJsCode());

    return html;

  }

  buildContainerDiv() {
    let height = this.renderInfo.size.height;
    let width = this .renderInfo.size.width;

    let container = '<div id="container" style="width:' + width + 'px;height:' + height + 'px;"></div>';

    return container;
  }

  buildChartJsCode() {
    let chartJs = '<script type="text/javascript">';
    let gPackage = this.serviceInfo.getVisualizationPackage(this.renderInfo.id);
    let loadChart = 'google.charts.load("current", {packages:["' + gPackage + '"], callback: drawChart});' + CR;
    chartJs = chartJs.concat(loadChart);
    chartJs = chartJs.concat('function drawChart(){' + CR + 'var data = new google.visualization.DataTable();' + CR);

    const dataTable = this.builder.buildData();
    chartJs = chartJs.concat(dataTable);

    const options = JSON.stringify(this.builder.buildChartOptions());
    chartJs = chartJs.concat('var options = ' + options + ';' + CR);

    const initChart = this.builder.initChart();
    chartJs = chartJs.concat(initChart);
    chartJs = chartJs.concat('</script>');

    return chartJs;
  }

}

module.exports = ChartBuilder;
