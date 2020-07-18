"use strict";

exports.feeds = {
  feeds: [
    {
      id: "dates",
      name: "Dates",
      description: "Group label on the X axis, usually period, date, etc",
      axis: "0",
      type: "dimension",
      min: "1",
      max: "1",
    },
    {
      id: "low-value",
      name: "Low",
      description: "Specifying the low/minimum value of this marker",
      type: "measure",
      min: "1",
      max: "1",
    },
    {
      id: "opening-value",
      name: "Opening",
      description: "Specifying the opening/initial value of this marker",
      type: "measure",
      min: "1",
      max: "1",
    },
    {
      id: "closing-value",
      name: "Closing",
      description: "Specifying the closing/final value of this marker",
      type: "measure",
      min: "1",
      max: "1",
    },
    {
      id: "high-value",
      name: "High",
      description: "Specifying the high/maximum value of this marker",
      type: "measure",
      min: "1",
      max: "1",
    },
  ],
};

exports.header = [
  {
    id: "dates",
    header: { label: "Dates", type: "date" },
  },
  {
    id: "low-value",
    header: { label: "Low", type: "number" },
  },
  {
    id: "opening-value",
    header: { label: "Opening", type: "number" },
  },
  {
    id: "closing-value",
    header: { label: "Closing", type: "number" },
  },
  {
    id: "high-value",
    header: { label: "High", type: "number" },
  },
];
