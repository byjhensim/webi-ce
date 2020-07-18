"use strict";

const logger = require("../utils/logger");

class SettingsHandler {
  constructor(defaultSettings, settings) {
    this.mapSettings = new Map();
    this.init(defaultSettings, settings);
  }

  init(defaultSettings, settings) {
    this.setDefaultSettings(defaultSettings);
    this.setChartSettings(settings);
  }

  setDefaultSettings(defaultSettings) {
    if (typeof defaultSettings.regions === "undefined") {
      logger.logInfo("ERROR: Default settings object is null");
      return;
    }

    for (const regionIndex in defaultSettings.regions) {
      const region = defaultSettings.regions[regionIndex];

      for (const groupIndex in region.groups) {
        const group = region.groups[groupIndex];

        for (const catIndex in group.categories) {
          const category = group.categories[catIndex];

          for (const propertyIndex in category.properties) {
            const property = category.properties[propertyIndex];

            if (this.mapSettings.has(property.id)) {
              throw logger.logInfo("Settings Error: Setting id already exist");
            }

            if (property.type === "font") {
              const font = {};
              for (const subIndex in property.properties) {
                const fontProperty = property.properties[subIndex];
                font[fontProperty.id] = fontProperty.default;
              }

              this.mapSettings.set(property.id, font);
            } else {
              this.mapSettings.set(property.id, property.default);
            }
          }
        }
      }
    }
  }

  setChartSettings(settings) {
    for (const setIdx in settings) {
      const setProperty = settings[setIdx].property;
      if (setProperty.includes("/")) {
        // This case the property is fontProperty
        const property = setProperty.split("/");
        const fontProperty = this.mapSettings.get(property[0]);
        if (typeof fontProperty[property[1]] == "undefined") {
          console.log(
            "Setting Error: Font setting id " + property[1] + " does not exist"
          );
        }

        const value = settings[setIdx].value;
        fontProperty[property[1]] = typeof value === "undefined" ? "" : value;

        if (!this.mapSettings.has(property[0])) {
          console.log(
            "Setting Error: Setting id " +
              property[0] +
              " is not in default settings"
          );
        }

        this.mapSettings.set(property[0], fontProperty);
      } else {
        if (!this.mapSettings.has(setProperty)) {
          console.log(
            "Setting Error: Setting id " +
              property[0] +
              " is not in default settings"
          );
        }
        const value = settings[setIdx].value;
        this.mapSettings.set(
          setProperty,
          typeof value === "undefined" ? "" : value
        );
      }
    }
  }

  getAsString(id) {
    return this.mapSettings.get(id);
  }

  getAsState(id) {
    return this.mapSettings.get(id);
  }

  getAsBoolean(id) {
    const elt = this.mapSettings.get(id);
    return typeof elt === "undefined" ? null : elt === "true";
  }

  getAsColor(id) {
    const elt = this.mapSettings.get(id);
    return elt !== "" ? this.rbgaToRgb(elt) : null;
  }

  getAsInt(id) {
    const elt = this.mapSettings.get(id);
    return typeof elt !== "undefined" ? parseInt(elt, 10) : null;
  }

  getAsFont(id) {
    const elt = this.mapSettings.get(id);
    return typeof elt !== "undefined" ? this.toFont(elt) : null;
  }

  getAsDouble(id) {
    const elt = this.mapSettings.get(id);
    return typeof elt !== "undefined" ? parseFloat(elt, 10) : null;
  }

  toFont(font) {
    const chartFont = {
      fontName: font.name,
      fontSize: parseInt(font.size, 10),
      color: font.color,
      bold: font.bold === "true",
      italic: font.italic === "true",
    };

    return chartFont;
  }

  rbgaToRgb(rgba) {
    const rgb = rgba.slice(0, 7);
    return rgb;
  }
}

module.exports = SettingsHandler;
