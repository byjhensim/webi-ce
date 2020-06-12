"use strict";

const express = require("express");
const logger = require("../utils/logger");

module.exports = function () {
  var router = express.Router();
  const CustomElementService = require("../services/service");
  const service = new CustomElementService();

  router.get("/formats", function(req, res){
    logger.logInfo("Get Format");
    const formats = service.getFormats();
    res.setHeader("Content-Type", "application/json");
    const result = JSON.stringify(formats);
    res.send(result);

    logger.logInfo("Sent Format");
  });

  router.get("/visualizations", function(req, res){
    logger.logInfo("Get Visualization");
    const visualizations = service.getServiceInfo().getVisualizations();
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(visualizations));

    logger.logInfo("Sent Visualizations");
  })



  return router;
}
