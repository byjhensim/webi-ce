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

  getVisualization(id){
    for (var i=0; i < this.visualizations.length; i++) {
      if (this.visualizations[i].id == id) {
        return this.visualizations[i];
      }
    }
    logger.logInfo("ERROR: Visualization ID " + id + " is unknown");
  }

  getVisualizations() {
    return {
      visualizations: this.visualizations}
      }

  getVisualizationType(id) {
    const viz = this.getVisualization(id);
    return viz.type;
  }
}

module.exports = CustomElementServiceInfo;
