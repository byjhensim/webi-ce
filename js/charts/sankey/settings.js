const sankeySettings = {regions:[]};

const design = {
  id: "design",
  name: "Design",
  groups: [{
      name: "Node",
      categories: [{
          name: "Label",
          description: "Settings for label of the nodes",
          properties: [{
              id: "label-font",
              name: "Font",
              description: "Setting for labels font",
              type: "font",
              default: "",
              properties: [{
                  id: "name",
                  name: "Font name",
                  description: "Font name",
                  type: "string",
                  default: "arial"
                },
                {
                  id: "size",
                  name: "Font size",
                  description: "Font size",
                  type: "integer",
                  default: "14"
                },
                {
                  id: "bold",
                  name: "Is bold?",
                  description: "Is bold?",
                  type: "boolean",
                  default: "false"
                },
                {
                  id: "italic",
                  name: "Is italic?",
                  description: "Is italic?",
                  type: "boolean",
                  default: "false"
                },
                {
                  id: "underline",
                  name: "Is underline?",
                  description: "Is underline?",
                  type: "boolean",
                  default: "false"
                },
                {
                  id: "color",
                  name: "Font color",
                  description: "Font color",
                  type: "color",
                  default: "#000000ff"
                }
              ]
            },
            {
              id: "label-padding",
              name: "Padding",
              description: "Setting for labels padding",
              type: "integer",
              default: "5",
              parameters: {
                min: "5",
                max: "30",
                step: "5"
              }
            }
          ]
        },
        {
          name: "Node",
          description: "Setting size of the nodes",
          properties: [{
              id: "node-size",
              name: "Node size",
              description: "Setting size of the nodes",
              type: "integer",
              default: "10",
              parameters: {
                min: "5",
                max: "20",
                step: "5"
              }
            },
            {
              id: "node-color",
              name: "Node Color",
              description: "Setting color of the Node",
              type: "color",
              default: ""
            },
            {
              id: "node-padding",
              name: "Node Padding",
              description: "Setting the padding between nodes",
              type: "integer",
              default: "20",
              parameters: {
                min: "10",
                max: "50",
                step: "5"
              }
            }
          ]
        }
      ]
    },
    {
      name: "Link",
      categories: [{
          name: "Color",
          description: "Settings the color of the flow",
          properties: [{
              id: "link-color",
              name: "Fill",
              description: "Setting the color of the flow",
              type: "color",
              default: ""
            },
            {
              id: "link-color-mode",
              name: "Color Mode",
              description: "Setting coloring mode for the links between nodes",
              type: "state",
              default: "none",
              choices: [{
                  id: "source",
                  name: "source",
                  description: "The color of the source node is used for the links to all target nodes."
                },
                {
                  id: "target",
                  name: "target",
                  description: "The color of the target node is used for the link to its source nodes."
                },
                {
                  id: "gradient",
                  name: "gradient",
                  description: "The link between a source and target node is colored as a gradient from the source node color to the target node color."
                },
                {
                  id: "none",
                  name: "none",
                  description: "Link colors will be set to the default ."
                }
              ]
            }
          ]
        },
        {
          name: "Stroke",
          description: "Settings the stroke of the links",
          properties: [{
              id: "stroke-color",
              name: "Color",
              description: "Setting the color of the stroke",
              type: "color",
              default: ""
            },
            {
              id: "stroke-width",
              name: "Width",
              description: "Setting for stroke width",
              type: "integer",
              default: "0",
              parameters: {
                min: "0",
                max: "3",
                step: "1"
              }
            }
          ]
        }
      ]
    }
  ]
};

sankeySettings.regions.push(design);

exports.settings = sankeySettings;
