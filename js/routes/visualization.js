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

router.post("/visualizations/:vizId/sample", function(req, res){
  logger.logInfo("Get Sample");
  const sampleId = req.params.vizId;
  const sample = service.getSample(sampleId);
  res.writeHead(200, {"Content-Type":"image/png"});
  res.end(sample, "binary");

  logger.logInfo("End Sample");
})

router.get("/visualizations/:vizId/feeds", function(req, res){
  logger.logInfo("Get Feeds Definitions");
  const sampleId = req.params.vizId;
  const feeds = service.getFeeds(sampleId);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(feeds));

  logger.logInfo("Sent Feeds Definitions");
})

router.post("/visualizations/:vizId/render", function(req, res){
  logger.logInfo("Get Render");

  const renderInfo = {
    id: req.params.vizId,
    size: {
      height: req.body.height,
      width: req.body.width
    },
    feeding: req.body.feeding,
    data: req.body.data
    }

  const renderer = service.getRender(renderInfo);

  if (req.headers.accept === "text/html") {
    res.writeHead(200, {"Content-Type": req.headers.accept});
    res.end(renderer);
    logger.logInfo("Sent Render");
  }
})

  return router;
}
