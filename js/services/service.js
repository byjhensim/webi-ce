"use strict";

const CustomElementServiceInfo = require("./serviceinfo");
const fs = require("fs");
const PageBuilder = require("../charts/pagebuilder");
const ChartBuilder = require("../charts/chartbuilder");
const HTMLConstructor = require("../charts/htmlconstructor");
const minifier = require("html-minifier").minify;

class CustomElementService {
  constructor() {
    this.serviceInfo = new CustomElementServiceInfo();
  }

  getFormats() {
    return this.serviceInfo.getFormats();
  }

  getServiceInfo() {
    return this.serviceInfo;
  }

  getSample(vizId) {
    let sampleViz;
    const type = this.serviceInfo.getVisualizationType(vizId);
    if (fs.existsSync("./js/charts/" + type + "/icon.png")) {
      sampleViz = fs.readFileSync("./js/charts/" + type + "/icon.png");
    }
    return sampleViz;
  }

  getFeeds(vizId) {
    const type = this.serviceInfo.getVisualizationType(vizId);
    const feeds = require("../charts/" + type + "/feeds").feeds;

    return feeds;
  }

  getSettings(vizId) {
    const type = this.serviceInfo.getVisualizationType(vizId);
    const settings = require("../charts/" + type + "/settings").settings;

    return settings;
  }

  getRender(renderInfo) {
    const pBuilder = new PageBuilder();
    const options = require("../utils/minifier").options;
    let render = "";

    try {
      const cBuilder = new ChartBuilder(this.serviceInfo, renderInfo);
      const htmlConstructor = new HTMLConstructor(pBuilder, cBuilder);

      render = htmlConstructor.construct();
    } catch (e) {
      console.log(e);
      let exception = [e.name + ": " + e.message];
      if (typeof e.content != "undefined" && e.content !== 0) {
        exception = e.content.concat(exception);
      }
      render = this.buildError(exception, renderInfo.size);
    }

    return minifier(render, options);
  }

  buildError(errorArr, divSize) {
    let error =
      '<div id="container" style="width:' +
      divSize.width +
      "px;  height:" +
      divSize.height +
      'px; margin: 0em auto; text-align: center; vertical-align: middle; display: table-cell;">';
    error +=
      '<div><img src="https://i.ibb.co/FXGsCSy/WCS.png" style="width: 35%; padding: 0em">';
    while (errorArr.length !== 0) {
      error +=
        '<p style="color: #404040; margin: 0.4em">' + errorArr.pop() + "</p>";
    }
    error += "</div></div>";
    return error;
  }
}

module.exports = CustomElementService;
