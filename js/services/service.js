"use strict"

const logger = require("../utils/logger");
const CustomElementServiceInfo = require("./serviceinfo");

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
}

module.exports = CustomElementService;
