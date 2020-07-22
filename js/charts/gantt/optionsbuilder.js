"use strict";

const ErrorHandler = require("../../utils/errorhandler");
const DataHandler = require("../datahandler");
const SettingsHandler = require("../settingshandler");

class OptionsGanttBuilder {
  constructor(renderInfo) {
    const feeds = require("./feeds").feeds.feeds;
    const defaultSettings = require("./settings").settings;
    this.DataHandler = new DataHandler(renderInfo, feeds);
    this.SettingsHandler = new SettingsHandler(
      defaultSettings,
      renderInfo.settings
    );
    this.renderInfo = renderInfo;
  }

  checkBuilder() {
    const taskId = this.DataHandler.getDataAsString("task-id");
    const taskName = this.DataHandler.getDataAsString("task-name");
    const start = this.DataHandler.getDataAsDate("start");
    const end = this.DataHandler.getDataAsDate("end");
    const duration = this.DataHandler.getDataAsMilliSeconds("duration");
    const completeness = this.DataHandler.getDataAsNumber("completeness");
    const dependencies = this.DataHandler.getDataAsString("dependencies");

    const error = [];

    if (taskName == null) {
      error.push("Missing dataset: Task Name");
    }
    if (completeness == null) {
      error.push("Missing dataset: Completeness");
    }
    if (start == null && end == null) {
      error.push("Missing dataset: please specify start time or end time");
    }
    if (start == null && duration == null) {
      error.push("Mising dataset: unable to calculate start time or duration");
    }
    if (end == null && duration == null) {
      error.push("Mising dataset: unable to calculate end time or duration");
    }
    if (end == null && start == null && duration == null) {
      error.push(
        "Missing dataset: unable to compute start time, end time, and duration"
      );
    }
    if (dependencies !== null && taskId === null) {
      error.push(
        "Missing dataset: Please supply Dependencies along with Task Id, and specify task depended with value from Task Id"
      );
    }

    if (error.length !== 0) {
      throw new ErrorHandler("Feeding Error", "Incorrect Feeding", error);
    }
  }

  buildDataTable() {
    let dataTable = "";

    //Initiating DataTable Header
    let initHeader = require("./feeds").header;
    let header = [];
    initHeader.forEach((elt) => {
      if (elt.id !== "resource-id") {
        if (Array.isArray(elt.header)) {
          for (let i in elt.header) {
            header.push(elt.header[i]);
          }
        } else {
          header.push(elt.header);
        }
      } else {
        if (this.DataHandler.mapData.get(elt.id) !== null) {
          header.push(elt.header);
        } else {
          return;
        }
      }
    });

    dataTable = dataTable.concat(JSON.stringify(header));

    //Input data into DataTable
    const data = this.transformRawData();
    dataTable = dataTable.concat(data);

    return `[${dataTable}]`;
  }

  initChart() {
    let init = "";

    //Configuration for time format
    const formatter =
      'var f = new google.visualization.DateFormat({formatType: "short"});f.format(data,0);';
    init = init.concat(formatter);

    // Configure chart initialization
    const chartInit =
      'var chart = new google.visualization.Gantt(document.getElementById("container")); chart.draw(data, options);};';
    init = init.concat(chartInit);

    return init;
  }

  buildChartOptions() {
    const options = {};

    //Configure options settings for critical path style
    const criticalPathEnabled = this.SettingsHandler.getAsBoolean(
      "critical-enabled"
    );
    const criticalPathStyle = {
      stroke: this.SettingsHandler.getAsColor("critical-stroke"),
      strokeWidth: this.SettingsHandler.getAsInt("critical-stroke-width"),
    };

    //Configure options setting for arrow style
    const arrow = {
      angle: this.SettingsHandler.getAsInt("arrow-angle"),
      color: this.SettingsHandler.getAsColor("arrow-color"),
      width: this.SettingsHandler.getAsInt("arrow-width"),
      radius: this.SettingsHandler.getAsInt("arrow-radius"),
    };

    //configure options setting for Grid style
    const innerGridHorizLine = {
      stroke: this.SettingsHandler.getAsInt("horiz-color"),
      strokeWidth: this.SettingsHandler.getAsInt("horiz-width"),
    };
    const innerGridTrack = {
      fill: this.SettingsHandler.getAsColor("grid-color"),
    };
    const trackHeight = this.SettingsHandler.getAsInt("grid-size");
    const barHeight = trackHeight - 7;

    //Populating options setting to object
    const gantt = {
      criticalPathEnabled: criticalPathEnabled,
      criticalPathStyle: criticalPathStyle,
      arrow: arrow,
      innerGridHorizLine: innerGridHorizLine,
      innerGridTrack: innerGridTrack,
      trackHeight: trackHeight,
      barHeight: barHeight,
    };

    options.gantt = gantt;

    return options;
  }

  transformRawData() {
    //Transform into array
    let taskId = this.DataHandler.getDataAsString("task-id");
    const taskName = this.DataHandler.getDataAsString("task-name");
    const resourceId = this.DataHandler.getDataAsStringTrunc("resource-id");
    const start = this.DataHandler.getDataAsDate("start");
    const end = this.DataHandler.getDataAsDate("end");
    const duration = this.DataHandler.getDataAsMilliSeconds("duration");
    const completeness = this.DataHandler.getDataAsNumber("completeness");
    const dependencies = this.DataHandler.getDataAsString("dependencies");

    //If user doesn't supply task-id, generate task-id
    taskId = taskId == null && this.DataHandler.setIndex(taskName.length);

    let data = "";

    //Populating data into an array
    for (let i = 0; i < taskId.length; i++) {
      //Inserting the data
      let row = `['${taskId[i]}','${taskName[i]}',${
        resourceId == null ? "" : "'" + resourceId[i] + "',"
      }${start == null ? null + "," : start[i] + ","}${
        end == null ? null + "," : end[i] + ","
      }${duration == null ? null + "," : duration[i] + ","}${completeness[i]}${
        dependencies == null
          ? "," + null
          : `${
              dependencies[i] == null
                ? "," + null
                : ",'" + dependencies[i] + "'"
            }`
      }]`;
      data = data.concat(",", row);
    }

    return data;
  }
  ///////// End of the class /////////
}

module.exports = OptionsGanttBuilder;
