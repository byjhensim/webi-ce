"use strict"

const logger = require("../utils/logger");

class CustomElementServiceInfo {
  constructor() {
    this.visualizations = [
      {
        id:"sankey",
        name:"Google Sankey Chart",
        description: "Visualization used to depict a flow from one set of values to another",
        type: "sankey"
      },
      {
        id:"geocharts",
        name:"Google GeoChart",
        description: "Map visualization",
        type:"geocharts"
      }
    ];

    this.formats = ["text/html"];
  }

  getFormats(){
    return {
      formats: this.formats
    };
  }

  getVisualizations() {
    return {
      visualizations: this.visualizations}
      }
}

module.exports = CustomElementServiceInfo;
