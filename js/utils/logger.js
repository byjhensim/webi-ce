"use strict"

module.exports.logInfo = function logInfo(info) {
      const currentDate = new Date();
      console.log(currentDate.toLocaleTimeString() + " => " + info);
}
