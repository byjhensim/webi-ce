"use strict";

//Settings for title chart area
let title = {
  id: "title",
  name: "Title",
  groups: [
    {
      name: "Design",
      categories: [
        {
          name: "General",
          description: "Settings for the main title",
          properties: [
            {
              id: "title-visible",
              name: "Visible",
              description: "Set the visibility of the main title",
              type: "boolean",
              default: "true",
            },
            {
              id: "title-text",
              name: "Text",
              description: "Set the text of the main title",
              type: "string",
              default: "Chart",
            },
          ],
        },
        {
          name: "Font",
          description: "Settings for title font",
          properties: [
            {
              id: "title-font",
              name: "Font",
              description: "Set the text of the main title",
              type: "font",
              default: "",
              properties: [
                {
                  id: "name",
                  name: "Font name",
                  description: "Font name",
                  type: "string",
                  default: "arial",
                },
                {
                  id: "size",
                  name: "Font size",
                  description: "Font size",
                  type: "integer",
                  default: "20",
                },
                {
                  id: "bold",
                  name: "Is bold?",
                  description: "Is bold?",
                  type: "boolean",
                  default: "false",
                },
                {
                  id: "italic",
                  name: "Is italic?",
                  description: "Is italic?",
                  type: "boolean",
                  default: "false",
                },
                {
                  id: "underline",
                  name: "Is underline?",
                  description: "Is underline?",
                  type: "boolean",
                  default: "false",
                },
                {
                  id: "color",
                  name: "Font color",
                  description: "Font color",
                  type: "color",
                  default: "#000000ff",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

exports.title = title;
