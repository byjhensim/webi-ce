"use strict";

class ErrorHandler {
  constructor(name, message, content = []) {
    (this.name = name), (this.message = message), (this.content = content);
  }
}

module.exports = ErrorHandler;
