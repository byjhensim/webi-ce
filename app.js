// Load Node js modules
const express = require("express");
const bodyParser = require ("body-parser");
const os = require("os");

// Load library js
const logger = require("./js/utils/logger");

// App Initialization
const app = express();
app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({limit:"50mb", extended:true}));

// CORS
app.all('*', function (req, res, next) {
    if (req.method === "OPTIONS") {
        res.header("access-control-allow-credentials", "true");
        if (req.headers["access-control-request-headers"] != null) {
            res.header("access-control-allow-headers", "Content-Type, authorization");
        }
        if (req.headers["access-control-request-method"] != null) {
            res.header("access-control-request-method", "POST, GET, OPTIONS");
        }
        if (req.headers["origin"] != null) {
            res.header("access-control-allow-origin", req.headers["origin"]);
            res.header("access-control-max-age", "86400");
        }
    }
    else {
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", req.headers["origin"]);
    }
    next();
 });

// Setting up route
const indexRouter = require("./js/routes/index");
const vizRouter = require("./js/routes/visualization")();

app.use("/", indexRouter);
app.use("/api/", vizRouter);

// Set the server port
const serverPort = process.env.PORT || 3000;
app.listen(serverPort);

logger.logInfo("Start WCS Custom Element Service");
logger.logInfo("http://" + os.hostname() + ":" + serverPort);
