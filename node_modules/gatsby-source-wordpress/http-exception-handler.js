"use strict";

var colorized = require(`./output-color`);

/**
 * Handles HTTP Exceptions (axios)
 *
 * @param {any} e
 */
function httpExceptionHandler(e) {
  var response = e.response,
      code = e.code;

  if (!response) {
    console.log(colorized.out(`The request failed with error code "${code}"`, colorized.color.Font.FgRed));
    return;
  }
  var status = response.status,
      statusText = response.statusText,
      message = response.data.message;

  console.log(colorized.out(`The server response was "${status} ${statusText}"`, colorized.color.Font.FgRed));
  if (message) {
    console.log(colorized.out(`Inner exception message : "${message}"`, colorized.color.Font.FgRed));
  }
}

module.exports = httpExceptionHandler;