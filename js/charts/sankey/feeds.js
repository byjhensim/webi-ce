"use strict"

exports.feeds = {
  feeds:[
    {
      id: "source-destination",
      name: "Source and Destination",
      description: "The flow is oneway from top to bottom categories",
      axis:"0",
      type: "dimension",
      min: "2",
      max: "5"
    },
    {
      id: "flow-weight",
      name: "Flow Weight",
      description: "Value of journey from source to destination",
      type: "measure",
      min: "1",
      max: "1"
    }
  ]
};
