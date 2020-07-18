"use strict";

class HTMLConstructor {
  constructor(pageBuilder, chartBuilder) {
    this.pageBuilder = pageBuilder;
    this.chartBuilder = chartBuilder;
  }

  construct() {
    let html = "";

    html = html.concat(this.pageBuilder.buildHeaderPage());
    html = html.concat(this.chartBuilder.build());
    html = html.concat(this.pageBuilder.buildFooterPage());

    return html;
  }
}

module.exports = HTMLConstructor;
