"use strict"
const FindIndex = require("../../utils/findindex");
const candlestickSettings = require("../general/defaultsetting").defaultSettings;

const plotarea = {
    id: 'plotArea',
    name: 'Plot Area',
    groups: [
        {
            name: 'Design',
            categories: [
                {
                    name: 'General',
                    description: 'General settings',
                    properties: [
                        {
                            id: 'plotArea-override-color',
                            name: 'Override the palette colors',
                            description: 'Settings to set whether the palette or custom colors are used',
                            type: 'boolean',
                            default: 'false'
                        },
                        {
                            id: 'candlestick-line-width',
                            name: 'Line width',
                            description: 'Settings for the line width',
                            type: 'integer',
                            default: '2'
                        }
                    ]
                },
                {
                    name: 'Increasing',
                    description: 'Settings for the bullish (close higher than open)',
                    properties: [
                        {
                            id: 'plotArea-up-color',
                            name: 'Color',
                            description: 'Set the color of the bullish',
                            type: 'color',
                            default: '#479905'
                        },
                        {
                            id: 'plotArea-up-line-color',
                            name: 'Line color',
                            description: 'Set the line color of the bullish',
                            type: 'color',
                            default: '#000000'
                        }
                    ]
                },
                {
                    name: 'Decreasing',
                    description: 'Settings for the bearish (close lower than open)',
                    properties: [
                        {
                            id: 'plotArea-color',
                            name: 'Color',
                            description: 'Set the color of the bearish, synchronized with graph',
                            type: 'color',
                            default: '#b92322'
                        },
                        {
                            id: 'plotArea-line-color',
                            name: 'Line color',
                            description: 'Set the line color of the bullish',
                            type: 'color',
                            default: '#000000'
                        }
                    ]
                }
            ]
        }
    ]
};

let tooltip = {
    name: 'Tooltip',
    categories: [
        {
            name: 'Serie name',
            description: 'Set the serie name',
            properties: [
                {
                    id: 'data-serie-name',
                    name: 'Text',
                    description: 'Change the name of the serie',
                    type: 'string',
                    default: 'Exchange rate'
                }
            ]
        }
    ]
};

candlestickSettings.regions.push(plotarea);
const titleIndex = FindIndex.getRegionIndex(candlestickSettings, "title");
candlestickSettings.regions[titleIndex].groups.push(tooltip);

exports.settings = candlestickSettings
