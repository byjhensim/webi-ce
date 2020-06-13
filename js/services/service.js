"use strict"

const logger = require("../utils/logger");
const CustomElementServiceInfo = require("./serviceinfo");
const fs = require("fs");

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

  getSample(sampleId){
    let sampleViz;
    const type = this.serviceInfo.getVisualizationType(sampleId);
    if (fs.existsSync("./js/charts/" + type +"/icon.png")) {
      sampleViz = fs.readFileSync("./js/charts/" + type +"/icon.png");
    }
    return sampleViz;
  }

}

module.exports = CustomElementService;
