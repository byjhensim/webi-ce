"use strict";

const DataHandler = require("../../utils/datahandler");
const SettingsHandler = require("../settingshandler");

class OptionsCandlestickBuilder {
  constructor(serviceInfo, renderInfo) {
    this.DataHandler = new DataHandler(renderInfo);
    const type = serviceInfo.getVisualizationType(renderInfo.id);
    const defaultSettings = require("./settings").settings;
    this.SettingsHandler = new SettingsHandler(defaultSettings, renderInfo.settings);
    this.renderInfo = renderInfo;
  }

  handleDate() {
    const dataType = this.DataHandler.getData("group-label")[0].values.dataType;
    const isDate = dataType === "date" ? true : false;    
    
    return isDate;

  }

  buildDataTable() {
    let dataTable = '';

    const datalabel = this.SettingsHandler.getAsString("data-serie-name")   
    const isDate = this.handleDate();

    //Initiating DataTable
    const header = `[{label:'Group Label',type:'${isDate ? 'date' : 'string'}'},{label:'${datalabel}',type:'number'},{label:'Opening',type:'number'},{label:'Closing',type:'number'},{label:'High',type:'number'},{type:'string',role:'tooltip', p:{html: true}}]`;

    dataTable = dataTable.concat(header) 

    //Input data into DataTable
    const data = this.transformRawData();
    dataTable = dataTable.concat(data)

    return `[${dataTable}]`;
  }

  initChart() {
    let init = '';
    //Configuration if the series is time format
    if (this.handleDate()) {
      const formatter = 'var f = new google.visualization.DateFormat({formatType: "short"});f.format(data,0);';
      init = init.concat(formatter)
    }

    // Configure chart initialization
    const chartInit = 'var chart = new google.visualization.CandlestickChart(document.getElementById("container")); chart.draw(data, options);};';
    init = init.concat(chartInit);

    //Configure tooltip configuration
    const tooltipTemplate = 'function tf(d,l,o,c,h){return `<div style="padding: 5px;">' +                            
                            '<center><strong>${d}</strong></center><br>' +                         
                            '<strong>Low</strong>: ${l}<br>' +
                            '<strong>Open</strong>: ${o}<br>' +
                            '<strong>Close</strong>: ${c}<br>' + 
                            '<strong>High</strong>: ${h}<br></div>`;}'
    
    init = init.concat(tooltipTemplate);
    return init;
  }

  buildChartOptions() {
    const options = {};

    //Configure options setting for title
    const isVisible = this.SettingsHandler.getAsBoolean("title-visible");
    const title = isVisible ? this.SettingsHandler.getAsString("title-text") : null;
    const titleTextStyle = this.SettingsHandler.getAsFont("title-font");

    //Configure options setting for plotarea candlestick
    const candlestick = {
            fallingColor: {
              fill: this.SettingsHandler.getAsColor("plotArea-color"),
              stroke: this.SettingsHandler.getAsColor("plotArea-line-color"),
              strokeWidth: this.SettingsHandler.getAsInt("candlestick-line-width")
            },
            risingColor: {
              fill: this.SettingsHandler.getAsColor("plotArea-up-color"),
              stroke: this.SettingsHandler.getAsColor("plotArea-up-line-color"),
              strokeWidth: this.SettingsHandler.getAsInt("candlestick-line-width")
            }
          }

    //Configure options setting for chartarea such as height and width
    const chartArea = {
            left: 10,
            top: 10,
            width:"100%",
            height: "100%"
          }
          
    
    options.colors = ['#000000', '#479905', '#b92322' ]
    options.legend = "none"
    options.title = title;
    options.titleTextStyle = titleTextStyle;
    options.tooltip = {isHtml: true};
    options.candlestick = candlestick;

    return options;
  }

  transformRawData() {
    //Extracting data and transform into array
    const groupColumn = this.DataHandler.getData("group-label")[0].values.rawvalues
    const lowColumn = this.DataHandler.getData("low-value")[0].values.rawvalues;
    const openingColumn = this.DataHandler.getData("opening-value")[0].values.rawvalues;
    const closingColumn = this.DataHandler.getData("closing-value")[0].values.rawvalues;
    const highColumn = this.DataHandler.getData("high-value")[0].values.rawvalues;

    let data = ''
    //Populating data into an array
    for (let i = 0; i < groupColumn.length; i++) {

      //Inserting the data     
      let groupLabel = this.handleDate() ? `new Date(${groupColumn[i]})` : `"${groupColumn[i]}"`;
      let row = `[${groupLabel},${lowColumn[i]},${openingColumn[i]},${closingColumn[i]},${highColumn[i]},tf(${groupLabel},${lowColumn[i]},${openingColumn[i]},${closingColumn[i]},${highColumn[i]})]`
      data = data.concat(',', row)
      }
      
    return data;
  }
///////// End of the class /////////
}

module.exports = OptionsCandlestickBuilder;
