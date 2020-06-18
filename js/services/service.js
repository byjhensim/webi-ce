"use strict"

const logger = require("../utils/logger");
const CustomElementServiceInfo = require("./serviceinfo");
const fs = require("fs");
const PageBuilder = require("../charts/pagebuilder");
const ChartBuilder = require("../charts/chartbuilder");
const HTMLConstructor = require("../charts/htmlconstructor");

class CustomElementService {
  constructor() {
    this.serviceInfo = new CustomElementServiceInfo();
  }

  getFormats(){
     return this.serviceInfo.getFormats();
  }

  getServiceInfo(){
    return this.serviceInfo;
  }

  getSample(sampleId) {
    let sampleViz;
    const type = this.serviceInfo.getVisualizationType(sampleId);
    if (fs.existsSync("./js/charts/" + type +"/icon.png")) {
      sampleViz = fs.readFileSync("./js/charts/" + type +"/icon.png");
    }
    return sampleViz;
  }

  getFeeds(sampleId) {
    const type = this.serviceInfo.getVisualizationType(sampleId);
    const feeds = require("../charts/" + type +"/feeds").feeds;
    return feeds;
  }

  getRender(renderInfo) {
    const pBuilder = new PageBuilder();
    const cBuilder = new ChartBuilder(this.serviceInfo, renderInfo);
    const htmlConstructor = new HTMLConstructor(pBuilder, cBuilder);

    const render = htmlConstructor.construct();

    return render;
  }

}

module.exports = CustomElementService;
