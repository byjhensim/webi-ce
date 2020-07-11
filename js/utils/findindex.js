"use strict"

module.exports.getRegionIndex = function getRegionIndex(settings, id) {
  for (let i in settings.regions) {
    if (settings.regions[i].id === id) {
      return parseInt(i, 10);
    }
  }
  return undefined;
}
