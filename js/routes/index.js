"use strict"

const express = require("express");
const logger = require("../utils/logger");

const router = express.Router();

router.get("/", function(req, res){
  res.send("Server Up and Running !");
});

router.get("/api/about", function(req, res){
  logger.logInfo("Get about");
  res.send("WCS Custom Element Service");
  });

module.exports = router;
