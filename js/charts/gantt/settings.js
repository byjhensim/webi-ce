"use strict";
const ganttSettings = { regions: [] };

const plotarea = {
  id: "plotArea",
  name: "Plot Area",
  groups: [
    {
      name: "Design",
      categories: [
        {
          name: "Critical Path",
          description:
            "Customize this to make critical path style different from other path",
          properties: [
            {
              id: "critical-enabled",
              name: "Style Differently?",
              description:
                "If set true any arrows on the critical path will be styled differently. Otherwise, it will be styled with Arrow settings",
              type: "boolean",
              default: "true"
            },
            {
              id: "critical-stroke",
              name: "Stroke color",
              description: "Set the color of the critical path stroke",
              type: "color",
              default: "#e64a19"
            },
            {
              id: "critical-stroke-width",
              name: "Stroke width",
              description: "Settings for the line width",
              type: "integer",
              default: "4"
            }
          ]
        },
        {
          name: "Label",
          description: "Customize this to style the task labels",
          properties: [
            {
              id: "label-size",
              name: "Label Size",
              description: "The size of the font for task label",
              type: "integer",
              default: "10"
            },
            {
              id: "label-width",
              name: "Label Width",
              description:
                "Maximum amount of space allowed for each task label",
              type: "integer",
              default: "300"
            }
          ]
        },
        {
          name: "Arrow",
          description: "Customize this to style the arrow of path dependencies",
          properties: [
            {
              id: "arrow-angle",
              name: "Arrow angle",
              description: "The angle of the head of the arrow",
              type: "integer",
              default: "45"
            },
            {
              id: "arrow-color",
              name: "Arrow color",
              description: "The color of the arrows",
              type: "color",
              default: "#2bbd26"
            },
            {
              id: "arrow-width",
              name: "Arrow width",
              description: "The width of the arrows",
              type: "integer",
              default: "4"
            },
            {
              id: "arrow-radius",
              name: "Arrow radius",
              description:
                "The radius for defining the curve of the arrow between two tasks",
              type: "integer",
              default: "0"
            }
          ]
        },
        {
          name: "Grid",
          description:
            "Customize this to style the tracks. It's the row for each task",
          properties: [
            {
              id: "grid-size",
              name: "Grid Size",
              description: "The height of the track for each task ",
              type: "integer",
              default: "15"
            },
            {
              id: "horiz-width",
              name: "Line width",
              description: "The width of the inner horizontal grid lines",
              type: "integer",
              default: "1"
            },
            {
              id: "horiz-color",
              name: "Line color",
              description: "The color of the inner horizontal grid lines",
              type: "color",
              default: ""
            },
            {
              id: "grid-color",
              name: "Grid Color",
              description: "The fill color of the inner grid track",
              type: "color",
              default: ""
            }
          ]
        }
      ]
    }
  ]
};

ganttSettings.regions.push(plotarea);

exports.settings = ganttSettings;
