'use strict'

class DataHandler {
  constructor(renderInfo) {
    this.renderInfo = renderInfo;
  }

  //Get data parameter from Webi request filtered by feedId:
  getData(feedId) {
    const data = [];
    const feedItem = this.renderInfo.feeding.find((feed) => {
      return feed.id === feedId;
    });

    if (typeof feedItem === "undefined") {
      return data;
    }

    const ids = feedItem.expressions;

    if (typeof ids === "undefined") {
      return data;
    }

    for (let i in this.renderInfo.data) {
      if (typeof ids.find((item) => {
          return item.dataId.toString() === this.renderInfo.data[i].id;
        }) !== "undefined") {
        data.push(this.renderInfo.data[i]);
      }
    }
    return data;
  }

distinct(arr) {
    var values = [];
    for (var i = 0; i < arr.length; i++) {
      var value = arr[i];
      if (values.indexOf(value) === -1) {
        values.push(value);
      }
    }
    return values;
  };

}

module.exports = DataHandler;
