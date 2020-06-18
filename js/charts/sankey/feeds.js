"use strict"

exports.feeds = {
  feeds:[
    {
      id: "source-category",
      name: "Source Category",
      description: "Dataset for source category",
      axis:"0",
      type: "dimension",
      min: "1",
      max: "1"
    },
    {
      id: "destination-category",
      name: "Destination Category",
      description: "Dataset for destination category",
      axis:"0",
      type: "dimension",
      min: "1",
      max: "1"
    },
    {
      id: "flow-weight",
      name: "Flow Weight",
      description: "Value of connections between source and destination",
      type: "measures",
      min: "1",
      max: "1"
    }
  ]
};
