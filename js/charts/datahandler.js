"use strict";

const logger = require("../utils/logger");
const ErrorHandler = require("../utils/errorhandler");
const moment = require("moment");
const _ = require("lodash");

class DataHandler {
  constructor(renderInfo, feeds) {
    this.mapData = new Map();
    this.init(renderInfo, feeds);
  }

  init(renderInfo, feeds) {
    this.setFeed(feeds);
    this.setData(renderInfo);
  }

  // Initialized feeds structure with null value
  setFeed(feeds) {
    if (typeof feeds === "undefined") {
      logger.logInfo("ERROR: Feeds definition object is null");
      return;
    }

    feeds.forEach((feed) => {
      if (this.mapData.has(feed.id)) {
        throw logger.logInfo("Feed Error: Feed id already exist");
      }
      this.mapData.set(feed.id, null);
    });
  }

  setData(renderInfo) {
    for (const feedId of this.mapData.keys()) {
      const raw = this.getFeed(feedId, renderInfo);

      if (raw.length == 0) {
        this.mapData.set(feedId, null);
      } else if (raw.length > 1) {
        const groupData = [];
        for (const i in raw) {
          const data = raw[i].values.rawvalues;
          groupData.push(data);
        }
        this.mapData.set(feedId, groupData);
      } else {
        this.mapData.set(feedId, raw[0].values.rawvalues);
      }
    }
  }

  //Get data parameter from Webi request filtered by feedId:
  getFeed(feedId, renderInfo) {
    const data = [];
    const feedItem = renderInfo.feeding.find((feed) => {
      return feed.id === feedId;
    });

    if (typeof feedItem === "undefined") {
      return data;
    }

    const ids = feedItem.expressions;

    if (typeof ids === "undefined") {
      return data;
    }

    for (let i in renderInfo.data) {
      if (
        typeof ids.find((item) => {
          return item.dataId.toString() === renderInfo.data[i].id;
        }) !== "undefined"
      ) {
        data.push(renderInfo.data[i]);
      }
    }
    return data;
  }

  getDataAsString(id) {
    let str = this.mapData.get(id);
    if (str === null) {
      return null;
    } else {
      if (Array.isArray(str[0])) {
        str = str.map((elt) => {
          return elt.map((elt) => {
            return typeof elt === "string" || elt == null
              ? elt
              : elt.toString();
          });
        });
      } else {
        str = str.map((elt) => {
          return typeof elt === "string" || elt == null ? elt : elt.toString();
        });
      }
      return str;
    }
  }

  getDataAsDate(id) {
    const data = [];
    const date = this.mapData.get(id);

    if (date === null) {
      return null;
    } else {
      //check date format DD/MM/YYYY
      const formats = ["MM/DD/YY", "MM/DD/YYYY"];

      if (moment(date[0], formats, true).isValid) {
        //transform data into google date format
        date.forEach((elt) => {
          const item = elt != null ? new Date(elt) : null;
          const temp =
            item != null
              ? `new Date(${item.getFullYear()}, ${item.getMonth()}, ${item.getDate()})`
              : null;
          data.push(temp);
        });
      } else {
        throw new ErrorHandler("Feeding Error", "Incorrect Feeding", [
          "Invalid date format, please use MM/DD/YY or MM/DD/YYYY",
        ]);
      }

      return data;
    }
  }

  getDataAsNumber(id) {
    let num = this.mapData.get(id);
    if (num === null) {
      return null;
    } else {
      if (Array.isArray(num[0])) {
        num = num.map((elt) => {
          return elt.map((elt) => {
            return typeof elt === "string" ? parseInt(elt, 10) : elt;
          });
        });
      } else {
        num = num.map((elt) => {
          return typeof elt === "string" ? parseInt(elt, 10) : elt;
        });
      }
    }

    return num;
  }

  getDataAsMilliSeconds(id) {
    let milliSeconds = this.mapData.get(id);
    if (milliSeconds === null) {
      return null;
    } else {
      if (Array.isArray(milliSeconds[0])) {
        milliSeconds = milliSeconds.map((elt) => {
          return elt.map((elt) => {
            return elt != null ? elt * 24 * 60 * 60 * 1000 : null;
          });
        });
      } else {
        milliSeconds = milliSeconds.map((elt) => {
          return elt != null ? elt * 24 * 60 * 60 * 1000 : null;
        });
      }
      return milliSeconds;
    }
  }

  getDataAsStringTrunc(id) {
    let strTrunc = this.mapData.get(id);
    if (strTrunc === null) {
      return null;
    } else {
      strTrunc = strTrunc.map((elt) => {
        return _.kebabCase(_.split(elt, " ", 2));
      });
    }
    return strTrunc;
  }

  setIndex(number) {
    let index = [];
    for (let i = 0; i < number; i++) {
      let id = "id" + i;
      index.push(id);
    }
    return index;
  }
}

module.exports = DataHandler;
