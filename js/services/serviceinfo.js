"use strict";

const logger = require("../utils/logger");

class CustomElementServiceInfo {
  constructor() {
    this.visualizations = [
      {
        id: "sankey",
        name: "Sankey Chart",
        description:
          "Visualization used to depict a flow from one set of values to another.The things being connected are called nodes and the connections are called links. Sankeys are best used when you want to show a many-to-many mapping between two domains",
        type: "sankey",
        package: "sankey",
      },
      {
        id: "candlestick",
        name: "Candlestick Chart",
        description:
          "A candlestick chart is used to show an opening and closing value overlaid on top of a total variance. Candlestick charts are often used to show stock value behavior.",
        type: "candlestick",
        package: "corechart",
      },
      {
        id: "gantt",
        name: "Gantt Chart",
        description:
          "A type of chart that illustrate the breakdown of the project into its component tasks. Gantt charts illustrates the start, end, and duration of tasks within a project",
        type: "gantt",
        package: "gantt",
      },
    ];

    this.formats = ["text/html"];
  }

  getFormats() {
    return {
      formats: this.formats,
    };
  }

  getVisualization(id) {
    for (var i = 0; i < this.visualizations.length; i++) {
      if (this.visualizations[i].id == id) {
        return this.visualizations[i];
      }
    }
    logger.logInfo("ERROR: Visualization ID " + id + " is unknown");
  }

  getVisualizations() {
    return {
      visualizations: this.visualizations,
    };
  }

  getVisualizationType(id) {
    const viz = this.getVisualization(id);
    return viz.type;
  }

  getVisualizationPackage(id) {
    const gPackage = this.getVisualization(id);
    return gPackage.package;
  }
}

module.exports = CustomElementServiceInfo;
