"use strict"

exports.feeds = {
  feeds:[
    {
      id: "group-label",
      name: "Group Label",
      description: "Group label on the X axis, usually period, date, etc",
      axis:"0",
      type: "dimension",
      min: "1",
      max: "1"
    },
    {
      id: "low-value",
      name: "Low",
      description: "Specifying the low/minimum value of this marker",
      type: "measure",
      min: "1",
      max: "1"
    },
    {
      id: "opening-value",
      name: "Opening",
      description: "Specifying the opening/initial value of this marker",
      type: "measure",
      min: "1",
      max: "1"
    },
    {
      id: "closing-value",
      name: "Closing",
      description: "Specifying the closing/final value of this marker",
      type: "measure",
      min: "1",
      max: "1"
    },
    {
      id: "high-value",
      name: "High",
      description: "Specifying the high/maximum value of this marker",
      type: "measure",
      min: "1",
      max: "1"
    }
  ]
};
